import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // 🔥 only attach token for protected endpoints
  const protectedRoutes = ["/cart", "/orders", "/auth/me"];

  const isProtected = protectedRoutes.some((route) =>
    config.url.includes(route)
  );

  if (token && isProtected) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;