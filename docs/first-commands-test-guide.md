# ✅ DWM1001 First Test Guide (After Flashing Official Firmware)

After flashing `DWM1001_PANS_R2.0.hex` using a J-Link, use this guide to test that the module is alive and responsive over UART.

---

## 🧰 Requirements

- ✅ DWM1001-DEV module (already flashed)
- ✅ USB connection to power the board
- ✅ UART connection to a PC, Raspberry Pi, or USB-to-TTL adapter
- ✅ Terminal software (e.g., `screen`, `minicom`, `PuTTY`, or `picocom`)

---

## 🔌 UART Connection Info

| Setting   | Value         |
|-----------|---------------|
| Baudrate  | `115200`      |
| Data Bits | `8`           |
| Parity    | `None`        |
| Stop Bits | `1`           |
| Flow Ctrl | `None`        |

On Raspberry Pi (example device):
```bash
screen /dev/ttyS0 115200
```

On Linux PC with USB UART:
```bash
screen /dev/ttyUSB0 115200
```

You should see a shell prompt after pressing `Enter`:
```bash
dwm>
```

## 🧪 First Commands to Run
Once you see `dwm>`, try these commands:

### ✅ Check Firmware Version

```bash
dwm> vers
```
You should see something like:

```bash
dwm_ver: 1.3
cfg_ver: 1.3
firmware version info ok
```

### ✅ Get Current Configuration
```bash
dwm> si
```

Sample output:

```bash
device id: DECA1234
firmware version: 1.3
node role: anchor/tag
panid: 0xDECA
```

### ✅ Scan for Nearby Anchors
```bash
dwm> la
```

### ✅ Reboot the Module
```bash
dwm> reset
```
This reboots the device. Useful for checking startup stability.


## 📌 Notes
* You must press `Enter` once to "wake" the `UART` shell.

* If you don’t see anything, check your wiring and confirm UART TX/RX lines are correct.


## ✅ Summary

Once the module is flashed and connected via serial (115200 baud), you can test it using these commands:

| Command | Description                      |
|---------|----------------------------------|
| `vers`  | Get firmware version information |
| `si`    | Show internal configuration      |
| `la`    | List anchors in range            |
| `reset` | Reboot the module                |


Once these pass, your module is **flashed and working properly**. You can now configure it into tag or anchor mode.


**Author**: Marcio Pimentel  
**Last Updated**: April 2025