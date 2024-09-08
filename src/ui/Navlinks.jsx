import { HiHome } from "react-icons/hi2";
import { useSidebar } from "../contexts/sideBarContext";
import Link from "./Link";
import { MdAccessTimeFilled, MdMovie } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";

function Navlinks() {
  const { setNavOpen } = useSidebar();
  return (
    <>
      <Link
        onClick={() => setNavOpen(false)}
        LinkTo={"/"}
        icon={<HiHome size={18} />}
      >
        Home
      </Link>
      <Link
        onClick={() => setNavOpen(false)}
        LinkTo={"/tv-shows"}
        icon={<MdMovie size={18} />}
      >
        Tv Shows
      </Link>
      <Link
        onClick={() => setNavOpen(false)}
        LinkTo={"/movies"}
        icon={<RiMovie2Fill size={18} />}
      >
        Movies
      </Link>

      <Link
        onClick={() => setNavOpen(false)}
        LinkTo={"/watchlist"}
        icon={<MdAccessTimeFilled size={18} />}
      >
        Watchlist
      </Link>
    </>
  );
}

export default Navlinks;
