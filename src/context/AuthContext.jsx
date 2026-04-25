import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 check token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login/", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", res.data); // 👈 IMPORTANT

    // 🔥 store token safely
    if (res.data.access) {
      localStorage.setItem("token", res.data.access);
    } else if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    } else {
      console.log("No token found in response ❌");
    }

    setIsLoggedIn(true);

  } catch (error) {
    console.error("LOGIN ERROR:", error.response?.data || error.message);
  }
};

  return (
    <AuthContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 