import { useMutation } from "@tanstack/react-query";
import { addtoListsAPI } from "../../../services/apiUserData";
import { toast } from "react-toastify";

export function useAddLists() {
  const { isPending: isLoading, mutate: addtoLists } = useMutation({
    mutationFn: addtoListsAPI,
    mutationKey: ["lists"],
    onSuccess: () =>
      toast.success("Added to Lists", {
        autoClose: 1000,
      }),
    onError: (err) =>
      toast.error(err.message, {
        autoClose: 1000,
      }),
  });
  return {
    addtoLists,
    isLoading,
  };
}
