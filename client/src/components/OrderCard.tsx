import { Link } from "react-router-dom";

interface IOrdersDetails {
  productQuantity: number;
  status: "Pending" | "Completed" | "Cancelled";
  orderedAt: string | Date;
  productId: string;
  productImgUrl: string;
  productName: string;
  productPrice: number;
  updatedAt: string | Date;
}

export default function OrderCard({
  productQuantity,
  status,
  orderedAt,
  productId,
  productImgUrl,
  productName,
  productPrice,
  updatedAt,
}: IOrdersDetails) {
  let statusColor =
    status === "Pending"
      ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-700"
      : status === "Completed"
      ? "bg-green-100 text-green-700 border-2 border-green-700"
      : "bg-red-100 text-red-700 border-2 border-red-700";
  return (
    <div className="w-full sm:w-[450px] flex flex-col justify-center gap-3 border-2 border-black p-5 rounded-md bg-white hover:border-indigo-600 duration-300">
      <Link
        to={`/product/${productId}`}
        className="flex items-start justify-start gap-5 bg-indigo-100 p-2 rounded-md duration-300"
      >
        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white border-2 border-black group-hover:border-indigo-600 rounded-md flex justify-center items-center duration-300">
          <img
            src={
              productImgUrl
                ? productImgUrl
                : "https://cdn-icons-png.flaticon.com/512/8136/8136031.png"
            }
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="space-y-3">
          <p className="text-left text-lg font-semibold truncate">
            {productName.length < 18
              ? productName
              : `${productName.substring(0, 18)}..`}
          </p>
          <p className="text-left text-lg font-semibold">
            ₹{productPrice} x {productQuantity}
          </p>
        </div>
      </Link>
      <div className="flex justify-between items-center flex-wrap gap-3">
        <p className="text-left text-md font-semibold">
          Ordered At:
          <span className="text-indigo-600 ml-3">
            {new Date(orderedAt).toLocaleDateString()}
          </span>
        </p>
        <p className="text-left text-md font-semibold">
          Ordered At:
          <span className="text-indigo-600 ml-3">
            {new Date(updatedAt).toLocaleDateString()}
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <div className="text-left text-md font-semibold flex items-center">
          <p>STATUS:</p>
          <span className={`ml-2 ${statusColor} text-sm p-1 px-2 rounded-full`}>
            {status}
          </span>
        </div>
        <div className="text-left text-md font-semibold flex items-center">
          <p>TOTAL:</p>
          <span className={`ml-2 bg-indigo-100 text-md p-1 px-2 rounded-full`}>
            ₹ {productPrice * productQuantity}
          </span>
        </div>
      </div>
    </div>
  );
}
