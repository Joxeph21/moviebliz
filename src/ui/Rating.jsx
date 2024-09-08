import { Star } from "./StarRating";

function Rating({rating}) {
  return (
    <div className=" flex w-40 font-semibold items-center gap-2 p-2 text-sm text-yellow-500">
      <span>
        <Star size={20} full={true} color={"gold"} />
      </span>
      <p>{rating?.toFixed(2)} Rated</p>
    </div>
  );
}

export default Rating;
