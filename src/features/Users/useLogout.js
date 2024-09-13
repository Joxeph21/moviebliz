import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Logout Successful", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    },
    onError: () => {
      toast.error("Something went wrong", {
        autoClose: 2000,
      });
    },
  });

  return { logout, isLoading };
}
