#ifndef __iAC_CPP__
#define __iAC_CPP__

#include "iac_mc3479.h"
#include "esp_log.h"

#define ACC_ADDR 0x6C

#define ACCRANGR2FSMODE(a) (a == 2 ? 0b000 : a == 4 ? 0b001 : a == 8 ? 0b010 : a == 16 ? 0b011 : 0b100)

const float ACC_Sensitivity_List[5] = {
	16384.0,   /* FS @2g */
	8192.0,    /* FS @4g */
	4096.0,    /* FS @8g */
	2048.0,    /* FS @12g */
	2730.0,    /* FS @16g */
};

iac_mc3479::iac_mc3479(int bus_ch, int dev_addr)
{
	channel = bus_ch;
	address = dev_addr;
	polling_ms = 40;
}

void iac_mc3479::init(void)
{
	// Debug
	esp_log_level_set("*", ESP_LOG_INFO);

	// clear error flag
	error = false;
	// clear initialized flag
	initialized = false;

	state = s_detect;
}

int iac_mc3479::prop_count(void)
{
	// not supported
	return 0;
}

bool iac_mc3479::prop_name(int index, char *name)
{
	// not supported
	return false;
}

bool iac_mc3479::prop_unit(int index, char *unit)
{
	// not supported
	return false;
}

bool iac_mc3479::prop_attr(int index, char *attr)
{
	// not supported
	return false;
}

bool iac_mc3479::prop_read(int index, char *value)
{
	// not supported
	return false;
}

bool iac_mc3479::prop_write(int index, char *value)
{
	// not supported
	return false;
}
// --------------------------------------

void iac_mc3479::process(Driver *drv)
{
	i2c = (I2CDev *)drv;
	switch (state)
	{
	case s_detect:
	{
		// detect acc i2c device
		if (i2c->detect(channel, ACC_ADDR) != ESP_OK)
		{
			state = s_error;
			break;
		}

		ESP_LOGI("iAC", "Found Acc device");

		uint8_t buff[2];

		/* ACC Setup */

		// Set Data rate
		buff[0] = 0x08; // Sample Rate register
		buff[1] = 0x13; // 100Hz
		if (i2c->write(channel, ACC_ADDR, buff, 2) != ESP_OK)
		{
			state = s_error;
			break;
		}

		// Set Full-scale selection
		buff[0] = 0x20;	// Range and Scale Control register
		buff[1] = (0 << 7) | (ACCRANGR2FSMODE(acc_range) << 4) | (0 << 3) | (0 << 2) | (0 << 1) | (0 << 0);
		if (i2c->write(channel, ACC_ADDR, buff, 2) != ESP_OK)
		{
			state = s_error;
			break;
		}
		/* ACC Setup Done */

		// clear error flag
		error = false;
		// set initialized flag
		initialized = true;

		// Go to main state
		state = s_polling;

		break;
	}

	case s_polling:
	{
		if (is_tickcnt_elapsed(tickcnt, polling_ms))
		{
			tickcnt = get_tickcnt();

			/* op mode is Normal 10-bit */
			int op_mode = 1;
			int shift = 6;
			int fs_mode = ACCRANGR2FSMODE(acc_range);
			uint8_t reg = 0;

			uint8_t buff[6];

			memset(buff, 0, 6);
			reg = 0x0D;
			if (i2c->read(channel, ACC_ADDR, &reg, 1, buff, 6) != ESP_OK)
			{
				state = s_error;
				break;
			}

			accelerometer[0] = (int16_t)((buff[1] << 8) | buff[0]) / ACC_Sensitivity_List[fs_mode] * 1000.0;
			accelerometer[1] = (int16_t)((buff[3] << 8) | buff[2]) / ACC_Sensitivity_List[fs_mode] * 1000.0;
			accelerometer[2] = (int16_t)((buff[5] << 8) | buff[4]) / ACC_Sensitivity_List[fs_mode] * 1000.0;

			for (int inx = EVENT_SHAKE; inx <= EVENT_FREE_FALL; inx++)
			{
				if (callbackDoingFlag[inx])
					continue;

				motion_event event = static_cast<motion_event>(inx);
				if (is_gesture(event, false)) // non-blocking
				{
					if (GestureCallback[inx] && callbackReadyFlag[inx] == false)
					{
						int *handleNum = (int *)malloc(sizeof(int));
						*handleNum = inx;

						callbackDoingFlag[*handleNum] = true;

						xTaskCreate(eventTask, "eventTask", 2048, handleNum, 1, NULL);
					}
				}
				else
				{
					callbackReadyFlag[inx] = false;
				}
			}
		}

		break;
	}

	case s_wait:
		if (error)
		{
			// wait polling_ms timeout
			if (is_tickcnt_elapsed(tickcnt, polling_ms))
			{
				state = s_detect;
			}
		}
		break;

	case s_error:
		// set error flag
		error = true;
		// clear initialized flag
		initialized = false;
		// get current tickcnt
		tickcnt = get_tickcnt();
		// goto wait and retry with detect state
		state = s_wait;
		break;
	}
}

