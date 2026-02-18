import { axiosAuth } from "./authService";

export const accommodationApi = {
    createAccommodation: async (payload) => {
        const res = await axiosAuth.post("/accommodation", payload);
        return res.data;
    },

    getAll: async () => {
        const res = await axiosAuth.get("/accommodation");
        return res.data;
    },

    getById: async (id) => {
        const res = await axiosAuth.get(`/accommodation/${id}`);
        return res.data;
    },

    updateAccommodation: async (id, updateData) => {
        const res = await axiosAuth.patch(`/accommodation/${id}`, updateData);
        return res.data;
    },

    deleteAccommodation: async (id) => {
        const res = await axiosAuth.delete(`/accommodation/${id}`);
        return res.data;
    }
};