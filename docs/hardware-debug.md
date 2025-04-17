# 🧰 hardware-debug.md

## Full Breakdown: DWM1001, UART, SPI, Raspberry Pi, and Firmware Flashing Journey

---

### 📍 1. Initial Setup

We started with:
- ✅ Raspberry Pi 4 Model B Rev 1.5  
- ✅ DWM1001C module on the DWM1001-DEV board

The original goal was: **connect the Pi to the DWM1001 over UART** to send commands and receive data.  
After running into limitations with UART shell access in production firmware, we pivoted to **SPI-based communication** for faster and more robust control.

---

### 📍 2. Power & Communication Lines

#### 🔌 Current SPI Wiring

| Signal       | Pi Pin        | DWM1001 Pin | Color Used   | Notes                              |
|--------------|---------------|-------------|--------------|------------------------------------|
| **VCC**      | Pin 2 (5V)     | Pin 1       | 🔴 Red        | Module accepts 5V safely           |
| **GND**      | Pin 6          | Pin 2       | ⚫ Black      | Shared ground                      |
| **MOSI**     | Pin 19 (GPIO10)| Pin 24      | 🟡 Yellow     | Pi → DWM1001 (data out)            |
| **MISO**     | Pin 21 (GPIO9) | Pin 25      | 🟢 Green      | DWM1001 → Pi (data in)             |
| **SCLK**     | Pin 23 (GPIO11)| Pin 23      | 🟠 Orange     | SPI Clock signal                   |
| **CS (CE0)** | Pin 24 (GPIO8) | Pin 26      | 🟤 Brown      | Chip Select                        |
| **Reset**    | Pin 11 (GPIO17)| Reset       | Custom        | Optional reset line via GPIO       |

- ✅ SPI enabled via `raspi-config`
- ✅ `/dev/spidev0.0` is available
- ✅ Bluetooth re-enabled (for wireless keyboard)

---

### 📍 3. Firmware Flashing (Completed)

Using the official **PANS R2.0 firmware**, we flashed the DWM1001 with:

```bash
JLinkExe -CommanderScript flash.jlink

device nrf52
speed 1000
if swd
r
loadfile /path/to/DWM1001_PANS_R2.0.hex
r
g
exit
```
---

### ✅ Firmware Flashing Result

- ✅ Firmware successfully flashed  
- ✅ LEDs blinking — confirms module is alive and running PANS RTLS firmware

---

### 📍 4. UART Path (Paused)

We initially wired and tested UART using:

- TX/RX crossed correctly
- Reset pulse from GPIO17
- `cat /dev/ttyS0` and `echo -e "AT\r"` to test communication

🧠 UART commands were sent successfully, but:

- ❌ No response from the module  
- 📌 This is expected: **PANS RTLS firmware disables UART shell by default**

⏸️ **UART development paused in favor of SPI communication.**

---

### 📍 5. SPI Communication — Current Focus 🎯

We're now using the **TLV API over SPI**, as described in the `DWM1001-API-Guide.pdf`.

**Tools & Libraries:**

- `spi-device` Node.js library on Raspberry Pi
- TLV encoding (Type-Length-Value) for requests and responses

**Test Commands:**

- `dwm_ver_get`
- `dwm_pos_get`
- `dwm_cfg_get`

---

### 📍 6. Summary of Current Status

| Area                  | Status        |
|-----------------------|---------------|
| Power Wiring          | ✅ Done        |
| UART Testing          | ⏸️ Paused       |
| SPI Wiring            | ✅ Done        |
| SPI Interface Enabled | ✅ Done        |
| Bluetooth Keyboard    | ✅ Working     |
| Firmware Flashed      | ✅ Done        |
| SPI TLV Integration   | 🟢 Starting Now |

---

### 🚀 Next Steps

- [ ] Test SPI connection using Node.js  
- [ ] Send and log `dwm_ver_get` response  
- [ ] Build JS wrapper functions for TLV command flow  

---
