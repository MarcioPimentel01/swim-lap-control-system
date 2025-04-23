# 🏊‍♂️ Swim Lap Tracker – Documentation Index

Welcome to the Swim Lap Tracker project! This system uses **UWB technology** powered by DWM1001 modules and a Raspberry Pi to track lap performance in real-time.

---

## 📦 Project Overview

- [PANS Stack Overview](./pans-stack-overview.md)  
  Learn how the DWM1001 firmware stack works, what PANS provides, and how to interface with it via SPI or UART.

- [Project Roadmap](./roadmap.md)  
  Follow along the development process and feature goals for this MVP.

---

## 🔧 Firmware & Flashing Guides

- [DWM1001 Flashing Guide (J-Link + PANS)](./dwm1001-flashing-guide.md)  
  Flash the official factory firmware using J-Flash Lite and a SEGGER J-Link device.

- [Building & Merging .hex Files (Optional)](./dwm1001-hex-build-guide.md)  
  For custom firmware builders — compile and merge hex binaries from source.

---

## 🧪 Module Setup & Testing

- [First Commands Test Guide](./first-commands-test-guide.md)  
  Run `vers`, `si`, `reset`, and other basic TLV tests after flashing.

- [Hardware Debug (SPI Mode)](./hardware-debug-spi-mode.md)  
  Full guide to SPI wiring, firmware result, and testing via Node.js.

- [Hardware Debug (UART Mode)](./hardware-debug-uart-mode.md)  
  Learn why UART is paused and what it takes to re-enable shell access.

---

## 💡 Notes

- This documentation is optimized for **developer onboarding** and **portfolio display**
- All hardware was manually tested using real DWM1001 modules and Raspberry Pi 4
- Author: Marcio Pimentel | Last Updated: April 2025

