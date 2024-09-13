import brokenImage from "../assets/brokenImage.png";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from "react";
import MovieOptions from "./MovieOptions";
const apiImg = import.meta.env.VITE_API_IMAGE_URL;

function MovieCard({ movieInfo }) {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { poster_path, title, id, release_date, name, first_air_date } =
    movieInfo;

  const movie = {
    id,
    poster_path,
    title,
    release_date,
    movie_data: movieInfo,
  };
  const year = release_date?.split("-")[0] || first_air_date?.split("-")[0];

  const isTv = first_air_date && name ? true : false;

  return (
    <div className="relative">
      <div
        className={`grid h-72 w-40 cursor-pointer grid-rows-2 gap-2 rounded-md ring-green-600/50 transition-all duration-200 ease-in ${openMenu ? "blur-sm" : "blur-none"} hover:ring-2 sm:h-80 sm:w-44`}
      >
        <div
          onClick={() => navigate(isTv ? `/tv/${id}` : `/movie/${id}`)}
          className="row-span-2 min-h-56 w-full rounded-t-md sm:min-h-60"
          style={{
            backgroundImage: `url(${poster_path ? apiImg + poster_path : brokenImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="flex h-full min-h-14 w-full items-center justify-between space-y-3 rounded-b-md bg-neutral-800/50 px-2 py-1 text-gray-50 sm:min-h-20">
          <div>
            <h4 className="text-wrap text-sm font-semibold capitalize">
              {name || title}
            </h4>
            <p className="text-xs font-bold text-gray-400">{year}</p>
          </div>
          <div>
            <SlOptionsVertical
              cursor={"pointer"}
              onClick={() => setOpenMenu(!openMenu)}
            />
          </div>
        </div>
      </div>

      {/* Fixed menu (outside the blurred content) */}
      {openMenu && (
        <MovieOptions id={id} movie={movie} setOpenMenu={setOpenMenu} />
      )}
    </div>
  );
}

export default MovieCard;
