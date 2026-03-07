import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { saveItemApi } from "../service/saveItemService";

export const SaveItemContext = createContext();

export const SaveItemProvider = ({ children }) => {
    const [savedAccommodations, setSavedAccommodations] = useState([]);
    const [savedTransports, setSavedTransports] = useState([]);
    const [loading, setLoading] = useState(false);

    // ------------------ FETCH ALL ------------------
    const fetchSavedItems = async () => {
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

    useEffect(() => {
        fetchSavedItems();
    }, []);

    // ------------------ SAVE / UNSAVE ACCOMMODATION ------------------
    const saveAccommodation = async (itemId) => {
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

    // ------------------ SAVE / UNSAVE TRANSPORT ------------------
    const saveTransport = async (itemId) => {
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