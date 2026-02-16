import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authApi } from "../service/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ------------------ LOGIN ------------------
    const login = async (email, password) => {
        const res = await authApi.login(email, password);

        if (!res.success) throw new Error(res.message);

        const token = res.data.token;
        const usr = res.data.user;

        Cookies.set("token", token, { expires: 7 });

        setUser(usr);

        const role = usr.role;
        if (role === "admin") navigate("/admin/dashboard");
        else if (role === "owner") navigate("/owner");
        else navigate("/");
    };

    // ------------------ LOGOUT ------------------
    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        navigate("/login");
    };

    // ------------------ LOAD USER ON REFRESH ------------------
    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            setLoading(false);
            return;
        }

        authApi
            .getCurrentUser()
            .then((res) => {
                if (res.success) {
                    setUser(res.user || res.data?.user);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
