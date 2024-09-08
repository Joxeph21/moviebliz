import { useTrendingMovies } from "../features/Movies/useTrendingMovies";
import Loader from "../ui/Loader";
import VideoCard from "../ui/VideoCard";

function TrailersSection({ title }) {
  const { trendingMovies, isLoadingMovies } = useTrendingMovies();
  
  if (isLoadingMovies) return <Loader />;

  return (
    <div className="my-4 flex h-max w-dvw flex-col gap-10 overflow-x-hidden p-4 text-gray-50">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="w-max flex gap-4">
        {trendingMovies.map((movie) => (
          <VideoCard 
            key={movie.id} 
            movieName={movie.title} 
            trailerKey={movie.officialTrailer?.key} 
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
}

export default TrailersSection;
