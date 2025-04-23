# ✅ DWM1001 Flashing Guide — Factory Firmware (With or Without J-Link)

This guide shows how to **restore the official Decawave firmware** to the DWM1001 module using either:

- A **J-Link programmer** (recommended)
- A **compiled image + Raspberry Pi** (advanced users only)

> ⚠️ If you're just getting started, **use a J-Link**. It's the most reliable way to flash without building or debugging anything.

---

## 🧰 Option 1 — Using J-Link (RECOMMENDED)

This is the cleanest method using a verified `.hex` file from the official SDK.

### Requirements

- ✅ SEGGER J-Link (e.g., EDU Mini, Base, etc.)
- ✅ `DWM1001_PANS_R2.0.hex` from:
  - `~/DWM1001/Factory_Firmware_Image/DWM1001_PANS_R2.0.hex`
- ✅ SEGGER J-Flash Lite tool (GUI)
- ❌ Raspberry Pi **not required**

### Hardware Setup

1. Plug the J-Link into your PC.
2. Connect it to the **SWD port** on the DWM1001-DEV board.
3. Power the board via USB or regulated 3.3V/5V.

### Flash Steps

1. Install [SEGGER J-Flash Lite](https://www.segger.com/downloads/jlink/)
2. Open the tool and:
   - **Device**: `nRF52832_xxAA`
   - **Interface**: `SWD`
   - **Speed**: leave default (e.g., 4000 kHz)
   - **Target File**: `DWM1001_PANS_R2.0.hex`
3. Click **Program Device**

✅ After programming, your module will reboot into the official firmware.

---

## 🧰 Option 2 — Using Raspberry Pi (Advanced Manual Method)

This method requires:

- Linux tools: `binutils`, `srecord`
- SEGGER Embedded Studio (for firmware compilation)
- Access to original `.bin` files and Decawave SDK
- Manual merging of:
  - SoftDevice
  - Bootloader
  - Firmware Core (`fw1`)
  - Application Firmware (`fw2`)

⚠️ It is **not possible** to flash `.hex` files via USB alone without a programmer. UART/USB cannot write to flash directly.

This method is only for users building their **own firmware** and debugging at a deep level.

---

## 🧪 What’s Inside the Official `.hex` File?

- ✅ `SoftDevice` — Bluetooth stack
- ✅ `Bootloader`
- ✅ `Firmware Core` (`fw1`)
- ✅ `User App` (`fw2`)
- ✅ Shell Interface over UART (at `115200 baud`)

After flashing, the module boots ready to use with PANS commands.

---

## 🧼 Summary

| Option      | Needs J-Link? | Custom Build? | Recommended For              |
|-------------|---------------|----------------|-------------------------------|
| Option 1    | ✅ Yes         | ❌ No           | Beginners & Fast Setup        |
| Option 2    | ❌ No          | ✅ Yes          | Developers writing their own firmware |

---

## 📌 Notes

- If you **don't have a J-Link**, you'll be limited to reading data over UART — not flashing.
- We strongly recommend buying a low-cost [J-Link EDU Mini](https://www.digikey.com/en/products/detail/segger-microcontroller-systems/8-08-91/7387472) for all flashing/debugging needs.

---

**Author**: Marcio Pimentel  
**Last Updated**: April 2025
