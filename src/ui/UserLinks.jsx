import Link from "./Link";
import { FaHeart, FaThList, FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useSidebar } from "../contexts/sideBarContext";
import { useUser } from "../features/Users/useUser";
import useLogout from "../features/Users/useLogout";
import MiniLoader from "./MiniLoader";

function UserLinks() {
  const { setNavOpen } = useSidebar();
  const { isAuthenticated } = useUser();
  const { logout, isLoading } = useLogout();

  function handleLogout() {
    if (!isLoading) {
      logout();
    }
  }

  if(isLoading) return <MiniLoader/>

  return (
    <>
      {isAuthenticated && (
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

          <Link icon={<BiLogOut size={18} />} onClick={handleLogout}>Log out</Link>
        </>
      )}
      {!isAuthenticated && (
        <Link icon={<FaUser size={18} />} LinkTo="/create-account">
          Sign in
        </Link>
      )}
    </>
  );
}

export default UserLinks;
