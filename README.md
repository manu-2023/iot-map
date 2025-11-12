# 🛰️ Pick Pocket Detection

## 1️⃣ Clone the Repository
```bash
git clone https://github.com/manu-2023/iot-map
cd iot-map
```

## 📘 Project Overview

This project — **Pick Pocket Detection using MQTT Protocol** — demonstrates how IoT, MQTT, and cloud integration can be used for real-time location monitoring.

## ⚙️ Workflow

### GPS Module
- Publishes live GPS coordinates to **HiveMQ Cloud**.

### Node.js Backend
- Subscribes to **HiveMQ Cloud** and retrieves GPS data.
- Pushes the received data to **Firebase Realtime Database** for centralized storage.

### React Frontend
- Fetches GPS data from **Firebase**.
- Displays live coordinates and movement on an interactive map.

## Check the readme.md files inside the frontend and backend folders for detailed information.
