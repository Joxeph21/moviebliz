import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../../services/apiMovies";

export function useTrendingMovies() {
  const { data: dataArray, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["trending-Movies"],
    queryFn: getTrendingMovies,
  });

  const trendingMovies = dataArray?.data;
  const error = dataArray?.error;
  return {
    trendingMovies,
    isLoadingMovies,
    error,
  };
}
