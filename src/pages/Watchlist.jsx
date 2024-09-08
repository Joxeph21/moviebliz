import { HiX } from "react-icons/hi";
import { useUserData } from "../contexts/userDataContext";
import Banner from "../ui/Banner";
import Box from "../components/Box";
import Button from "../ui/Button";
import Empty from "../ui/Empty";
import MovieGrid from "../ui/MovieGrid";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";

function Watchlist() {
  const { watchlistArray, Clear_Watchlist } = useUserData();

  if (!watchlistArray.length)
    return (
      <Empty
        icon="👀"
        title={"Your Watchlist Looks Empty"}
        message={"Add Movies to watchlist"}
        RouteText={"Explore"}
        RouteLink={"/movies"}
      />
    );

  return (
    <Banner>
      <Box title={`Watchlist (${watchlistArray.length})`} />
      <MovieGrid array={watchlistArray} />
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
              onConfirm={() => Clear_Watchlist()}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Banner>
  );
}

export default Watchlist;
