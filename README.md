# 🛰️ Smart Case Tracker (IoT + Cloud + Map Dashboard)

An IoT-based theft alert and tracking system built using **Raspberry Pi + GPS + MQTT + Firebase + React** to detect thefts and show live location updates of your smart case on a real-time map.

This project turns a regular case into a "smart case" with embedded Raspberry Pi and GPS module. If theft is detected (e.g., via accelerometer or button), it publishes location via MQTT to a cloud broker (HiveMQ). A Node.js backend bridges this to Firebase Realtime Database for persistence. The React frontend displays a live Leaflet map with the case's position, plus alerts.

![System Architecture](https://via.placeholder.com/800x400?text=Smart+Case+Tracker+Architecture)  
*(Add a diagram here using tools like Draw.io for visuals: Raspberry Pi → GPS/MQTT → HiveMQ → Node.js → Firebase → React Dashboard)*

## 🚀 Project Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/manu-2023/iot-map
cd iot-map

### 2️⃣ Frontend Setup (React App)
```bash
cd frontend
npm install

### 3️⃣ Backend Setup (Node.js Bridge)
```bash
cd ../backend
npm install

🔐 Add Firebase Service Account Key

Go to your Firebase Console → Project Settings → Service Accounts

Click “Generate new private key”

Save the downloaded file as:

```bash
backend/serviceAccountKey.json

### ▶️ Run the Backend

```bash
cd backend
node server.js
