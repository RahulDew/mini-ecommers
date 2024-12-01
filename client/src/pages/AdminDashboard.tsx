import { AiOutlineProduct } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";

import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <section className="space-y-10 mt-10">
      <h3 className="font-semibold text-left text-2xl flex">Admin Dashboard</h3>
      <div className="flex gap-5 flex-wrap justify-center items-center sm:justify-start">
        {/* product analysis */}
        <Link
          to={"/products-analysis"}
          className="bg-white w-[270px] h-[150px] sm:w-[300px] sm:h-[220px] lg:w-[400px] lg:h-[200px] rounded-md p-5 space-y-2 border-2 border-black hover:border-indigo-600 duration-300"
        >
          <div className="flex items-center gap-2">
            <AiOutlineProduct className="text-3xl text-indigo-600" />
            <span className="font-semibold text-indigo-600 text-2xl">
              Products
            </span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <span>Total Product: </span>
            <p className="text-indigo-700 text-xl">{"20"}</p>
          </div>
          <p className="max-sm:hidden">
            Check and analysis the products available in the store. You can add,
            update and delete products.
          </p>
        </Link>
        {/* order analysis */}
        <Link
          to={"order-analysis"}
          className="bg-white w-[270px] h-[150px] sm:w-[300px] sm:h-[220px] lg:w-[400px] lg:h-[200px] rounded-md p-5 space-y-2 border-2 border-black hover:border-indigo-600 duration-300"
        >
          <div className="flex items-center gap-2">
            <FaCartFlatbedSuitcase className="text-3xl text-indigo-600" />
            <span className="font-semibold text-indigo-600 text-2xl">
              Orders
            </span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <span>Total Orders: </span>
            <p className="text-indigo-700 text-xl">{"12"}</p>
          </div>
          <p className="max-sm:hidden">
            Analysis the orders placed by the users. change and update order
            status
          </p>
        </Link>
        {/* user analysis */}
        <Link
          to={"user-analysis"}
          className="bg-white w-[270px] h-[150px] sm:w-[300px] sm:h-[220px] lg:w-[400px] lg:h-[200px] rounded-md p-5 space-y-2 border-2 border-black hover:border-indigo-600 duration-300"
        >
          <div className="flex items-center gap-2">
            <BiUser className="text-3xl text-indigo-600" />
            <span className="font-semibold text-indigo-600 text-2xl">
              Users
            </span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <span>Total Product: </span>
            <p className="text-indigo-700 text-xl">{"20"}</p>
          </div>
          <p className="max-sm:hidden">
            Check Users and thier personal email and other details
          </p>
        </Link>
      </div>
    </section>
  );
}
