import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = import.meta.env.VITE_API_BASE;

export const axiosAuth = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
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
    const formData = new FormData();

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined && updateData[key] !== null) {
        formData.append(key, updateData[key]);
      }
    });

    if (updateData.photo) formData.append("photo", updateData.photo);
    if (updateData.id_photo) formData.append("id_photo", updateData.id_photo);

    const res = await axiosAuth.patch("/auth/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
