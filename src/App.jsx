import { useState, useEffect } from "react";
import { fetchMovies } from "./utils/api";
import Map from "./components/Map";
import { AutoComplete } from "./components/auto-complete/AutoComplete";
import PopularPlaceSection from "./components/PopularPlaceSection";

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
    <div className="min-h-screen p-10">
      {/* <h1 className="text-center text-2xl  font-bold">SF Movie Locations</h1> */}
      <div className="w-full flex justify-between gap-10 flex-col md:flex-row">
        <section className="md:w-[48%] w-full">
          <AutoComplete
            placeholder="Search Places ..."
            fetchSuggestions={handleSearch}
            onSelect={onSelect}
            CustomLoading={<>...Loading</>}
            onChange={() => {}}
          />
          <PopularPlaceSection onSelect={onSelect} movies={movies} />
        </section>
        <section className="flex-1">
          <Map movieLocations={moviesToShow} />
        </section>
      </div>
    </div>
  );
};

export default App;
