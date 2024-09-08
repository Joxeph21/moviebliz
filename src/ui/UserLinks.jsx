import Link from "./Link";
import { FaHeart, FaThList, FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useSidebar } from "../contexts/sideBarContext";
import { useAuth } from "../contexts/userAuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";

function UserLinks() {
  const { setNavOpen } = useSidebar();
  const { user, Logout } = useAuth();
  const { name, isAuthenticated } = user;

  const navigate = useNavigate();

  function handleLogout() {
    setNavOpen(false);
    Logout();
    navigate("/");
  }

  return (
    <>
      {name && isAuthenticated && (
        <>
          <Link
            onClick={() => setNavOpen(false)}
            icon={<FaThList size={18} />}
            LinkTo="user/lists"
          >
            Lists
          </Link>
          <Link
            onClick={() => setNavOpen(false)}
            icon={<FaHeart size={18} />}
            LinkTo="user/favorites"
          >
            Favorites
          </Link>
       
          <Modal>
            <Modal.Open opens={"logout"}>
              <Link icon={<BiLogOut size={18} />}>Log out</Link>
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
          </Modal>
        </>
      )}
      {!name && !isAuthenticated && (
        <Link icon={<FaUser size={18} />} LinkTo="/create-account">
          Sign in
        </Link>
      )}
    </>
  );
}

export default UserLinks;
