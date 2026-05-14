import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const accessToken = Cookies.get("access");

        if (accessToken) {

            setIsAuthenticated(true);

        } else {

            setIsAuthenticated(false);

        }

        setLoading(false);

    }, []);

    const logout = () => {

        Cookies.remove("access");
        Cookies.remove("refresh");

        setIsAuthenticated(false);

    };

    return (

        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                logout,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};