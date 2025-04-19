# 🛠️ Personal Firmware Projects for DWM1001

This folder contains custom firmware built on top of the official PANS SDK by Decawave/Qorvo. These projects are tailored for the Swim Lap Control System and are designed to extend or enhance the behavior of the DWM1001-DEV modules.

---

## 📁 Project Structure

```
personal-firmware/ ├── swimlab-anchor/ ← Firmware that configures a DWM1001 as a UWB anchor ├── swimlab-tag/ ← Firmware that configures a DWM1001 as a UWB tag └── README.md ← This file
```


---

## 🔧 Build Requirements

- [SEGGER Embedded Studio](https://www.segger.com/products/development-tools/embedded-studio/)
- ARM GCC toolchain (comes with SEGGER)
- `libdwm.a` from the official PANS SDK (used as a precompiled library)

> Note: These projects are linked against the SDK located at `../official-decawave-sdk/`.  
Make sure that SDK structure is preserved when building.

---

## 🚀 Quick Start

1. Open SEGGER Embedded Studio
2. Import the `.emProject` file from either `swimlab-tag/` or `swimlab-anchor/`
3. Build and flash to a DWM1001-DEV module using the onboard debugger
4. Use UART to monitor output (115200 baud, 8N1)

---

## 🧠 Notes

- BLE is enabled by default in all firmware to support future app integrations
- Each node configures its role (tag/anchor) on startup using `dwm_cfg_*_set()`
- `dwm_loc_get()` is used to retrieve distances to other nodes

---

## 📌 Todo

- [ ] Add LED state indicators
- [ ] Add SPI interface handler for hub data collection
- [ ] Store configuration in NVM
- [ ] Add inter-node messaging via position spoofing

---

## 📚 References

- [Official PANS API Guide (PDF)](https://www.qorvo.com/products/p/DWM1001)
- [DWM1001 Firmware Examples](https://github.com/Decawave/dwm1001-examples)

---

> Maintained by Marcio Pimentel for the Swim Lap Control System Project.
