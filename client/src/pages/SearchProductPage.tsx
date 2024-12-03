import { useEffect, useState } from "react";

import { baseURL } from "../config/config";
import ProductCard from "../components/ProductCard";
import { categories } from "../constants/constants";
import SelectDropdown from "../components/SelectDropdown";
import { TbShoppingCartSearch } from "react-icons/tb";
import Loader from "../components/Loader";
import { useAuthContext } from "../context/AuthContext";

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

export default function SearchProductPage() {
  const [searchedProducts, setSearchedProducts] = useState<IProductsDetails[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [products, setProducts] = useState<IProductsDetails[]>([]);

  const { handleShowToast } = useAuthContext();

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
        // console.log(result);
        setProducts(result);
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
    getAllProducts();
  }, []);

  const handleChangeSearchCategory = (category: string) => {
    setSearchCategory(category);

    const filteredProducts = products.filter(
      (product) => product.category === category
    );
    setSearchedProducts(filteredProducts);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="space-y-10 py-5">
      <div className="flex justify-center gap-3 items-center flex-col">
        <h3 className="font-semibold text-xl text-center m-auto">
          Search Products By Categories
        </h3>
        <div className="w-full flex items-center justify-center rounded-full mt-3">
          <SelectDropdown
            options={categories.map((category) => ({
              label: category.name,
              value: category.value || category.name,
            }))}
            selected={searchCategory}
            onChange={handleChangeSearchCategory}
            placeholder="Select Category"
          />
        </div>
      </div>
      <div>
        {searchedProducts && searchedProducts.length > 0 && searchCategory ? (
          <div className="flex justify-center md:justify-start flex-wrap gap-5">
            {searchedProducts.map((product) => (
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
        ) : searchCategory ? (
          <h4 className="text-center font-semibold text-xl">
            No product found on{" "}
            <span className="text-indigo-600">{searchCategory}</span> category
          </h4>
        ) : (
          <div className="flex justify-center items-center flex-col gap-5">
            <TbShoppingCartSearch className="text-5xl sm:text-9xl opacity-80 text-indigo-600" />
            <h4 className="text-center font-medium text-xl">
              Please select a category to search products
            </h4>
          </div>
        )}
      </div>
    </section>
  );
}
