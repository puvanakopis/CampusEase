import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { saveItemApi } from "../service/saveItemService";
import { AuthContext } from "./AuthContext";

export const SaveItemContext = createContext();

export const SaveItemProvider = ({ children }) => {
    const [savedAccommodations, setSavedAccommodations] = useState([]);
    const [savedTransports, setSavedTransports] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currentUser, authLoading } = useContext(AuthContext);

    const fetchSavedItems = async () => {
        if (!currentUser) return; 
        setLoading(true);
        try {
            const res = await saveItemApi.getAll();
            if (res.success) {
                setSavedAccommodations(res.data.saved_accommodations);
                setSavedTransports(res.data.saved_transports);
            } else {
                toast.error(res.message || "Failed to fetch saved items");
            }
        } catch (err) {
            toast.error(err.message || "Failed to fetch saved items");
        } finally {
            setLoading(false);
        }
    };

    const isUserAuthorized = () => {
        if (!currentUser) return false;
        return currentUser.role === "student" || currentUser.role === "staff";
    };

    const saveAccommodation = async (itemId) => {
        if (!isUserAuthorized()) {
            return;
        }

        const toastId = toast.loading("Saving accommodation...");
        try {
            const res = await saveItemApi.saveAccommodation(itemId);
            if (!res.success) throw new Error(res.message);
            setSavedAccommodations(res.data.saved_accommodations);
            setSavedTransports(res.data.saved_transports);
            toast.success("Accommodation saved!", { id: toastId });
        } catch (err) {
            toast.error(err.message || "Failed to save", { id: toastId });
            throw err;
        }
    };

    const unsaveAccommodation = async (itemId) => {
        if (!isUserAuthorized()) {
            return;
        }

        const toastId = toast.loading("Removing saved accommodation...");
        try {
            const res = await saveItemApi.unsaveAccommodation(itemId);
            if (!res.success) throw new Error(res.message);
            setSavedAccommodations(res.data.saved_accommodations);
            setSavedTransports(res.data.saved_transports);
            toast.success("Accommodation removed from saved!", { id: toastId });
        } catch (err) {
            toast.error(err.message || "Failed to remove", { id: toastId });
            throw err;
        }
    };

    const saveTransport = async (itemId) => {
        if (!isUserAuthorized()) {
            return;
        }

        const toastId = toast.loading("Saving transport...");
        try {
            const res = await saveItemApi.saveTransport(itemId);
            if (!res.success) throw new Error(res.message);
            setSavedAccommodations(res.data.saved_accommodations);
            setSavedTransports(res.data.saved_transports);
            toast.success("Transport saved!", { id: toastId });
        } catch (err) {
            toast.error(err.message || "Failed to save", { id: toastId });
            throw err;
        }
    };

    const unsaveTransport = async (itemId) => {
        if (!isUserAuthorized()) {
            return;
        }

        const toastId = toast.loading("Removing saved transport...");
        try {
            const res = await saveItemApi.unsaveTransport(itemId);
            if (!res.success) throw new Error(res.message);
            setSavedAccommodations(res.data.saved_accommodations);
            setSavedTransports(res.data.saved_transports);
            toast.success("Transport removed from saved!", { id: toastId });
        } catch (err) {
            toast.error(err.message || "Failed to remove", { id: toastId });
            throw err;
        }
    };

    useEffect(() => {
        if (!authLoading && currentUser && isUserAuthorized()) {
            fetchSavedItems();
        }
    }, [authLoading, currentUser]);

    return (
        <SaveItemContext.Provider
            value={{
                savedAccommodations,
                savedTransports,
                loading,
                fetchSavedItems,
                saveAccommodation,
                unsaveAccommodation,
                saveTransport,
                unsaveTransport,
            }}
        >
            {children}
        </SaveItemContext.Provider>
    );
};