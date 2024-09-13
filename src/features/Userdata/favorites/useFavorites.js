import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../../services/apiUserData";


export function useFavorites() {
  const {
    data: favorites,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  return {
    favorites,
    isLoading,
    error,
  };
}



