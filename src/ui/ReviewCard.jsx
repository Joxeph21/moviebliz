import { useNavigate } from "react-router-dom";
import brokenImage from "../assets/brokenImage.png";

function ReviewCard({ array }) {
  const apiImg = import.meta.env.VITE_API_IMAGE_URL;

  const { poster_path, title, id, name, first_air_date } = array.movie;
  const isTv = first_air_date && name ? true : false;

  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(isTv ? `/tv/${id}` : `/movie/${id}`)}
      className="flex w-full max-w-xs cursor-pointer flex-col overflow-hidden rounded-lg bg-neutral-800 shadow-lg" 
    >
      <div
        className="aspect-w-16 aspect-h-9 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${poster_path ? apiImg + poster_path : brokenImage})`,
        }}
      ></div>
      {/* <div className="absolute inset-0 h-10 w-full bg-gradient-to-t from-red-500 via-transparent to-transparent opacity-50"></div> */}
      <div className="grid grid-cols-[auto,1fr] gap-2 p-4">
        <div
          className="h-36 w-24 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${poster_path ? apiImg + poster_path : brokenImage})`,
            backgroundSize: "contain",
          }}
        ></div>
        <div className="flex w-48 flex-col flex-wrap gap-2 px-1">
          <h4 className="text-md truncate text-wrap font-semibold text-gray-50 md:text-lg">
            {name || title}
          </h4>
          <h2 className="text-sm font-medium text-yellow-400">
            You Rated this {isTv ? "TV show" : "movie"} {array.starRating}⭐
          </h2>
          <p className="w-44 text-sm text-gray-300 text-wrap">
            {array.reviewText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
