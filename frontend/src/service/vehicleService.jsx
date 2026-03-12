import { axiosAuth } from "./authService";

export const vehicleApi = {
    createVehicle: async (formData) => {
        const res = await axiosAuth.post("/vehicle", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    },

    getAll: async () => {
        const res = await axiosAuth.get("/vehicle");
        return res.data;
    },

    getOwnerVehicles: async () => {
        const res = await axiosAuth.get("/vehicle/owner");
        return res.data;
    },

    getById: async (id) => {
        const res = await axiosAuth.get(`/vehicle/${id}`);
        return res.data;
    },

    addReview: async (vehicleId, reviewData) => {
        const res = await axiosAuth.post(`/vehicle/${vehicleId}/review`, reviewData);
        return res.data;
    },

    updateVehicle: async (id, formData) => {
        const res = await axiosAuth.patch(`/vehicle/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    },

    deleteVehicle: async (id) => {
        const res = await axiosAuth.delete(`/vehicle/${id}`);
        return res.data;
    }
};