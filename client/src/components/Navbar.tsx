import { Link, NavLink, useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import { BiCart } from "react-icons/bi";
import { useAuthContext } from "../context/AuthContext";
import { LuLogOut } from "react-icons/lu";
const NavbarData = {
  logoName: "MiniEcommerce",
  navLinks: [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Products", link: "/products" },
    { name: "Orders", link: "/orders" },
    { name: "Cart", link: "/cart" },
  ],
};

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuthContext();

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
          to={"/"}
          className="flex justify-center items-center gap-2 p-1 rounded-md"
        >
          <BiCart className="text-3xl text-indigo-600 " />
          <p className="text-indigo-600 font-bold text-xl">
            {NavbarData.logoName}
          </p>
        </Link>
        <div className="hidden md:flex justify-center items-center gap-2 lg:gap-3 bg-white shadow-2xl text-sm lg:text-base p-1.5 px-2 rounded-full">
          {NavbarData.navLinks.map((navLink, index) => {
            if (navLink.name === "Dashboard" && user?.role !== "dashboard") {
              return null;
            }
            return (
              <NavLink
                key={index}
                to={navLink.link}
                onClick={() => handleOnClick(navLink.link)}
                className={({ isActive, isPending }) =>
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
            className=" hidden md:flex justify-center items-center gap-2 bg-black hover:bg-indigo-600 text-white hover:text-white p-2 pb-3 px-4 rounded-xl duration-300"
          >
            <h5>
              {user?.role !== "admin" ? user?.name.split(" ")[0] : "Admin"}
            </h5>
            <LuLogOut className="text-xl" />
          </button>
        </div>
      </div>
      <MobileNav />
    </nav>
  );
}
