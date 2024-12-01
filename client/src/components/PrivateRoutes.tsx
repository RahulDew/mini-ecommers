// import React, { useEffect } from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
//     null
//   );

//   return (
//     // <Route
//     //   {...rest}
//     //   element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
//     // />

//     isAuthenticated ? (
//       <>
//         <Navbar />
//         <CartPage />
//         <Outlet />
//         <Footer />
//       </>
//     ) : (
//       <Navigate to="/login" replace={true} />
//     )
//   );
// };

// export default PrivateRoute;
