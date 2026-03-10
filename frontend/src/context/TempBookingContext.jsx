import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { tempBookingApi } from "../service/tempBookingService";
import { AuthContext } from "./AuthContext";

export const TempBookingContext = createContext();

export const TempBookingProvider = ({ children }) => {
    const [tempBooking, setTempBooking] = useState(null);
    const [loading, setLoading] = useState(false);

    const { currentUser, authLoading } = useContext(AuthContext);

    // ------------------ FETCH TEMP BOOKING ------------------
    const fetchTempBooking = async () => {
        setLoading(true);
        try {
            const data = await tempBookingApi.getTempBooking();
            setTempBooking(data);
        } catch (err) {
            toast.error(err.message || "Failed to load temp booking");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && currentUser) {
            const role = currentUser.role;
            if (role === "student" || role === "staff") {
                fetchTempBooking();
            }
        }
    }, [authLoading, currentUser]);


    // ------------------ CREATE / UPDATE TEMP BOOKING ------------------
    const saveTempBooking = async (payload) => {
        try {
            const data = await tempBookingApi.createTempBooking(payload);
            setTempBooking(data);
            return data;
        } catch (err) {
            toast.error(err.message || "Failed to save booking");
            throw err;
        }
    };

    // ------------------ DELETE TEMP BOOKING ------------------
    const deleteTempBooking = async () => {
        const toastId = toast.loading("Deleting temporary booking...");
        try {
            await tempBookingApi.deleteTempBooking();
            toast.success("Temporary booking deleted!", { id: toastId });
            setTempBooking(null);
        } catch (err) {
            toast.error(err.message || "Failed to delete temp booking", { id: toastId });
            throw err;
        }
    };

    return (
        <TempBookingContext.Provider
            value={{
                tempBooking,
                loading,
                fetchTempBooking,
                saveTempBooking,
                deleteTempBooking,
            }}
        >
            {children}
        </TempBookingContext.Provider>
    );
};