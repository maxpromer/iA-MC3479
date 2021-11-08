const iac_mc33479_BEGIN_WORD = 'DEV_I2C1.iac_mc3479(0, 0x6C)';

Blockly.JavaScript['iac_mc33479_on_gesture'] = function (block) {
	var dropdown_gesture = block.getFieldValue('gesture');
	var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
	var code = `${iac_mc33479_BEGIN_WORD}.on_gesture(${dropdown_gesture}, []() { ${statements_callback} });\n`;
	return code;
};


Blockly.JavaScript['iac_mc33479_acceleration'] = function (block) {
	var dropdown_axis = block.getFieldValue('axis');
	var code = `${iac_mc33479_BEGIN_WORD}.acceleration(${dropdown_axis})\n`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['iac_mc33479_compass_heading'] = function (block) {
	var code = `${iac_mc33479_BEGIN_WORD}.compass_heading(&ht16k33)`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['iac_mc33479_is_gesture'] = function (block) {
	var dropdown_gesture = block.getFieldValue('gesture');
	var code = `${iac_mc33479_BEGIN_WORD}.is_gesture(${dropdown_gesture})`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['iac_mc33479_rotation'] = function (block) {
	var dropdown_axis = block.getFieldValue('axis');
	var code = `${iac_mc33479_BEGIN_WORD}.rotation(${dropdown_axis})`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['iac_mc33479_set_accellerometer_range'] = function (block) {
	var dropdown_range = block.getFieldValue('range');
	var code = `${iac_mc33479_BEGIN_WORD}.accellerometer_range(${dropdown_range});\n`;
	return code;
};

Blockly.JavaScript['sram_write_byte'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.sram_write_byte(${value_address}, ${value_data});\n`;
	return code;
};

Blockly.JavaScript['sram_read_byte'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.sram_read_byte(${value_address})`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sram_write_word'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.sram_write_word(${value_address}, ${value_data});\n`;
	return code;
};

Blockly.JavaScript['sram_read_word'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.sram_read_word(${value_address})`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sram_write_dword'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.sram_write_dword(${value_address}, ${value_data});\n`;
	return code;
};

Blockly.JavaScript['sram_read_dword'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.sram_read_dword(${value_address})`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['eeprom_write_byte'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.eeprom_write_byte(${value_address}, ${value_data});\n`;
	return code;
};

Blockly.JavaScript['eeprom_read_byte'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.eeprom_read_byte(${value_address})`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['eeprom_write_word'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.eeprom_write_word(${value_address}, ${value_data});\n`;
	return code;
};

Blockly.JavaScript['eeprom_read_word'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.eeprom_read_word(${value_address})`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['eeprom_write_dword'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.eeprom_write_dword(${value_address}, ${value_data});\n`;
	return code;
};

Blockly.JavaScript['eeprom_read_dword'] = function (block) {
	var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC) || '0';
	var code = `${iac_mc33479_BEGIN_WORD}.eeprom_read_dword(${value_address})`;
	return [code, Blockly.JavaScript.ORDER_NONE];
};


