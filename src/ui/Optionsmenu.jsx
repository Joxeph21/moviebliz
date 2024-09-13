import { Tooltip, Zoom } from "@mui/material";
import MiniIcons from "./MiniIcons";
import { HiPlus } from "react-icons/hi2";
import { LuHeart } from "react-icons/lu";
import Button from "./Button";
import { ImCheckmark } from "react-icons/im";
import { FaHeart, FaThList } from "react-icons/fa";
import { BiListCheck } from "react-icons/bi";
import Modal from "./Modal";
import UserReviewForm from "../user/Forms/UserReviewForm";
import { useWatchlist } from "../features/Userdata/useWatchlist";
import { useFavorites } from "../features/Userdata/favorites/useFavorites";
import { useList } from "../features/Userdata/lists/useLists";
import { useReviews } from "../features/Userdata/Reviews/useReviews";
import { useUser } from "../features/Users/useUser";
import { useAddWatchlist } from "../features/Userdata/watchlist/useAddWatchlist";
import { useDeleteWatchlist } from "../features/Userdata/watchlist/useDeletefromWatchlist";
import { useDeleteFavorite } from "../features/Userdata/favorites/useDeletefromFavorites";
import { useDeleteFromList } from "../features/Userdata/lists/useDeletefromLists";
import { useAddFavorites } from "../features/Userdata/favorites/useAddFavorites";
import { useAddLists } from "../features/Userdata/lists/useAddLists";

function Optionsmenu({ id, movie }) {
  const { user, isAuthenticated } = useUser();
  const { addtoWatchlist } = useAddWatchlist();
  const { addtoFavorites } = useAddFavorites();
  const { addtoLists } = useAddLists();
  const { deleteWatchlistMovie } = useDeleteWatchlist();
  const { deleteFavoritesMovie } = useDeleteFavorite();
  const { deleteListMovie } = useDeleteFromList();



  const profile = user?.profile;
  const name = profile?.username;

  const { watchlist } = useWatchlist();
  const { favorites } = useFavorites();
  const { lists } = useList();
  const { reviews } = useReviews();

  const existingReview = reviews?.find(
    (review) => review?.movie?.id === movie?.id,
  );

  const { title: movieName, name: tvName } = movie;

  const Mname = movieName ? movieName : tvName;

  const isInWatchlist = watchlist?.find((el) => id === el?.id) ? true : false;

  const isInList = lists?.find((el) => id === el?.id) ? true : false;
  const isInFavorites = favorites?.find((el) => id === el?.id) ? true : false;

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
                disabled={!name || !isAuthenticated}
                message={
                  isInWatchlist
                    ? "Removed from Watchlist"
                    : "Added to Watchlist"
                }
                onAdd={() => addtoWatchlist(movie)}
                onRemove={() => deleteWatchlistMovie(id)}
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
                onAdd={() => addtoFavorites(movie)}
                onRemove={() => deleteFavoritesMovie(id)}
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
                onAdd={() => addtoLists(movie)}
                onRemove={() => deleteListMovie(id)}
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
              <Button type={"primary"} disabled={!name || !isAuthenticated}>
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
