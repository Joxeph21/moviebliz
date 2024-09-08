import { useState, useEffect } from "react";
import Logo from "./Logo";
import UserIcons from "../components/UserIcons";
import { TfiMenu } from "react-icons/tfi";

import { HiX } from "react-icons/hi";
import { useSidebar } from "../contexts/sideBarContext";
import Navlinks from "./Navlinks";

function Header() {
  const { navOpen, setNavOpen } = useSidebar();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-0 z-40 flex h-14 items-center justify-between px-4 py-6 transition-all duration-300 sm:h-20 md:px-10 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center justify-center lg:hidden">
          {navOpen ? (
            <HiX
              onClick={() => setNavOpen(false)}
              className="cursor-pointer text-gray-50"
              size={21}
            />
          ) : (
            <TfiMenu
              onClick={() => setNavOpen(true)}
              className="cursor-pointer text-gray-50"
              size={21}
            />
          )}
        </div>
        <Logo />
        <ul className="hidden h-8 items-end space-x-8 text-xs font-semibold text-gray-300 md:hidden lg:flex">
          <Navlinks />
        </ul>
      </div>

      <UserIcons />
    </header>
  );
}

export default Header;
