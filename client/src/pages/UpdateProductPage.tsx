import UpdateProduct from "../components/UpdateProduct";

export default function UpdateProductPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center space-y-10">
      <h1 className="font-bold text-2xl sm:text-3xl">Update existing product</h1>
      <UpdateProduct isNewProduct={false} />
    </div>
  );
}
