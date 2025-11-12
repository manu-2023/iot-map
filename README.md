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

## 🚀 Technologies Used
- **MQTT Protocol**: For lightweight messaging between devices.
- **HiveMQ Cloud**: As the MQTT broker.
- **Firebase Realtime Database**: For storing GPS data.
- **React.js**: For the frontend visualization.
- **Node.js**: For backend data handling.

## 🌟 Features
- Real-time GPS data publishing and retrieval.
- Cloud-based data storage and processing.
- Interactive map visualization of GPS coordinates.

## 🛠️ How It Works
1. The GPS module continuously publishes location data to the HiveMQ Cloud.
2. The Node.js backend listens to the HiveMQ Cloud, retrieves the GPS data, and updates Firebase.
3. The React.js frontend fetches the data from Firebase and displays it on a map, showing the current location and movement path.
