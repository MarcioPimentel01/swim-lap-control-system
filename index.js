const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// Adjust your serial path
const port = new SerialPort({
  path: '/dev/ttyACM0',
  baudRate: 115200,
});

// Optional: parser for line-based response (depends on module behavior)
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

port.on('open', () => {
  console.log('✅ Serial port opened');

  // Step 1: Wake up module
  const wakeUpByte = Buffer.from([0xFF]);
  port.write(wakeUpByte, (err) => {
    if (err) {
      return console.error('❌ Error sending wake-up byte:', err.message);
    }
    console.log('💡 Wake-up byte sent');

    // Wait a bit for module to be fully awake
    setTimeout(sendGetFirmwareCommand, 1000); // 1000ms delay
  });
});

function sendGetFirmwareCommand() {
  // ✅ Update: Add the correct TLV frame (command + payload length)
  const GET_FIRMWARE_VERSION_COMMAND = Buffer.from([0x0D, 0x00]);

  port.write(GET_FIRMWARE_VERSION_COMMAND, (err) => {
    if (err) {
      return console.error('❌ Error sending command:', err.message);
    }
    console.log('🚀 Get firmware version command sent');
  });
}

// Step 3: Read incoming data
parser.on('data', (data) => {
  console.log('📥 Data received (text):', data);
});

// ✅ Update: Add raw hex data logging
port.on('data', (data) => {
  console.log('📥 Raw Data (hex):', data.toString('hex'));
});

port.on('error', (err) => {
  console.error('❌ Serial port error:', err.message);
});
