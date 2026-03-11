import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { bookingApi } from "../service/bookingService";
import { AuthContext } from "./AuthContext";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currentUser, authLoading } = useContext(AuthContext);

    // ------------------ GET ALL BOOKINGS (ADMIN) ------------------
    const getAllBookings = async () => {
        setLoading(true);
        try {
            const res = await bookingApi.getAll();

            if (res.success) {
                setBookings(res.data);
            } else {
                toast.error(res.message || "Failed to fetch bookings");
            }

        } catch (err) {
            toast.error(err.message || "Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    // ------------------ GET USER BOOKINGS ------------------
    const getUserBookings = async (userId) => {
        setLoading(true);
        try {
            const res = await bookingApi.getUserBookings(userId);

            if (res.success) {
                setBookings(res.data);
            } else {
                toast.error(res.message || "Failed to fetch user bookings");
            }

        } catch (err) {
            toast.error(err.message || "Failed to fetch user bookings");
        } finally {
            setLoading(false);
        }
    };

    // ------------------ GET OWNER BOOKINGS ------------------
    const getOwnerBookings = async (ownerId) => {
        setLoading(true);
        try {
            const res = await bookingApi.getOwnerBookings(ownerId);

            if (res.success) {
                setBookings(res.data);
            } else {
                toast.error(res.message || "Failed to fetch owner bookings");
            }

        } catch (err) {
            toast.error(err.message || "Failed to fetch owner bookings");
        } finally {
            setLoading(false);
        }
    };

    // ------------------ GET BOOKING BY ID ------------------
    const getBookingById = async (id) => {
        try {
            const res = await bookingApi.getById(id);

            if (!res.success) throw new Error(res.message);

            return res.data;

        } catch (err) {
            toast.error(err.message || "Failed to fetch booking");
            throw err;
        }
    };

    // ------------------ CREATE BOOKING ------------------
    const createBooking = async (payload) => {

        const toastId = toast.loading("Creating booking...");

        try {

            const res = await bookingApi.createBooking(payload);

            if (!res.success) throw new Error(res.message);

            toast.success("Booking created successfully!", { id: toastId });

            await refreshBookings();

            return res.data;

        } catch (err) {

            toast.error(err.message || "Failed to create booking", { id: toastId });

            throw err;

        }
    };

    // ------------------ UPDATE BOOKING ------------------
    const updateBooking = async (id, payload) => {

        const toastId = toast.loading("Updating booking...");

        try {

            const res = await bookingApi.updateBooking(id, payload);

            if (!res.success) throw new Error(res.message);

            toast.success("Booking updated successfully!", { id: toastId });

            await refreshBookings();

            return res.data;

        } catch (err) {

            toast.error(err.message || "Failed to update booking", { id: toastId });

            throw err;

        }
    };

    // ------------------ DELETE BOOKING ------------------
    const deleteBooking = async (id) => {

        const toastId = toast.loading("Deleting booking...");

        try {

            const res = await bookingApi.deleteBooking(id);

            if (!res.success) throw new Error(res.message);

            toast.success("Booking deleted successfully!", { id: toastId });

            await refreshBookings();

        } catch (err) {

            toast.error(err.message || "Failed to delete booking", { id: toastId });

            throw err;

        }
    };

    // ------------------ REFRESH BOOKINGS BASED ON ROLE ------------------
    const refreshBookings = async () => {

        if (!currentUser) return;

        const role = currentUser.role;

        if (role === "admin") {
            await getAllBookings();
        }

        else if (role === "owner") {
            await getOwnerBookings(currentUser._id);
        }

        else if (role === "student" || role === "staff") {
            await getUserBookings(currentUser._id);
        }
    };

    useEffect(() => {
        if (currentUser) {
            refreshBookings();
        }
    }, [currentUser]);


    return (
        <BookingContext.Provider
            value={{
                bookings,
                loading,
                getAllBookings,
                getUserBookings,
                getOwnerBookings,
                getBookingById,
                createBooking,
                updateBooking,
                deleteBooking,
                refreshBookings
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};