import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { baseURL } from "../config/config";
import Loader from "../components/Loader";

interface IProductsDetails {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  stockQuantity: string;
  price: number;
  category: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default function ProductsAnalysisPage() {
  const [products, setProducts] = useState<IProductsDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/products/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        console.log(result);
        setProducts(result.reverse());
      } else {
        console.log(result.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    console.log("Deleting product with ID: ", productId);
    const res = await fetch(`${baseURL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log("res: ", res);
    const result = await res.json();
    if (res.ok) {
      console.log(result);
    } else {
      console.log(result);
    }
  };

  return (
    <section className="space-y-10 py-5">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-2xl sm:text-3xl">Products</h3>
        <button
          onClick={() => {
            navigate("/add-product");
          }}
          className="flex justify-center items-center font-semibold gap-2 bg-indigo-600 hover:bg-indigo-700 text-white hover:text-white p-2 sm:pr-3 rounded-xl duration-300"
        >
          <BiPlus className="font-bold text-2xl sm:text-xl" />
          <span className="max-sm:hidden">Add Product</span>
        </button>
      </div>
      {loading ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : Array.isArray(products) && products.length > 0 ? (
        // Products
        <div className="flex justify-start gap-5">
          <table className="max-lg:hidden min-w-full text-sm text-left rounded-md text-black">
            <thead className="text-xs text-indigo-600 uppercase bg-white rounded-t-md">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product?._id}
                  className="odd:bg-indigo-100 even:bg-white border-b"
                >
                  <th
                    scope="row"
                    className="text-black font-semibold whitespace-nowrap hover:text-indigo-600 duration-300"
                  >
                    <Link
                      to={`/product/${product?._id}`}
                      className="px-6 py-4 block"
                    >
                      {product?.name.length < 18
                        ? product?.name
                        : product?.name.substring(0, 18)}
                    </Link>
                  </th>
                  <td className="px-6 py-4 max-w-[29px]">
                    {product?.category}
                  </td>
                  <td className="px-6 py-4">&#8377; {product?.price}</td>
                  <td className="px-6 py-4">{product?.stockQuantity}</td>
                  <td className="px-6 py-4">
                    {new Date(product?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/update-product/${product?._id}`}
                      className="px-2 py-1 rounded-sm font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white duration-300"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteProduct(product?._id)}
                      className="px-2 py-1 rounded-sm font-semibold text-sm bg-red-500 hover:bg-red-600 text-white duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="lg:hidden flex gap-5 flex-wrap">
            {products.map((product) => (
              <div className="w-[250px] sm:w-[350px] h-[230px] odd:bg-white even:bg-indigo-200 p-5 text-left rounded-md">
                <h4 className="font-semibold text-base truncate">{product?.name}</h4>
                <div className="py-2">
                  <p className="flex gap:2 text-base">
                    <span className="font-semibold w-24"> Category:</span>
                    <p>{product?.category}</p>
                  </p>
                  <p className="flex gap:2 text-base">
                    <span className="font-semibold w-24">Price: </span>{" "}
                    <p>&#8377; {product?.price}</p>
                  </p>
                  <p className="flex gap:2 text-base">
                    <span className="font-semibold w-24">Stock:</span>{" "}
                    <p>{product?.stockQuantity}</p>
                  </p>
                  <p className="flex gap:2 text-base">
                    <span className="font-semibold w-24">Created At:</span>
                    <p>{new Date(product?.createdAt).toLocaleDateString()}</p>
                  </p>
                </div>
                <div className="flex gap-2 justify-end">
                  <Link
                    to={`/update-product/${product?._id}`}
                    className="w-16 px-2 py-1 text-center rounded-md font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white duration-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(product?._id)}
                    className="w-16 px-2 py-1 text-center rounded-md font-semibold text-sm bg-red-500 hover:bg-red-600 text-white duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="font-semibold text-2xl text-center text-black">
            No Product Available
          </h2>
        </div>
      )}
    </section>
  );
}
