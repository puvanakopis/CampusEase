import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { authApi } from "../service/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ------------------ LOGIN ------------------
    const login = async (email, password) => {
        const toastId = toast.loading("Authenticating...");

        try {
            const res = await authApi.login(email, password);

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            const token = res.data.token;
            const usr = res.data.user;

            Cookies.set("token", token, { expires: 7 });

            setUser(usr);

            toast.success("Login successful!", { id: toastId });

            const role = usr.role;
            if (role === "admin") navigate("/admin/dashboard");
            else if (role === "owner") navigate("/owner");
            else navigate("/");

        } catch (err) {
            toast.error(err.message || "Login failed", { id: toastId });
            throw err;
        }
    };

    // ------------------ LOGOUT ------------------
    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        toast.success("Logged out successfully");
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
            .catch(() => {
                Cookies.remove("token");
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};