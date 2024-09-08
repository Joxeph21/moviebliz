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
import Casts from "../ui/casts";
import Responsive from "../ui/Slider";

function MovieInfo() {
  const { id: movieId } = useParams();
  const apiImg = import.meta.env.VITE_API_HDIMAGE_URL;
  const [isExpanded, setIsExpanded] = useState(false);
  const { movie, isLoading, error } = useMovieID(movieId);
  const textExpanded = useRef(null);

  if (error)
    return (
      <Empty
        title={"Oops Something went wrong on our end"}
        message={"try again"}
      />
    );
  if (isLoading) return <Loader />;

  const {
    release_dates,
    credits,
    runtime,
    genres: genresArray,
    tagline,
    vote_average,
    poster_path,
    backdrop_path,
    title,
    production_countries,
    id,
    overview,
    release_date,
  } = movie;

  const { cast, crew } = credits;

  const directors = crew.filter((member) => member.department === "Directing");
  const writers = crew.filter((member) => member.department === "Writing");
  const artDirectors = crew.filter((member) => member.job === "Art Director"); // example role
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
      const existing = crewMap.get(name);

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

  // Convert Map to Array for rendering
  const uniqueCrew = Array.from(crewMap.values());

  console.log(allRelevantCrew);

  const isLong = Math.round(overview?.length / 15) > 15;

  const prd_countries = production_countries.map((r) => r.iso_3166_1);

  const RatingArray = release_dates.results
    .filter(({ iso_3166_1 }) => prd_countries.includes(iso_3166_1))
    .map(({ release_dates }) => ({
      rating: release_dates[0]?.certification || false,
    }));

  const [firstRating] = RatingArray;
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
          <div className="absolute mt-20 flex h-max flex-col items-center gap-10 space-y-3 p-2 md:mt-0 md:h-96 md:w-[85%] md:flex-row">
            <div className="relative flex w-max items-center justify-center">
              <img
                src={poster_path ? apiImg + poster_path : brokenImg}
                className="max-w-64 rounded-md"
                alt={`${title}_poster`}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c0c0c]"></div>
            </div>
            <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2 md:items-start">
              <div className="flex flex-col items-center justify-center gap-4 p-4 md:items-start md:gap-2">
                <h1 className="w-fit text-wrap text-center font-bebas text-5xl font-extrabold tracking-wide text-gray-50 md:text-6xl">
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
              <div className="flex w-1/2 items-start gap-10 text-neutral-400">
                {uniqueCrew.map((creator) => (
                  <div className="w-fit" key={creator.id}>
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

        <InfoSection>
          <div className="w-full">
            <Responsive
              array={cast}
              render={(cast) => <Casts key={cast.id} casts={cast} />}
            />
          </div>
          <div>
            <h3>Reviews</h3>
          </div>
        </InfoSection>
      </BannerBox>
    </Banner>
  );
}

export default MovieInfo;
