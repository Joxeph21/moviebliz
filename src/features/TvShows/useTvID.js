import { useQuery } from "@tanstack/react-query";
import { getTv } from "../../services/apiTvshows";

export function useTvID(id) {
  const { data: tvShowArray, isLoading } = useQuery({
    queryKey: ["tv", id],
    queryFn: () => getTv(id),
  });
  const tvShow = tvShowArray?.data;
  const error = tvShow?.error;

  console.log(error)
  return {
    tvShow,
    isLoading,
    error,
  };
}
