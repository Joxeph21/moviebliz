import { toast } from "react-toastify";
import { useUserData } from "../contexts/userDataContext";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useAuth } from "../contexts/userAuthContext";

function MovieOptions({ id, movie, setOpenMenu }) {
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

  const { user } = useAuth();
  const { name, isAuthenticated } = user;

  const isInWatchlist = watchlistArray.find((el) => id === el?.id)
    ? true
    : false;
  const isInList = listsArray.find((el) => id === el?.id) ? true : false;
  const isInFavorites = favoritesArray.find((el) => id === el?.id)
    ? true
    : false;

  const disabled = !name || !isAuthenticated;

  const menuRef = useOutsideClick(() => setOpenMenu(false));

  function handleFunc({ condition, name }) {
    if (name === "Watchlist") {
      condition ? Remove_From_Watchlist(id) : Add_To_Watchlist(movie);
    } else if (name === "Favorites") {
      if (disabled) {
        toast.error("User must be Logged in", { autoClose: 1000 });
        return;
      }
      condition ? Remove_From_favorites(id) : Add_To_favorites(movie);
    } else if (name === "List") {
      if (disabled) {
        toast.error("User must be Logged in", { autoClose: 1000 });
        return;
      }
      condition ? Remove_From_list(id) : Add_To_list(movie);
    }

    toast.success(condition ? `Removed from ${name}` : `Added to ${name}`, {
      autoClose: 1000,
    });
  }

  return (
    <div
      ref={menuRef}
      className="z-90 menu-container absolute top-20 w-40 rounded-md bg-gray-50 py-2 text-neutral-800 sm:w-44"
    >
      <ul onClick={() => setOpenMenu(false)} className="p-2 text-center">
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
      </ul>
    </div>
  );
}

export default MovieOptions;