void eventTask(void *arg)
{
	int *handleNum = (int *)arg;

	if (GestureCallback[*handleNum])
	{
		GestureCallback[*handleNum]();
	}

	callbackDoingFlag[*handleNum] = false;
	callbackReadyFlag[*handleNum] = true;

	free(handleNum);

	vTaskDelete(NULL);
}

// Method
void iac_mc3479::on_gesture(motion_event event, GestureHandle cb)
{
	GestureCallback[(int)event] = cb;
}

int32_t iac_mc3479::acceleration(acc_meg_axis axis)
{
	// ESP_LOGI("iAC", "Acc: %" PRId32 " %" PRId32 " %" PRId32, accelerometer[0], accelerometer[1], accelerometer[2]);

	switch (axis)
	{
	case AXIS_X:
		return -accelerometer[0];

	case AXIS_Y:
		return accelerometer[1];

	case AXIS_Z:
		return accelerometer[2];

	case STRENGTH:
		return sqrt(pow(accelerometer[0], 2) + pow(accelerometer[1], 2) + pow(accelerometer[2], 2));

	default:
		return 0;
	}
}

bool iac_mc3479::is_gesture(motion_event event, bool blocking)
{
	switch (event)
	{
	case EVENT_SHAKE:
		return acceleration(STRENGTH) > 5000;

	case EVENT_BOARD_UP:
		return acceleration(AXIS_Y) < -600;

	case EVENT_BOARD_DOWN:
		return acceleration(AXIS_Y) > 600;

	case EVENT_SCREEN_UP:
	{
		int pitch = rotation(AXIS_PITCH);
		return pitch >= -30 && pitch <= 30;
	}

	case EVENT_SCREEN_DOWN:
	{
		int pitch = rotation(AXIS_PITCH);
		return pitch >= 150 || pitch <= -150;
	}

	case EVENT_TILT_LEFT:
	{
		int roll = rotation(AXIS_ROLL);
		return roll <= -30;
	}

	case EVENT_TILT_RIGHT:
	{
		int roll = rotation(AXIS_ROLL);
		return roll >= 30;
	}

	case EVENT_FREE_FALL:
	{
		if (blocking)
		{
			bool lowStrengthContinue = false;
			// ESP_LOGI("iAC", "Start free fall %lld", esp_timer_get_time());
			for (int i = 0; i < 240; i += 40)
			{
				if (acceleration(STRENGTH) < 500)
				{
					lowStrengthContinue = true;
					vTaskDelay(40 / portTICK_RATE_MS);
				}
				else
				{
					lowStrengthContinue = false;
					break;
				}
			}
			// if (lowStrengthContinue) ESP_LOGI("iAC", "Stop free fall %lld", esp_timer_get_time());
			return lowStrengthContinue;
		}
		else
		{
			static bool startCalcLowStrengthContinue = false;
			static unsigned long xStartCalc;
			if (acceleration(STRENGTH) < 500)
			{
				if (!startCalcLowStrengthContinue)
				{
					xStartCalc = esp_timer_get_time();
					startCalcLowStrengthContinue = true;
					// ESP_LOGI("iAC", "Start free fall %lld", esp_timer_get_time());
				}
				else
				{
					if ((esp_timer_get_time() - xStartCalc) >= 220E3)
					{ // over 220 mS
						startCalcLowStrengthContinue = false;
						// ESP_LOGI("iAC", "End free fall - 2");
						return true;
					}
					else
					{
						// ESP_LOGI("iAC", "free fall %lld", esp_timer_get_time() - xStartCalc);
					}
				}
			}
			else
			{
				// ESP_LOGI("iAC", "End free fall - 1 %lld", esp_timer_get_time() - xStartCalc);
				xStartCalc = 0;
				startCalcLowStrengthContinue = false;
				return false;
			}
		}
	}

	case EVENT_3G:
		return acceleration(STRENGTH) > 3000;

	case EVENT_6G:
		return acceleration(STRENGTH) > 6000;

	case EVENT_8G:
		return acceleration(STRENGTH) > 8000;

	default:
		return false;
	}
}

