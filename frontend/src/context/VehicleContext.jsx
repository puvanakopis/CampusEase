import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { vehicleApi } from "../service/vehicleService";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);

    // ------------------ FETCH ALL VEHICLES ------------------
    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const res = await vehicleApi.getAll();
            if (res.success) {
                setVehicles(res.data);
                console.log(res.data);
            } else {
                toast.error(res.message || "Failed to load vehicles");
            }
        } catch (err) {
            toast.error(err.message || "Failed to load vehicles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    // ------------------ CREATE VEHICLE ------------------
    const createVehicle = async (payload) => {
        const toastId = toast.loading("Creating vehicle...");
        try {
            const formData = new FormData();
            formData.append("vehicle_request", JSON.stringify(payload.vehicleData));

            if (payload.imageFiles && payload.imageFiles.length > 0) {
                payload.imageFiles.forEach((file) => {
                    formData.append("files", file);
                });
            }

            const res = await vehicleApi.createVehicle(formData);

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            toast.success("Vehicle created successfully!", { id: toastId });
            await fetchVehicles();
            return res.data;
        } catch (err) {
            toast.error(err.message || "Failed to create vehicle", { id: toastId });
            throw err;
        }
    };

    // ------------------ GET VEHICLE BY ID ------------------
    const getVehicleById = async (id) => {
        const toastId = toast.loading("Loading vehicle...");
        try {
            const res = await vehicleApi.getById(id);
            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }
            toast.success("Vehicle loaded", { id: toastId });
            return res.data;
        } catch (err) {
            toast.error(err.message || "Failed to load vehicle", { id: toastId });
            throw err;
        }
    };

    // ------------------ UPDATE VEHICLE ------------------
    const updateVehicle = async (id, payload) => {
        const toastId = toast.loading("Updating vehicle...");
        try {
            const formData = new FormData();
            formData.append("update_request", JSON.stringify(payload.vehicleData));

            if (payload.imageFiles && payload.imageFiles.length > 0) {
                payload.imageFiles.forEach((file) => {
                    formData.append("files", file);
                });
            }

            const res = await vehicleApi.updateVehicle(id, formData);

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }

            toast.success("Vehicle updated successfully!", { id: toastId });
            await fetchVehicles();
            return res.data;
        } catch (err) {
            toast.error(err.message || "Update failed", { id: toastId });
            throw err;
        }
    };

    // ------------------ DELETE VEHICLE ------------------
    const deleteVehicle = async (id) => {
        const toastId = toast.loading("Deleting vehicle...");
        try {
            const res = await vehicleApi.deleteVehicle(id);
            if (!res.success) {
                toast.error(res.message, { id: toastId });
                throw new Error(res.message);
            }
            toast.success("Vehicle deleted successfully!", { id: toastId });
            await fetchVehicles();
        } catch (err) {
            toast.error(err.message || "Delete failed", { id: toastId });
            throw err;
        }
    };

    return (
        <VehicleContext.Provider
            value={{
                vehicles,
                loading,
                fetchVehicles,
                createVehicle,
                getVehicleById,
                updateVehicle,
                deleteVehicle,
            }}
        >
            {children}
        </VehicleContext.Provider>
    );
};