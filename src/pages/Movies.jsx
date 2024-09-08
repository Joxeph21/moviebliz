import { useSearchParams } from "react-router-dom";
import { useMovies } from "../features/Movies/useMovies";
import Banner from "../ui/Banner";
import Box from "../components/Box";
import MovieGrid from "../ui/MovieGrid";
import { useState } from "react";
import PageNumbers from "../ui/PageNumbers";

function Movies() {
  const [searchParams] = useSearchParams();
  const currPage = searchParams.get("page") || 1;
  const [page, setPage] = useState(currPage);
  const { movies = [], isLoading } = useMovies({
    page: page,
  });

  const sortBy = searchParams.get("sortBy") || "popularity-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "desc" ? -1 : 1;

  const sortedMovies = Array.isArray(movies)
    ? [...movies].sort((a, b) => {
        if (field === "name") {
          return a?.title?.localeCompare(b.title) * modifier;
        } else if (field === "popularity") {
          return (a.popularity - b.popularity) * modifier;
        } else {
          return (a[field] - b[field]) * modifier;
        }
      })
    : [];

  return (
    <Banner>
      <Box title={"Movies"}></Box>
      <MovieGrid array={sortedMovies} isLoading={isLoading} />
      <PageNumbers page={page} setPage={setPage} />
    </Banner>
  );
}

export default Movies;
