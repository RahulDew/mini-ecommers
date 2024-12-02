import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../config/config";
import Loader from "../components/Loader";
import { useAuthContext } from "../context/AuthContext";
import OrderCard from "../components/OrderCard";

interface IProductsDetails {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  stockQuantity: number;
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
  status: "Pending" | "Completed" | "Cancelled";
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrdersDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuthContext();

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/orders/user/${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        console.log(result);
        setOrders(result.reverse());
      } else {
        console.log(result.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

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
        // Products
        <div className="flex justify-center md:justify-start items-start flex-wrap gap-5">
          {orders.map((order) => (
            <div key={order._id} className="max-sm:w-full">
              <OrderCard
                productQuantity={order?.quantity}
                status={order?.status}
                orderedAt={order?.createdAt}
                productId={order?.product._id}
                productImgUrl={order?.product.imageUrl}
                productName={order?.product.name}
                productPrice={order?.product.price}
                updatedAt={order?.updatedAt}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="font-semibold text-2xl text-center text-black">
            You have not placed any orders yet.
          </h2>
        </div>
      )}
    </section>
  );
}
