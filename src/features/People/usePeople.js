import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../../services/apiPeople";

export function usePeople(id) {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["people", id],
    queryFn: () => getPerson(id),
  });

  const person = data?.data

  return {
    person,
    error,
    isLoading,
  };
}
