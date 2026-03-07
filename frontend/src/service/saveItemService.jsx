import { axiosAuth } from "./authService";

export const saveItemApi = {
    getAll: async () => {
        const res = await axiosAuth.get("/user/save/");
        return res.data;
    },

    saveAccommodation: async (itemId) => {
        const res = await axiosAuth.post("/user/save/accommodation", { item_id: itemId });
        return res.data;
    },

    unsaveAccommodation: async (itemId) => {
        const res = await axiosAuth.delete("/user/save/accommodation", { data: { item_id: itemId } });
        return res.data;
    },

    saveTransport: async (itemId) => {
        const res = await axiosAuth.post("/user/save/transport", { item_id: itemId });
        return res.data;
    },

    unsaveTransport: async (itemId) => {
        const res = await axiosAuth.delete("/user/save/transport", { data: { item_id: itemId } });
        return res.data;
    },
};