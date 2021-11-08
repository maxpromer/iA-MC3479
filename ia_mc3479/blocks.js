Blockly.Blocks['ia_mc33479_on_gesture'] = {
	init: function () {
		this.jsonInit({
			"type": "ia_mc33479_on_gesture",
			"message0": Blockly.Msg.IA_MC33479_ON_GESTURE_MESSAGE,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "gesture",
					"options": [
						[
							Blockly.Msg.IA_MC33479_GESTURE_SHAKE_MESSAGE,
							"EVENT_SHAKE"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_BOARD_UP_MESSAGE,
							"EVENT_BOARD_UP"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_BOARD_DOWN_MESSAGE,
							"EVENT_BOARD_DOWN"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_SCREEON_UP_MESSAGE,
							"EVENT_SCREEN_UP"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_SCREEON_DOWN_MESSAGE,
							"EVENT_SCREEN_DOWN"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_TILT_LEFT_MESSAGE,
							"EVENT_TILT_LEFT"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_TILT_RIGHT_MESSAGE,
							"EVENT_TILT_RIGHT"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_FREE_FALL_MESSAGE,
							"EVENT_FREE_FALL"
						],/*
						[
							Blockly.Msg.IA_MC33479_GESTURE_3G_MESSAGE,
							"EVENT_3G"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_6G_MESSAGE,
							"EVENT_6G"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_8G_MESSAGE,
							"EVENT_8G"
						]*/
					]
				},
				{
					"type": "input_dummy"
				},
				{
					"type": "input_statement",
					"name": "callback"
				}
			],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 230,
			"tooltip": Blockly.Msg.IA_MC33479_ON_GESTURE_TOOLTIP,
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['ia_mc33479_acceleration'] = {
	init: function () {
		this.jsonInit({
			"type": "ia_mc33479_acceleration",
			"message0": Blockly.Msg.IA_MC33479_ACCELERATION_MESSAGE,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "axis",
					"options": [
						[
							"x",
							"AXIS_X"
						],
						[
							"y",
							"AXIS_Y"
						],
						[
							"z",
							"AXIS_Z"
						],
						[
							"strength",
							"STRENGTH"
						]
					]
				}
			],
			"output": null,
			"colour": 230,
			"tooltip": Blockly.Msg.IA_MC33479_ACCELERATION_TOOLTIP,
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['ia_mc33479_is_gesture'] = {
	init: function () {
		this.jsonInit({
			"type": "ia_mc33479_is_gesture",
			"message0": Blockly.Msg.IA_MC33479_IS_GESTURE_MESSAGE,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "gesture",
					"options": [
						[
							Blockly.Msg.IA_MC33479_GESTURE_SHAKE_MESSAGE,
							"EVENT_SHAKE"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_BOARD_UP_MESSAGE,
							"EVENT_BOARD_UP"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_BOARD_DOWN_MESSAGE,
							"EVENT_BOARD_DOWN"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_SCREEON_UP_MESSAGE,
							"EVENT_SCREEN_UP"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_SCREEON_DOWN_MESSAGE,
							"EVENT_SCREEN_DOWN"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_TILT_LEFT_MESSAGE,
							"EVENT_TILT_LEFT"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_TILT_RIGHT_MESSAGE,
							"EVENT_TILT_RIGHT"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_FREE_FALL_MESSAGE,
							"EVENT_FREE_FALL"
						],/*
						[
							Blockly.Msg.IA_MC33479_GESTURE_3G_MESSAGE,
							"EVENT_3G"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_6G_MESSAGE,
							"EVENT_6G"
						],
						[
							Blockly.Msg.IA_MC33479_GESTURE_8G_MESSAGE,
							"EVENT_8G"
						]*/
					]
				}
			],
			"output": null,
			"colour": 230,
			"tooltip": "",
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['ia_mc33479_rotation'] = {
	init: function () {
		this.jsonInit({
			"type": "ia_mc33479_rotation",
			"message0": Blockly.Msg.IA_MC33479_ROTATION_MESSAGE,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "axis",
					"options": [
						[
							Blockly.Msg.IA_MC33479_PITCH_MESSAGE,
							"AXIS_PITCH"
						],
						[
							Blockly.Msg.IA_MC33479_ROLL_MESSAGE,
							"AXIS_ROLL"
						]
					]
				}
			],
			"output": null,
			"colour": 230,
			"tooltip": "",
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['ia_mc33479_set_accellerometer_range'] = {
	init: function () {
		this.jsonInit({
			"type": "ia_mc33479_set_accellerometer_range",
			"message0": Blockly.Msg.IA_MC33479_SET_ACCELLEROMETER_MESSAGE,
			"args0": [
				{
					"type": "field_dropdown",
					"name": "range",
					"options": [
						[
							"2g",
							"2"
						],
						[
							"4g",
							"4"
						],
						[
							"8g",
							"8"
						],
						[
							"12g",
							"12"
						],
						[
							"16g",
							"16"
						]
					]
				}
			],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 230,
			"tooltip": Blockly.Msg.IA_MC33479_SET_ACCELLEROMETER_TOOLTIP,
			"helpUrl": ""
		});
	}
};
/*
Blockly.Blocks['sram_write_byte'] = {
	init: function () {
		this.jsonInit({
			"type": "sram_write_byte",
			"message0": Blockly.Msg.IA_MC33479_SRAM_WRITE_BYTE_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				},
				{
					"type": "input_value",
					"name": "data"
				}
			],
			"inputsInline": true,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 300,
			"tooltip": Blockly.Msg.IA_MC33479_SRAM_WRITE_BYTE_TOOLTIP,
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['sram_read_byte'] = {
	init: function () {
		this.jsonInit({
			"type": "sram_read_byte",
			"message0": Blockly.Msg.IA_MC33479_SRAM_READ_BYTE_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				}
			],
			"inputsInline": true,
			"output": "Number",
			"colour": 300,
			"tooltip": Blockly.Msg.IA_MC33479_SRAM_READ_BYTE_TOOLTIP,
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['sram_write_word'] = {
	init: function () {
		this.jsonInit({
			"type": "sram_write_word",
			"message0": Blockly.Msg.IA_MC33479_SRAM_WRITE_WORD_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				},
				{
					"type": "input_value",
					"name": "data"
				}
			],
			"inputsInline": true,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 300,
			"tooltip": Blockly.Msg.IA_MC33479_SRAM_WRITE_WORD_TOOLTIP,
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['sram_read_word'] = {
	init: function () {
		this.jsonInit({
			"type": "sram_read_word",
			"message0": Blockly.Msg.IA_MC33479_SRAM_READ_WORD_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				}
			],
			"inputsInline": true,
			"output": "Number",
			"colour": 300,
			"tooltip": Blockly.Msg.IA_MC33479_SRAM_READ_WORD_TOOLTIP,
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['sram_write_dword'] = {
	init: function () {
		this.jsonInit({
			"type": "sram_write_dword",
			"message0": Blockly.Msg.IA_MC33479_SRAM_WRITE_DWORD_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				},
				{
					"type": "input_value",
					"name": "data"
				}
			],
			"inputsInline": true,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 300,
			"tooltip": Blockly.Msg.IA_MC33479_SRAM_WRITE_DWORD_TOOLTIP,
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['sram_read_dword'] = {
	init: function () {
		this.jsonInit({
			"type": "sram_read_dword",
			"message0": Blockly.Msg.IA_MC33479_SRAM_READ_DWORD_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				}
			],
			"inputsInline": true,
			"output": "Number",
			"colour": 300,
			"tooltip": Blockly.Msg.IA_MC33479_SRAM_READ_DWORD_TOOLTIP,
			"helpUrl": ""
		});
	}
};*/

Blockly.Blocks['eeprom_write_byte'] = {
	init: function () {
		this.jsonInit({
			"type": "eeprom_write_byte",
			"message0": Blockly.Msg.IA_MC33479_EEPROM_WRITE_BYTE_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				},
				{
					"type": "input_value",
					"name": "data"
				}
			],
			"inputsInline": true,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 300,
			"tooltip": Blockly.Msg.IA_MC33479_EEPROM_WRITE_BYTE_TOOLTIP,
			"helpUrl": ""
		});
	},
	xmlToolbox: function() {
		return `
		<block type="eeprom_write_byte">
		  	<value name="address">
				<shadow type="math_number">
					<field name="VALUE">0</field>
				</shadow>
			</value>
			<value name="data">
				<shadow type="math_number">
					<field name="VALUE">0</field>
				</shadow>
			</value>
		</block>
		`;
	}
};

Blockly.Blocks['eeprom_read_byte'] = {
	init: function () {
		this.jsonInit({
			"type": "eeprom_read_byte",
			"message0": Blockly.Msg.IA_MC33479_EEPROM_READ_BYTE_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				}
			],
			"inputsInline": true,
			"output": "Number",
			"colour": 300,
			"tooltip": Blockly.Msg.IA_MC33479_EEPROM_READ_BYTE_TOOLTIP,
			"helpUrl": ""
		});
	},
	xmlToolbox: function() {
		return `
		<block type="eeprom_read_byte">
		  	<value name="address">
				<shadow type="math_number">
					<field name="VALUE">0</field>
				</shadow>
			</value>
		</block>
		`;
	}
};

Blockly.Blocks['eeprom_write_word'] = {
	init: function () {
		this.jsonInit({
			"type": "eeprom_write_word",
			"message0": Blockly.Msg.IA_MC33479_EEPROM_WRITE_WORD_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				},
				{
					"type": "input_value",
					"name": "data"
				}
			],
			"inputsInline": true,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 180,
			"tooltip": Blockly.Msg.IA_MC33479_EEPROM_WRITE_WORD_TOOLTIP,
			"helpUrl": ""
		});
	},
	xmlToolbox: function() {
		return `
		<block type="eeprom_write_word">
		  	<value name="address">
				<shadow type="math_number">
					<field name="VALUE">0</field>
				</shadow>
			</value>
			<value name="data">
				<shadow type="math_number">
					<field name="VALUE">0</field>
				</shadow>
			</value>
		</block>
		`;
	}
};

Blockly.Blocks['eeprom_read_word'] = {
	init: function () {
		this.jsonInit({
			"type": "eeprom_read_word",
			"message0": Blockly.Msg.IA_MC33479_EEPROM_READ_WORD_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				}
			],
			"inputsInline": true,
			"output": "Number",
			"colour": 180,
			"tooltip": Blockly.Msg.IA_MC33479_EEPROM_READ_WORD_TOOLTIP,
			"helpUrl": ""
		});
	},
	xmlToolbox: function() {
		return `
		<block type="eeprom_read_word">
		  	<value name="address">
				<shadow type="math_number">
					<field name="VALUE">0</field>
				</shadow>
			</value>
		</block>
		`;
	}
};

