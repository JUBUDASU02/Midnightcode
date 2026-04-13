// src/services/authService.js
import publicApi from "./publicApi";
import api from "./api";

export const authService = {
  // Públicos (no requieren token)
  login: async (credentials) => {
    const response = await publicApi.post("/auth/login", credentials);
    return response.data; // { success, token, rol }
  },

  forgotPassword: async (correo_usu) => {
    const response = await publicApi.post("/auth/forgot-password", { correo_usu });
    return response.data;
  },

  resetPassword: async (token, nuevaPassword) => {
    const response = await publicApi.post("/auth/reset-password", {token, nuevaPassword});
    return response.data;
  },

  // Requiere token
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};