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

function App() {
  const { user } = useAuthContext();
  console.log("From App:  USER: ", user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
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
      </Routes>
    </Router>
  );
}

export default App;
