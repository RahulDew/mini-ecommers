import { useState, useEffect, useCallback } from "react";
import { baseURL } from "../config/config";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
  checkAuthStatus: () => void;
  isAuthenticated: boolean;
}

const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  //   const navigate = useNavigate();

  const checkAuthStatus = useCallback(() => {
    const token = Cookies.get("token"); // Get the token from cookies
    console.log("Token: ", token);
    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token ?? "");

        setUser(decodedToken);
      } catch (error) {
        console.log("Failed to decode token");
        console.error("Failed to decode token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = async () => {
    console.log("logging out");
    try {
      await fetch(`${baseURL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      setUser(null);
      //   navigate("/login");
    } catch (error) {
      console.log("Logout Failed");
      console.error(error);
    }
  };

  return {
    user,
    logout,
    checkAuthStatus,
    isAuthenticated: !!user,
  };
};

export default useAuth;
