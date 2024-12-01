import { useEffect, useState } from "react";
import { baseURL } from "../config/config";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

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
  const [loading, setLoading] = useState<boolean>(false);
  const { id: productId } = useParams();

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
        console.log(result);
        setProductDetails(result);
      } else {
        console.log(result.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="p-10 px-0 md:px-5 xl:px-32">
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
        <div className="flex flex-col gap-7 ">
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
          <div className="flex flex-wrap gap-3">
            <button className="bg-white hover:bg-black hover:text-white duration-300 font-semibold px-6 py-3 rounded-full">
              Add to Cart
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
