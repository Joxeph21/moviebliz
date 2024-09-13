import { useMutation } from "@tanstack/react-query";
import { addReviewAPI } from "../../../services/apiUserData";
import { toast } from "react-toastify";

export function useAddReview() {
  const {
    isPending: isLoading,
    error,
    mutate: addReview,
  } = useMutation({
    mutationFn: (review) => addReviewAPI(review),
    mutationKey: ["review"],
    onSuccess: () => {
      toast.success("Review Submitted", {
        autoClose: 1000,
      });
    },
    onError: (err) => {
      if (err.message !== "User must be logged in") {
        toast.error("Failed to Review", {
          autoClose: 1000,
        });
      }
    },
  });
  return {
    addReview,
    isLoading,
    error,
  };
}
