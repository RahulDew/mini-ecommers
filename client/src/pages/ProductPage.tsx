import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProductPage() {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">ProductPage</h1>
      <button
        onClick={handleLogout}
        className="p-3 w-24 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-center text-lg"
      >
        Logout
      </button>
    </div>
  );
}
