import { axiosAuth } from "./authService";

export const bookingApi = {
    createBooking: async (payload) => {
        const res = await axiosAuth.post("/booking/", payload);
        return res.data;
    },

    getAll: async () => {
        const res = await axiosAuth.get("/booking/");
        return res.data;
    },

    getById: async (id) => {
        const res = await axiosAuth.get(`/booking/${id}`);
        return res.data;
    },

    getUserBookings: async (userId) => {
        const res = await axiosAuth.get(`/booking/user/${userId}`);
        return res.data;
    },

    getOwnerBookings: async (ownerId) => {
        const res = await axiosAuth.get(`/booking/owner/${ownerId}`);
        return res.data;
    },

    updateBooking: async (id, payload) => {
        const res = await axiosAuth.patch(`/booking/${id}`, payload);
        return res.data;
    },

    deleteBooking: async (id) => {
        const res = await axiosAuth.delete(`/booking/${id}`);
        return res.data;
    },
};