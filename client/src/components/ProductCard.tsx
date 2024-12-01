import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface Product {
  id: string;
  name: string;
  imgUrl: any;
  price: number;
}

export default function ProductCard({ id, imgUrl, name, price }: Product) {
  const handleAddToCart = () => {};

  const { user } = useAuthContext();

  return (
    <>
      <div className="w-52 flex flex-col justify-center gap-2 cursor-pointer">
        <Link to={`/product/${id}`} className="group space-y-2">
          <div className="w-52 h-52 bg-white border-2 border-black group-hover:border-indigo-600 rounded-md flex justify-center items-center duration-300">
            <img
              src={imgUrl}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <p className="text-left text-lg font-semibold truncate">{name}</p>
        </Link>
        <div className="flex justify-between items-center">
          <p className="text-left text-lg font-semibold">₹{price}</p>
          <button
            onClick={handleAddToCart}
            className="font-semibold  bg-indigo-600 hover:bg-indigo-700  text-white p-2 rounded-md"
          >
            <MdAddShoppingCart />
          </button>
        </div>
      </div>
    </>
  );
}
