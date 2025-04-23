## 📍 UART Debug Attempts (Historical)

### 🛠️ Goal

Initial goal: use **UART** to communicate with the DWM1001 module via the **Shell API**, which allows commands like `vers`, `si`, `la`, and `reset`.

---

### 🧰 UART Wiring (Raspberry Pi ↔ DWM1001-DEV)

| Signal     | Pi Pin        | DWM1001 Pin | Notes                            |
|------------|---------------|-------------|----------------------------------|
| **TX**     | GPIO14 (Pin 8) | Pin 22      | Pi → DWM1001 (connects to RX)    |
| **RX**     | GPIO15 (Pin 10)| Pin 21      | DWM1001 → Pi (connects to TX)    |
| **GND**    | Pin 6          | Pin 2       | Shared ground                    |
| **Reset**  | GPIO17 (Pin 11)| Pin 18      | Optional GPIO reset pin          |

✅ UART was enabled using:
```bash
sudo nano /boot/firmware/config.txt
# Add:
enable_uart=1
dtoverlay=disable-bt
```

### 🧪 UART Device & Test Commands

**Expected UART device:**
- `/dev/serial0` or `/dev/ttyS0`

**Basic test commands:**
```bash
echo -e "vers\r" > /dev/serial0
cat /dev/serial0
```

***Interactive shell test:***
```bash
screen /dev/serial0 115200
```
## ❌ Observed Behavior

- ✅ **TX and RX** were correctly wired  
- ✅ **Reset pin** pulsed via GPIO  
- ✅ **Baud rate** confirmed: `115200`  
- ❌ **No response** from the module  
- ❓ Verified voltage compatibility — **DWM1001-DEV handles 5V UART safely**

---

## 📌 Diagnosis

The official **PANS R2.0 firmware disables UART Shell access** by default.

- UART is used for **binary protocol communication only**
- The **command-line shell interface is unavailable**
- This behavior is **intentional** and documented in Decawave materials

⚠️ To restore shell access, you must flash a **custom firmware** with the shell re-enabled  
(e.g., a modified version of `dwm-simple`)

---

## 🧭 Current Status

| Area                | Status                        |
|---------------------|-------------------------------|
| Wiring              | ✅ Done                        |
| UART Tests          | ✅ Done                        |
| Command Responses   | ❌ Failed                      |
| UART Shell Access   | ❌ Disabled in PANS firmware   |
| Debug Path          | ⏸️ Paused                      |
| Focus               | 🟢 SPI TLV                     |

---

## 🔁 Alternative (If You Need UART Shell)

- 🔧 Flash a **custom firmware** with shell access enabled (e.g., modify `dwm-simple`)
- 🧱 Rebuild and flash using **SEGGER Embedded Studio**
- 🚀 Or continue using **SPI + TLV API** for full feature support
