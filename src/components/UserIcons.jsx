import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKey } from "../hooks/useKey";
import SearchBar from "../ui/SearchBar";
import Button from "../ui/Button";

import { LuSearch } from "react-icons/lu";
import { useSidebar } from "../contexts/sideBarContext";
import { useAuth } from "../contexts/userAuthContext";

function UserIcons() {
  const [openSearch, setOpenSearch] = useState(false);
  const { navOpen } = useSidebar();
  const [query, setQuery] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false); // Image loading state
  const navigate = useNavigate();
  const inputElement = useRef(null);
  const { user } = useAuth();
  const { name, isAuthenticated, profileImage } = user;

  useKey(["Enter", "Done", "Go"], () => {
    if (query && document.activeElement === inputElement.current) {
      navigate(`/search?q=${query}`);
    }
  });

  function handleClear() {
    setQuery("");
  }

  function handleQuery(e) {
    setQuery(e.target.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    if (query && document.activeElement === inputElement.current) {
      navigate(`/search?q=${query}`);
      inputElement.current.blur();
    }
  }

  useEffect(() => {
    function handleClickOutside() {
      if (
        inputElement.current &&
        document.activeElement !== inputElement.current
      ) {
        setOpenSearch(false);
      }
    }

    if (openSearch) {
      document.addEventListener("mouseup", handleClickOutside);
    } else {
      document.removeEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [openSearch]);

  useEffect(() => {
    if (openSearch && document.activeElement !== inputElement.current) {
      inputElement.current.focus();
    }
  }, [openSearch]);

  function handleOpenSearch() {
    setOpenSearch(true);
  }

  // Ensure the image loads properly
  useEffect(() => {
    if (profileImage) {
      const img = new Image();
      img.src = `src/user/profile-pics/${profileImage.toLowerCase()}`;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false); // Handle error loading image
    }
  }, [profileImage]);

  return (
    <div
      className={`z-10 flex items-center justify-between gap-8 ${
        navOpen ? "blur-sm" : ""
      }`}
    >
      {!openSearch ? (
        <LuSearch
          onClick={handleOpenSearch}
          size={23}
          className="cursor-pointer text-gray-50"
        />
      ) : (
        <SearchBar
          onCancel={handleClear}
          onSubmit={handleSubmit}
          value={query}
          ref={inputElement}
          onChange={handleQuery}
        />
      )}
      <div className="hidden sm:block">
        {!name && !isAuthenticated ? (
          <Button
            onClick={() => navigate("/create-account")}
            type={"primary"}
            size="small"
          >
            Sign up
          </Button>
        ) : (
          <div
            onClick={() => navigate("/user")}
            className="flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2 transition-all duration-300 ease-in-out hover:bg-neutral-900/10"
          >
            <h2 className="text-sm font-extrabold text-gray-50">
              <span className="hover:underline">{name}</span>
            </h2>
            <div className="h-8 w-8 overflow-hidden rounded-sm">
              {imageLoaded ? (
                <img
                  src={`src/user/profile-pics/${profileImage.toLowerCase()}`}
                  alt={name + `_profile_picture`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={`src/user/profile-pics/profile1.jpg`}
                  alt={name + `_profile_picture`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserIcons;
