import { useSearchParams } from "react-router-dom";
import { useSearch } from "../features/searchResults/useSearch";
import brokenImg from "../assets/brokenImage.png";
import Banner from "../ui/Banner";
import Loader from "../ui/Loader";

const apiImg = import.meta.env.VITE_API_IMAGE_URL;

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { data, isLoading } = useSearch(query);
  const movies = data?.results;

  if (isLoading) return <Loader />;

  return (
    <Banner>
      <h1 className="mb-8 text-base font-semibold text-gray-200">
        {movies.length === 0
          ? `It seems we don't have `
          : "Search Results for "}
        <span className="text-green-400">&apos;{query}&apos;</span>
      </h1>
      <div className="grid cursor-pointer grid-cols-2 items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="group relative h-72 w-full max-w-48 transform overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            <img
              src={
                movie.poster_path ? `${apiImg + movie.poster_path}` : brokenImg
              }
              alt={`${movie.title} poster`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
              <h4 className="text-base font-bold text-white">
                {movie.title ? movie.title : movie.original_name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </Banner>
  );
}

export default Search;
