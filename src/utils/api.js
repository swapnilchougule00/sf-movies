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
