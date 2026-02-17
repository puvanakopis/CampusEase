import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { authApi } from "../service/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
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

    // ------------------ FETCH CURRENT USER ------------------
    const fetchCurrentUser = async () => {
        const token = Cookies.get("token");
        if (!token) {
            setAuthLoading(false);
            return;
        }

        try {
            const res = await authApi.getCurrentUser();
            setUser(res.user);
        } catch (err) {
            console.error("Failed to fetch current user:", err);
            Cookies.remove("token");
            setUser(null);
        } finally {
            setAuthLoading(false);
        }
    };

    // ------------------ FORGOT PASSWORD ------------------
    const requestPasswordReset = async (email) => {
        const toastId = toast.loading("Sending OTP...");
        try {
            const res = await authApi.requestPasswordReset(email);
            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }
            toast.success("OTP sent to your email!", { id: toastId });
            return res.data;
        } catch (err) {
            toast.error(err.message || "Failed to send OTP", { id: toastId });
            throw err;
        }
    };

    // ------------------ RESET PASSWORD ------------------
    const resetPassword = async (email, otp, newPassword) => {
        const toastId = toast.loading("Resetting password...");
        try {
            const res = await authApi.resetPassword(email, otp, newPassword);
            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }
            toast.success("Password reset successful!", { id: toastId });
            return res.data;
        } catch (err) {
            toast.error(err.message || "Failed to reset password", { id: toastId });
            throw err;
        }
    };


    // ------------------ SIGNUP REQUEST OTP ------------------
    const requestSignupOtp = async (role, firstName, lastName, email, password) => {
        const toastId = toast.loading("Sending OTP...");
        try {
            const res = await authApi.requestSignupOtp(role, firstName, lastName, email, password);
            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }
            toast.success("OTP sent to your email!", { id: toastId });
            return res.data;
        } catch (err) {
            toast.error(err.message || "Failed to send OTP", { id: toastId });
            throw err;
        }
    };

    // ------------------ SIGNUP VERIFY OTP ------------------
    const verifySignupOtp = async (role, email, otp) => {
        const toastId = toast.loading("Verifying OTP...");
        try {
            const res = await authApi.verifySignupOtp(role, email, otp);
            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            const token = res.data.token;
            const usr = res.data.user;

            Cookies.set("token", token, { expires: 7 });
            setUser(usr);

            toast.success("Signup successful!", { id: toastId });

            const userRole = usr.role;

            if (userRole === "admin") navigate("/admin/dashboard");
            else if (userRole === "owner") navigate("/owner");
            else navigate("/");

            return usr;
        } catch (err) {
            toast.error(err.message || "Failed to verify OTP", { id: toastId });
            throw err;
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            authLoading,
            login,
            logout,
            requestPasswordReset,
            resetPassword,
            requestSignupOtp,
            verifySignupOtp

        }}>
            {children}
        </AuthContext.Provider>
    );
};
