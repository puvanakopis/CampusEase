import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { authApi } from "../service/authService";
import useNavigateTo from "../hooks/useNavigateTo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const navigateTo = useNavigateTo();


    const login = async (email, password) => {
        const toastId = toast.loading("Authenticating...");
        try {
            const res = await authApi.login(email, password);

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            const { token, user } = res.data;

            Cookies.set("token", token, { expires: 7 });
            setCurrentUser(user);

            toast.success("Login successful!", { id: toastId });

            const role = user.role;
            if (role === "admin") navigateTo("/admin/dashboard");
            else if (role === "owner") navigateTo("/owner");
            else navigateTo("/");

        } catch (err) {
            toast.error(err.message || "Login failed", { id: toastId });
            throw err;
        }
    };


    const logout = () => {
        Cookies.remove("token");
        setCurrentUser(null);
        toast.success("Logged out successfully");
        navigateTo("/");
    };


    const fetchCurrentUser = async () => {
        const token = Cookies.get("token");
        if (!token) {
            setAuthLoading(false);
            return;
        }

        try {
            const res = await authApi.getCurrentUser();
            setCurrentUser(res.user);
        } catch (err) {
            console.error("Failed to fetch current user:", err);
            Cookies.remove("token");
            setCurrentUser(null);
        } finally {
            setAuthLoading(false);
        }
    };


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


    const verifySignupOtp = async (role, email, otp) => {
        const toastId = toast.loading("Verifying OTP...");
        try {
            const res = await authApi.verifySignupOtp(role, email, otp);
            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            const { token, user } = res.data;

            Cookies.set("token", token, { expires: 7 });
            setCurrentUser(user);

            toast.success("Signup successful!", { id: toastId });

            if (user.role === "admin") navigateTo("/admin/dashboard");
            else if (user.role === "owner") navigateTo("/owner");
            else navigateTo("/");

            return user;
        } catch (err) {
            toast.error(err.message || "Failed to verify OTP", { id: toastId });
            throw err;
        }
    };


    const updateCurrentUserProfile = async (updateData) => {
        const toastId = toast.loading("Updating profile...");
        try {
            const res = await authApi.updateProfile(updateData);
            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            setCurrentUser(res.data);
            toast.success("Profile updated successfully!", { id: toastId });
            return res.data;
        } catch (err) {
            toast.error(err.message || "Failed to update profile", { id: toastId });
            throw err;
        }
    };


    const updatePassword = async (currentPassword, newPassword) => {
        const toastId = toast.loading("Updating password...");
        try {
            const res = await authApi.updatePassword(currentPassword, newPassword);
            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }
            toast.success("Password updated successfully!", { id: toastId });
            return res.data;
        } catch (err) {
            toast.error(err.message || "Failed to update password", { id: toastId });
            throw err;
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                authLoading,
                login,
                logout,
                requestPasswordReset,
                resetPassword,
                requestSignupOtp,
                verifySignupOtp,
                updateCurrentUser: updateCurrentUserProfile,
                updatePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};