import { HiX } from "react-icons/hi";
import { useUserData } from "../contexts/userDataContext";
import Banner from "../ui/Banner";
import Box from "../components/Box";
import Button from "../ui/Button";
import MovieGrid from "../ui/MovieGrid";
import Empty from "../ui/Empty";

function Favorites() {
  const { favoritesArray, ClearFavorites } = useUserData();

  if (!favoritesArray.length)
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
      <Box title={`Favourites (${favoritesArray.length})`} />
      <MovieGrid array={favoritesArray} />
      <div className="mt-4">
        <Button
          icon={<HiX />}
          onClick={() => ClearFavorites()}
          type={"primary"}
        >
          Clear Favorites
        </Button>
      </div>
    </Banner>
  );
}

export default Favorites;
