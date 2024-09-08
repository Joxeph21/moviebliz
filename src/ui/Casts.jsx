import { useNavigate } from "react-router-dom";
import brokenImg from "../assets/brokenImage.png";

function Casts({ casts }) {
  const { name, character, id, profile_path } = casts;
  const apiImg = import.meta.env.VITE_API_IMAGE_URL;

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/people/${id}`)}
      className="jus grid h-60 w-36 cursor-pointer grid-rows-2 gap-2 rounded-md sm:h-[17em] sm:w-44 md:h-64 md:w-40"
    >
      <div
        className="row-span-2 h-48 w-full rounded-t-md md:h-56"
        style={{
          backgroundImage: `url(${profile_path ? apiImg + profile_path : brokenImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="flex h-full min-h-14 w-full flex-col justify-center space-y-3 rounded-b-md bg-neutral-800 px-2 py-1 text-gray-50 sm:min-h-20">
        <h4 className="text-wrap text-sm font-semibold capitalize">{name}</h4>
        <p className="text-xs font-bold text-gray-400">{character}</p>
      </div>
    </div>
  );
}

export default Casts;
