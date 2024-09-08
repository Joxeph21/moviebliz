import { useParams, useSearchParams } from "react-router-dom";
import Banner from "../ui/Banner";
import { useMovieID } from "../features/Movies/useMovieID";
import Loader from "../ui/Loader";
import VideoGrid from "../ui/VideoGrid.jsx";
import Empty from "../ui/Empty.jsx";
import { useTvID } from "../features/TvShows/useTvID.js";

function Videos() {
  const { id: movieId } = useParams();
const [searchParams] = useSearchParams()
  const type = searchParams.get("type")


  const { movie, isLoading, error } = useMovieID(movieId);
  const { tvShow = [], isLoading2, error2 } = useTvID(movieId);

  if (isLoading || isLoading2) return <Loader />;

  if (error || error2) {
    return error?.status === 404 ? (
      <Empty
        title={"Movie 404"}
        message={`It seems we don't have that movie`}
        RouteText={"Back to Movies"}
        RouteLink="/movies"
      />
    ) : (
      <Empty
        title={"Ooops"}
        message={`Something went wrong while fetching`}
        RouteText={"Back to Safety"}
      />
    );
  }

  const { videos: mvideosArray, title } = movie;
  const { videos: tvideosArray, name } = tvShow;


  const videos =
    type === "movie"
      ? mvideosArray?.results
      : type === "tv"
        ? tvideosArray?.results
        : [];


  return (
    <Banner>
      <div>
        <h2 className="text-xl text-center font-semibold">
          Videos of <span className="text-green-500">{type === 'movie' ?title : name}</span>
        </h2>
      </div>
      <VideoGrid array={videos}  />
    </Banner>
  );
}

export default Videos;
