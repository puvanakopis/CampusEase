import { axiosAuth } from "./authService";

export const ownerApi = {
    getAllOwners: async () => {
        const res = await axiosAuth.get("/owner");
        return res.data;
    },

    getOwnerById: async (id) => {
        const res = await axiosAuth.get(`/owner/${id}`);
        return res.data;
    },

    updateOwner: async (id, payload) => {
        const res = await axiosAuth.patch(`/owner/${id}`, payload);
        return res.data;
    },

    deleteOwner: async (id) => {
        const res = await axiosAuth.delete(`/owner/${id}`);
        return res.data;
    }
};