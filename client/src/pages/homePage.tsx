import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <h1>Home Page</h1>
      <div className="flex gap-10">
        <Link
          to={"/register"}
          className="p-3 w-24 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-center text-lg"
        >
          Register
        </Link>
        <Link
          to={"/login"}
          className="p-3 w-24 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-center text-lg"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
