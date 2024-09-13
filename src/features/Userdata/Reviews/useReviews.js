import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../../services/apiUserData";

export function useReviews() {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
  return {
    error,
    isLoading,
    reviews,
  };
}
