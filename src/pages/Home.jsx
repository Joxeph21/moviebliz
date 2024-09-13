import { IoIosInformationCircleOutline } from "react-icons/io";
import outerBanks from "../assets/outerbanks.jpg";
import Button from "../ui/Button";
import { FaPlus } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../contexts/userDataContext";
import { toast } from "react-toastify";
import Section from "../components/Section";
import Banner from "../ui/Banner";
import { useTrendingMovies } from "../features/Movies/useTrendingMovies";
import Loader from "../ui/Loader";
import { useTrendingTv } from "../features/TvShows/useTrendingTv";
import { useNetflixMovies } from "../features/Movies/useNetflixMovies";
import { useNetflixTv } from "../features/TvShows/useNetflixTv";
import VideoCard from "../ui/VideoCard";
import Empty from "../ui/Empty";
import PersonalizationForm from "../forms/PersonalizationForm";
import { useMovies } from "../features/Movies/useMovies";
import { useTv } from "../features/TvShows/useTv";
import { useWatchlist } from "../features/Userdata/useWatchlist";
import { useAddWatchlist } from "../features/Userdata/watchlist/useAddWatchlist";
import { useDeleteWatchlist } from "../features/Userdata/watchlist/useDeletefromWatchlist";

const movie = {
  adult: false,
  backdrop_path: "/5O7CEMnV5bgJEj5pxf6XlhjqatC.jpg",
  genre_ids: [10759, 18, 9648],
  id: 100757,
  origin_country: ["US"],
  original_language: "en",
  original_name: "Outer Banks",
  overview:
    "A tight-knit group of teens unearths a long-buried secret, setting off a chain of illicit events that takes them on an adventure they'll never forget.",
  popularity: 109.218,
  poster_path: "/ovDgO2LPfwdVRfvScAqo9aMiIW.jpg",
  first_air_date: "2020-04-15",
  name: "Outer Banks",
  vote_average: 8.396,
  vote_count: 853,
};

function Home() {
  const { watchlist } = useWatchlist();
  const { addtoWatchlist } = useAddWatchlist();
  const { deleteWatchlistMovie } = useDeleteWatchlist();
  const { trendingMovies, isLoadingMovie, error: error1 } = useTrendingMovies();
  const {
    movies,
    isLoading: isLoadingm,
    error: error5,
  } = useMovies({ filter: "top_rated" });
  const {
    tvShows,
    isLoading: isloadingt,
    error: error6,
  } = useTv({ filter: "top_rated" });
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
  const navigate = useNavigate();

  const isLoading = [
    isLoadingMovie,
    isLoadingTv,
    isLoadingNetflix,
    isLoadingNetflixTv,
    isLoadingm,
    isloadingt,
  ].some(Boolean);

  if (isLoading) return <Loader />;
  const hasError =
    error1 || error2 || error3 || error4 || error5 || error6 ? true : false;

  if (hasError)
    return (
      <Empty
        title={"Oops!"}
        message={"Something went wrong while fetching"}
        RouteText={"Retry"}
        RouteLink="/"
      />
    );

  const isInArray = watchlist?.find((el) => movie.id === el.id) ? true : false;

  const hasTrailers = trendingMovies?.filter((movie) => movie.officialTrailer);

  function handleWatchlist() {
    if (isInArray) {
      deleteWatchlistMovie(movie.id);
    } else {
      addtoWatchlist(movie);
    }
  }

  return (
    <div className="grid h-max w-screen items-center p-0 text-gray-50">
      <div
        className="relative hidden h-screen w-full bg-center md:grid md:bg-cover"
        style={{ backgroundImage: `url(${outerBanks})` }}
      >
        <div className="z-10 mx-8 mt-28 w-[30rem] space-y-6 self-center p-4">
          <h1 className="text-5xl font-extrabold">OUTER BANKS</h1>
          <p className="p-2 text-sm">
            A tight-knit group of teens unearths a long-buried secret, setting
            off a chain of illicit events that takes them on an adventure
            they&apos;ll never forget.
          </p>
          <div className="flex gap-11 px-2">
            <Button
              condition={isInArray}
              onClick={handleWatchlist}
              icon={
                isInArray ? <ImCheckmark size={12} /> : <FaPlus size={20} />
              }
              type={"primary"}
            >
              {isInArray ? "Added to Watchlist" : "Add to Watchlist"}
            </Button>
            <Button
              onClick={() => navigate(`/tv/${movie.id}`)}
              icon={<IoIosInformationCircleOutline size={20} />}
              type={"secondary"}
            >
              More Info
            </Button>
          </div>
        </div>
        <div
          className="absolute inset-0 h-full w-full bg-center"
          style={{
            // backgroundImage:
            //   "linear-gradient(to bottom, transparent 40%, #0C0C0C 95%), linear-gradient(to left, transparent 60%, #0c0c0c46 95%)",
            background:
              "linear-gradient(180deg, transparent 70%, #0c0c0c 100%), linear-gradient(270deg, #00000096 0%, transparent 30%,  rgba(1, 1, 1, 0.381) 46%, rgba(2, 2, 2, 0.511) 52%)",
          }}
        ></div>
      </div>
      <Banner>
        <Section
          title={"Trending Movies this week"}
          array={trendingMovies}
          query={"trendingMovies"}
        />
        <Section
          title={"Trending Tv Shows this week"}
          array={trendingTv}
          query={"trendingTv"}
        />
        <Section
          title={"Popular Movies on Netflix"}
          array={netflixMovies}
          query={"netflixMovies"}
        />
        <Section
          title={"Popular Tv Shows on Netflix"}
          array={netflixTv}
          query={"netflixTv"}
        />
        <Section
          title={"Popular Trailers"}
          link={false}
          array={hasTrailers}
          background={"bg-green-500/30 h-80 py-5"}
          render={(movie) => (
            <VideoCard
              key={movie.id}
              movieName={movie.title}
              trailerKey={movie.officialTrailer?.key}
            />
          )}
          type="videocard"
        />
        <Section
          title={"Top Rated Tv Shows"}
          array={tvShows}
          query={"topRatedTv"}
        />
        <Section title={"Top Rated Movies"} array={movies} query={"topRated"} />
        {/* {!favoriteGenresArray?.length > 0 && <PersonalizationForm />}
      
        {favoriteGenresArray?.length > 0 && favoritesArray?.length > 0 && (
          <Section
            title={`Because you liked ${isTv ? name : title}`}
            array={similar}
            link={false}
          />
        )} */}
      </Banner>
    </div>
  );
}

export default Home;
