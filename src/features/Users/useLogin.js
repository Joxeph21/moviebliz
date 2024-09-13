import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApp } from "../../services/apiAuth";
import { toast } from "react-toastify";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ identifier, password }) =>
      loginApp({ identifier, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      if (error.message === "missing email or phone") {
        toast.error("Invalid Email or password", {
          autoClose: 2000,
        });
      } else {
        toast.error(error.message, {
          autoClose: 2000,
        });
      }
    },
  });

  return { login, isLoggingIn };
}
