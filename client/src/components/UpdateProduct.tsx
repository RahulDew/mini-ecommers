import React, { useEffect, useState } from "react";
import { baseURL } from "../config/config";
import { Controller, set, SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../constants/constants";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

interface IProductForm {
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  imageUrl: string;
}

type ProductProps = {
  isNewProduct: boolean;
};

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

export default function UpdateProduct({ isNewProduct = true }: ProductProps) {
  const [productDetails, setProductDetails] = useState<IProductDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { id: productId } = useParams();

  console.log("isNewProduct: ", isNewProduct);

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

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<IProductForm>({
    defaultValues: productDetails
      ? {
          name: productDetails?.name,
          description: productDetails?.description,
          price: productDetails?.price,
          category: productDetails?.category,
          stockQuantity: productDetails?.stockQuantity,
          imageUrl: productDetails?.imageUrl,
        }
      : {
          name: "",
          description: "",
          price: 0,
          category: "",
          stockQuantity: 0,
          imageUrl: "",
        },
  });

  useEffect(() => {
    if (!isNewProduct) {
      getProduct();
    }
  }, [productId]);

  useEffect(() => {
    if (productDetails) {
      reset({
        name: productDetails.name,
        description: productDetails.description,
        price: productDetails.price,
        category: productDetails.category,
        stockQuantity: productDetails.stockQuantity,
        imageUrl: productDetails.imageUrl,
      });
    }
  }, [productDetails, reset]);

  const imageUrl = watch("imageUrl");

  const addNewProduct = async (data: IProductForm) => {
    console.log("adding data: ", data);
    const res = await fetch(`${baseURL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      console.log(result);
      reset();
      navigate("/products-analysis");
    } else {
      console.log(result.message);
    }
  };

  const UpdateProduct = async (data: IProductForm) => {
    const res = await fetch(`${baseURL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      console.log(result);
      reset();
      navigate("/admin");
    } else {
      console.log(result.message);
    }
  };

  const onSubmit: SubmitHandler<IProductForm> = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      if (isNewProduct) {
        addNewProduct(data);
      } else {
        UpdateProduct(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isNewProduct) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-start justify-center flex-col md:flex-row w-full sm:px-10 gap-10"
      >
        <div className="space-y-3 w-full sm:w-[400px]">
          {/* input name */}
          <div className="flex flex-col justify-start items-start">
            <label className="font-semibold text-sm leading-6">
              Name of product
            </label>
            <div className="mt-2 w-full">
              <input
                type="text"
                id="name"
                placeholder="Ex. Apple iPhone 12"
                className="w-full rounded-lg p-2 text-[17px] outline-none text-black bg-transparent border-2 border-black focus:border-indigo-600 duration-300"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.type === "required" && "Name is required."}
              </p>
            )}
          </div>

          {/* input imageUrl */}
          <div className="flex flex-col justify-start items-start">
            <label className="font-semibold text-sm leading-6">
              Product Image URL
            </label>
            <div className="mt-2 w-full">
              <input
                type="text"
                id="imageUrl"
                placeholder="plese enter image URL"
                className="w-full rounded-lg p-2 text-[17px] outline-none text-black bg-transparent border-2 border-black focus:border-indigo-600 duration-300"
                {...register("imageUrl", {
                  required: "imageUrl is required",
                })}
              />
            </div>
            {errors.imageUrl && (
              <p className="text-sm text-red-500">
                {errors.imageUrl.type === "required" && "imageUrl is required."}
              </p>
            )}
          </div>
          {/* product image */}
          <div className="w-full h-[350px] rounded-md border-2 border-black bg-white">
            <img
              src={
                imageUrl?.length
                  ? imageUrl
                  : "https://cdn-icons-png.flaticon.com/512/8136/8136031.png"
              }
              alt="Product"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        {/* product details */}
        <div className="space-y-3 text-black w-full sm:w-[400px]">
          {/* input description */}
          <div className="flex flex-col justify-start items-start">
            <label className="font-semibold text-sm leading-6">
              Description
            </label>
            <div className="mt-2 w-full">
              <textarea
                id="description"
                placeholder="Ex. The latest iPhone from Apple"
                className="w-full h-[140px] rounded-lg p-2 text-[17px] outline-none text-black bg-transparent border-2 border-black focus:border-indigo-600 duration-300"
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </div>
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.type === "required" &&
                  "Description is required."}
              </p>
            )}
          </div>
          {/* input price */}
          <div className="flex flex-col justify-start items-start">
            <label className="font-semibold text-sm leading-6">
              Price &#8377;
            </label>
            <div className="mt-2 w-full">
              <input
                type="number"
                id="price"
                placeholder="Ex. 1000"
                className="w-full rounded-lg p-2 text-[17px] outline-none text-black bg-transparent border-2 border-black focus:border-indigo-600 duration-300"
                {...register("price", {
                  required: "Price is required",
                })}
              />
            </div>
            {errors.price && (
              <p className="text-sm text-red-500">
                {errors.price.type === "required" && "Price is required."}
              </p>
            )}
          </div>
          {/* input stockQuantity */}
          <div className="flex flex-col justify-start items-start">
            <label className="font-semibold text-sm leading-6">
              stockQuantity
            </label>
            <div className="mt-2 w-full">
              <input
                type="number"
                id="stockQuantity"
                placeholder="Ex. 1000"
                className="w-full rounded-lg p-2 text-[17px] outline-none text-black bg-transparent border-2 border-black focus:border-indigo-600 duration-300"
                {...register("stockQuantity", {
                  required: "stockQuantity is required",
                })}
              />
            </div>
            {errors.stockQuantity && (
              <p className="text-sm text-red-500">
                {errors.stockQuantity.type === "required" &&
                  "stockQuantity is required."}
              </p>
            )}
          </div>
          {/* select category */}
          <div className="flex flex-col justify-start items-start space-y-3">
            <label
              htmlFor="favoriteFood"
              className="text-base font-medium leading-6"
            >
              Product Category
            </label>
            <Controller
              render={({ field }) => (
                <select
                  {...field}
                  className="selected-option w-full py-3 px-4 placeholder-neutral-800 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                >
                  <option disabled className=" bg-neutral-950 text-white">
                    Select your product category
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.name}
                      className="option"
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
              name="category"
              control={control}
            />
            {errors.category && (
              <p className="text-red-600">This field is required</p>
            )}
          </div>

          {/* submit button */}
          <div>
            <button
              type="submit"
              style={{ backgroundColor: "black" }}
              className={`${
                loading && "cursor-not-allowed bg-indigo-600 border-indigo-600 "
              } w-full bg-neutral-950 rounded-lg p-2 mt-5 text-[17px] outline-none bg-transparent border-2 border-black duration-300  hover:bg-indigo-600 hover:border-indigo-600 text-white font-semibold`}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill=""
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>
                    {isNewProduct ? "Adding Product..." : "Updating Product"}
                  </span>
                </div>
              ) : isNewProduct ? (
                "Add"
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
