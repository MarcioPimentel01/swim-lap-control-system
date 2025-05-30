# 🏊‍♂️ Swim Lap Control System (UWB-Powered) ![Swim Tracker Status](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/MarcioPimentel01/swim-lap-control-system/main/badge-status.json&style=for-the-badge)


**A real-time lap tracking system using Ultra-Wideband technology, Raspberry Pi, and custom wireless sensors.**

---

## 🚀 Project Purpose

This is not a bootcamp tutorial project.

This is a **hardware-software hybrid**, designed to:

- Track swimmer laps with **real-time precision**
- Utilize **Ultra-Wideband (UWB)** for accurate positioning
- Be **portable and modular**, suitable for any pool length
- Act as a **personal showcase project** for internship/job applications

> 🧠 Built from scratch by someone self-learning development, electronics, and embedded systems — all at once.

---

## 🧩 System Overview

The system detects when a swimmer reaches either end of the pool using UWB anchors and a **wrist-mounted tag**.

## Project Diagram

![project-diagram-svg](./public/assets/img/project-diagram-svg.svg)

## 🧠 Core Logic

### ⏱️ Time Formatting Functions
Used to convert between display time and internal millisecond values for comparison.

![msToTime](./public/assets/img/milliseconds-to-time.png)
![timeToMs](./public/assets/img/time-to-%20milliseconds.png)

### ⚙️ Backend Setup (server.js)
Quick overview of the Express + Socket.IO setup:

![server](./public/assets/img/server-js-configuration.png)

### 🧼 Reset Logic
Session reset flow and UI cleanup:

![reset](./public/assets/img/timeInterval-eventListner.png)


### Core Features:

- 📟 Real-time lap display on a **10.1” Raspberry Pi touchscreen**
- 📡 **DWM1001-DEV UWB modules** (anchors + tag)
- 🧠 Smart session tracking: lap count, partials, fastest lap, averages
- 🔋 Battery-powered sensors + transportable layout
- 📲 Future-ready: Bluetooth control, cloud sync, and mobile interface

---

## 🧱 Hardware Components

### 💻 Main Controller

- **Raspberry Pi 4 Model B (8GB)**
- Fan-cooled case w/ 64GB preloaded SD card
- 10.1” IPS Touchscreen (HDMI)
- Powered via Anker PowerCore 10K battery

### 📡 UWB Modules

- **7× DWM1001-DEV Modules**
  - 4 for anchors (2 each end of pool)
  - 1 for wristband tag
  - 1 connected to Raspberry Pi (gateway)
  - 1 spare for development/testing

### 🔋 Power + Connectivity

- **Wristband Battery**: Qimoo 602025 3.7V LiPo (200mAh, JST PH2.0)
- **Anchor Battery**: MakerFocus 3.7V 2000mAh LiPo (Micro JST 1.25)
- **Charger Module**: HiLetgo TP4056 w/ protection (Micro USB, 10pcs)

### 🛠 Accessories

- Freenove Starter Kit (Raspberry Pi)
- Soldering station (YIHUA 926 III)
- Heat shrink tubing + jumper wires
- JST connectors, breadboard, standoffs, toolkits
- Waterproof/wearable wristband housing (TBD)

---

## 🔧 Software Stack

### Frontend

- HTML/CSS/JavaScript
- Bootstrap 5
- Real-time lap tracking UI

### Backend

- Node.js w/ `express`
- `socket.io` for live updates
- `onoff` and `johnny-five` for GPIO and sensor control (for future add-ons)

---

## 🧠 Future Milestones

| Feature | Status       |
|---------|--------------|
| UWB-based positioning        | 🔄 In Progress |
| Real-time wristband tracking | ⏳ Upcoming   |
| Session record logs          | ✅ Done       |
| Fastest lap detection        | ✅ Done       |
| Bluetooth pairing            | ⏳ Upcoming   |
| Public GitHub Pages UI       | ✅ Live       |
| Job-ready portfolio          | 🔄 Building   |

---

## 📢 Why This Project?

🧠 I wanted a **real, unique, and engineering-heavy** project to showcase my growth as a developer and problem solver.

💼 I'm aiming to apply to the **Microsoft Leap Program**, internships, and jobs in embedded, IoT, and full-stack development.

This project shows:

- End-to-end system thinking
- UI, backend, and hardware integration
- Commitment to building something real and complex

---

## 📷 Media

- Project photos and hardware setup

| SPI Wired             | UART Wired                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ![Module SPI Wired](./public/assets/img/dwm1001-dev-spi-wired.png) | ![Module SPI Wired](./public/assets/img/dwm1001-dev-uart-wired.png) |

| Anchor             |                                         |
| ----------------- | ------------------------------------------------------------------ |
| ![Module SPI Wired](./public/assets/img/anchor-waterproof-box.png) | ![Module SPI Wired](./public/assets/img/anchor-waterproof-box02.png) |
- Wiring diagrams (coming...)
- Demo video with real-time lap tracking (coming...)

---

## ⚡ Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/MarcioPimentel01/swim-lap-control-system.git
cd swim-lap-control-system

# 2. Install dependencies
npm install

# 3. Run the backend server
node server.js

# 4. Open your browser at http://localhost:3000
```