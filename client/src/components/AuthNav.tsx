import { Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { BsFillCartFill } from "react-icons/bs";
import { NavbarData } from "../constants/constants";

export default function AuthNav() {
  return (
    <nav className="w-full fixed z-30 px-3 lg:px-10 flex justify-center items-center backdrop-blur-md">
      <div className="w-full h-[60px] flex justify-between items-center font-semibold text-base ">
        <Link
          to={"/"}
          className="flex justify-center items-center gap-2 p-1 rounded-md"
        >
          <BsFillCartFill className="text-2xl sm:text-3xl text-indigo-600 " />
          <p className="text-indigo-600 font-bold text-xl sm:text-2xl">
            {NavbarData.logoName}
          </p>
        </Link>

        <div className="flex gap-2">
          <Link
            to={"/login"}
            className="flex justify-center items-center gap-2 bg-black hover:bg-indigo-600 text-white hover:text-white p-2 pb-3 px-4 rounded-xl duration-300"
          >
            <h5 className="max-sm:hidden">Login</h5>
            <LuLogIn className="text-xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
