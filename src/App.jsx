// src/App.js
import { useState, useEffect } from "react";
import { fetchMovies } from "./utils/api";
import Map from "./components/Map";
import { AutoComplete } from "./components/auto-complete/AutoComplete";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    getMovies();
  }, []);

  const onSelect = (value) => {
    setSelected([value]);
  };

  const handleSearch = (query) => {
    const result = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  };
  const moviesToShow = selected.length > 0 ? selected : movies.slice(8, 16);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-center text-4xl font-bold">SF Movie Locations</h1>
      <AutoComplete
        placeholder="enter Recipe"
        fetchSuggestions={handleSearch}
        onSelect={onSelect}
        CustomLoading={<>...Loading</>}
        onChange={() => {}}
      />
      <Map movieLocations={moviesToShow} />
    </div>
  );
};

export default App;
