import { useQuery } from "@tanstack/react-query";
import { discoverMovies } from "../../services/apiMovies";

export function useNetflixMovies() {
  const { data, isLoading } = useQuery({
    queryKey: ["Netflix-Movies"],
    queryFn: discoverMovies,
  });

  const netflixMovies = data?.data;
  const error = data?.error;

  return {
    netflixMovies,
    isLoading,
    error,
  };
}
