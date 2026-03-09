import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { userApi } from "../service/userService";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useContext(AuthContext);

    // ------------------ FETCH ALL USERS ------------------
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await userApi.getAllUsers();

            if (res.success) {
                setUsers(res.data);
            } else {
                toast.error(res.message || "Failed to load users");
            }

        } catch (err) {
            toast.error(err.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    // ------------------ GET USER BY ID ------------------
    const getUserById = async (id) => {
        try {
            const res = await userApi.getUserById(id);

            if (!res.success) {
                toast.error(res.message);
                throw new Error(res.message);
            }
            return res.data;

        } catch (err) {
            toast.error(err.message || "Failed to load user");
            throw err;
        }
    };

    // ------------------ UPDATE USER ------------------
    const updateUser = async (id, payload) => {
        const toastId = toast.loading("Updating user...");
        try {
            const res = await userApi.updateUser(id, payload);

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            toast.success("User updated successfully!", { id: toastId });

            await fetchUsers();

            return res.data;

        } catch (err) {
            toast.error(err.message || "Update failed", { id: toastId });
            throw err;
        }
    };

    // ------------------ DELETE USER ------------------
    const deleteUser = async (id) => {
        const toastId = toast.loading("Deleting user...");

        try {
            const res = await userApi.deleteUser(id);

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            toast.success("User deleted successfully!", { id: toastId });

            await fetchUsers();

        } catch (err) {
            toast.error(err.message || "Delete failed", { id: toastId });
            throw err;
        }
    };

    useEffect(() => {
        if (currentUser?.role === "admin") {
            fetchUsers();
        }
    }, [currentUser]);

    return (
        <UserContext.Provider
            value={{
                users,
                loading,
                fetchUsers,
                getUserById,
                updateUser,
                deleteUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};