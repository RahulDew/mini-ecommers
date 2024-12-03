import { useEffect, useState } from "react";
import { baseURL } from "../config/config";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { MdAdd, MdOutlineRemove } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";

interface IProductDetails {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  stockQuantity: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default function ProductPage() {
  const [productDetails, setProductDetails] = useState<IProductDetails | null>(
    null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { id: productId } = useParams();

  const { user, handleShowToast } = useAuthContext();

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        // console.log(result);
        setProductDetails(result);
      } else {
        // console.log(result.message);
        handleShowToast(
          result.message ? result.message : "Please try Again",
          "warning"
        );
      }
    } catch (error) {
      handleShowToast("Server Error", "failure");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleCreateOrder = async () => {
    try {
      const res = await fetch(`${baseURL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          customerId: user?.id,
          email: user?.role === "admin" ? "admin@email.com" : user?.email,
          product: productId,
          customerName: user?.role === "admin" ? "Admin" : user?.name,
          status: "Pending",
          totalPrice: (productDetails?.price ?? 0) * quantity,
          quantity,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        handleShowToast(result.message, "success");
      } else {
        handleShowToast(result.message, "failure");
      }
    } catch (error) {
      handleShowToast("Server Error", "failure");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="p-10 px-0 md:px-5 xl:px-32">
      {productDetails ? (
        <main className="flex flex-col md:flex-row gap-5 lg:gap-10">
          <div className="max-sm:w-full flex justify-center md:justify-start items-start gap-3 ">
            <div className="h-64 w-full sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gray-200 rounded-lg border-2 border-black hover:border-indigo-600 flex justify-center items-center mx-6">
              <img
                src={
                  productDetails?.imageUrl ||
                  "https://cdn-icons-png.flaticon.com/512/8136/8136031.png"
                }
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 ">
            <ul className=" flex gap-3 flex-col ">
              <li className="text-base sm:text-lg font-semibold">
                Category: {productDetails?.category}
              </li>
              <li className="text-xl sm:text-2xl font-semibold ">
                {productDetails?.name}
              </li>
              <p className="w-full text-base sm:text-lg text-gray-600">
                {productDetails?.description}
              </p>
              <li className="text-2xl font-semibold text-indigo-600">
                &#8377; {productDetails?.price}
              </li>
              <li className="text-xl sm:text-2xl font-semibold text-indigo-600">
                <span className="text-xl font-semibold text-black mr-3">
                  Remaining Stock:
                </span>
                {productDetails?.stockQuantity}
              </li>
            </ul>
            <div className="space-y-3">
              <div className="flex gap-5 items-center">
                <h5 className="font-semibold text-xl">Quantity: </h5>
                <div className="w-36 flex items-center justify-between bg-lime-100 rounded-lg text-2xl">
                  <button
                    style={{
                      cursor: quantity <= 1 ? "not-allowed" : "pointer",
                    }}
                    onClick={() =>
                      setQuantity((prevQuantity) =>
                        quantity <= 1 ? prevQuantity : prevQuantity - 1
                      )
                    }
                    className="bg-neutral-900 hover:bg-indigo-700 text-white duration-300 p-2  rounded-l-lg"
                  >
                    <MdOutlineRemove />
                  </button>
                  <p className="text-xl font-semibold">{quantity}</p>
                  <button
                    onClick={() =>
                      setQuantity((prevQuantity) => prevQuantity + 1)
                    }
                    className="bg-neutral-900 hover:bg-indigo-700 text-white duration-300 p-2 rounded-r-lg"
                  >
                    <MdAdd />
                  </button>
                </div>
              </div>
              <button
                onClick={handleCreateOrder}
                className="bg-black hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-lg mt-10 duration-300"
              >
                Order Now
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main className="text-center">
          <h3 className="font-semibold text-3xl">Product Not Found</h3>
        </main>
      )}
    </section>
  );
}
