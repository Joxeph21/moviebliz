import { useParams } from "react-router-dom";
import Banner from "../ui/Banner";
import { usePeople } from "../features/People/usePeople";
import brokenImg from "../assets/brokenImage.png";
import Loader from "../ui/Loader";
import Empty from "../ui/Empty";
import { useState } from "react";
import InfoSection from "../ui/InfoSection";
import Section from "../components/Section";

function People() {
  const { id } = useParams();
  const apiImg = import.meta.env.VITE_API_HDIMAGE_URL;
  const { person: details, isLoading, error } = usePeople(id);
  const [imageLoaded, setImageLoaded] = useState({
    bannerImage: true,
    posterImage: false,
  });

  if (isLoading) return <Loader />;

  const {
    profile_path,
    name,
    combined_credits,
    gender: genderNum,
    biography,
    place_of_birth,
    birthday,
    known_for_department,
  } = details;

  const date = new Date();

  const movies = combined_credits?.cast
    ?.filter((el) => el?.backdrop_path)
    ?.sort((a, b) => b.popularity - a.popularity);

  const Curryear = date.getFullYear();

  const age = Curryear - Number(birthday.split("-")[0]);
  const gender = genderNum === 2 ? 'Male' : genderNum === 1 ? 'Female' : genderNum === 3 ? 'Non-binary ' : null

  console.log(age);
  console.log(details);

  if (error) {
    return error?.status === 404 ? (
      <Empty
        title={"404"}
        message={`It seems we don't have the details`}
        RouteText={"Go Back"}
        RouteLink={-1}
      />
    ) : (
      <Empty
        title={"Ooops"}
        message={`Something went wrong while fetching`}
        RouteText={"Back to Safety"}
      />
    );
  }

  return (
    <Banner>
      <div className="md:px-20">
        <div className="flex w-full flex-col items-center gap-10 rounded-r-lg bg-green-200/10 pt-10 md:flex-row md:gap-5 md:py-0">
          <div
            className={`relative h-96 w-64 ${imageLoaded.posterImage ? "" : "animate-pulse bg-zinc-500"}`}
          >
            <img
              onLoad={() =>
                setImageLoaded({ ...imageLoaded, posterImage: true })
              }
              src={profile_path ? apiImg + profile_path : brokenImg}
              className="max-w-64 rounded-md"
              alt={`${name}_poster`}
            />
          </div>

          <div>
            <div className="flex min-h-96 h-fit flex-col gap-5 p-4">
              <h1 className="text-center font-bebas text-5xl font-extrabold text-gray-50 md:text-6xl">
                {name}
              </h1>

              <p className="p-2 indent-4 text-sm text-neutral-300">
                {biography? biography : "No bio here 🕵️‍♂️"}
              </p>
              <div className="flex w-full md:flex-col md:gap-5 justify-evenly">
                <p className="text-xs font-semibold text-neutral-200">
                  Gender:{" "}
                  <span className="font-medium text-neutral-400">
                    {gender}
                  </span>
                </p>
                <p className="text-xs font-semibold text-neutral-200">
                  Date of Birth:{" "}
                  <span className="font-medium text-neutral-400">
                    {birthday}
                  </span>
                </p>
                <p className="text-xs font-semibold text-neutral-200">
                  Age:{" "}
                  <span className="font-medium text-neutral-400">
                    {age} years
                  </span>
                </p>
              </div>
              <div className="flex w-full justify-between  md:flex-col md:gap-5">
                <p className="text-xs font-semibold text-neutral-200">
                  Known for:{" "}
                  <span className="font-medium text-neutral-400">
                    {known_for_department}
                  </span>
                </p>
                <p className="text-xs font-semibold text-neutral-200">
                  Born in:{" "}
                  <span className="font-medium text-neutral-400">
                    {place_of_birth}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InfoSection>
        <Section title={"Famously Known in"} array={movies} link={false} />
      </InfoSection>
    </Banner>
  );
}

export default People;
