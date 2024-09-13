import { useQuery } from "@tanstack/react-query";
import { getWatchlist } from "../../services/apiUserData";

export function useWatchlist() {
  const {
    isPending: isLoading,
    data: watchlist,
    error,
  } = useQuery({
    queryKey: ["watchlist"],
    queryFn: getWatchlist,
  });
  return {
    isLoading,
    watchlist,
    error,
  };
}
