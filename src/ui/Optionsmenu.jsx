import { Tooltip, Zoom } from "@mui/material";
import MiniIcons from "./MiniIcons";
import { HiPlus } from "react-icons/hi2";
import { LuHeart } from "react-icons/lu";
import Button from "./Button";
import { useUserData } from "../contexts/userDataContext";
import { ImCheckmark } from "react-icons/im";
import { FaHeart, FaThList } from "react-icons/fa";
import { BiListCheck } from "react-icons/bi";
import { useAuth } from "../contexts/userAuthContext";
import Modal from "./Modal";
import UserReviewForm from "../user/Forms/UserReviewForm";

{
  /* <FaHeart /> */
  // <FaThList />
}

function Optionsmenu({ id, movie }) {
  const { user } = useAuth();
  const { reviewsArray } = useUserData();

  const {
    watchlistArray,
    Add_To_Watchlist,
    Remove_From_Watchlist,
    listsArray,
    Add_To_list,
    Remove_From_list,
    favoritesArray,
    Add_To_favorites,
    Remove_From_favorites,
  } = useUserData();

  const existingReview = reviewsArray?.find(
    (review) => review.movie.id === movie.id,
  );

  const { title: movieName, name: tvName } = movie;

  const Mname = movieName ? movieName : tvName;

  const { name, isAuthenticated } = user;

  const isInWatchlist = watchlistArray.find((el) => id === el?.id)
    ? true
    : false;

  const isInList = listsArray.find((el) => id === el?.id) ? true : false;
  const isInFavorites = favoritesArray.find((el) => id === el?.id)
    ? true
    : false;

  return (
    <div className="mb-3 flex w-80 flex-col items-center justify-evenly gap-3 md:flex-row">
      <Modal>
        <div className="flex w-40 justify-evenly rounded-sm bg-neutral-950/20 p-2">
          <Tooltip
            title={isInWatchlist ? "Remove from Watchlist" : `Add to Watchlist`}
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <div>
              <MiniIcons
                condition={isInWatchlist}
                message={
                  isInWatchlist
                    ? "Removed from Watchlist"
                    : "Added to Watchlist"
                }
                onAdd={() => Add_To_Watchlist(movie)}
                onRemove={() => Remove_From_Watchlist(id)}
                icon={
                  !isInWatchlist ? (
                    <HiPlus color="white" size={15} />
                  ) : (
                    <ImCheckmark color="white" size={12} />
                  )
                }
              />
            </div>
          </Tooltip>
          <Tooltip
            title={
              !name || !isAuthenticated
                ? "Log in to add to Favorites"
                : isInFavorites
                  ? "Remove from Favorites"
                  : `Add to Favorites`
            }
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <div>
              <MiniIcons
                condition={isInFavorites}
                disabled={!name || !isAuthenticated}
                message={
                  isInFavorites
                    ? "Removed from Favorites"
                    : "Added to Favorites"
                }
                onAdd={() => Add_To_favorites(movie)}
                onRemove={() => Remove_From_favorites(id)}
                icon={
                  isInFavorites ? (
                    <FaHeart color="white" />
                  ) : (
                    <LuHeart color="white" size={15} />
                  )
                }
              />
            </div>
          </Tooltip>
          <Tooltip
            title={
              !name || !isAuthenticated
                ? "Log in to add to List"
                : isInList
                  ? "Remove from Favorites"
                  : `Add to Favorites`
            }
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <div>
              <MiniIcons
                disabled={!name || !isAuthenticated}
                condition={isInList}
                message={isInList ? "Removed from List" : "Added to Lists"}
                onAdd={() => Add_To_list(movie)}
                onRemove={() => Remove_From_list(id)}
                icon={
                  isInList ? (
                    <BiListCheck size={20} color="white" />
                  ) : (
                    <FaThList color="white" size={15} />
                  )
                }
              />
            </div>
          </Tooltip>
        </div>
        <Tooltip
          title={!name || !isAuthenticated ? "Log in to add Review" : ""}
          placement="top"
          arrow
          TransitionComponent={Zoom}
        >
          <div>
            <Modal.Open opens={"reviewform"}>
              <Button disabled={!name || !isAuthenticated} type={"primary"}>
                {existingReview ? "Edit Review" : " Add a Review"}
              </Button>
            </Modal.Open>
            <Modal.Window name={"reviewform"}>
              <UserReviewForm name={Mname} movie={movie} />
            </Modal.Window>
          </div>
        </Tooltip>
      </Modal>
    </div>
  );
}

export default Optionsmenu;
