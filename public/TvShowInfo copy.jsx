import { useParams } from "react-router-dom";
import { useTvID } from "../src/features/TvShows/useTvID";
import brokenImg from "../assets/brokenImage.png";
import brokenBImg from "../assets/defaultLogo.png";
import Loader from "../src/ui/Loader";
import Banner from "../src/ui/Banner";
import { useEffect, useRef, useState } from "react";
import TextExpander from "../src/ui/TextExpander";
import Optionsmenu from "../src/ui/Optionsmenu";
import BannerBox from "../src/components/BannerBox";
import InfoSection from "../src/ui/InfoSection";
import Rating from "../src/ui/Rating";

function TvShowInfo() {
  const { id: tvId } = useParams();
  const apiImg = import.meta.env.VITE_API_HDIMAGE_URL;
  const [isExpanded, setIsExpanded] = useState(false);
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
  const { tvShow, isLoading } = useTvID(tvId);
  if (isLoading) return <Loader />;
  const {
    id,
    status,
    created_by,
    overview,
    number_of_seasons,
    genres: genresArray,
    first_air_date,
    last_air_date,
    tagline,
    vote_average,
    production_countries,
    backdrop_path,
    poster_path,
    content_ratings,
    name: original_name,
  } = tvShow;

  console.log(tvShow);

  const isLong = Math.round(overview?.length / 15) > 15;

  const firstYear = first_air_date?.split("-")[0];
  const lastYear = last_air_date?.split("-")[0];

  const prd_countries = production_countries.map((r) => r.iso_3166_1);

  const USR = content_ratings?.results.find((r) => r.iso_3166_1 === 'US') 

  const TVShowRatings = content_ratings?.results
    .filter(({ iso_3166_1 }) => prd_countries.includes(iso_3166_1))
    .map(({ iso_3166_1, rating }) => ({
      country: iso_3166_1,
      rating: rating || false,
    }));

  


  const [firstRating=[]] = TVShowRatings || false;
  const { rating: movieRating } = firstRating;

  const genres = genresArray?.map((el) => el.name).join(", ");

  return (
    <Banner>
      <BannerBox>
        <div
          className="flex h-[60rem] w-full items-start justify-center px-20 md:h-[36rem] md:items-center"
          style={{
            backgroundImage: `linear-gradient(transparent 0%, rgba(0, 0, 0, 0.7) 30%, #0c0c0c 100%), url(${backdrop_path ? apiImg + backdrop_path : brokenBImg})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute mt-20 flex h-[40rem] w-[85%] flex-col items-center gap-10 space-y-3 md:mt-0 md:h-96 md:flex-row">
            <div className="relative flex w-max items-center justify-center shadow-sm shadow-black">
              <img
                src={poster_path ? apiImg + poster_path : brokenImg}
                className="max-w-64 rounded-md"
                alt={`${original_name}_poster`}
              />
            </div>
            <div className="col-span-1 flex w-full flex-col items-center justify-center space-y-5 md:items-start">
              <div className="flex flex-col items-center justify-center gap-4 md:items-start">
                <h1 className="text-wrap text-center font-bebas text-5xl font-extrabold tracking-wide text-gray-50 md:text-6xl">
                  {original_name}
                </h1>
                <div className="flex max-w-max flex-col items-center gap-3 text-sm text-neutral-100 sm:flex-row">
                  <div className="flex items-center justify-between gap-3">
                    {movieRating || USR.rating && (
                      <p className="p-1 ring-1 ring-gray-50">{movieRating || USR.rating}</p>
                    )}
                    <p>
                      {firstYear === lastYear
                        ? firstYear
                        : firstYear + " - " + lastYear}
                    </p>
                    <p>
                      &bull; {number_of_seasons}
                      {number_of_seasons === 1 ? "Season" : "Season"}
                    </p>
                  </div>
                  <p className="text-wrap text-center sm:text-left">{genres}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-300">
                    Series:
                    <span
                      className={`${status === "Returning Series" ? "text-brandGreen" : status === "Ended" ? "text-red-500" : ""} `}
                    >
                      {' '+status}
                    </span>
                  </p>
                </div>
              </div>
              <Rating rating={vote_average} />
              <Optionsmenu id={id} />
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
              <div className="flex w-1/2 items-start gap-10   text-neutral-400">
                {created_by.map((creator) => (
                  <div className="w-fit" key={creator.id}>
                  <p className="text-center text-sm text-gray-50">{creator.name}</p>
                  <h4 className="font-bold text-xs">Creator</h4>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <InfoSection></InfoSection>
      </BannerBox>
    </Banner>
  );
}

export default TvShowInfo;
