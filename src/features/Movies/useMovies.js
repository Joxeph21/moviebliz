import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../services/apiMovies";

export function useMovies({ filter, page }) {
  const {
    data: moviesArray,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchMovies({ filter, page }),
    queryKey: ["movie", filter, page],
  });

  const movies = moviesArray?.data;
  return {
    movies,
    isLoading,
    error,
  };
}
