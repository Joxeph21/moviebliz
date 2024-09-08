// import { useQuery } from "@tanstack/react-query";
// import { fetchTv } from "../../services/apiTvshows";

// export function useTv() {
//   const {
//     data,
//     isLoading,
//     error,
//   } = useQuery({
//     queryFn: ({ queryKey }) => fetchTv({ page: queryKey[1] }),
//     queryKey: ["tv", 1],
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//   });

//   console.log(data?.data)

//   const tvShows = data?.data?.flatMap((page) => page.response) || [];
//   const nextPage = data?.pages?.[data.pages.length - 1]?.nextPage;

//   console.log(tvShows)

//   return {
//     tvShows,
//     isLoading,
//     error,
//     nextPage,
//   };
// }

import { useQuery } from "@tanstack/react-query";
import { fetchTv } from "../../services/apiTvshows";

export function useTv({filter, page}) {
  const { data, isLoading, error, fetchNextPage } = useQuery({
    queryFn: () => fetchTv({filter, page }),
    queryKey: ["tv", page],
    getNextPageParam: (lastPage) => {
      return lastPage.data.nextPage <= lastPage.data.totalPages
        ? lastPage.data.nextPage
        : undefined;
    },
    select: (data) => ({
      tvShows: data.data.response || [],
      nextPage: data.data.nextPage,
      totalPages: data.data.totalPages,
    }),
  });

  return {
    tvShows: data?.tvShows || [],
    isLoading,
    fetchNextPage,
    hasNextPage: data?.nextPage <= data?.totalPages,
    error,
  };
}
