import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addtoFavoritesAPI } from "../../../services/apiUserData";
import { toast } from "react-toastify";
export function useAddFavorites() {
  const queryClient = useQueryClient();
  const {
    mutate: addtoFavorites,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (movie) => addtoFavoritesAPI(movie),
    mutationKey: ["favorites"],
    onSuccess: () => {
      toast.success("Added to Favorites", {
        autoClose: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
    onError: (error) =>
      toast.error(error.message, {
        autoClose: 1000,
      }),
  });

  return { addtoFavorites, isLoading, error };
}
