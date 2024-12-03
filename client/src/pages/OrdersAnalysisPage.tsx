import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../config/config";
import Loader from "../components/Loader";
import CustomSelect from "../components/CustomSelect";
import { useAuthContext } from "../context/AuthContext";

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

interface IOrdersDetails {
  _id: string;
  customerId: string;
  customerName: string;
  email: string;
  product: IProductsDetails;
  quantity: number;
  totalPrice: number;
  status: "Pending" | "Completed" | "Cancelled";
  createdAt: string | Date;
  updatedAt: string | Date;
}

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function OrdersAnalysisPage() {
  const [orders, setOrders] = useState<IOrdersDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { handleShowToast } = useAuthContext();

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/orders/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        // console.log(result);
        setOrders(result.reverse());
      } else {
        // console.log(result.message);
        handleShowToast(
          result.message ? result.message : "Please try again",
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
    getAllOrders();
  }, []);

  const handleUpdateOrderStatus = async (id: string, value: string) => {
    try {
      const res = await fetch(`${baseURL}/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          status: value,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        // console.log(result);
        handleShowToast(result.message ? result.message : "Done", "success");
        getAllOrders();
      } else {
        // console.log(result.message);
        handleShowToast(
          result.message ? result.message : "Please try again",
          "failure"
        );
      }
    } catch (error) {
      handleShowToast("Server Error", "failure");
    }
  };

  return (
    <section className="space-y-10 py-5">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-2xl sm:text-3xl">Orders</h3>
      </div>
      {loading ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : Array.isArray(orders) && orders.length > 0 ? (
        // Products details
        <div className="flex justify-start gap-5">
          <table className="max-lg:hidden min-w-full text-sm text-left rounded-md text-black">
            <thead className="text-xs text-indigo-600 uppercase bg-white rounded-t-md">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr
                    key={order?._id}
                    className="odd:bg-indigo-100 even:bg-white border-b"
                  >
                    <th
                      scope="row"
                      className="text-black font-semibold whitespace-nowrap hover:text-indigo-600 duration-300"
                    >
                      <Link
                        to={`/product/${order?.product._id}`}
                        className="px-6 py-4 block"
                      >
                        {order?.product.name.length < 18
                          ? order?.product.name
                          : `${order?.product.name.substring(0, 18)}..`}
                      </Link>
                    </th>
                    <td className="px-6 py-4 max-w-[35px] font-semibold">
                      {order?.customerName.length < 18
                        ? order?.customerName
                        : order?.customerName.substring(0, 18)}
                    </td>
                    <td className="px-6 py-4 max-w-[59px]">{order?.email}</td>
                    <td className="px-6 py-4 text-center font-semibold">
                      {order?.quantity}
                    </td>
                    <td className="px-6 py-4">
                      &#8377; {order?.product.price * order?.quantity}
                    </td>

                    <div className="flex items-center justify-center rounded-full mt-3">
                      <CustomSelect
                        options={statusOptions}
                        selected={order?.status}
                        onChange={handleUpdateOrderStatus}
                        id={order?._id}
                      />
                    </div>

                    {/* ORDER STATUS */}
                    <td className="px-6 py-4">
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order?.updatedAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="lg:hidden flex gap-5 flex-wrap">
            {orders.map((order) => (
              <div
                key={order?._id}
                className="w-full sm:w-[350px] bg-white border-2 border-black p-5 text-left rounded-md"
              >
                <Link
                  to={`/product/${order.product._id}`}
                  className="font-semibold text-base truncate bg-indigo-200 p-2 rounded-md hover:text-indigo-600 duration-300"
                >
                  {order?.product.name.length < 25
                    ? order?.product.name
                    : `${order?.product.name.substring(0, 25)}..`}
                </Link>
                <div className="py-2">
                  <div className="flex gap:2 text-base">
                    <span className="font-semibold w-24"> Name:</span>
                    <p className="truncate">{order?.customerName}</p>
                  </div>
                  <div className="flex gap:2 text-base">
                    <span className="font-semibold w-24">Email: </span>{" "}
                    <p className="truncate">{order?.email}</p>
                  </div>
                  <div className="flex gap:2 text-base">
                    <span className="font-semibold w-24">Total Price: </span>{" "}
                    <p>&#8377; {order?.product.price * order?.quantity}</p>
                  </div>
                  <div className="flex gap:2 text-base">
                    <span className="font-semibold w-24">Quantity:</span>{" "}
                    <p>{order?.quantity}</p>
                  </div>
                  <div className="flex gap:2 text-base">
                    <span className="font-semibold w-24">Created At:</span>
                    <p>{new Date(order?.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap:2 text-base">
                    <span className="font-semibold w-24">Created At:</span>
                    <p>{new Date(order?.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <CustomSelect
                  options={statusOptions}
                  selected={order?.status}
                  onChange={handleUpdateOrderStatus}
                  id={order?._id}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="font-semibold text-2xl text-center text-black">
            No Orders Available
          </h2>
        </div>
      )}
    </section>
  );
}
