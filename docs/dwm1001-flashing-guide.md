# DWM1001 Firmware Compilation & HEX Generation Guide (Linux/Debian)

This guide explains how to compile firmware for the DWM1001 module and generate a final `.hex` file using a Raspberry Pi running Debian.

---

## 🧰 Setup Environment

Install the necessary tools:

```sql
sudo apt update
sudo apt install binutils srecord
```

**binutils**: Provides `objcopy`, used to convert .bin files to `.hex`

**srecord**: Provides `srec_cat`, used to merge multiple `.hex` files

✅ ***Summary***

**binutils**: Contains `arm-none-eabi-objcopy` — converts .`bin` to `.hex` (Intel HEX format)

**srecord**: Contains `srec_cat` — merges HEX files like `mergehex.exe` on Windows


## 📁 Recommended Folder Structure
Create a base directory for all firmware-related files:

```bash
mkdir -p ~/projects/dwm1001-firmware
cd ~/projects/dwm1001-firmware
```
Place the unzipped SDK content here to keep your workspace organized and separate from other projects.

## 📦 Unpack the DWM1001 On-Board Package
Unzip the official Decawave package:

```bash
unzip DWM1001_on_board_package_R2.0.zip -d ~/projects/dwm1001-firmware
cd ~/projects/dwm1001-firmware
```
Expected folder structure:
```
dwm1001-firmware/
├── examples/
│   └── dwm-simple/
├── recovery/
│   ├── bootloader_s132.bin
│   ├── dwm-core_fw1.bin
│   └── s132_nrf52_3.0.0_softdevice.hex
└── utilities/
```

## 🛠️ Build the Example Firmware (dwm-simple)
Launch SEGGER Embedded Studio (if installed):

```bash
cd ~/segger_embedded_studio_*/bin
./emStudio &
```

* 1 - Open the dwm-simple project inside ~/projects/dwm1001-firmware/examples/ dwm-simple/
* 2 - Build the project
* 3 - Confirm that the binary output is generated at:

```bash
~/projects/dwm1001-firmware/examples/dwm-simple/Output/linker/dwm-simple_fw2.bin
```

## ⚙️ Convert & Merge Firmware Files
Run the following in the `utilities` folder:

```bash
cd ~/projects/dwm1001-firmware/utilities

# Convert .bin to .hex with address offsets
arm-none-eabi-objcopy -I binary ../recovery/bootloader_s132.bin -O ihex bl.hex --change-addresses 0x1f000
arm-none-eabi-objcopy -I binary ../recovery/dwm-core_fw1.bin -O ihex fw1.hex --change-addresses 0x22000
arm-none-eabi-objcopy -I binary ../examples/dwm-simple/Output/linker/dwm-simple_fw2.bin -O ihex fw2.hex --change-addresses 0x44000

# Merge softdevice, fw1, and fw2
srec_cat \
  ../recovery/s132_nrf52_3.0.0_softdevice.hex -Intel \
  fw1.hex -Intel \
  fw2.hex -Intel \
  -o argo-out0.hex -Intel

# Merge bootloader with the above result
srec_cat \
  bl.hex -Intel \
  argo-out0.hex -Intel \
  -o dwm1001_dwm-simple.hex -Intel
  ```

## 🧹 Cleanup Temporary Files (Optional)

```bash
rm bl.hex fw1.hex fw2.hex argo-out0.hex
```

## ✅ Final Output
Your final firmware file will be located at:
```bash
~/projects/dwm1001-firmware/utilities/dwm1001_dwm-simple.hex
```

## 📌 Notes
* Ensure that SEGGER Embedded Studio is properly configured for Nordic devices.
* You must build the example in SEGGER before converting and merging.
* You can automate these steps using a shell script if needed.

