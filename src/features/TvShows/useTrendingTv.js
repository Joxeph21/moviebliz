import { useQuery } from "@tanstack/react-query";
import { getTrendingTv } from "../../services/apiTvshows";

export function useTrendingTv() {
  const {
    data: trendingTv,
    isLoading: isLoadingTv,
    error,
  } = useQuery({
    queryKey: ["trending-Tv"],
    queryFn: getTrendingTv,
  });

  return {
    trendingTv,
    isLoadingTv,
    error,
  };
}
