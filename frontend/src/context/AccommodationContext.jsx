import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { accommodationApi } from "../service/accommodationService";

export const AccommodationContext = createContext();

export const AccommodationProvider = ({ children }) => {
  const [accommodations, setAccommodations] = useState([]);
  const [accoLoading, setAccoLoading] = useState(false);

  // ------------------ FETCH ALL ------------------
  const fetchAccommodations = async () => {
    setAccoLoading(true);
    try {
      const res = await accommodationApi.getAll();
      if (res.success) {
        setAccommodations(res.data);
      } else {
        toast.error(res.message || "Failed to load accommodations");
      }
    } catch (err) {
      toast.error(err.message || "Failed to load accommodations");
    } finally {
      setAccoLoading(false);
    }
  };

  // Load once
  useEffect(() => {
    fetchAccommodations();
  }, []);

  // ------------------ CREATE ------------------
  const createAccommodation = async (payload) => {
    const toastId = toast.accoLoading("Creating accommodation...");
    try {
      const res = await accommodationApi.createAccommodation(payload);

      if (!res.success) {
        toast.error(res.message, { id: toastId });
        throw new Error(res.message);
      }

      toast.success("Accommodation created successfully!", { id: toastId });
      await fetchAccommodations();
      return res.data;

    } catch (err) {
      toast.error(err.message || "Failed to create", { id: toastId });
      throw err;
    }
  };

  // ------------------ GET BY ID ------------------
  const getAccommodationById = async (id) => {
    const toastId = toast.accoLoading("Loading accommodation...");
    try {
      const res = await accommodationApi.getById(id);

      if (!res.success) {
        toast.error(res.message, { id: toastId });
        throw new Error(res.message);
      }

      toast.success("Loaded", { id: toastId });
      return res.data;

    } catch (err) {
      toast.error(err.message || "Failed to load accommodation", { id: toastId });
      throw err;
    }
  };

  // ------------------ UPDATE ------------------
  const updateAccommodation = async (id, updateData) => {
    const toastId = toast.accoLoading("Updating accommodation...");
    try {
      const res = await accommodationApi.updateAccommodation(id, updateData);

      if (!res.success) {
        toast.error(res.message, { id: toastId });
        throw new Error(res.message);
      }

      toast.success("Updated successfully!", { id: toastId });
      await fetchAccommodations();
      return res.data;

    } catch (err) {
      toast.error(err.message || "Update failed", { id: toastId });
      throw err;
    }
  };

  // ------------------ DELETE ------------------
  const deleteAccommodation = async (id) => {
    const toastId = toast.accoLoading("Deleting accommodation...");
    try {
      const res = await accommodationApi.deleteAccommodation(id);

      if (!res.success) {
        toast.error(res.message, { id: toastId });
        throw new Error(res.message);
      }

      toast.success("Deleted successfully!", { id: toastId });
      await fetchAccommodations();

    } catch (err) {
      toast.error(err.message || "Delete failed", { id: toastId });
      throw err;
    }
  };

  return (
    <AccommodationContext.Provider
      value={{
        accommodations,
        accoLoading,

        fetchAccommodations,
        createAccommodation,
        getAccommodationById,
        updateAccommodation,
        deleteAccommodation,
      }}
    >
      {children}
    </AccommodationContext.Provider>
  );
};