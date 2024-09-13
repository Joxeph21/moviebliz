import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  clearListsAPI,
  removefromListAPI,
} from "../../../services/apiUserData";
import { toast } from "react-toastify";

export function useDeleteFromList() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteListMovie,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: (id) => removefromListAPI(id),
    mutationKey: ["lists"],
    onSuccess: () => {
      toast.success("Removed from Lists", {
        autoClose: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
    onError: () =>
      toast.error("Failed to delete", {
        autoClose: 1000,
      }),
  });
  console.log(isLoading);
  return {
    deleteListMovie,
    isLoading,
    error,
  };
}

export function useClearList() {
  const queryClient = useQueryClient();
  const { mutate: clearlist, isPending: clearinglist } = useMutation({
    mutationFn: clearListsAPI,
    mutationKey: ["lists"],
    onSuccess: () => {
      toast.success("List Cleared", {
        autoClose: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
    onError: () =>
      toast.error("Failed to Clear", {
        autoClose: 1000,
      }),
  });
  return {
    clearlist,
    clearinglist,
  };
}
