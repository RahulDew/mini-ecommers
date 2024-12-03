import { createContext, useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { baseURL } from "../config/config";
import { v4 as uuidv4 } from "uuid";

interface AuthContextProps {
  user: User | null;
  logout: () => void;
  checkAuthStatus: () => void;
  toasts: IToastMsg[];
  handleShowToast: (
    message: string,
    type: "success" | "warning" | "failure"
  ) => void;
  removeToast: (toastId: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  logout: () => {},
  checkAuthStatus: () => {},
  toasts: [],
  handleShowToast: () => {},
  removeToast: () => {},
});
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface IToastMsg {
  id: string;
  message: string;
  type: "success" | "warning" | "failure";
}

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null); // storing the user object
  const [authorizationLoading, setAuthorizationLoading] = useState(true); // used to authorize the user

  // for managing toast messages
  const [toasts, setToasts] = useState<IToastMsg[]>([]);

  const checkAuthStatus = useCallback(() => {
    setAuthorizationLoading(true);
    const token = Cookies.get("token"); // Get the token from cookies
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
      handleShowToast("Logout Failed", "success");
    }
  };

  const handleShowToast = (
    message: string,
    type: "success" | "warning" | "failure"
  ) => {
    const toast: IToastMsg = {
      id: uuidv4(),
      message,
      type,
    };
    if (toasts.length <= 2) {
      setToasts((prevToasts) => [...prevToasts, toast]);
    } else {
      setToasts([toast]);
    }

    setTimeout(() => {
      removeToast(toast.id);
      // setToasts([]);
    }, 1500);
  };

  const removeToast = (toastId: string) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== toastId)
    );
  };

  const values = {
    user,
    logout,
    checkAuthStatus,
    toasts,
    handleShowToast,
    removeToast,
  };

  return (
    <AuthContext.Provider value={values}>
      {/* childrens will only gets values and load/mount/render when authorizationLoading is false */}
      {authorizationLoading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
