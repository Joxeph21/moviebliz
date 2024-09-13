import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user} = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const error = user === 'Failed to fetch' ? true : false

  const isAuthenticated = user?.role === "authenticated";

  return { isLoading, user, isAuthenticated, error };
}
