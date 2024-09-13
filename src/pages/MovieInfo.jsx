import { useParams } from "react-router-dom";
import { useMovieID } from "../features/Movies/useMovieID";
import brokenBImg from "../assets/defaultLogo.png";
import brokenImg from "../assets/brokenImage.png";
import Banner from "../ui/Banner";
import Loader from "../ui/Loader";
import Optionsmenu from "../ui/Optionsmenu";
import TextExpander from "../ui/TextExpander";
import { useRef, useState } from "react";
import Rating from "../ui/Rating";
import { formatRuntime } from "../utils/helper";
import InfoSection from "../ui/InfoSection";
import Empty from "../ui/Empty";
import BannerBox from "../components/BannerBox";
import Casts from "../ui/Casts";
import { CenterMode, Responsive } from "../ui/Slider";
import Reviews from "../ui/Reviews";
import Section from "../components/Section";
import VideoCard from "../ui/VideoCard";
import { useUserData } from "../contexts/userDataContext";

function MovieInfo() {
  const { id: movieId } = useParams();
  const apiImg = import.meta.env.VITE_API_HDIMAGE_URL;
  const [isExpanded, setIsExpanded] = useState(false);
  const { movie, isLoading, error } = useMovieID(movieId);
  const textExpanded = useRef(null);
  const [imageLoaded, setImageLoaded] = useState({
    bannerImage: true,
    posterImage: false,
  });

  const { reviewsArray: userReviews } = useUserData();
  if (isLoading) return <Loader />;
  const existingReview = userReviews?.find(
    (review) => review?.movie?.id === movie?.id,
  );

  const { starRating } = existingReview || {};

  if (error) {
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

  const {
    release_dates,
    reviews: reviewsArray,
    credits,
    runtime,
    genres: genresArray,
    tagline,
    vote_average,
    poster_path,
    backdrop_path,
    title,
    videos: videosArray,
    production_countries,
    id,
    recommendations: recArray,
    similar: similiarArray,
    overview,
    release_date,
  } = movie;

  const moviee = { id, title, release_date, movie_data: movie, poster_path };

  const videos = videosArray?.results;
  const similar = similiarArray?.results;
  const recommended = recArray?.results;
  const reviews = reviewsArray?.results;

  const { cast, crew } = credits;

  const directors = crew.filter((member) => member.department === "Directing");
  const writers = crew.filter((member) => member.department === "Writing");
  const artDirectors = crew.filter((member) => member.job === "Art Director");
  const creators = crew.filter((member) => member.job === "Creator");

  const allRelevantCrew = [
    ...directors,
    ...writers,
    ...artDirectors,
    ...creators,
  ];

  const crewMap = new Map();

  allRelevantCrew.forEach((creator) => {
    const { name, known_for_department } = creator;

    if (crewMap.has(name)) {
      const existing = crewMap?.get(name);

      if (!existing.known_for_department.includes(known_for_department)) {
        existing.known_for_department += `, ${known_for_department}`;
      }
    } else {
      crewMap.set(name, {
        id: creator.id,
        name,
        known_for_department,
      });
    }
  });

  const uniqueCrew = Array.from(crewMap.values()).slice(0, 4);

  const isLong = Math.round(overview?.length / 15) > 15;

  const prd_countries = production_countries.map((r) => r.iso_3166_1);

  const RatingArray = release_dates.results
    .filter(({ iso_3166_1 }) => prd_countries.includes(iso_3166_1))
    .map(({ release_dates }) => ({
      rating: release_dates[0]?.certification || false,
    }));

  const [firstRating = {}] = RatingArray;
  const { rating: movieRating } = firstRating;

  const genres = genresArray?.map((el) => el.name).join(", ");

  return (
    <Banner>
      <BannerBox>
        <div
          className={`relative flex w-full flex-col items-center justify-center ${imageLoaded.bannerImage ? "" : "animate-pulse bg-zinc-600 px-2"} px-10 py-20`}
          style={{
            backgroundImage: `linear-gradient(transparent 0%, rgba(0, 0, 0, 0.7) 30%, #0c0c0c 100%), url(${backdrop_path ? apiImg + backdrop_path : brokenBImg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-20">
            <div
              className={`relative h-96 w-64 ${imageLoaded.posterImage ? "" : "animate-pulse bg-zinc-500"}`}
            >
              <img
                onLoad={() =>
                  setImageLoaded({ ...imageLoaded, posterImage: true })
                }
                src={poster_path ? apiImg + poster_path : brokenImg}
                className="max-w-64 rounded-md"
                alt={`${title}_poster`}
              />
              <div className="absolute inset-0 w-64 bg-gradient-to-b from-transparent via-transparent to-[#0c0c0c]"></div>
            </div>
            <div className="flex flex-col items-center gap-4 md:items-start">
              <h1 className="text-center font-bebas text-5xl font-extrabold text-gray-50 md:text-6xl">
                {title}
              </h1>
              <div className="flex flex-col items-center gap-3 text-sm text-neutral-100 md:flex-row">
                <div className="flex items-center gap-3">
                  {movieRating && (
                    <p className="p-1 ring-1 ring-gray-50">{movieRating}</p>
                  )}
                  <p>{release_date.split("-")[0]}</p>
                </div>
                <p>&bull; {formatRuntime(runtime)}</p>
                <p>&bull; {genres}</p>
              </div>
              <Rating rating={vote_average} />
              {starRating && (
                <p className="text-sm text-yellow-400">
                  You Rated this movie {starRating}⭐
                </p>
              )}
              <Optionsmenu id={id} movie={moviee} />
              <p className="text-xs italic text-neutral-400">{tagline}</p>
              <TextExpander
                isLong={isLong}
                ref={textExpanded}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                className={"text-neutral-200"}
                expandButtonText="Read more"
                collapsedNumWords={25}
              >
                {overview}
              </TextExpander>
              <div className="flex w-96 flex-col items-center justify-center p-2 sm:flex-row md:w-full">
                <div className="w-fullm grid grid-cols-3 items-center justify-center gap-10 p-2 text-neutral-400 md:grid-cols-5 md:gap-10">
                  {uniqueCrew.map((creator) => (
                    <div
                      className="h-30 flex w-20 flex-col items-center justify-evenly"
                      key={creator.id}
                    >
                      <p className="text-center text-sm text-gray-50">
                        {creator.name}
                      </p>
                      <h4 className="text-xs font-bold">
                        {creator.known_for_department}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <InfoSection>
          <div className="flex w-full flex-col gap-10">
            <h1 className="self-start text-2xl font-semibold text-gray-50">
              Casts
            </h1>
            <Responsive
              array={cast}
              render={(cast) => <Casts key={cast.id} casts={cast} />}
            />
          </div>
          <div className="flex w-full flex-col gap-10">
            <h1 className="self-start text-2xl font-semibold text-gray-50">
              Reviews ({reviews?.length})
            </h1>
            <div className="p-5">
              <CenterMode
                array={reviews}
                render={(review) => <Reviews key={review.id} review={review} />}
              />
            </div>
          </div>
          <Section
            RouteLink={`videos?type=movie`}
            title={"Teasers & Trailers"}
            link
            type="videocard"
            array={videos}
            render={(movie) => (
              <VideoCard
                key={movie.id}
                movieName={movie.name}
                trailerKey={movie?.key}
              />
            )}
          />

          <Section
            link={false}
            title={`More like ${title}`}
            array={recommended}
          />
          <Section link={false} title={`People also liked`} array={similar} />
        </InfoSection>
      </BannerBox>
    </Banner>
  );
}

export default MovieInfo;
