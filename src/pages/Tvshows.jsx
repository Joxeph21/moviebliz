import { useState } from "react";
import { useTv } from "../features/TvShows/useTv";
import Banner from "../ui/Banner";
import Box from "../components/Box";
import Filter from "../ui/Filter";
import Loader from "../ui/Loader";
import MovieGrid from "../ui/MovieGrid";
import PageNumbers from "../ui/PageNumbers";
import { useSearchParams } from "react-router-dom";

function Tvshows() {
  const [searchParams] = useSearchParams();
  const currPage = searchParams.get("page") || 1;
  const [page, setPage] = useState(currPage);
  const { tvShows = [], isLoading, error } = useTv({ page });

  if (isLoading) return <Loader />;

  const sortBy = searchParams.get("sortBy") || "popularity-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "desc" ? -1 : 1;

  const sortedTv = Array.isArray(tvShows)
    ? [...tvShows].sort((a, b) => {
        if (field === "name") {
          return a?.name?.localeCompare(b.name) * modifier;
        } else if (field === "popularity") {
          return (a.popularity - b.popularity) * modifier;
        } else {
          return (a[field] - b[field]) * modifier;
        }
      })
    : [];

  console.log(tvShows);

  return (
    <Banner>
      <Box title={"Tv Shows"}>
        <Filter />
      </Box>
      <MovieGrid array={sortedTv} error={error} isLoading={isLoading} />
      <PageNumbers page={page} setPage={setPage} />
    </Banner>
  );
}

export default Tvshows;
