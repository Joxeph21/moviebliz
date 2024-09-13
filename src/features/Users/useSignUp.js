import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useSignup() {
  let errorMessage;
  const { mutate: signUp, isPending: isLoading } = useMutation({
    mutationFn: async ({ username, email, password }) =>
      await signUpUser({ username, email, password }),
    onSuccess: () => {
      toast.success("User registration successful", {
        autoClose: 1000,
      });
    },
    onError: (error) => {
      if (error.message === "User already registered") {
        toast.error(error.message + ". Please proceed to Login", {
          autoClose: 2000,
        });
      } else {
      errorMessage = error.message
        toast.error(error.message, {
          autoClose: 1000,
        });
      }
    },
  });

console.log(errorMessage)
  return { signUp, isLoading };
}
