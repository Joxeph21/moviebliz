import { Responsive } from "../ui/Slider";
import MovieCard from "../ui/MovieCard";
import { HiArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function Section({
  title,
  array,
  query,
  isUser = false,
  RouteLink,
  link = true,
  background,
  type = "movie",
  render = (movie) => <MovieCard key={movie.id} movieInfo={movie} />,
}) {
  const navigate = useNavigate();

  return (
    <div className="my-4 flex w-dvw max-w-[1300px] flex-col gap-10 p-2">
      {array?.length > 0 ? (
        <>
          {link ? (
            <h1
              onClick={() =>
                navigate(
                  `${RouteLink ? RouteLink : `browse/${title}&${query}`}`,
                )
              }
              className="inline-flex w-fit cursor-pointer items-center gap-2 text-base font-bold hover:underline md:text-xl"
            >
              {title} <span>{<HiArrowRight />}</span>
            </h1>
          ) : (
            <h1 className="inline-flex w-fit cursor-pointer items-center gap-2 text-xl font-bold">
              {title}
            </h1>
          )}
          <div className={`mx-auto w-full px-1 md:mx-auto ${background}`}>
            <Responsive type={type} array={array} render={render} />
          </div>
        </>
      ) : isUser ? (
        <div className="flex h-40 w-full flex-col items-center justify-center gap-4 bg-neutral-600/20">
          <h1 className="text-center text-xl font-bold">{title} is Empty</h1>
          <Button type={"primary"} onClick={() => navigate("/movies")}>
            Go Add
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Section;
