import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import { accommodationBookingApi } from "../service/accommodationBookingService";

export const AccommodationBookingContext = createContext();

export const AccommodationBookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);
    const [userBookings, setUserBookings] = useState([]);
    const [ownerBookings, setOwnerBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    // ---------------- FETCH ALL BOOKINGS ----------------
    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await accommodationBookingApi.getAll();

            if (res.success) {
                setBookings(res.data);
            } else {
                toast.error(res.message || "Failed to load bookings");
            }
        } catch (err) {
            toast.error(err.message || "Failed to load bookings");
        } finally {
            setLoading(false);
        }
    };

    // ---------------- FETCH USER BOOKINGS ----------------
    const fetchUserBookings = async (userId) => {
        setLoading(true);
        try {
            const res = await accommodationBookingApi.getUserBookings(userId);

            if (res.success) {
                setUserBookings(res.data);
            } else {
                toast.error(res.message || "Failed to load user bookings");
            }
        } catch (err) {
            toast.error(err.message || "Failed to load user bookings");
        } finally {
            setLoading(false);
        }
    };

    // ---------------- FETCH OWNER BOOKINGS ----------------
    const fetchOwnerBookings = async (ownerId) => {
        setLoading(true);
        try {
            const res = await accommodationBookingApi.getOwnerBookings(ownerId);

            if (res.success) {
                setOwnerBookings(res.data);
            } else {
                toast.error(res.message || "Failed to load owner bookings");
            }
        } catch (err) {
            toast.error(err.message || "Failed to load owner bookings");
        } finally {
            setLoading(false);
        }
    };

    // ---------------- CREATE BOOKING ----------------
    const createBooking = async (payload) => {
        const toastId = toast.loading("Creating booking...");

        try {
            const res = await accommodationBookingApi.createBooking(payload);

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            toast.success("Booking created successfully!", { id: toastId });

            await fetchBookings();

            return res.data;
        } catch (err) {
            toast.error(err.message || "Failed to create booking", { id: toastId });
            throw err;
        }
    };

    // ---------------- GET BOOKING BY ID ----------------
    const getBookingById = async (id) => {
        try {
            const res = await accommodationBookingApi.getById(id);

            if (!res.success) {
                toast.error(res.message);
                throw new Error(res.message);
            }

            return res.data;
        } catch (err) {
            toast.error(err.message || "Failed to load booking");
            throw err;
        }
    };

    // ---------------- UPDATE BOOKING ----------------
    const updateBooking = async (id, payload) => {
        const toastId = toast.loading("Updating booking...");

        try {
            const res = await accommodationBookingApi.updateBooking(id, payload);

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            toast.success("Booking updated successfully!", { id: toastId });

            await fetchBookings();

            return res.data;
        } catch (err) {
            toast.error(err.message || "Update failed", { id: toastId });
            throw err;
        }
    };

    // ---------------- DELETE BOOKING ----------------
    const deleteBooking = async (id) => {
        const toastId = toast.loading("Deleting booking...");

        try {
            const res = await accommodationBookingApi.deleteBooking(id);

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            toast.success("Booking deleted successfully!", { id: toastId });

            await fetchBookings();
        } catch (err) {
            toast.error(err.message || "Delete failed", { id: toastId });
            throw err;
        }
    };

    return (
        <AccommodationBookingContext.Provider
            value={{
                bookings,
                userBookings,
                ownerBookings,
                loading,
                fetchBookings,
                fetchUserBookings,
                fetchOwnerBookings,
                createBooking,
                getBookingById,
                updateBooking,
                deleteBooking,
            }}
        >
            {children}
        </AccommodationBookingContext.Provider>
    );
};