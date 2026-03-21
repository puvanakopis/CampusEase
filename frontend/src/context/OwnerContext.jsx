import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { ownerApi } from "../service/ownerService";
import { AuthContext } from "./AuthContext";

export const OwnerContext = createContext();

export const OwnerProvider = ({ children }) => {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useContext(AuthContext);

    // ------------------ FETCH ALL OWNERS ------------------
    const fetchOwners = async () => {
        setLoading(true);
        try {
            const res = await ownerApi.getAllOwners();
            if (res.success) {
                setOwners(res.data);
            } else {
                toast.error(res.message || "Failed to load owners");
            }
        } catch (err) {
            toast.error(err.message || "Failed to load owners");
        } finally {
            setLoading(false);
        }
    };
    

    // ------------------ GET OWNER BY ID ------------------
    const getOwnerById = async (id) => {
        try {
            const res = await ownerApi.getOwnerById(id);
            if (!res.success) {
                toast.error(res.message);
                throw new Error(res.message);
            }
            return res.data;
        } catch (err) {
            toast.error(err.message || "Failed to load owner");
            throw err;
        }
    };

    // ------------------ UPDATE OWNER ------------------
    const updateOwner = async (id, payload) => {
        const toastId = toast.loading("Updating owner...");
        try {
            const res = await ownerApi.updateOwner(id, payload);
            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }
            toast.success("Owner updated successfully!", { id: toastId });
            await fetchOwners();
            return res.data;
        } catch (err) {
            toast.error(err.message || "Update failed", { id: toastId });
            throw err;
        }
    };

    // ------------------ DELETE OWNER ------------------
    const deleteOwner = async (id) => {
        const toastId = toast.loading("Deleting owner...");
        try {
            const res = await ownerApi.deleteOwner(id);
            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }
            toast.success("Owner deleted successfully!", { id: toastId });
            await fetchOwners();
        } catch (err) {
            toast.error(err.message || "Delete failed", { id: toastId });
            throw err;
        }
    };

    useEffect(() => {
        if (currentUser?.role === "admin") {
            fetchOwners();
        }
    }, [currentUser]);

    return (
        <OwnerContext.Provider
            value={{
                owners,
                loading,
                fetchOwners,
                getOwnerById,
                updateOwner,
                deleteOwner,
            }}
        >
            {children}
        </OwnerContext.Provider>
    );
};