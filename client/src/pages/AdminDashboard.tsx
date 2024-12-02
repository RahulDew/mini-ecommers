import { AiOutlineProduct } from "react-icons/ai";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { baseURL } from "../config/config";
import { useEffect, useState } from "react";

interface Ioverview {
  productCount: number;
  orderCount: number;
  userCount: number;
  totalQuantity: number;
}

export default function AdminDashboard() {
  const [overview, setOverview] = useState<Ioverview | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/analysis/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        console.log(result);
        setOverview(result);
      } else {
        console.log(result.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOverview();
  }, []);

  return (
    <section className="space-y-5 my-10">
      <h3 className="font-semibold text-left text-xl sm:text-2xl flex">
        Admin Dashboard
      </h3>
      <div className="space-y-2">
        <div className="flex justify-center sm:justify-start gap-5 flex-wrap">
          <div className="flex gap-3 items-center p-2 bg-white border-2 border-black rounded-md">
            <h5 className="font-semibold text-lg">CUSTOMERS:</h5>
            <p
              className={`text-indigo-700 text-xl font-semibold ${
                loading && "animate-bounce duration-100"
              }`}
            >
              {!loading ? overview?.userCount : ".."}
            </p>
          </div>
          <div className="flex gap-3 items-center p-2 bg-white border-2 border-black rounded-md">
            <h5 className="font-semibold text-lg">SPRODUCT SOLD:</h5>
            <p
              className={`text-indigo-700 text-xl font-semibold ${
                loading && "animate-bounce duration-100"
              }`}
            >
              {!loading ? overview?.totalQuantity : ".."}
            </p>
          </div>
        </div>
        <div className="flex gap-5 flex-wrap justify-center items-center sm:justify-start">
          {/* product analysis */}
          <Link
            to={"/products-analysis"}
            className="bg-white w-[200px] h-[150px] sm:w-[300px] sm:h-[220px] lg:w-[400px] lg:h-[200px] rounded-md p-5 space-y-2 border-2 border-black hover:border-indigo-600 duration-300"
          >
            <div className="flex items-center gap-2">
              <AiOutlineProduct className="text-3xl text-indigo-600" />
              <span className="font-semibold text-indigo-600 text-2xl">
                Products
              </span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <span>Total Product: </span>
              <p
                className={`text-indigo-700 text-xl ${
                  loading && "animate-bounce duration-100"
                }`}
              >
                {!loading ? overview?.productCount : ".."}
              </p>
            </div>
            <p className="max-sm:hidden">
              Check and analysis the products available in the store. You can
              add, update and delete products.
            </p>
          </Link>
          {/* order analysis */}
          <Link
            to={"/orders-analysis"}
            className="bg-white w-[200px] h-[150px] sm:w-[300px] sm:h-[220px] lg:w-[400px] lg:h-[200px] rounded-md p-5 space-y-2 border-2 border-black hover:border-indigo-600 duration-300"
          >
            <div className="flex items-center gap-2">
              <FaCartFlatbedSuitcase className="text-3xl text-indigo-600" />
              <span className="font-semibold text-indigo-600 text-2xl">
                Orders
              </span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <span>Total Orders: </span>
              <p
                className={`text-indigo-700 text-xl ${
                  loading && "animate-bounce duration-100"
                }`}
              >
                {!loading ? overview?.orderCount : ".."}
              </p>
            </div>
            <p className="max-sm:hidden">
              Analysis the orders placed by the users. change and update order
              status
            </p>
          </Link>
        </div>
      </div>
      <h3 className="font-semibold text-left text-xl sm:text-2xl flex">
        Explore As a Customer
      </h3>
      <div className="flex gap-5 flex-wrap justify-center items-center sm:justify-start">
        {/* product analysis */}
        <Link
          to={"/products"}
          className="bg-white w-[200px] h-[100px] sm:w-[300px] sm:h-[170px] lg:w-[400px] rounded-md p-5 space-y-2 border-2 border-black hover:border-lime-600 duration-300"
        >
          <div className="flex items-center gap-2">
            <AiOutlineProduct className="text-3xl text-lime-600" />
            <span className="font-semibold text-lime-600 text-2xl">
              Products
            </span>
          </div>

          <p className="max-sm:hidden">
            Visit the store and check the products available. You can buy the
            products.
          </p>
        </Link>
        {/* order analysis */}
        <Link
          to={"/orders"}
          className="bg-white w-[200px] h-[100px] sm:w-[300px] sm:h-[170px] lg:w-[400px] rounded-md p-5 space-y-2 border-2 border-black hover:border-lime-600 duration-300"
        >
          <div className="flex items-center gap-2">
            <FaCartFlatbedSuitcase className="text-3xl text-lime-600" />
            <span className="font-semibold text-lime-600 text-2xl">Orders</span>
          </div>

          <p className="max-sm:hidden">
            As a user check and craete orders for the products available in the
            store.
          </p>
        </Link>
      </div>
    </section>
  );
}
