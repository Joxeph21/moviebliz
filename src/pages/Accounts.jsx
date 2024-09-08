import { useNavigate } from "react-router-dom";
import Section from "../components/Section";
import { useAuth } from "../contexts/userAuthContext";
import { useUserData } from "../contexts/userDataContext";
import Banner from "../ui/Banner";
import Button from "../ui/Button";
import ConfirmDelete from "../ui/ConfirmDelete";
import Modal from "../ui/Modal";
import EditUser from "../user/Forms/EditUser";
import ReviewCard from "../ui/ReviewCard";

function Accounts() {
  const { watchlistArray, favoritesArray, listsArray, reviewsArray } = useUserData();
  const { user, Logout } = useAuth();
  const { name, profileImage, isAuthenticated } = user;
  const navigate = useNavigate();

  function handleLogout() {
    Logout();
    navigate("/");
  }

  return (
    <Banner>
      <Modal>
        <div className="w-full p-1 md:p-4">
          <div className="grid h-96 w-full content-center items-center justify-center gap-3">
            <div className="flex h-40 w-40 overflow-hidden rounded-lg object-cover object-center">
              <img
                src={`src/user/profile-pics/${profileImage ? profileImage : "profile1.jpg"}`}
                alt={name + `_profile_picture`}
              />
            </div>
            <h1 className="text-center text-xl font-bold">
              Hi, {name ? name : "Guest"}
            </h1>
            {!name || !isAuthenticated ? <Button type={'primary'} onClick={() => navigate("/create-account")} >Sign Up</Button> :<Modal.Open opens={"Edit User"}>
              <Button type={"secondary"}>Edit Profile</Button>
            </Modal.Open>}
          </div>
          <Section
            isUser
            RouteLink={"/user/favorites"}
            title={"Tv Shows and Movies you Liked"}
            array={favoritesArray}
          />
          <Section
            isUser
            title={`Your List`}
            RouteLink={"/user/lists"}
            array={listsArray}
          />
          <Section
            isUser
            title={`Watchlist`}
            RouteLink={"/watchlist"}
            array={watchlistArray}
          />
          <Section
            isUser
            title={`Tv Shows and Movies you've reviewed`}
            type="videocard"
            RouteLink={"/user/reviews"}
            array={reviewsArray}
            render={(review) => <ReviewCard key={review.movie.id} array={review}/>}
          />
        </div>
        <Modal.Window name={"Edit User"}>
          <EditUser />
        </Modal.Window>
        <div className="w-full space-y-3 p-2">
          <h2>Account</h2>
          <p className="text-sm text-neutral-400">
            This might end up deleting your account.
          </p>
          <Modal.Open opens={"logout"}>
            <Button type={"danger"}>Log Out</Button>
          </Modal.Open>
          <Modal.Window name={"logout"}>
            <ConfirmDelete
              title={"Logout"}
              warnText="Logout"
              onConfirm={handleLogout}
              message={
                "Are you sure you want to Logout?. This will result in loss of data and you might be required to sign up again "
              }
            />
          </Modal.Window>
        </div>
      </Modal>
    </Banner>
  );
}

export default Accounts;
