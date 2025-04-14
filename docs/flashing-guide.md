# Flashing Guide for DWM1001C Module

This guide covers the full process of flashing firmware onto the DWM1001C module using Raspberry Pi 4 and SEGGER J-Link tools.

## ⚙️ Requirements

- Raspberry Pi 4 (with Raspbian OS)
- DWM1001-DEV board (DWM1001C module onboard)
- Micro-USB cable
- SEGGER J-Link software installed
- Custom firmware `.hex` file (UART Shell enabled recommended!)
- Prepared flashing script: `flash.jlink`

## 🔌 Hardware Setup

- Power the DWM1001-DEV via USB (preferred) or 5V pin from Raspberry Pi.
- Connect the Pi UART:
  - Pi TX → Module RX
  - Pi RX → Module TX
  - Pi GND → Module GND
- Connect DWM1001-DEV via Micro-USB to the Raspberry Pi (for J-Link flashing).

## 📂 Files and Structure

Project files:
**/firmware/uart-shell-enabled.hex /scripts/flash.jlink**


## 📋 Flashing Steps

1. Open your terminal on Raspberry Pi.

2. Ensure your flashing script (`flash.jlink`) points to the correct firmware:
```jlink
device nrf52
speed 1000
if swd
r
loadfile /home/admin/Downloads/firmware/uart-shell-enabled.hex
r
g
exit
```

## Run the flashing command:
```
cd /path/to/your/project
JLinkExe -CommanderScript ./scripts/flash.jlink
```

**Observe output:** ✅ You should see messages indicating successful flashing, e.g.:

```
O.K.
J-Link> exit
```
***Power-cycle your module (disconnect/reconnect USB or 5V line).***

## Post-Flash Verification
Open UART monitoring:
```
sudo cat /dev/ttyS0
```
Perform a hardware reset:
```
sudo node -e "const rpio = require('rpio'); rpio.init({ mapping: 'physical' }); rpio.open(11, rpio.OUTPUT, rpio.HIGH); rpio.write(11, rpio.LOW); setTimeout(() => { rpio.write(11, rpio.HIGH); console.log('🔄 Manual reset pulse sent!'); }, 100);"
```
**Note**: In my case, I am using the rpio library in Node.js to control the GPIO pins (specifically GPIO11 for reset pulse).
If you are using a different library, such as serialPort or native GPIO tools, make sure to adjust the commands accordingly to trigger the hardware reset.
If you use a different GPIO control tool, the reset pulse timing and pin handling syntax will differ.

Check for boot logs or responses.

Send AT test command:
```
echo -e "AT\r" | sudo tee /dev/ttyS0
```

If successful, you should receive:
```
[00] 00
```