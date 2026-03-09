import { axiosAuth } from "./authService";

export const accommodationBookingApi = {
    // ---------------- CREATE BOOKING ----------------
    createBooking: async (payload) => {
        const res = await axiosAuth.post("/accommodation-booking/", payload);
        return res.data;
    },

    // ---------------- GET ALL BOOKINGS ----------------
    getAll: async () => {
        const res = await axiosAuth.get("/accommodation-booking/");
        return res.data;
    },

    // ---------------- GET BOOKING BY ID ----------------
    getById: async (id) => {
        const res = await axiosAuth.get(`/accommodation-booking/${id}`);
        return res.data;
    },

    // ---------------- GET BOOKINGS BY USER ----------------
    getUserBookings: async (userId) => {
        const res = await axiosAuth.get(`/accommodation-booking/user/${userId}`);
        return res.data;
    },

    // ---------------- GET BOOKINGS BY OWNER ----------------
    getOwnerBookings: async (ownerId) => {
        const res = await axiosAuth.get(`/accommodation-booking/owner/${ownerId}`);
        return res.data;
    },

    // ---------------- UPDATE BOOKING ----------------
    updateBooking: async (id, payload) => {
        const res = await axiosAuth.patch(`/accommodation-booking/${id}`, payload);
        return res.data;
    },

    // ---------------- DELETE BOOKING ----------------
    deleteBooking: async (id) => {
        const res = await axiosAuth.delete(`/accommodation-booking/${id}`);
        return res.data;
    },
};