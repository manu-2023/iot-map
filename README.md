
### 1️⃣ Clone the Repository

```powershell
git clone https://github.com/manu-2023/iot-map
cd iot-map
```

### 2️⃣ Frontend Setup (React App)

```powershell
cd frontend
npm install
```

Start the frontend development server:

```powershell
npm start
```

This runs the React dashboard (Leaflet map + alerts) at http://localhost:3000 by default.

### 3️⃣ Backend Setup (Node.js Bridge)

```powershell
cd ../backend
npm install
```

🔐 Add Firebase Service Account Key

Go to your Firebase Console → Project Settings → Service Accounts

Click “Generate new private key”

Save the downloaded file as:

```text
backend/serviceAccountKey.json
```

⚠️ Never commit this file to GitHub — it contains sensitive credentials. Add it to your `.gitignore` if it isn't already.

▶️ Run the Backend

```powershell
cd backend
node server.js
```

This connects to HiveMQ Cloud (or configured MQTT broker), subscribes to the GPS topic, and pushes data to your Firebase Realtime Database.

### 4️⃣ Run the Frontend

```powershell
cd frontend
npm start
```

Visit the dashboard in your browser. The map shows the smart case position and updates in real time when MQTT messages arrive and are forwarded to Firebase.

---

## 🔧 MQTT / Raspberry Pi Notes

- The Raspberry Pi should publish messages to the configured MQTT topic. Example JSON payload format that the backend expects:

```json
{
  "deviceId": "case-001",
  "lat": 37.4219983,
  "lng": -122.084,
  "timestamp": 1690000000000,
  "alert": true
}
```

- On the Pi, you can use any MQTT client (e.g., mosquitto_pub, paho-mqtt) to publish messages to HiveMQ or your broker.

---

## ✅ Security & Deployment Notes

- Keep `serviceAccountKey.json` out of source control. Use environment variables or a secrets manager for production.
- For production, restrict Firebase auth rules and use HTTPS for the dashboard.
- Consider adding authentication to the frontend and backend to secure who can view and push device locations.

---

## 🧭 Diagram & Improvements

- Add an architecture diagram (Draw.io, Mermaid) replacing the placeholder image above.
- Add a LICENSE file if you plan to publish the project.
- Add a small GitHub Actions workflow for lint/test and optional deployment steps for frontend/backend.

---

## 📁 File location

This README was added to the `mqtt` folder to document the local MQTT-related instructions and overall project setup.

---

If you want, I can also:

- add a sample MQTT publisher script for Raspberry Pi (Python) that publishes the payload format above,
- add a simple diagram (Mermaid) into this README,
- or create a `.gitignore` entry reminder for `backend/serviceAccountKey.json`.

Let me know which follow-up you'd like.
