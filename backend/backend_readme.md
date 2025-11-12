# Backend Setup Instructions

## Firebase Setup

1. **Open Firebase Console**:
   - Go to [Firebase Console](https://console.firebase.google.com/).

2. **Create a New Project**:
   - Click on "Add Project" and fill in the required details.
   - Follow the on-screen instructions to complete the project creation.

3. **Enable Realtime Database**:
   - Navigate to **Build → Realtime Database**.
   - Click **Create Database**.
   - Select your region and choose **Start in Test Mode**.

4. **Add a Web App**:
   - Go to **Project Settings → General → Add App → Web App**.
   - Follow the instructions to register your app.

5. **Generate Service Account Key**:
   - Go to **Project Settings → Service Accounts**.
   - Click **Generate New Private Key**.
   - Download the key file and save it as `serviceAccountKey.json` in the `backend` folder.


## HiveMQ Cloud Setup

1. **Open HiveMQ Cloud Console**:
   - Go to [HiveMQ Cloud Console](https://console.hivemq.cloud/).

2. **Create an Account**:
   - Complete the signup process.
   - For college demo purposes, select the **Free Cluster** plan (#1).

3. **Access Management**:
   - Navigate to **Access Management → Create Credentials**.
   - Create two sets of credentials:
     - **smartpi**: Publish only.
     - **smartbridge**: Publish and Subscribe.

4. **Use Credentials in GPS Code**:
   - Update your GPS code with the `smartpi` credentials:
     ```
     host: "<your-TLS-MQTT-URL>",
     port: 8883,
     protocol: "mqtts",
     username: "smartpi",
     password: "<your-password>"
     ```

5. **Update Backend `.env` File**:
   - Add the `smartbridge` credentials to the `.env` file:
     ```
     MQTT_HOST=<your-TLS-MQTT-URL>
     MQTT_PORT=8883
     MQTT_PROTOCOL=mqtts
     MQTT_USERNAME=smartbridge
     MQTT_PASSWORD=<your-password>
     ```


## Install Dependencies

Run the following command to install the required dependencies:
```bash
npm install
```

## Start the Backend

Run the backend server:
```bash
node server.js
```

The backend will connect to the MQTT broker, listen for messages, and store them in Firebase Realtime Database.
