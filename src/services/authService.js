// src/services/authService.js
import publicApi from "./publicApi";
import api from "./api";

export const authService = {
  // Públicos (no requieren token)
  login: async (credentials) => {
    const response = await publicApi.post("/auth/login", credentials);
    return response.data; // { success, token, rol }
  },

  // ✅ REGISTER - Nuevo
  register: async (userData) => {
    const response = await publicApi.post("/usuarios/register", userData);
    return response.data; // { success, token, rol, user }
  },

  forgotPassword: async (correo_usu) => {
    const response = await publicApi.post("/auth/forgot-password", { correo_usu });
    return response.data;
  },

  resetPassword: async (token, nuevaPassword) => {
    const response = await publicApi.post("/auth/reset-password", { token, nuevaPassword });
    return response.data;
  },

  // Requiere token
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};

// Helper functions para el AuthContext
export const loginRequest = async (credentials) => {
  const data = await authService.login(credentials);
  if (data.success && data.token) {
    localStorage.setItem("auth_token", data.token);
    const userData = data.user || { rol: data.rol, email: credentials.email };
    localStorage.setItem("neon_user", JSON.stringify(userData));
    return { user: userData, token: data.token };
  }
  throw new Error(data.message || "Error al iniciar sesión");
};

export const registerRequest = async (userData) => {
  const data = await authService.register(userData);
  if (data.success && data.token) {
    localStorage.setItem("auth_token", data.token);
    const userDataStored = data.user || { rol: data.rol || "usuario" };
    localStorage.setItem("neon_user", JSON.stringify(userDataStored));
    return { user: userDataStored, token: data.token };
  }
  throw new Error(data.message || "Error al registrar usuario");
};

export const logoutRequest = async () => {
  try {
    await authService.logout();
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("neon_user");
  }
};

export const getStoredUser = () => {
  const stored = localStorage.getItem("neon_user");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};