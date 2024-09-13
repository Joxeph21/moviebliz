import { toast } from "react-toastify";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useAddWatchlist } from "../features/Userdata/watchlist/useAddWatchlist";
import { useWatchlist } from "../features/Userdata/useWatchlist";
import { useUser } from "../features/Users/useUser";
import { useDeleteWatchlist } from "../features/Userdata/watchlist/useDeletefromWatchlist";
import MiniLoader from "./MiniLoader";
import { useFavorites } from "../features/Userdata/favorites/useFavorites";
import { useAddFavorites } from "../features/Userdata/favorites/useAddFavorites";
import { useDeleteFavorite } from "../features/Userdata/favorites/useDeletefromFavorites";
import { useAddLists } from "../features/Userdata/lists/useAddLists";
import { useList } from "../features/Userdata/lists/useLists";
import { useDeleteFromList } from "../features/Userdata/lists/useDeletefromLists";

function MovieOptions({ id, movie, setOpenMenu }) {
  const { addtoWatchlist, isLoading: addingtoWatchlist } = useAddWatchlist();
  const { favorites } = useFavorites();
  const { addtoFavorites, isLoading: addingtoFavorites } = useAddFavorites();
  const { addtoLists, isLoading: addingtoLists } = useAddLists();
  const { lists } = useList();
  const { watchlist } = useWatchlist();
  const { deleteWatchlistMovie, isLoading: isDeletingWatchlist } =
    useDeleteWatchlist();
  const { deleteFavoritesMovie, isLoading: isDeletingFavorite } =
    useDeleteFavorite();
  const { deleteListMovie, isLoading: isDeletingList } = useDeleteFromList();
  const { user, isAuthenticated } = useUser();

  const isInWatchlist = watchlist?.find((el) => id === el?.id) ? true : false;
  const isInList = lists.find((el) => id === el?.id) ? true : false;
  const isInFavorites = favorites?.find((el) => id === el?.id) ? true : false;

  const menuRef = useOutsideClick(() => setOpenMenu(false));

  const isLoading =
    addingtoWatchlist ||
    addingtoFavorites ||
    isDeletingFavorite ||
    isDeletingWatchlist ||
    isDeletingList ||
    addingtoLists;
  const profile = user?.profile;
  const name = profile?.username;

  const disabled = !name || !isAuthenticated;

  function handleFunc({ condition, name }) {
    if (name === "Watchlist") {
      if (disabled) {
        toast.error("User must be Logged in", { autoClose: 500 });

        setOpenMenu(false);
        return;
      }
      condition ? deleteWatchlistMovie(id) : addtoWatchlist(movie);
    } else if (name === "Favorites") {
      if (disabled) {
        toast.error("User must be Logged in", { autoClose: 500 });
        setOpenMenu(false);
        return;
      }
      condition ? deleteFavoritesMovie(id) : addtoFavorites(movie);
    } else if (name === "List") {
      if (disabled) {
        toast.error("User must be Logged in", { autoClose: 500 });
        setOpenMenu(false);
        return;
      }
      condition ? deleteListMovie(id) : addtoLists(movie);
    }
    if (!isLoading)
      setTimeout(() => {
        setOpenMenu(false);
      }, 500);
  }

  return (
    <div
      ref={menuRef}
      className="z-90 menu-container absolute top-20 w-40 rounded-md bg-gray-50 py-2 text-neutral-800 sm:w-44"
    >
      <ul className="p-2 text-center">
        {isLoading ? (
          <MiniLoader color="black" />
        ) : (
          <>
            <li
              className="cursor-pointer py-1 text-sm hover:bg-green-500"
              onClick={() =>
                handleFunc({ condition: isInWatchlist, name: "Watchlist" })
              }
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </li>
            <li
              className="cursor-pointer py-1 text-sm hover:bg-green-500"
              onClick={() =>
                handleFunc({ condition: isInFavorites, name: "Favorites" })
              }
            >
              {isInFavorites ? "Remove from Favorites" : "Add to Favorites"}
            </li>
            <li
              className="cursor-pointer py-1 text-sm hover:bg-green-500"
              onClick={() => handleFunc({ condition: isInList, name: "List" })}
            >
              {isInList ? "Remove from List" : "Add to List"}
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default MovieOptions;
