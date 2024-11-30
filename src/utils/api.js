import axios from "axios";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(
      "https://data.sfgov.org/resource/yitu-d5am.json"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data", error);
  }
};



const fetchCoordinates = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      return data[0];
    } else {
      console.log("No results found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
};

fetchCoordinates("916 Grant Avenue, Chinatown, San Francisco");
