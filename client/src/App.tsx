import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import HomePage from "./pages/homePage";
import AdminDashboard from "./pages/AdminDashboard";
import ProductPage from "./pages/ProductPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import { useAuthContext } from "./context/AuthContext";
import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import ProductsPage from "./pages/ProductsPage";
import ProductsAnalysisPage from "./pages/ProductsAnalysisPage";
import PublicRoutes from "./components/PublicRoutes";
import OrdersAnalysisPage from "./pages/OrdersAnalysisPage";
import OrdersPage from "./pages/OrdersPage";
import SearchProductPage from "./pages/SearchProductPage";

function App() {
  const { user } = useAuthContext();
  console.log("From App:  USER: ", user);

  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-product/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UpdateProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products-analysis"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ProductsAnalysisPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders-analysis"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <OrdersAnalysisPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <ProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <SearchProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