int iac_mc3479::rotation(acc_meg_axis axis)
{
	double x_g_value = -accelerometer[0] / 1000.0; /* Acceleration in x-direction in g units */
	double y_g_value = accelerometer[1] / 1000.0; /* Acceleration in y-direction in g units */
	double z_g_value = accelerometer[2] / 1000.0; /* Acceleration in z-direction in g units */

	double roll = (((atan2(z_g_value, x_g_value) * 180) / 3.14) + 180);
	double pitch = (((atan2(y_g_value, z_g_value) * 180) / 3.14) + 180);

	roll = (roll >= 270) ? (270 - roll) : (roll >= 90) ? (fmod(90 - roll, -180) + 180) : -90 - roll;
	pitch = 180 - pitch;

	switch (axis)
	{
	case AXIS_PITCH:
		return pitch;

	case AXIS_ROLL:
		return roll;

	default:
		return 0.0;
	}
}

void iac_mc3479::accellerometer_range(float range)
{
	acc_range = range;

	uint8_t buff[2];

	// Set Full-scale selection
	buff[0] = 0x23;																						   // CTRL_REG4_A
	buff[1] = (0 << 7) | (0 << 6) | (ACCRANGR2FSMODE(acc_range) << 4) | (0 << 3) | (0b00 << 1) | (0 << 0); //  continuous update, data LSb at lower address,  Full-scale selection, Normal mode, self-test disabled, SPI 3-wire disabled

	i2c->write(channel, address, buff, 2);
}

void iac_mc3479::sram_write_byte(int addr, int data)
{
	if (addr < 0 || addr > 63)
	{
		return;
	}

	uint8_t buff[2] = {(uint8_t)(addr + 0x20), (uint8_t)data};
	i2c->write(0, 0x6F, buff, 2);
}

void iac_mc3479::sram_write_byte(int addr, void *data)
{
	if (!data)
		return;

	sram_write_byte(addr, (int)((uint8_t *)data)[0]);
}

int iac_mc3479::sram_read_byte(int addr)
{
	if (addr < 0 || addr > 63)
	{
		return 0;
	}

	uint8_t data;
	addr += 0x20;
	i2c->read(0, 0x6F, (uint8_t *)&addr, 1, (uint8_t *)&data, 1);

	return data;
}

void iac_mc3479::sram_write_word(int addr, int16_t data)
{
	if (addr < 0 || addr > 63)
	{
		return;
	}

	uint8_t buff[3] = {(uint8_t)(addr + 0x20)};
	memcpy(&buff[1], &data, 2);
	i2c->write(0, 0x6F, buff, 3);
}

void iac_mc3479::sram_write_word(int addr, void *data)
{
	if (!data)
		return;

	sram_write_word(addr, (int16_t)((int16_t *)data)[0]);
}

int16_t iac_mc3479::sram_read_word(int addr)
{
	if (addr < 0 || addr > 63)
	{
		return 0;
	}

	int16_t data;
	addr += 0x20;
	i2c->read(0, 0x6F, (uint8_t *)&addr, 1, (uint8_t *)&data, 2);

	return data;
}

