import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { baseURL } from "../config/config";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { div } from "framer-motion/client";

interface IProductsDetails {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  imgUrl: string;
  price: number;
  category: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<IProductsDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
        setProducts(result);
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

  return (
    <section className="space-y-10 py-5">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-3xl">Products</h3>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : Array.isArray(products) && products.length > 0 ? (
        // Products
        <div className="flex justify-center md:justify-start flex-wrap gap-5">
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard
                id={product._id}
                imgUrl={product.imageUrl}
                name={product.name}
                price={product.price}
              />
            </div>
          ))}
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
