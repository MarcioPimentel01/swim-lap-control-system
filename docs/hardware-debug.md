# hardware-debug.md

## Full Breakdown: DWM1001, UART, Raspberry Pi, and Firmware Flashing Debugging Journey

### 📍 1. Initial Setup

We started with:
- ✅ Raspberry Pi 4 Model B Rev 1.5
- ✅ DWM1001C module on the DWM1001-DEV board

The goal was: **connect the Pi to the DWM1001 over UART to send commands and receive data.**

**Challenge:**  
The DWM1001C comes from the factory **blank** — no firmware.

This means:
- Board powers up ✅
- But the microcontroller inside has no instructions ("brain") to operate ❌

Without firmware, it cannot:
- Respond to UART
- Light up status LEDs properly
- Perform UWB positioning

So, the mission was something I had never done before: **install the firmware to "wake up" the board.**

---

### 📍 2. Power & Communication Lines

The Pi was providing:
- ✅ Power (5V from Pi or USB) — I tested both.
- ✅ Data lines:
  - TX → Module RX
  - RX → Module TX
  - GND common

We confirmed:
- The wiring was perfect.
- The Pi UART was configured (`/dev/ttyS0` active).
- We tested with `cat /dev/ttyS0` — clean, no kernel errors.
- Reset pulse from Pi **GPIO pin 11** works (`rpio` version ^2.4.2).

**Conclusion:** ✅ Hardware link Pi ⇄ Module is good.

---

### 📍 3. Debugging UART Detection

At first, I didn’t see any data:
- Normal — the module was empty (factory blank).

So, I checked:
- Raspberry Pi UART enabled ✅
- Power is stable ✅
- RX/TX wiring is crossed properly ✅
- Reset pulse confirmed ✅

**Result:** No data yet, because **no firmware installed**.

---

### 📍 4. Flashing Firmware (Critical Moment)

Following `DWM1001-Firmware-User-Guide.pdf`, I successfully installed:
- SEGGER J-Link tools on Raspberry Pi
- Connected DWM1001-DEV via Micro-USB (the board has onboard J-Link debugger)

The following script was prepared:

```jlink
device nrf52
speed 1000
if swd
r
loadfile /home/admin/Downloads/DWM1001_DWM1001-DEV_MDEK1001_Sources_and_Docs_v11/DWM1001/Factory_Firmware_Image/DWM1001_PANS_R2.0.hex
r
g
exit
```

**Explanation:**

**device nrf52,** because the DWM1001C module has nRF52832 microcontroller inside.

**speed 1000**
➡️ What it does:
This sets the speed of the SWD (Serial Wire Debug) interface to 1000 kHz = 1 MHz.

SWD is how J-Link talks to the microcontroller.

1000 kHz is a safe, fast speed. Reliable for stable flashing.

**if swd**
➡️ What it does:

This tells J-Link:

"Use SWD (Serial Wire Debug) interface, not JTAG."

SWD = simpler, 2-wire protocol for programming/debugging ARM Cortex-M chips.

Your module supports SWD, not full JTAG.

✅ Result:
Ensures correct physical connection type is used.

**r**
➡️ What it does:

This sends a reset command to the target device before flashing.

✅ Result:
Makes sure the microcontroller is in a clean, ready-to-flash state.

Think of this like: "Hey module, clear your memory and get ready."

**loadfile**
➡️ What it does:

Just point to the ***.hex*** file, provided by the Qorvo
/home/admin/Downloads/DWM1001_DWM1001-DEV_MDEK1001_Sources_and_Docs_v11/DWM1001/Factory_Firmware_Image/DWM1001_PANS_R2.0.hex

✅ Result:
The program reads your .hex file and writes it to the microcontroller’s flash memory.

HEX file: is a standard format for flashing microcontrollers.
It contains the machine code instructions (compiled firmware) the MCU will run.

Finnaly **r** again to reset and but the module and **g** to "go" begins to execute the new firmware instructions.

**Finally**

Run:
```bash
JLinkExe -CommanderScript flash.jlink
```

✅ Result: **SUCCESSFUL flashing** of DWM1001 PANS firmware.

At this point:
- The microcontroller received instructions ("brain installed").
- LEDs started blinking, indicating life.
- Module began running **PANS mode** (Real-Time Location System — RTLS),.

**BUT:**
PANS mode is designed for production deployments.
It:
- ⚠️ Disables UART Shell by default.
- Expects to communicate over UWB with other anchors/tags.
- Waits for UWB radio network setup.
- Does **not** listen to UART commands out of the box.

---

### 📍 **5. Debugging Post-Flash Behavior**

After flashing:
- I tried `sudo cat /dev/ttyS0` ✅ (correct)
- Also tried sending `"AT\r"` ✅ (correct)
- UART was alive, commands sent, but no response.

What we proved:
- The commands are reaching the module (because the Pi "echoed" them back).
- Module is not replying, because it’s not in **Shell mode**.

This led me to conclude:
- The module firmware is **working**, but it’s in **production mode**.
- Production mode does not expose UART shell by default.

---

### 📍 **6. Solution Path Identified**

Next step:
➡️ **Re-flash with firmware build that has UART Shell enabled.**

This will:
- Enable the **interactive command line over UART.**
- Let me send commands like:
```bash
echo -e "AT\r" | sudo tee /dev/ttyS0
```
And receive:
```
[00] 00
```

- Let you configure the module:
  - Set device role (anchor, tag)
  - Query status
  - Get firmware version
  - Start UWB services
  - And later, build advanced control scripts!

---

## 🚀 Lessons Mastered

✅ **Understanding bootloader and firmware flashing**
- I learned that microcontrollers ship blank or with factory firmware.
- Flashing writes operational software into non-volatile memory.

✅ **UART communication flow**
- UART = universal asynchronous receiver transmitter.
- TX/RX crossed wiring.
- UART Shell is like a "terminal" for microcontrollers.
- "AT" is a basic attention command (used since old modems).

✅ **Firmware roles:**
- **PANS RTLS mode:** positioning, anchors, tags (default factory behavior).
- **Shell mode:** development/debug, UART API enabled.

✅ **Using professional tools**
- SEGGER J-Link + Commander ✅
- `cat /dev/ttyS0` ✅
- Reset line control ✅

✅ **Full flashing pipeline**
- Download official firmware
- Prepare command script
- Flash and verify
- Observe system LED codes

✅ **Hardware-level debugging**
- LED activity analysis
- Pin state control (reset)
- Communication tests (UART RX/TX, power)

---

## 🧩 Where I stand now:

| Stage | Status |
|-------|---------|
| Hardware setup | ✅ Perfect |
| UART wiring | ✅ Perfect |
| Raspberry Pi UART setup | ✅ Ready |
| Firmware flashed (PANS prod) | ✅ Done |
| Module alive, booting | ✅ LEDs confirm |
| UART shell access | ❌ Not yet (next step with new firmware) |
| Ready for AT commands | ⏳ Almost! |
| Next: Flash UART-enabled firmware | 🟢 IN PROGRESS (preparing for you!) |

---




