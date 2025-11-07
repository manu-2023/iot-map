// ================================================================
//  IoT Bridge: HiveMQ Cloud  →  Firebase Realtime Database
// ================================================================

import mqtt from "mqtt";
import admin from "firebase-admin";
import { readFileSync } from "fs";

// ---------- 1️⃣  Load Firebase Service Account ----------
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smart-phone-tracker-beb26-default-rtdb.asia-southeast1.firebasedatabase.app/" // 👈 replace with your own
});

const db = admin.database();

// ---------- 2️⃣  HiveMQ Cloud Connection Config ----------
const options = {
  host: "6d1f47954fab4dc0b8e4b329bb9aace6.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",     // secure TLS connection
  username: "smartbridge",   // your HiveMQ username
  password: "Smartbridge123" // your HiveMQ password
};

const TOPIC = "smartcase/test";

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
