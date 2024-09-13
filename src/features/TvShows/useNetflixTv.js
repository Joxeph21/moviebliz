import { useQuery } from "@tanstack/react-query";
import { discoverTv } from "../../services/apiTvshows";

export function useNetflixTv() {
  const { data: dataArray, isLoading } = useQuery({
    queryKey: ["Netflix-Tv"],
    queryFn: discoverTv,
  });

  const netflixTv = dataArray?.data;
  const error = dataArray?.error;

  console.log(error);

  return {
    netflixTv,
    isLoading,
    error,
  };
}
