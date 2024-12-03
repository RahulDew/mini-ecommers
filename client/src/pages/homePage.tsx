import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";

const features = [
  {
    id: "1001",
    icon: <BiShoppingBag className="font-semibold text-3xl sm:text-4xl" />,
    title: "Easy and Flexibal Shapping Experiance",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1683887064106-531532ecdf20?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Our platform offers a seamless and flexible shopping experience, allowing you to browse and purchase products with ease. Whether you're looking for the latest trends or everyday essentials, our user-friendly interface and secure payment options ensure a hassle-free shopping journey.",
  },
  {
    id: "1002",
    icon: <BiShoppingBag className="font-semibold text-3xl sm:text-4xl" />,
    title: "Multiple brands and options to choose Product",
    imgUrl:
      "https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Discover a wide range of brands and products on our platform, offering you numerous options to choose from. Whether you're searching for high-end luxury items or budget-friendly alternatives, our extensive selection ensures that you'll find exactly what you need. Enjoy the convenience of comparing different brands and products all in one place, making your shopping experience more efficient and enjoyable.",
  },
  {
    id: "1003",
    icon: <BiShoppingBag className="font-semibold text-3xl sm:text-4xl" />,
    title: "Track your orders and products",
    imgUrl:
      "https://images.unsplash.com/photo-1602665478334-f8c4fd62ede4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Stay on top of your shopping journey with ease! Our e-commerce store allows you to track your orders in real time, view detailed product information, and stay updated on delivery status. Whether you're checking out new arrivals or managing your past purchases, we make it simple, secure, and convenient. Your satisfaction is our priority!",
  },
];

export default function HomePage() {
  return (
    <section className="w-full flex flex-col justify-center items-center py-20 space-y-20">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black">
          Welcome to
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-indigo-500">
          MiniEcommerce
        </h1>
        <p className="text-lg sm:text-2xl text-black">
          Check your products, manage order and buy as many products as you want
        </p>
        <div className="flex justify-center items-center gap-10 flex-wrap">
          <Link
            to={"/register"}
            className="w-28 font-semibold text-base bg-black hover:bg-indigo-600 text-white p-3 rounded-xl duration-300"
          >
            Register
          </Link>
          <Link
            to={"/login"}
            className="w-28 font-semibold text-base bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl duration-300"
          >
            Login
          </Link>
        </div>
      </div>

      {features.map((feature) => (
        <main
          key={feature.id}
          className="flex flex-col md:odd:flex-row-reverse md:flex-row justify-center gap-5 lg:gap-10 pb-10"
        >
          <div className="max-sm:w-full flex justify-center md:justify-start items-start gap-3 ">
            <div className="h-64 w-full sm:w-80 sm:h-80 md:w-96 lg::h-64 bg-gray-200 rounded-lg border-2 border-black hover:border-indigo-600 flex justify-center items-center mx-6">
              <img
                src={feature.imgUrl}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full md:w-2/5">
            <div className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              {feature.icon}
              <p>{feature.title}</p>
            </div>
            <p className="w-full text-base sm:text-lg text-gray-600">
              {feature.description}
            </p>
          </div>
        </main>
      ))}
    </section>
  );
}
