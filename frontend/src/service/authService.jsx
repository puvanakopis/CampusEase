import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const getToken = () => localStorage.getItem("token");

const axiosAuth = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAuth.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  login: async (email, password) => {
    return axios.post(`${API_BASE}/auth/login`, { email, password });
  },
};
