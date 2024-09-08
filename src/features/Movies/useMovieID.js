import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../services/apiMovies";

export function useMovieID(id) {
  const { data: moviedata, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
  });


  const movie = moviedata?.data;
  const error = moviedata?.error;

  return {
    movie,
    isLoading,
    error,
  };
}
