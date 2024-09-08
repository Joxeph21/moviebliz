import { useParams } from "react-router-dom";
import { useTvID } from "../features/TvShows/useTvID";
import brokenImg from "../assets/brokenImage.png";
import brokenBImg from "../assets/defaultLogo.png";
import Loader from "../ui/Loader";
import Banner from "../ui/Banner";
import { useEffect, useRef, useState } from "react";
import TextExpander from "../ui/TextExpander";
import Optionsmenu from "../ui/Optionsmenu";
import BannerBox from "../components/BannerBox";
import InfoSection from "../ui/InfoSection";
import Rating from "../ui/Rating";
import { CenterMode, Responsive } from "../ui/Slider";
import Casts from "../ui/casts";
import Empty from "../ui/Empty";
import Reviews from "../ui/Reviews";
import Section from "../components/Section";
import VideoCard from "../ui/VideoCard";
import { useUserData } from "../contexts/userDataContext";

function TvShowInfo() {
  const { id: tvId } = useParams();
  const apiImg = import.meta.env.VITE_API_HDIMAGE_URL;
  const apiSDImg = import.meta.env.VITE_API_SDIMAGE_URL;
  const [isExpanded, setIsExpanded] = useState(false);
  const { tvShow, isLoading, error } = useTvID(tvId);
  const textExpanded = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        textExpanded.current &&
        !textExpanded.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mouseup", handleClickOutside);
    } else {
      document.removeEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isExpanded, setIsExpanded]);
  const { reviewsArray: userReviews } = useUserData();

  if (isLoading) return <Loader />;

  if (error)
    return (
      <Empty
        title={"Ooops...My bad"}
        message={"Seems something went wrong while fetching"}
        RouteText={"Retry"}
      />
    );

  const {
    id,
    credits,
    reviews: reviewsArray,
    status,
    created_by,
    overview,
    number_of_seasons,
    genres: genresArray,
    first_air_date,
    last_air_date,
    tagline,
    recommendations: recArray,
    similar: similiarArray,
    videos: videosArray,
    vote_average,
    production_countries,
    backdrop_path,
    poster_path,
    content_ratings,
    name: original_name,
  } = tvShow;

  const { cast } = credits;

  const reviews = reviewsArray?.results;
  const recommended = recArray?.results;
  const videos = videosArray?.results;
  const similar = similiarArray?.results;

  const isLong = Math.round(overview?.length / 15) > 15;
  const firstYear = first_air_date?.split("-")[0];
  const lastYear = last_air_date?.split("-")[0];

  const existingReview = userReviews?.find(
    (review) => review?.movie?.id === tvShow?.id,
  );

  const { starRating } = existingReview || {};

  const prd_countries = production_countries.map((r) => r.iso_3166_1);
  const USR = content_ratings?.results.find((r) => r.iso_3166_1 === "US");

  const TVShowRatings = content_ratings?.results
    .filter(({ iso_3166_1 }) => prd_countries.includes(iso_3166_1))
    .map(({ iso_3166_1, rating }) => ({
      country: iso_3166_1,
      rating: rating || false,
    }));

  const [firstRating = []] = TVShowRatings || [];
  const { rating: movieRating } = firstRating;
  const genres = genresArray?.map((el) => el.name).join(", ");

  return (
    <Banner>
      <BannerBox>
        <div
          className="flex w-full items-start justify-center px-4 pt-20 md:px-20"
          style={{
            backgroundImage: `linear-gradient(transparent 0%, rgba(0, 0, 0, 0.7) 30%, #0c0c0c 100%), url(${backdrop_path ? apiImg + backdrop_path : brokenBImg})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex w-[85%] flex-col items-center gap-10 md:flex-row">
            <div className="flex w-max items-center justify-center shadow-sm shadow-black">
              <img
                src={poster_path ? apiSDImg + poster_path : brokenImg}
                className="max-w-64 rounded-md"
                alt={`${original_name}_poster`}
              />
            </div>
            <div className="flex w-full flex-col items-center justify-center space-y-5 rounded-b-md bg-gradient-to-t from-black/60 via-black/40 to-transparent p-2 md:items-start md:from-transparent md:via-transparent">
              <div className="flex flex-col items-center justify-center gap-4 md:items-start">
                <h1 className="text-wrap text-center font-bebas text-5xl font-extrabold tracking-wide text-gray-50 md:text-6xl">
                  {original_name}
                </h1>
                <div className="flex flex-col items-center gap-3 text-sm text-neutral-100 md:flex-row">
                  <div className="flex items-center gap-3">
                    {movieRating ||
                      (USR?.rating && (
                        <p className="p-1 font-bold ring-1 ring-gray-50">
                          {movieRating || USR.rating}
                        </p>
                      ))}
                    <p>
                      {firstYear === lastYear
                        ? firstYear
                        : `${firstYear} - ${lastYear}`}
                    </p>
                    <p>
                      &bull; {number_of_seasons}{" "}
                      {number_of_seasons === 1 ? "Season" : "Seasons"}
                    </p>
                  </div>
                  <p className="text-wrap p-2 text-center sm:text-left">
                    {genres}
                  </p>
                </div>
                <div id="content">
                  <p className="text-sm font-semibold text-gray-300">
                    Series:
                    <span
                      className={`${
                        status === "Returning Series"
                          ? "text-brandGreen"
                          : status === "Ended"
                            ? "text-red-500"
                            : ""
                      }`}
                    >
                      {" " + status}
                    </span>
                  </p>
                </div>
              </div>
              <Rating rating={vote_average} />
              {starRating && (
                <p className="text-sm text-yellow-400">
                  You Rated this Show {starRating}⭐
                </p>
              )}
              <Optionsmenu id={id} movie={tvShow} />
              <p className="text-center text-xs italic text-neutral-400 md:text-left">
                {tagline}
              </p>

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
              <div className="flex w-full items-center justify-center gap-10 p-3 text-neutral-400 md:justify-start">
                {created_by.map((creator) => (
                  <div className="w-fit" key={creator.id}>
                    <p className="text-center text-sm text-gray-50">
                      {creator.name}
                    </p>
                    <h4 className="text-xs font-bold">Creator</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <InfoSection>
          <div className="flex w-full flex-col gap-8 pt-2 md:gap-10">
            <h1 className="self-start text-2xl font-semibold text-gray-50">
              {`Cast (${cast.length})`}
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
            RouteLink={`videos?type=tv`}
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
            title={`More like ${original_name}`}
            array={recommended}
          />
          <Section link={false} title={`People also liked`} array={similar} />
        </InfoSection>
      </BannerBox>
    </Banner>
  );
}

export default TvShowInfo;
