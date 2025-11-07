
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

### ▶️ Run the Frontend

```powershell
cd frontend
npm start
```



### 4️⃣Backend Setup (Node.js Bridge)

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

### ▶️ Run the Backend

```powershell
cd backend
node server.js
```

This connects to HiveMQ Cloud (or configured MQTT broker), subscribes to the GPS topic, and pushes data to your Firebase Realtime Database.



```



