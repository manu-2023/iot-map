import mqtt from "mqtt";
import admin from "firebase-admin";
import { readFileSync } from "fs";
import dotenv from "dotenv";



const serviceAccount = JSON.parse(
  readFileSync("please add your file name of service account key", "utf8")
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL // Load from .env
});

const db = admin.database();

// ---------- 2️⃣  HiveMQ Cloud Connection Config ----------
dotenv.config();

const options = {
  host: process.env.MQTT_HOST,
  port: parseInt(process.env.MQTT_PORT, 10),
  protocol: process.env.MQTT_PROTOCOL,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD
};

const TOPIC = process.env.MQTT_TOPIC;

// ---------- 3️⃣  Connect to HiveMQ Cloud ----------
console.log("🔌 Connecting to HiveMQ Cloud...");
const client = mqtt.connect(options);

client.on("connect", () => {
  console.log("✅ Connected to HiveMQ Cloud Broker");
  client.subscribe(TOPIC, (err) => {
    if (!err) {
      console.log(`📡 Subscribed to topic: ${TOPIC}`);
    } else {
      console.error("❌ Subscription error:", err.message);
    }
  });
});

// ---------- 4️⃣  Handle Incoming MQTT Messages ----------
client.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("📥 Received:", data);

    if (data.lat && data.lon) {
      const entry = {
        lat: data.lat,
        lon: data.lon,
        timestamp: new Date().toISOString()
      };

      // Push to Firebase Realtime DB
      db.ref("gps_data").push(entry)
        .then(() => console.log("💾 Stored in Firebase:", entry))
        .catch((err) => console.error("🔥 Firebase Error:", err.message));
    } else {
      console.warn("⚠️ Invalid message format (missing lat/lon).");
    }
  } catch (err) {
    console.error("❌ Parse error:", err.message);
  }
});

// ---------- 5️⃣  Error Handling ----------
client.on("error", (err) => {
  console.error("🚨 HiveMQ Connection Error:", err.message);
});

console.log("🚀 Bridge running... waiting for GPS data.");
