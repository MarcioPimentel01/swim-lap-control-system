// Required libraries
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const rpio = require('rpio');

// Set pin mapping to physical
rpio.init({ mapping: 'physical' });

// Define constants
const resetPin = 11; // Pi physical pin 11 = GPIO17

// Open the reset pin
rpio.open(resetPin, rpio.OUTPUT, rpio.HIGH); // Start high (inactive)

// Main function
function hardwareReset() {
  console.log('🔄 Resetting module...');
  rpio.write(resetPin, rpio.LOW);

  setTimeout(() => {
    rpio.write(resetPin, rpio.HIGH);
    console.log('✅ Reset pulse complete, continuing with serial communication...');
    initializeSerialCommunication();
  }, 100); // Hold reset low for 100 ms
}

// Initialize UART communication
function initializeSerialCommunication() {
  console.log('⏳ Initializing serial communication...');

  const port = new SerialPort({
    path: '/dev/ttyACM0', // Using Pi GPIO UART
    baudRate: 115200,
  });

  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

  port.on('open', () => {
    console.log('✅ Serial port opened');

    port.flush((err) => {
      if (err) {
        console.error('❌ Error flushing port:', err.message);
        return;
      }
      console.log('🧹 Serial port flushed');

      // Important: Longer delay to let module boot up
      setTimeout(() => {
        sendGetFirmwareCommand(port);
      }, 3000); // Wait 3 seconds after reset
    });
  });

  port.on('data', (data) => {
    console.log('📥 Serial Data (hex):', data.toString('hex'));
    console.log('📥 Serial Data (ascii):', data.toString('ascii').trim());
  });

  parser.on('data', (data) => {
    console.log('📥 Parser Data (text):', data.trim());
  });

  port.on('error', (err) => {
    console.error('❌ Serial port error:', err.message);
  });
}

// Send firmware version command
function sendGetFirmwareCommand(port) {
  const GET_FIRMWARE_VERSION_COMMAND = Buffer.from([0x0D, 0x00]);

  port.write(GET_FIRMWARE_VERSION_COMMAND, (err) => {
    if (err) {
      console.error('❌ Error sending command:', err.message);
      return;
    }
    console.log('🚀 Get firmware version command sent');
  });
}

// Start process
hardwareReset();
