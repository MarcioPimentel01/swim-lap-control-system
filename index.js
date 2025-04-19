const spi = require('spi-device');

const device = spi.open(0, 0, err => {
    if (err) {
    console.error('Error opening SPI device:', err);
    return;
    }

    console.log('✅ SPI device opened');

  // Step 1: Send TLV command (dwm_ver_get)
    const txCmd = Buffer.from([0x0D, 0x00]);
    const rxCmd = Buffer.alloc(txCmd.length);

    const messageCmd = [{
    sendBuffer: txCmd,
    receiveBuffer: rxCmd,
    byteLength: txCmd.length,
    speedHz: 1000000
    }];

    device.transfer(messageCmd, (err) => {
    if (err) return console.error('SPI command error:', err);

    console.log('📤 Command sent, waiting for response...');

    // Step 2: Read SIZE/NUM
    const dummyPoll = Buffer.from([0xFF, 0xFF]); // 2-byte dummy read
    const rxPoll = Buffer.alloc(2);

    const messagePoll = [{
        sendBuffer: dummyPoll,
        receiveBuffer: rxPoll,
        byteLength: 2,
        speedHz: 1000000
    }];

    setTimeout(() => {
        device.transfer(messagePoll, (err) => {
        if (err) return console.error('SPI poll error:', err);

        const size = rxPoll[0];
        const num = rxPoll[1];

        console.log(`📏 Response Size: ${size}, Num: ${num}`);
        if (size === 0) {
            console.warn('⚠️ Response not ready yet (0x00 0x00)');
            return;
        }

        // Step 3: Read actual response
        const dummyData = Buffer.alloc(size, 0xFF);
        const rxData = Buffer.alloc(size);

        const messageData = [{
            sendBuffer: dummyData,
            receiveBuffer: rxData,
            byteLength: size,
            speedHz: 1000000
        }];

        device.transfer(messageData, (err) => {
            if (err) return console.error('SPI read error:', err);

            console.log('📥 Final Response Buffer:', rxData);
            console.log('🔍 Hex:', rxData.toString('hex'));
            console.log('🔡 ASCII:', rxData.toString('ascii'));
        });
    });
    }, 10); // Small delay before polling
    });
});
