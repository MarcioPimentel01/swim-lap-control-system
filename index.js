const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// Create serial port
const port = new SerialPort({
  path: '/dev/ttyACM0',
  baudRate: 115200,
});

// Create parser to read lines
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// When port is open
port.on('open', () => {
  console.log('Serial port opened');

  // Try to wake up the module
  port.write('\r\n', (err) => {
    if (err) {
      return console.log('Error writing to port:', err.message);
    }
    console.log('Wake-up command sent');

    // Send network management command
    port.write('nmg\r\n');
  });
}); // <-- ✅ This was missing!

// When data comes in
parser.on('data', (line) => {
  console.log('Received:', line);
});

// Handle errors
port.on('error', (err) => {
  console.log('Error:', err.message);
});
