import React, { createContext, useState } from "react";
import Cookies from "js-cookie";
import { authApi } from "../service/authService";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const res = await authApi.login(email, password);
            Cookies.set("token", res.data.token, { expires: 7 });
            console.log(res.data.user)
            setUser(res.data.user);

            const role = res.data.user.role;
            if (role === "super_admin" || role === "moderator") {
                navigate("/admin/dashboard");
            } else if (role === "owner") {
                navigate("/owner");
            } else {
                navigate("/");
            }

        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                setLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
