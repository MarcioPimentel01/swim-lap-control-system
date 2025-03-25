# Swim Lap Control System
This project is built around the versatile and affordable Raspberry Pi 4 Model B. The goal is to develop a hardware-software solution capable of reliably tracking swim laps in real-time. The Raspberry Pi 4 was chosen for its robust performance and connectivity features—it offers ample GPIO pins for sensor integration, multiple USB ports for debugging and accessories, and built-in Wi-Fi and Bluetooth for wireless syncing and remote control.

With its quad-core processor and generous memory options, the Pi 4 can simultaneously handle sensor input, display output, and data storage efficiently. This makes it an ideal core system to manage lap timing, user interface, and communication—all essential components of a responsive and user-friendly swim lap control system.

# System Overview
The Swim Lap Control System is designed to track and display lap times for swimmers in real-time. It uses a combination of wired and wireless touch sensors placed at opposite ends of the pool. Each time the swimmer completes a lap and touches one of the sensors, the system records a timestamp.

There are two key displays:

Poolside Display – A large, wall-mounted LED clock that shows the current time and lap count. This display is visible from the pool and is updated live as the swimmer completes laps.

Control Display – A smaller, touch-enabled screen connected to the Raspberry Pi. This interface provides detailed data such as lap intervals, total swim time, and lap history. It also allows the user to start, pause, reset sessions, and configure settings.

The system supports both local control and remote access via Wi-Fi or Bluetooth, enabling easy data synchronization and analysis after each session.

# Hardware Components
**1. Core Controller Raspberry Pi 4 Model B**
- Quad-core CPU
- 2GB–8GB RAM (depending on needs)
- Built-in Wi-Fi and Bluetooth
- USB, HDMI, GPIO support

**2. Lap Sensors**
- Wired Sensor:
- Capacitive or resistive touchpad (water-resistant)
- Connected directly to GPIO pins
- Wireless Sensor:
- ESP32 or similar microcontroller with Wi-Fi/Bluetooth
- Paired with a capacitive touch sensor module
- Communicates with Raspberry Pi over wireless protocol (e.g., MQTT or HTTP)

**3. Displays**

- Large Poolside Display:
- Oversized 6-digit LED wall clock (modded or custom)
- Displays current time and lap count
- Controlled via serial or wireless communication from Pi

    **Control Interface:**
- 5" or 7" Raspberry Pi-compatible touch screen (HDMI or GPIO)
- Mounted near the Pi for user interaction

**4. Power Supply**
- Reliable 5V/3A (or higher) USB-C power supply for Pi
- Optional power banks or battery backups for wireless sensors

**5. Enclosures & Waterproofing**

- IP65+ enclosures for Raspberry Pi and touchpads
- Waterproof casings for poolside display components
- Anti-condensation measures for display visibility

## Dependencies

* `express` A fast, minimal web server framework for Node.js.
You use it to build APIs, serve HTML pages, handle routes, etc.
* `socket.io` Enables real-time, bi-directional communication between client and server via WebSockets (or fallback to long-polling).
Perfect for live chat, real-time notifications, or live sensor data updates.
* `onoff` Lets you control GPIO (General Purpose Input/Output) pins on a Raspberry Pi.
You can turn LEDs on/off, detect button presses, etc.
* `johnny-five` A JavaScript robotics and IoT library.
Works with boards like Arduino and also supports Raspberry Pi (through a plugin like Raspi IO).