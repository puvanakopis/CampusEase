import React, { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";
import { ragApi } from "../service/ragService";
import { AuthContext } from "./AuthContext";

export const RagContext = createContext();

export const RagProvider = ({ children }) => {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const askQuestion = async (question) => {
        if (!currentUser) {
            toast.error("You must be logged in to ask questions.");
            return;
        }
        setLoading(true);

        try {
            const res = await ragApi.askQuestion(question);

            if (res.success) {
                const newResponse = {
                    question: res.question,
                    answer: res.response,
                    userId: res.user_id
                };
                setResponses((prev) => [...prev, newResponse]);
            } else {
                toast.error(res.message || "Failed to get AI response");
            }
        } catch (err) {
            toast.error(err.message || "AI request failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <RagContext.Provider
            value={{
                responses,
                loading,
                askQuestion
            }}
        >
            {children}
        </RagContext.Provider>
    );
};