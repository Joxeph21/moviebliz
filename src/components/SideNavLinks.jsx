import Navlinks from "../ui/Navlinks";
import UserLinks from "../ui/UserLinks";

function SideNavLinks() {
  return (
    <ul className="flex flex-col gap-4 text-gray-300">
      <Navlinks />

      <UserLinks />
    </ul>
  );
}

export default SideNavLinks;
