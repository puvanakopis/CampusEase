import { axiosAuth } from "./authService";

export const userApi = {
    getAllUsers: async () => {
        const res = await axiosAuth.get("/user");
        return res.data;
    },

    getUserById: async (id) => {
        const res = await axiosAuth.get(`/user/${id}`);
        return res.data;
    },

    updateUser: async (id, payload) => {
        const res = await axiosAuth.patch(`/user/${id}`, payload);
        return res.data;
    },

    deleteUser: async (id) => {
        const res = await axiosAuth.delete(`/user/${id}`);
        return res.data;
    }
};