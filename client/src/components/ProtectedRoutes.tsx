import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import Toast from "./Toast";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const { user, toasts, removeToast } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/products" replace />;
  }

  return (
    <>
      <div className="h-screen w-screen fixed -z-10">
        <svg
          className="inline-block fill-current w-full h-auto text-lime-200/40"
          viewBox="0 0 1440 450"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1189.2 169.2H421H253.8C159.8 169.2 69.1 203.1 0 262.6V449.8C30.5 349.9 131.3 276.7 252 276.7H424.1H1187.4C1280.9 276.7 1371 243.2 1440 184.3V0C1408.1 97.9 1308.3 169.2 1189.2 169.2Z"></path>
        </svg>
      </div>
      <div className="relative z-50">
        <Navbar />
        {/* Toast notification */}
        {toasts.length >= 1 && (
          <div className="m-auto fixed top-6 flex justify-center items-center flex-col gap-2 text-center">
            {toasts?.map((toast, index) => (
              <Toast key={index} toast={toast} removeToast={removeToast} />
            ))}
          </div>
        )}
        <main className="pt-[60px] px-5 sm:px-10 lg:px-20 ">{children}</main>
      </div>
    </>
  );
};

export default ProtectedRoute;
