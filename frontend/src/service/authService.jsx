import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = import.meta.env.VITE_API_BASE;

export const axiosAuth = axios.create({
  baseURL: API_BASE,
});

axiosAuth.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  login: async (email, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    return res.data;
  },

  getCurrentUser: async () => {
    const res = await axiosAuth.get("/auth/me");
    return res.data;
  },

  requestPasswordReset: async (email) => {
    const res = await axios.post(`${API_BASE}/auth/forgot-password`, { email });
    return res.data;
  },

  resetPassword: async (email, otp, newPassword) => {
    const res = await axios.post(`${API_BASE}/auth/reset-password`, {
      email,
      otp,
      new_password: newPassword,
    });
    return res.data;
  },

  requestSignupOtp: async (role, firstName, lastName, email, password) => {
    const res = await axios.post(`${API_BASE}/auth/signup-request-otp`, {
      role,
      first_name: firstName,
      last_name: lastName,
      email,
      password
    });
    return res.data;
  },

  verifySignupOtp: async (role, email, otp) => {
    const res = await axios.post(`${API_BASE}/auth/signup-verify-otp`, {
      role,
      email,
      otp
    });
    return res.data;
  },

  updateProfile: async (updateData) => {
    let formData;

    if (updateData instanceof FormData) {
      formData = updateData;
    } else {
      formData = new FormData();

      // Only include fields that the backend accepts for update-profile
      const allowedFields = [
        "first_name",
        "last_name",
        "address",
        "description",
        "phone",
        "id_number",
        "status",
      ];

      allowedFields.forEach((key) => {
        if (updateData[key] !== undefined && updateData[key] !== null) {
          formData.append(key, updateData[key]);
        }
      });

      if (updateData.photo) formData.append("photo", updateData.photo);
      if (updateData.id_photo) formData.append("id_photo", updateData.id_photo);
    }

    // Let axios set multipart/form-data boundary automatically
    const res = await axiosAuth.patch("/auth/update-profile", formData);

    return res.data;
  },

  updatePassword: async (currentPassword, newPassword) => {
    const res = await axiosAuth.patch("/auth/update-password", {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return res.data;
  },

};
