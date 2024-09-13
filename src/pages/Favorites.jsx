import { HiX } from "react-icons/hi";
import Banner from "../ui/Banner";
import Box from "../components/Box";
import Button from "../ui/Button";
import MovieGrid from "../ui/MovieGrid";
import Empty from "../ui/Empty";
import { useFavorites } from "../features/Userdata/favorites/useFavorites";
import { useClearfavorites } from "../features/Userdata/favorites/useDeletefromFavorites";

function Favorites() {
  const { favorites } = useFavorites();
  const { clearFavorites, clearingFavorites } = useClearfavorites();

  if (!favorites.length)
    return (
      <Empty
        icon="👀"
        title={" No Favorite Movies yet...Strange"}
        message={"Go Like some Movies"}
        RouteText={"Explore"}
        RouteLink={"/movies"}
      />
    );
  return (
    <Banner>
      <Box title={`Favourites (${favorites.length})`} />
      <MovieGrid array={favorites} />
      <div className="mt-4">
        <Button
          icon={<HiX />}
          onClick={() => clearFavorites()}
          type={"primary"}
          disabled={clearingFavorites}
        >
          Clear Favorites
        </Button>
      </div>
    </Banner>
  );
}

export default Favorites;
