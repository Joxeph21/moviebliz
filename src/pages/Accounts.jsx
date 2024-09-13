import { useNavigate } from "react-router-dom";
import Section from "../components/Section";
import Banner from "../ui/Banner";
import Button from "../ui/Button";
import ConfirmDelete from "../ui/ConfirmDelete";
import Modal from "../ui/Modal";
import guestImage from "../assets/profile10.jpg";
import EditUser from "../user/Forms/EditUser";
import ReviewCard from "../ui/ReviewCard";
import { useUser } from "../features/Users/useUser";
import Loader from "../ui/Loader";
import useLogout from "../features/Users/useLogout";
import MiniLoader from "../ui/MiniLoader";
import { useWatchlist } from "../features/Userdata/useWatchlist";
import { useFavorites } from "../features/Userdata/favorites/useFavorites";
import { useList } from "../features/Userdata/lists/useLists";
import { useReviews } from "../features/Userdata/Reviews/useReviews";

function Accounts() {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useUser();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { watchlist, isLoading: watchlistLoading } = useWatchlist();
  const { favorites, isLoading: isLoadingFav } = useFavorites();
  const { lists, isLoading: isLoadingLists } = useList();
  const { reviews, isLoading: isLoadingReviews } = useReviews();

  if (
    isLoading ||
    watchlistLoading ||
    isLoadingFav ||
    isLoadingLists ||
    isLoadingReviews
  )
    return <Loader />;

  const profile = user?.profile || {};
  const { avatar, username } = profile;

  function handleLogout() {
    logout();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <Banner>
      <Modal>
        <div className="w-full p-1 md:p-4">
          <div className="grid h-96 w-full content-center items-center justify-center gap-3">
            <div className="flex h-40 w-40 justify-self-center overflow-hidden rounded-lg object-cover object-center">
              <img
                src={avatar ? avatar : guestImage}
                alt={username || "guest_profile_picture"}
              />
            </div>

            <h1 className="text-center text-xl font-bold">
              Hi, {username ? username : "Guest"}
            </h1>

            {!username || !isAuthenticated ? (
              <>
                <div className="justify-self-center text-center text-lg text-red-500">
                  You need to sign up or log in to access your account.
                </div>
                <div className="justify-self-center">
                  <Button
                    type={"primary"}
                    onClick={() => navigate("/create-account")}
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            ) : (
              <Modal.Open opens={"Edit User"}>
                <Button type={"secondary"}>Edit Profile</Button>
              </Modal.Open>
            )}
          </div>

          {(username || isAuthenticated) && (
            <>
              <Section
                isUser={true}
                title={`Tv Shows and Movies you've Liked`}
                RouteLink={"favorites"}
                array={favorites}
              />
              <Section
                isUser={true}
                title={`Watchlist`}
                RouteLink={"/watchlist"}
                array={watchlist}
              />
              <Section
                isUser={true}
                title={`Your List`}
                RouteLink={"list"}
                array={lists}
              />
              <Section
                isUser
                title={`Tv Shows and Movies you've reviewed`}
                type="videocard"
                RouteLink={"/user/reviews"}
                array={reviews}
                render={(review) => (
                  <ReviewCard key={review.movie.id} array={review} />
                )}
              />
            </>
          )}
        </div>

        <Modal.Window name={"Edit User"}>
          <EditUser />
        </Modal.Window>

        {username && isAuthenticated && (
          <div className="w-full space-y-3 p-2">
            <h2>Account</h2>
            <p className="text-sm text-neutral-400">
              This might end up deleting your account.
            </p>

            <Modal.Open opens={"logout"}>
              <Button type={"danger"}>
                {isLoggingOut ? <MiniLoader /> : "Log Out"}
              </Button>
            </Modal.Open>

            <Modal.Window name={"logout"}>
              <ConfirmDelete
                title={"Logout"}
                warnText="Logout"
                onConfirm={handleLogout}
                message={
                  "Are you sure you want to Logout? This will result in loss of data and you might be required to sign up again."
                }
              />
            </Modal.Window>
          </div>
        )}
      </Modal>
    </Banner>
  );
}

export default Accounts;
