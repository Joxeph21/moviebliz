import { NavLink } from "react-router-dom";

function Link({ onClick, children, LinkTo, icon }) {
  if (!LinkTo)
    return (
      <li
        className="flex items-center gap-4 text-xs font-bold text-gray-200 sm:flex"
        onClick={onClick}
      >
        {icon && <span>{icon}</span>} {children}{" "}
      </li>
    );

  return (
    <NavLink
      onClick={onClick}
      className={({ isActive }) =>
        `text-gray-200 ${isActive ? "font-bold text-green-400" : ""} ${
          icon ? "flex items-center gap-4 text-xs" : ""
        }`
      }
      to={LinkTo}
      end={true}
    >
      {icon && <span className="lg:hidden">{icon}</span>}
      {children}
    </NavLink>
  );
}

export default Link;
