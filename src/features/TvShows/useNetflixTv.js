import { useQuery } from "@tanstack/react-query";
import { discoverTv } from "../../services/apiTvshows";

export function useNetflixTv() {
  const {
    data: dataArray,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Netflix-Tv"],
    queryFn: discoverTv,
  });

  const netflixTv = dataArray?.data || [];

  return {
    netflixTv,
    isLoading,
    error,
  };
}
