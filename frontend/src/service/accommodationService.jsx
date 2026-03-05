import { axiosAuth } from "./authService";

export const accommodationApi = {
    createAccommodation: async (formData) => {
        const res = await axiosAuth.post("/accommodation", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
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

    updateAccommodation: async (id, formData) => {
        const res = await axiosAuth.patch(`/accommodation/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    },

    deleteAccommodation: async (id) => {
        const res = await axiosAuth.delete(`/accommodation/${id}`);
        return res.data;
    }
};