void iac_mc3479::sram_write_dword(int addr, int32_t data)
{
	if (addr < 0 || addr > 63)
	{
		return;
	}

	addr += 0x20;
	uint8_t buff[5] = {(uint8_t)(addr)};
	memcpy(&buff[1], &data, 4);
	i2c->write(0, 0x6F, buff, 5);
}

void iac_mc3479::sram_write_dword(int addr, void *data)
{
	if (!data)
		return;

	sram_write_dword(addr, (int32_t)((int32_t *)data)[0]);
}

int32_t iac_mc3479::sram_read_dword(int addr)
{
	if (addr < 0 || addr > 63)
	{
		return 0;
	}

	int32_t data;
	addr += 0x20;
	i2c->read(0, 0x6F, (uint8_t *)&addr, 1, (uint8_t *)&data, 4);

	return data;
}

void iac_mc3479::sram_write_block(int addr, uint8_t *data, uint8_t size)
{
	if (addr < 0 || addr > 63)
	{
		return;
	}

	addr += 0x20;
	uint8_t buff[1 + size] = {(uint8_t)(addr)};
	memcpy(&buff[1], data, size);
	i2c->write(0, 0x6F, buff, 1 + size);
}

void iac_mc3479::sram_read_block(int addr, uint8_t *data, uint8_t size)
{
	if (addr < 0 || addr > 63)
	{
		return;
	}

	addr += 0x20;
	i2c->read(0, 0x6F, (uint8_t *)&addr, 1, data, size);
}

void iac_mc3479::eeprom_write_byte(int addr, int data)
{
	if (addr < 0 || addr > 127)
	{
		return;
	}

	uint8_t buff[2] = {(uint8_t)(addr), (uint8_t)data};
	i2c->write(0, 0x57, buff, 2);
	vTaskDelay(20 / portTICK_RATE_MS);
}

void iac_mc3479::eeprom_write_byte(int addr, void *data)
{
	if (!data)
		return;

	eeprom_write_byte(addr, (int)((uint8_t *)data)[0]);
}

int iac_mc3479::eeprom_read_byte(int addr)
{
	if (addr < 0 || addr > 127)
	{
		return 0;
	}

	uint8_t data;
	i2c->read(0, 0x57, (uint8_t *)&addr, 1, (uint8_t *)&data, 1);

	return data;
}

void iac_mc3479::eeprom_write_word(int addr, int16_t data)
{
	if (addr < 0 || addr > 127)
	{
		return;
	}

	uint8_t buff[3] = {(uint8_t)(addr)};
	memcpy(&buff[1], &data, 2);
	i2c->write(0, 0x57, buff, 3);
	vTaskDelay(20 / portTICK_RATE_MS);
}

void iac_mc3479::eeprom_write_word(int addr, void *data)
{
	if (!data)
		return;

	eeprom_write_word(addr, (int16_t)((int16_t *)data)[0]);
}

int16_t iac_mc3479::eeprom_read_word(int addr)
{
	if (addr < 0 || addr > 127)
	{
		return 0;
	}

	int16_t data;
	i2c->read(0, 0x57, (uint8_t *)&addr, 1, (uint8_t *)&data, 2);

	return data;
}

void iac_mc3479::eeprom_write_dword(int addr, int32_t data)
{
	if (addr < 0 || addr > 127)
	{
		return;
	}

	uint8_t buff[5] = {(uint8_t)(addr)};
	memcpy(&buff[1], &data, 4);
	i2c->write(0, 0x57, buff, 5);
	vTaskDelay(20 / portTICK_RATE_MS);
}

void iac_mc3479::eeprom_write_dword(int addr, void *data)
{
	if (!data)
		return;

	eeprom_write_dword(addr, (int32_t)((int32_t *)data)[0]);
}

int32_t iac_mc3479::eeprom_read_dword(int addr)
{
	if (addr < 0 || addr > 127)
	{
		return 0;
	}

	int32_t data;
	i2c->read(0, 0x57, (uint8_t *)&addr, 1, (uint8_t *)&data, 4);

	return data;
}

#endif