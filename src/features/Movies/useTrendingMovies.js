import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../../services/apiMovies";

export function useTrendingMovies() {
  const {
    data: dataArray,
    isLoading: isLoadingMovies,
    error,
  } = useQuery({
    queryKey: ["trending-Movies"],
    queryFn: getTrendingMovies,
  });

  const trendingMovies = dataArray?.data;
  return {
    trendingMovies,
    isLoadingMovies,
    error,
  };
}
