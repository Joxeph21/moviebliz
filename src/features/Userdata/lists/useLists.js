import { useQuery } from "@tanstack/react-query";
import { getLists } from "../../../services/apiUserData";

export function useList() {
  const {
    data: lists,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lists"],
    queryFn: getLists,
  });
  return {
    lists,
    isLoading,
    error,
  };
}
