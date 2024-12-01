import UpdateProduct from "../components/UpdateProduct";

export default function AddProductPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center space-y-10">
      <h1 className="font-bold text-3xl">AddProductPage</h1>
      <UpdateProduct isNewProduct={true} />
    </div>
  );
}
