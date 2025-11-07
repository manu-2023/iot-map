import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, query, limitToLast, onChildAdded } from "firebase/database";
import L from "leaflet";

// 🔧 Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"
});

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBF2TFk_uMcT0E6kJhEOaWNnHZmKf8qzLI",
  authDomain: "smart-phone-tracker-beb26.firebaseapp.com",
  databaseURL:
    "https://smart-phone-tracker-beb26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-phone-tracker-beb26",
  storageBucket: "smart-phone-tracker-beb26.firebasestorage.app",
  messagingSenderId: "703788502681",
  appId: "1:703788502681:web:9f3116dc4b1692bc9d7208",
  measurementId: "G-0TXD7C7705"
};

function App() {
  const [status, setStatus] = useState("⏳ Connecting to Firebase...");

  useEffect(() => {
    console.log("🚀 Initializing Firebase...");
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    setStatus("✅ Connected to Firebase — waiting for GPS data...");

    // Prevent multiple map inits
    if (L.DomUtil.get("map") !== null) {
      const existingMap = L.DomUtil.get("map");
      existingMap._leaflet_id = null;
    }

    // Initialize map
    console.log("🗺 Initializing Leaflet map...");
    const map = L.map("map").setView([12.9716, 77.5946], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    let liveMarker = null;

    // 🔥 Only get the most recent GPS entry
    const latestGPS = query(ref(db, "gps_data"), limitToLast(1));
    console.log("📡 Subscribed to latest GPS data...");

    onChildAdded(latestGPS, (snapshot) => {
      const data = snapshot.val();
      console.log("📦 Latest GPS snapshot:", data);

      if (data && data.lat && data.lon) {
        const lat = parseFloat(data.lat);
        const lon = parseFloat(data.lon);

        console.log(`📍 Updating marker: [${lat}, ${lon}]`);
        setStatus(`📍 Current Location: ${lat.toFixed(5)}, ${lon.toFixed(5)}`);

        // 🟢 Update or create live marker
        if (liveMarker) {
          liveMarker.setLatLng([lat, lon]);
        } else {
          liveMarker = L.marker([lat, lon], {
            icon: L.icon({
              iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowUrl:
                "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"
            })
          })
            .addTo(map)
            .bindPopup("📍 Current Location")
            .openPopup();
        }

        // Center map smoothly on current location
        map.setView([lat, lon], 15, { animate: true });
      } else {
        console.warn("⚠️ Invalid GPS data:", data);
      }
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* Status box */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 999,
          background: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
        }}
      >
        <h3>🛰 Smart Case Tracker</h3>
        <p>{status}</p>
      </div>

      {/* Map container */}
      <div id="map" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}

export default App;
