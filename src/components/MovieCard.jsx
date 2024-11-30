const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h3 className="font-bold text-lg">{movie.title}</h3>
      <p className="text-sm text-gray-500">Location: {movie.location}</p>
      <p className="text-sm text-gray-500">Description: {movie.description}</p>
    </div>
  );
};

export default MovieCard;
