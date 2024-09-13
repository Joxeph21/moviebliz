import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  clearWatchlistAPI,
  removefromWatchlistAPI,
} from "../../../services/apiUserData";
import { toast } from "react-toastify";

export function useDeleteWatchlist() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteWatchlistMovie,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: (id) => removefromWatchlistAPI(id),
    mutationKey: ["watchlist"],
    onSuccess: () => {
      toast.success("Removed from Watchlist", {
        autoClose: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
    onError: () =>
      toast.error("Failed to delete", {
        autoClose: 1000,
      }),
  });
  console.log(isLoading);
  return {
    deleteWatchlistMovie,
    isLoading,
    error,
  };
}

export function useClearWatchlist() {
  const queryClient = useQueryClient();
  const {
    mutate: clearWatchlist,
    isPending: clearingWatchlist,
  } = useMutation({
    mutationFn: clearWatchlistAPI,
    mutationKey: ["watchlist"],
    onSuccess: () => {
      toast.success("Watchlist Cleared", {
        autoClose: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
    onError: () =>
      toast.error("Failed to Clear", {
        autoClose: 1000,
      }),
  });
  return {
    clearWatchlist,
    clearingWatchlist,
  };
}
