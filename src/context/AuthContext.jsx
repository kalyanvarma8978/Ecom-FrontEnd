import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get("access");
        if (token) {
            setIsAuthenticated(true);
        }
    }, [])


    const logout=()=>{
        Cookies.remove("access");
        Cookies.remove("refresh");
        setIsAuthenticated(false);
    }
    return (
        <AuthContext.Provider value={{
            isAuthenticated, setIsAuthenticated,logout
        }}>
            {children}
        </AuthContext.Provider>

    );

};