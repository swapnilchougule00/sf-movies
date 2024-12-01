// src/App.js
import { useState, useEffect } from "react";
import { fetchMovies } from "./utils/api";
import Map from "./components/Map";
import { AutoComplete } from "./components/auto-complete/AutoComplete";
import { Locate, MapPin } from "lucide-react";
import PopularPlaceSection from "./components/PopularPlaceSection";

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
    <div className="min-h-screen p-10">
      {/* <h1 className="text-center text-2xl  font-bold">SF Movie Locations</h1> */}
      <div className="w-full flex justify-between gap-10 flex-col md:flex-row">
      <section className="md:w-[48%] w-full">
        <AutoComplete
          placeholder="Search Places.."
          fetchSuggestions={handleSearch}
          onSelect={() => {}}
          CustomLoading={<>...Loading</>}
          onChange={() => {}}
        />
        <PopularPlaceSection movies={movies}/>
      </section>
      <section className="flex-1">
        <Map movieLocations={movies} />
      </section>
      </div>
    </div>
  );
};

export default App;
