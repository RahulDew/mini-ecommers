// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { baseURL } from "../config/config";

// interface IProductsDetails {
//   _id: string;
//   name: string;
//   description: string;
//   imageUrl: string;
//   imgUrl: string;
//   price: number;
//   category: string;
//   createdAt: string | Date;
//   updatedAt: string | Date;
// }

export default function HomePage() {
  // const [products, setProducts] = useState<IProductsDetails[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);

  // const getAllProducts = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${baseURL}/products/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const result = await res.json();
  //     if (res.ok) {
  //       console.log(result);
  //       setProducts(result);
  //     } else {
  //       console.log(result.message);
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center pt-20 space-y-4">
      <h1 className="text-7xl font-bold text-black">
        Welcome to 
      </h1>
      <h1 className="text-7xl font-bold text-indigo-500 mt-5">
        MiniEcommerce
      </h1>
      <p className="text-2xl text-black">
        Check your products, manage order and buy as many products as you want
      </p>
    </div>
  );
}
