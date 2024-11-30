import { createContext, useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { baseURL } from "../config/config";

interface AuthContextProps {
  user: User | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  logout: () => {},
});
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authorizationLoading, setAuthorizationLoading] = useState(true);

  const checkAuthStatus = useCallback(() => {
    setAuthorizationLoading(true);
    const token = Cookies.get("token"); // Get the token from cookies
    console.log("Token: ", token);
    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token ?? "");
        setUser(decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser(null);
      } finally {
        setAuthorizationLoading(false);
      }
    } else {
      setUser(null);
      setAuthorizationLoading(false);
    }
  }, [user]);

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
        credentials: "include",
        body: JSON.stringify({}),
      });
      setUser(null);
    } catch (error) {
      console.log("Logout Failed");
      console.error(error);
    }
  };

  const values = {
    user,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {/* childrens will only gets values and load/mount/render when authorizationLoading is false */}
      {authorizationLoading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
