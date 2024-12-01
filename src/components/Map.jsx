/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ movieLocations }) => {
  const defaultPosition = [37.7749, -122.4194];
  const [coordinates, setCoordinates] = useState([]);

  const fetchCoordinates = async (location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}`
      );
      const data = await response.json();
      if (data[0]) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
      }
      return null;
    } catch (err) {
      console.error("Error fetching coordinates:", err);
      return null;
    }
  };

  useEffect(() => {
    const getCoordinates = async () => {
      const results = await Promise.all(
        movieLocations.map(async (movie) => {
          const coords = await fetchCoordinates(movie.locations);
          return coords ? { ...coords, title: movie.title } : null;
        })
      );
      setCoordinates(results.filter((coord) => coord !== null));
    };

    getCoordinates();
  }, [movieLocations]);

  return (
    <div className="z-10">
      <MapContainer
        center={defaultPosition}
        zoom={12}
        style={{ height: "500px", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates.map((coord, index) => (
          <Marker key={index} position={[coord.lat, coord.lon]}>
            <Popup>{coord.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
