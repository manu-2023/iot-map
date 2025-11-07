import mqtt from "mqtt";
import fetch from "node-fetch"; // Make sure to install: npm install node-fetch

const options = {
  host: "6d1f47954fab4dc0b8e4b329bb9aace6.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "smartpi",
  password: "ManuM@2005"
};

const client = mqtt.connect(options);
const topic = "smartcase/test";

client.on("connect", () => {
  console.log("✅ Connected as Publisher");

  async function getIPLocation() {
    try {
      const res = await fetch("http://ip-api.com/json/");
      const data = await res.json();
      if (data.status === "success") {
        return { lat: data.lat, lon: data.lon };
      }
      throw new Error("IP lookup failed");
    } catch (err) {
      console.error("❌ Location fetch failed:", err.message);
      return null;
    }
  }

  // Publish every 5 seconds
  setInterval(async () => {
    const currentPosition = await getIPLocation();
    if (currentPosition) {
      client.publish(topic, JSON.stringify(currentPosition));
      console.log("📤 Published (real):", currentPosition);
    } else {
      console.log("⚠️ Using fallback fake location");
      const fake = {
        lat: 12.9 + Math.random() * 0.1,
        lon: 77.5 + Math.random() * 0.1
      };
      client.publish(topic, JSON.stringify(fake));
      console.log("📤 Published (fake):", fake);
    }
  }, 5000);
});
