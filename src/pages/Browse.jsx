import { useParams, useSearchParams } from "react-router-dom";
import Box from "../components/Box";
import Banner from "../ui/Banner";
import { useNetflixMovies } from "../features/Movies/useNetflixMovies";
import { useNetflixTv } from "../features/TvShows/useNetflixTv";
import { useTrendingTv } from "../features/TvShows/useTrendingTv";
import { useTrendingMovies } from "../features/Movies/useTrendingMovies";
import MovieGrid from "../ui/MovieGrid";
import Loader from "../ui/Loader";
import Empty from "../ui/Empty";
import { useMovies } from "../features/Movies/useMovies";
import { useState } from "react";
import PageNumbers from "../ui/PageNumbers";
import { useTv } from "../features/TvShows/useTv";

function Browse() {
  const { section } = useParams();
  const [searchParams] = useSearchParams();
  const currPage = searchParams.get("page") || 1;
  const [page, setPage] = useState(currPage);
  const {
    movies = [],
    isLoading,
    error: error5,
  } = useMovies({
    filter: "top_rated",
    page: page,
  });
  const {
    tvShows = [],
    isLoading: isloadingt,
    error: error6,
  } = useTv({
    filter: "top_rated",
    page: page,
  });

  const name = section.split("&")[0];
  const query = section.split("&")[1];

  const { trendingMovies, isLoadingMovie, error: error1 } = useTrendingMovies();
  const {
    netflixMovies,
    isLoading: isLoadingNetflix,
    error: error2,
  } = useNetflixMovies();
  const {
    netflixTv,
    isLoading: isLoadingNetflixTv,
    error: error4,
  } = useNetflixTv();
  const { trendingTv, isLoadingTv, error3 } = useTrendingTv();
  // const {movies, isLoading: isloadingm, error: error5 } = useMovies({filter: 'top_rated'})

  const array =
    query === "trendingMovies"
      ? trendingMovies
      : query === "trendingTv"
        ? trendingTv
        : query === "netflixMovies"
          ? netflixMovies
          : query === "netflixTv"
            ? netflixTv
            : query === "topRated"
              ? movies
              : query === "topRatedTv"
                ? tvShows
                : [];

  const sortBy = searchParams.get("sortBy") || "popularity-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "desc" ? -1 : 1;

  const { first_air_date, name: tvName } = array;

  const isTv = first_air_date && tvName ? true : false;

  const sortedMovies = Array.isArray(array)
    ? [...array].sort((a, b) => {
        if (field === "name") {
          return a?.title?.localeCompare(b.title) * modifier;
        } else if (field === "popularity") {
          return (a.popularity - b.popularity) * modifier;
        } else {
          return (a[field] - b[field]) * modifier;
        }
      })
    : [];

  const sortedTv = Array.isArray(array)
    ? [...array].sort((a, b) => {
        if (field === "name") {
          return a?.name?.localeCompare(b.name) * modifier;
        } else if (field === "popularity") {
          return (a.popularity - b.popularity) * modifier;
        } else {
          return (a[field] - b[field]) * modifier;
        }
      })
    : [];

  if (
    isLoadingMovie ||
    isLoadingNetflix ||
    isLoadingNetflixTv ||
    isLoadingTv ||
    isLoading ||
    isloadingt
  )
    return <Loader />;

  if (error1 || error2 || error3 || error4 || error5 || error6)
    return (
      <Empty
        title={"Oops!"}
        message={"Something went wrong while fetching"}
        RouteText={"Retry"}
        RouteLink="/"
      />
    );

  return (
    <Banner>
      <Box title={name} />
      <MovieGrid array={isTv ? sortedTv : sortedMovies} />
      <PageNumbers page={page} setPage={setPage} />
    </Banner>
  );
}

export default Browse;
