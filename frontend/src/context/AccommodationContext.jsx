import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { accommodationApi } from "../service/accommodationService";

export const AccommodationContext = createContext();

export const AccommodationProvider = ({ children }) => {
  const [accommodations, setAccommodations] = useState([]);
  const [ownerAccommodations, setOwnerAccommodations] = useState([]);
  const [accoLoading, setAccoLoading] = useState(false);

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

  const fetchMyAccommodations = async () => {
    setAccoLoading(true);
    try {
      const res = await accommodationApi.getMyAccommodations();

      if (res.success) {
        setOwnerAccommodations(res.data);
      } else {
        toast.error(res.message || "Failed to load your accommodations");
      }
    } catch (err) {
      toast.error(err.message || "Failed to load your accommodations");
    } finally {
      setAccoLoading(false);
    }
  };

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const createAccommodation = async (payload) => {
    const toastId = toast.loading("Creating accommodation...");
    try {
      const formData = new FormData();

      formData.append("accom_request", JSON.stringify(payload.accommodationData));

      if (payload.imageFiles && payload.imageFiles.length > 0) {
        payload.imageFiles.forEach((file) => {
          formData.append("files", file);
        });
      }

      const res = await accommodationApi.createAccommodation(formData);

      if (!res.success) {
        toast.error(res.message, { id: toastId });
        throw new Error(res.message);
      }

      toast.success("Accommodation created successfully!", { id: toastId });

      await fetchAccommodations();
      await fetchMyAccommodations();

      return res.data;
    } catch (err) {
      toast.error(err.message || "Failed to create", { id: toastId });
      throw err;
    }
  };

  const getAccommodationById = async (id) => {
    try {
      const res = await accommodationApi.getById(id);

      if (!res.success) {
        toast.error(res.message);
        throw new Error(res.message);
      }
      return res.data;
    } catch (err) {
      toast.error(err.message || "Failed to load accommodation");
      throw err;
    }
  };

  const updateAccommodation = async (id, payload) => {
    const toastId = toast.loading("Updating accommodation...");
    try {
      const formData = new FormData();

      formData.append(
        "update_request",
        JSON.stringify(payload.accommodationData)
      );

      if (payload.imageFiles && payload.imageFiles.length > 0) {
        payload.imageFiles.forEach((file) => {
          formData.append("files", file);
        });
      }

      const res = await accommodationApi.updateAccommodation(id, formData);

      if (!res.success) {
        toast.error(res.message, { id: toastId });
        throw new Error(res.message);
      }

      toast.success("Updated successfully!", { id: toastId });

      await fetchAccommodations();
      await fetchMyAccommodations();

      return res.data;
    } catch (err) {
      toast.error(err.message || "Update failed", { id: toastId });
      throw err;
    }
  };

  const deleteAccommodation = async (id) => {
    const toastId = toast.loading("Deleting accommodation...");
    try {
      const res = await accommodationApi.deleteAccommodation(id);

      if (!res.success) {
        toast.error(res.message, { id: toastId });
        throw new Error(res.message);
      }

      toast.success("Deleted successfully!", { id: toastId });

      await fetchAccommodations();
      await fetchMyAccommodations();
    } catch (err) {
      toast.error(err.message || "Delete failed", { id: toastId });
      throw err;
    }
  };

  return (
    <AccommodationContext.Provider
      value={{
        accommodations,
        ownerAccommodations,
        accoLoading,

        fetchAccommodations,
        fetchMyAccommodations,

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