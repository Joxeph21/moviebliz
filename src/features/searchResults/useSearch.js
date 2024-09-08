import { useQuery } from "@tanstack/react-query";
import { searchMoviesandTv } from "../../services/apiSearch";

export function useSearch({ query, page }) {
  const {
    data: dataArray,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => searchMoviesandTv({ query, page }),
    enabled: !!query,
  });

  const searchResults = dataArray?.data;

  return {
    searchResults,
    isLoading,
    error,
  };
}
