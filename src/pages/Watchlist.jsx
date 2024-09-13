import { HiX } from "react-icons/hi";
import { useUserData } from "../contexts/userDataContext";
import Banner from "../ui/Banner";
import Box from "../components/Box";
import Button from "../ui/Button";
import Empty from "../ui/Empty";
import MovieGrid from "../ui/MovieGrid";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import { useWatchlist } from "../features/Userdata/useWatchlist";
import Loader from "../ui/Loader";
import { useUser } from "../features/Users/useUser";
import { useClearWatchlist } from "../features/Userdata/watchlist/useDeletefromWatchlist";

function Watchlist() {
  const { user, isLoading: loadingUser } = useUser();
  const { watchlistArray, Clear_Watchlist } = useUserData();
  const { watchlist, isLoading: watchlistLoading } = useWatchlist();
  const { clearWatchlist, clearingWatchlist } = useClearWatchlist();

  const isLoading = loadingUser || watchlistLoading || clearingWatchlist;

  if (isLoading) return <Loader />;

  const profile = user?.profile;

  if (profile?.username ? !watchlist.length : !watchlistArray.length)
    return (
      <Empty
        icon="👀"
        title={"Your Watchlist Looks Empty"}
        message={"Add Movies to watchlist"}
        RouteText={"Explore"}
        RouteLink={"/movies"}
      />
    );

  function handleClearWatchlist() {
    if (profile?.username) {
      clearWatchlist();
    } else {
      Clear_Watchlist();
    }
  }

  return (
    <Banner>
      <Box
        title={`Watchlist (${profile?.username ? watchlist.length : watchlistArray.length})`}
      />
      <MovieGrid array={profile?.username ? watchlist : watchlistArray} />
      <div className="mt-4">
        <Modal>
          <Modal.Open opens={"clearWatchlist"}>
            <Button icon={<HiX />} type={"primary"}>
              Clear Watchlist
            </Button>
          </Modal.Open>
          <Modal.Window name={"clearWatchlist"}>
            <ConfirmDelete
              resourceName="Watchlist"
              onConfirm={handleClearWatchlist}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Banner>
  );
}

export default Watchlist;
