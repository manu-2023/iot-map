import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, query, limitToLast, onValue } from "firebase/database";
import L from "leaflet";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"
});

// Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

function App() {
  const [status, setStatus] = useState("⏳ Connecting to Firebase...");

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const map = L.map("map").setView([12.9716, 77.5946], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    let sourceMarker = null;
    let sourcePoint = null;

    // ✅ Store all points (source + destinations)
    const route = [];

    // ✅ Polyline that grows with each new destination
    let polyline = null;

    const latestGPS = query(ref(db, "gps_data"), limitToLast(1));

    onValue(latestGPS, (snapshot) => {
      let data = null;
      snapshot.forEach((child) => (data = child.val()));

      if (!data) return;

      const lat = parseFloat(data.lat);
      const lon = parseFloat(data.lon);

      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

      const newPoint = [lat, lon];

      console.log("📍 Received:", newPoint);

      // ✅ FIRST POINT = SOURCE (green)
      if (!sourcePoint) {
        sourcePoint = newPoint;
        route.push(newPoint);

        sourceMarker = L.marker(newPoint, {
          icon: L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41]
          })
        })
          .addTo(map)
          .bindPopup("🟢 Source (Start)")
          .openPopup();

        map.setView(newPoint, 15, { animate: true });
        setStatus(`🟢 Source: ${lat.toFixed(5)}, ${lon.toFixed(5)}`);
        return;
      }

      // ✅ Add new destination point
      route.push(newPoint);

      // ✅ Add a RED marker for each destination
      L.marker(newPoint, {
        icon: L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        })
      })
        .addTo(map)
        .bindPopup(`🔴 Destination: ${lat.toFixed(5)}, ${lon.toFixed(5)}`)
        .openPopup();

      // ✅ Draw continuous path (connect point1 → point2 → point3 ...)
      if (!polyline) {
        polyline = L.polyline(route, { color: "blue", weight: 4 }).addTo(map);
      } else {
        polyline.setLatLngs(route);
      }

      // ✅ Auto-zoom to fit whole route
      map.fitBounds(route, { padding: [50, 50], animate: true });

      setStatus(
        `🔴 New destination added: ${lat.toFixed(5)}, ${lon.toFixed(5)} — Total: ${route.length - 1}`
      );
    });

    return () => {};
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* Status */}
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
        <h3>🛰 Smart Mobile  Tracker</h3>
        <p>{status}</p>
      </div>

      <div id="map" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}

export default App;
