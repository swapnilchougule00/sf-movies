import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ movieLocations }) => {
  const [coordinates, setCoordinates] = useState(null);
  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          "916 Grant Avenue, Chinatown, San Francisco"
        )}`
      );
      const data = await response.json();
      if (data[0]) {
        setCoordinates({
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        });
      }
    };

    fetchCoordinates();
  }, []);

  if (!coordinates) return <p>Loading map...</p>;

  return (
    <div className="z-10">
      <MapContainer
        center={[coordinates.lat, coordinates.lon]}
        zoom={13}
        style={{ height: "500px", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[coordinates.lat, coordinates.lon]}>
          <Popup>Experement</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
