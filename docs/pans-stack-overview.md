# 📡 DWM1001 PANS Stack Overview

## What is PANS?

**PANS** stands for **Positioning and Networking Stack**. It is the official firmware stack provided by Decawave (now Qorvo) that runs on the DWM1001 module. It handles everything needed for accurate ultra-wideband (UWB) communication and real-time location tracking out-of-the-box.

The PANS firmware turns DWM1001 devices into:

- 📍 **Tags** (to be located)
- 📡 **Anchors** (reference points)
- 🌐 **Gateways** (for mesh networking)

---

## What is the PANS API?

The **PANS API** is a collection of safe and easy-to-use C functions provided by Decawave. These functions allow you to interact with the PANS firmware from your own custom code without needing to deal with low-level hardware details.

The API is exposed through one main header:

```c
#include "dwm.h"
```

Using the API, you can:

📍 Get real-time position: `dwm_pos_get()`

🧭 Wait for events: `dwm_evt_wait()`

⏱️ Set update rates: `dwm_upd_rate_set()`

🔁 Register event listeners: `dwm_evt_listener_register()`

📤 Send/receive user data over UWB

🧠 Enable/disable sensors like the accelerometer

This allows you to create powerful custom logic that runs on top of the official firmware.

## What is a Stack (in this context)?
A stack in embedded systems refers to a layered architecture — a software design pattern where each layer is responsible for a specific task and communicates only with the layer directly above or below it.

For the DWM1001, the software stack looks like this:

```sql

+----------------------------+
| Your Application Code      | <- You write this part using the PANS API
+----------------------------+
| PANS API (dwm.h)           | <- Function interface to talk to the PANS firmware
+----------------------------+
| PANS Core Firmware         | <- UWB positioning, tag/anchor roles, mesh logic
+----------------------------+
| Nordic SoftDevice          | <- Bluetooth stack + real-time scheduling
+----------------------------+
| nRF52832 Hardware          | <- Physical chip running everything
+----------------------------+
```

Each layer builds on top of the one below. You never have to manually deal with UWB signal timing or mesh synchronization — the stack handles it for you.

## ✅ Benefits of Using the PANS API
- Focus on your own logic — leave the positioning and communication to PANS

- Safe API access to internal features

- Runs alongside Bluetooth SoftDevice

- Great for prototyping anchors, tags, or gateways

## 💡 Typical Use Case
You write a custom app (like dwm-simple) using the PANS API. Your app might:

- Log position data

 - Trigger actions when close to an anchor

- Send alerts over UWB or UART

PANS does all the heavy lifting in the background.

## 🧠 Good to Know
- The API is real-time safe

- UART printf() works by default

- You can still use shell commands (like lec, si, pos) if you enable the shell in dwm_user_start()

- You flash only your app — PANS stays intact unless overwritten

## 📚 Resources
- PANS API Examples on GitHub

- Official SDK includes:

    - lib/ (PANS binaries)

    - inc/dwm.h (API header)

    - examples/ (starter apps like dwm-simple)

- Hardware: DWM1001 module with nRF52832