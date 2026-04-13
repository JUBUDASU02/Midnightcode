// src/services/authService.js
import publicApi from "./publicApi";
import api from "./api";

export const authService = {
  // Públicos (no requieren token)
  login: async (credentials) => {
    const response = await publicApi.post("/auth/login", credentials);
    return response.data; // { success, token, rol }
  },

  forgotPassword: async (email) => {
    const response = await publicApi.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await publicApi.post("/auth/reset-password", data);
    return response.data;
  },

  // Requiere token
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};