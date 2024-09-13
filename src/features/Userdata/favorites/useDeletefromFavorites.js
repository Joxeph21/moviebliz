import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  clearFavoritesAPI,
  removefromFavoritesAPI,
} from "../../../services/apiUserData";
import { toast } from "react-toastify";

export function useDeleteFavorite() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteFavoritesMovie,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: (id) => removefromFavoritesAPI(id),
    mutationKey: ["favorites"],
    onSuccess: () => {
      toast.success("Removed from Favorites", {
        autoClose: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
    onError: () =>
      toast.error("Failed to delete", {
        autoClose: 1000,
      }),
  });
  console.log(isLoading);
  return {
    deleteFavoritesMovie,
    isLoading,
    error,
  };
}

export function useClearfavorites() {
  const queryClient = useQueryClient();
  const { mutate: clearFavorites, isPending: clearingFavorites } = useMutation({
    mutationFn: clearFavoritesAPI,
    mutationKey: ["favorites"],
    onSuccess: () => {
      toast.success("Favorites Cleared", {
        autoClose: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
    onError: () =>
      toast.error("Failed to Clear", {
        autoClose: 1000,
      }),
  });
  return {
    clearFavorites,
    clearingFavorites,
  };
}
