import { useSearchParams } from "react-router-dom";
import { useSearch } from "../features/searchResults/useSearch";
import Banner from "../ui/Banner";
import Loader from "../ui/Loader";
import MovieGrid from "../ui/MovieGrid";
import PageNumbers from "../ui/PageNumbers";
import { useEffect, useState } from "react";
import Empty from "../ui/Empty";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const currPage = searchParams.get("page") || 1;
  const [page, setPage] = useState(currPage);
  const { searchResults = {}, isLoading } = useSearch({ query, page });
  const movies = searchResults?.results?.filter(
    (el) => el?.media_type !== "person",
  );



  useEffect(() => {
    setPage(currPage);
  }, [currPage]);

  if (isLoading) return <Loader />;

  console.log(movies);

  if (movies?.length === 0) {
    return (
      <Empty
        title={"Ooops"}
        message={"No Movies Found"}
        RouteText={"Go Back"}
        RouteLink={-1}
      />
    );
  }

  return (
    <Banner>
      <h1 className="mb-8 text-base font-semibold text-gray-200">
        Search Results for
        <span className="text-green-400"> &apos;{query}&apos;</span>
      </h1>

      <MovieGrid array={movies} isLoading={isLoading} />
      <PageNumbers page={page} setPage={setPage} />
    </Banner>
  );
}

export default Search;
