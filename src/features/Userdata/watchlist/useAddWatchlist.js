import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addtoWatchlistAPI } from "../../../services/apiUserData";
import { toast } from "react-toastify";

export function useAddWatchlist() {
  const queryClient = useQueryClient();
  const {
    mutate: addtoWatchlist,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (movie) => addtoWatchlistAPI(movie),
    mutationKey: ["watchlist"],
    onSuccess: () => {
      toast.success("Added to Watchlist", {
        autoClose: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
    onError: () =>
      toast.error("Failed to Add", {
        autoClose: 1000,
      }),
  });

  return { addtoWatchlist, isLoading, error };
}
