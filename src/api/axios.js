import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(

    (config) => {

        const accessToken = Cookies.get("access");

        if (accessToken) {

            config.headers.Authorization =
                `Bearer ${accessToken}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        // Access Token Expired
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh/")
        ) {

            originalRequest._retry = true;

            try {

                const refreshToken = Cookies.get("refresh");

                // Request New Access Token
                const res = await axios.post(
                    "http://127.0.0.1:8000/api/v1/auth/refresh/",
                    {
                        refresh: refreshToken
                    }
                );

                const newAccessToken = res.data.access;

                // Save New Access Token
                Cookies.set("access", newAccessToken);

                // Update Authorization Header
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                // Retry Original Request
                return api(originalRequest);

            } catch (refreshError) {

                // Refresh Token Expired
                Cookies.remove("access");
                Cookies.remove("refresh");

                window.location.href = "/signin";

                return Promise.reject(refreshError);

            }

        }

        return Promise.reject(error);

    }

);

export default api;