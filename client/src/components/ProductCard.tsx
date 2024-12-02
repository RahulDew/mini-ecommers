import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  imgUrl: any;
  price: number;
}

export default function ProductCard({ id, imgUrl, name, price }: Product) {
  return (
    <>
      <div className="w-60 sm:w-56 flex flex-col justify-center gap-2 cursor-pointer">
        <Link to={`/product/${id}`} className="group space-y-2">
          <div className="w-full h-60 sm:h-56 bg-white border-2 border-black group-hover:border-indigo-600 rounded-md flex justify-center items-center duration-300">
            <img
              src={
                imgUrl
                  ? imgUrl
                  : "https://cdn-icons-png.flaticon.com/512/8136/8136031.png"
              }
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <p className="text-left text-lg font-semibold truncate">{name}</p>
        </Link>
        <div className="flex justify-between items-center">
          <p className="text-left text-lg font-semibold text-indigo-700">
            ₹{price}
          </p>
          <Link
            to={`/product/${id}`}
            className="font-semibold  bg-indigo-600 hover:bg-indigo-700  text-white p-2 rounded-md"
          >
            <MdAddShoppingCart />
          </Link>
        </div>
      </div>
    </>
  );
}
