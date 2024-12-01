import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();
  console.log("From PR:  USER: ", user);
  // console.log("From PR:  allowedRoles: ", !allowedRoles.includes(user.role));

  // Store role after login

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (!allowedRoles.includes(user.role)) {
  //   return <Navigate to="/products" replace />;
  // }

  return (
    <>
      <Navbar />
      <main className="pt-[60px] px-20">{children}</main>
    </>
  );
};

export default ProtectedRoute;
