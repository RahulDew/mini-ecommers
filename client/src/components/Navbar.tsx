import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { useAuthContext } from "../context/AuthContext";
import { LuLogOut } from "react-icons/lu";
import { adminNavLinks, customerNavLinks } from "../constants/constants";
import { BsFillCartFill } from "react-icons/bs";
const NavbarData = {
  icon: <BiCart />,
  logoName: "MiniEcommerce",
};

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuthContext();

  const navLinks = user?.role === "admin" ? adminNavLinks : customerNavLinks;
  const handleOnClick = (link: string) => {
    navigate(link);
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="w-full fixed z-30 px-3 lg:px-10 flex justify-center items-center backdrop-blur-md">
      <div className="w-full h-[60px] flex justify-between items-center font-semibold text-base ">
        <Link
          to={user?.role === "admin" ? "/dashboard" : "/products"}
          className="flex justify-center items-center gap-2 p-1 rounded-md"
        >
          <BsFillCartFill className="text-3xl text-indigo-600 " />
          <p className="max-sm:hidden text-indigo-600 font-bold text-xl sm:text-2xl">
            {NavbarData.logoName}
          </p>
        </Link>
        <div className="hidden md:flex justify-center items-center gap-2 lg:gap-3 shadow-md shadow-indigo-200 border-2 border-indigo-500 text-sm lg:text-base p-1.5 px-2 rounded-full">
          {navLinks.map((navLink, index) => {
            if (navLink.name === "Dashboard" && user?.role !== "admin") {
              return null;
            }
            return (
              <NavLink
                key={index}
                to={navLink.link}
                onClick={() => handleOnClick(navLink.link)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-indigo-600 text-white w-[80px] lg:w-[120px] text-center p-1.5 px-2 rounded-full hover:text-primary duration-300"
                    : "bg-white text-black hover:bg-indigo-600 hover:text-white w-[80px] lg:w-[120px] text-center  p-1.5 px-2 rounded-full hover:text-primary duration-300"
                }
              >
                {navLink.name}
              </NavLink>
            );
          })}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="flex justify-center items-center gap-2 bg-black hover:bg-indigo-600 text-white hover:text-white p-2 pb-3 px-4 rounded-xl duration-300"
          >
            <h5 className="max-sm:hidden">
              {user?.role !== "admin" ? user?.name.split(" ")[0] : "Admin"}
            </h5>
            <LuLogOut className="text-xl" />
          </button>
        </div>
      </div>
    </nav>
  );
}
