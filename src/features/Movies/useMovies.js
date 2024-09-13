import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../services/apiMovies";

export function useMovies({ filter, page }) {
  const {
    data: moviesArray,
    isLoading,
  } = useQuery({
    queryFn: () => fetchMovies({ filter, page }),
    queryKey: ["movie", filter, page],
  });

  const movies = moviesArray?.data;
  const error = moviesArray?.error
  return {
    movies,
    isLoading,
    error,
  };
}
