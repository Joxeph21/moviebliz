import { useQuery } from "@tanstack/react-query";
import { getTv } from "../../services/apiTvshows";

export function useTvID(id) {
  const { data: tvShow, isLoading } = useQuery({
    queryKey: ["tv", id],
    queryFn: () => getTv(id),
  });
  return {
    tvShow,
    isLoading,
  };
}
