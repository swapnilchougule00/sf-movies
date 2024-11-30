// src/App.js
import { useState, useEffect } from "react";
import { fetchMovies } from "./utils/api";
import Map from "./components/Map";
import { AutoComplete } from "./components/auto-complete/AutoComplete";

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    getMovies();
  }, []);

  const handleSearch = (query) => {
    const result = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-center text-4xl font-bold">SF Movie Locations</h1>
      <AutoComplete
        placeholder="enter Recipe"
        fetchSuggestions={handleSearch}
        onSelect={() => {}}
        CustomLoading={<>...Loading</>}
        onChange={() => {}}
      />
      <Map movieLocations={movies} />
    </div>
  );
};

export default App;
