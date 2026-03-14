import { axiosAuth } from "./authService";

export const ragApi = {
    askQuestion: async (prompt) => {
        const res = await axiosAuth.get("/rag/ask", {
            params: { prompt }
        });
        return res.data;
    }
};