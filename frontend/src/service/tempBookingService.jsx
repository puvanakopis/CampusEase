import { axiosAuth } from "./authService";

export const tempBookingApi = {
    createTempBooking: async (payload) => {
        const res = await axiosAuth.post("/temp-booking", payload);
        return res.data;
    },

    getTempBooking: async () => {
        const res = await axiosAuth.get("/temp-booking");
        return res.data;
    },

    updateTempBooking: async (payload) => {
        const res = await axiosAuth.post("/temp-booking", payload);
        return res.data;
    },

    deleteTempBooking: async () => {
        const res = await axiosAuth.delete("/temp-booking");
        return res.data;
    },
};