import { useEffect, useRef } from "react";
import { useSidebar } from "../contexts/sideBarContext";
import SideNavLinks from "./SideNavLinks";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/Users/useUser";
import guestImage from "../assets/profile10.jpg";

function SideNavBar() {
  const { navOpen, setNavOpen } = useSidebar(false);
  const sidebarElement = useRef(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarElement.current &&
        !sidebarElement.current.contains(event.target)
      ) {
        setNavOpen(false);
      }
    }

    if (navOpen) {
      document.addEventListener("mouseup", handleClickOutside);
    } else {
      document.removeEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [navOpen, setNavOpen]);

  if (!navOpen) return null;

  function handleClick() {
    setNavOpen(false);
    navigate("/user");
  }

  const avatar = user?.profile?.avatar;
  const username = user?.profile?.username;

  return (
    <div className="fixed inset-0 z-30 h-screen w-full bg-black/50 backdrop-blur-sm lg:hidden">
      <div
        className="h-screen w-[70%] bg-[#090909] pt-20 md:w-1/2"
        ref={sidebarElement}
      >
        <div className="flex h-max border-b border-neutral-300/50 p-4">
          <div className="flex w-full items-center gap-3">
            <img
              src={avatar ? avatar : guestImage}
              alt={username ? username : "guest" + `_profile_picture`}
              className="h-20 w-20 rounded-full"
            />
            <div onClick={handleClick}>
              <h4 className="text-neutral-300">
                {username ? username : "Guest"}
              </h4>
              <p className="text-xs text-neutral-500">View Profile</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <SideNavLinks />
        </div>
      </div>
    </div>
  );
}

export default SideNavBar;
