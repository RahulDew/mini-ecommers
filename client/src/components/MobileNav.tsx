import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { adminNavLinks, customerNavLinks } from "../constants/constants";

const MobileNav = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const navLinks = user?.role === "admin" ? adminNavLinks : customerNavLinks;

  const handleOnClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className="h-[60px] z-50 w-full fixed sm:hidden bottom-0 flex justify-around items-center gap-2 lg:gap-3 shadow-lg backdrop-blur-lg bg-white bg-opacity-75 shadow-indigo-200 border-2 border-indigo-500 text-sm lg:text-base p-1.5 px-2 rounded-t-md">
      {navLinks.map((navLink, index) => {
        if (navLink.name === "Dashboard" && user?.role !== "admin") {
          return null;
        }
        return (
          <NavLink
            key={index}
            to={navLink.link}
            onClick={() => handleOnClick(navLink.link)}
            className={({ isActive, isPending }) =>
              isActive
                ? "bg-indigo-600 text-white w-[100px] text-center p-2 px-2 rounded-full hover:text-primary duration-300 text-xs"
                : "bg-white text-black hover:bg-indigo-600 hover:text-white w-[80px] lg:w-[120px] text-center text-xs  p-1.5 px-2 rounded-full hover:text-primary duration-300"
            }
          >
            {navLink.name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default MobileNav;
