import { useQuery } from "@tanstack/react-query";
import { discoverMovies } from "../../services/apiMovies";

export function useNetflixMovies() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Netflix-Movies"],
    queryFn: discoverMovies,
  });

  const netflixMovies = data?.data

  return {
    netflixMovies,
    isLoading,
    error,
  };
}
