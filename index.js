const spi = require('spi-device');

const txBuffer = Buffer.from([0x0D, 0x0D]);
const rxBuffer = Buffer.alloc(64);

const message = [{
    sendBuffer: txBuffer,
    receiveBuffer: rxBuffer,
    byteLength: txBuffer.length,
    speedHz: 1000000
}];

const device = spi.open(0, 0, err => {
    if (err) {
        console.log('Error opening SPI device:', err);
        return;
    }

    console.log('✅ SPI device opened');

    device.transfer(message, (err, message) => {
        if (err) {
            console.log('SPI transfer error:', err);
            return;
        }

        console.log('📥 Buffer Received:', rxBuffer);
        console.log('🔍 Hex:', rxBuffer.toString('hex'));
        console.log('🔡 ASCII:', rxBuffer.toString('ascii'));
    });
});