Blockly.Blocks['eeprom_write_dword'] = {
	init: function () {
		this.jsonInit({
			"type": "eeprom_write_dword",
			"message0": Blockly.Msg.IA_MC33479_EEPROM_WRITE_DWORD_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				},
				{
					"type": "input_value",
					"name": "data"
				}
			],
			"inputsInline": true,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 135,
			"tooltip": Blockly.Msg.IA_MC33479_EEPROM_WRITE_DWORD_TOOLTIP,
			"helpUrl": ""
		});
	},
	xmlToolbox: function() {
		return `
		<block type="eeprom_write_dword">
		  	<value name="address">
				<shadow type="math_number">
					<field name="VALUE">0</field>
				</shadow>
			</value>
			<value name="data">
				<shadow type="math_number">
					<field name="VALUE">0</field>
				</shadow>
			</value>
		</block>
		`;
	}
};

Blockly.Blocks['eeprom_read_dword'] = {
	init: function () {
		this.jsonInit({
			"type": "eeprom_read_dword",
			"message0": Blockly.Msg.IA_MC33479_EEPROM_READ_DWORD_MESSAGE,
			"args0": [
				{
					"type": "input_value",
					"name": "address",
					"check": "Number"
				}
			],
			"inputsInline": true,
			"output": "Number",
			"colour": 135,
			"tooltip": Blockly.Msg.IA_MC33479_EEPROM_READ_DWORD_TOOLTIP,
			"helpUrl": ""
		});
	},
	xmlToolbox: function() {
		return `
		<block type="eeprom_read_dword">
		  	<value name="address">
				<shadow type="math_number">
					<field name="VALUE">0</field>
				</shadow>
			</value>
		</block>
		`;
	}
};
