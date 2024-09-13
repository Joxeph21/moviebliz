import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({ username, avatar }) =>
      updateCurrentUser({ username, avatar }),
    onSuccess: () => {
      toast.success("User account updated Successfully", {
        autoClose: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateUser };
}
