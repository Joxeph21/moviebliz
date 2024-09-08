import Loader from "./Loader";
import MovieCard from "./MovieCard";

function MovieGrid({ array = {}, isLoading}) {
  if (isLoading) return <Loader />;


 
  return (
    <div className="max-w m-4 md:m-6  grid h-max  grid-cols-2 gap-6 md:p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {array?.map((el) => (
        <MovieCard key={el?.id} movieInfo={el} />
      ))}
    </div>
  );
}

export default MovieGrid;
