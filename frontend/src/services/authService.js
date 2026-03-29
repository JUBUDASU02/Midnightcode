/**
 * src/services/authService.js
 */

import api from "./api";

const saveSession = (token, user) => {
  localStorage.setItem("neon_token", token);
  localStorage.setItem("neon_user", JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem("neon_token");
  localStorage.removeItem("neon_user");
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("neon_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const hasToken = () => Boolean(localStorage.getItem("neon_token"));

export const loginRequest = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });

  const token = data.token;
  const user  = data.user;

  if (!token || !user) {
    throw new Error("Respuesta inesperada del servidor.");
  }

  saveSession(token, user);
  return { token, user };
};

export const registerRequest = async ({ docId, name, email, phone, password }) => {
  const { data } = await api.post("/auth/register", {
    docId, name, email, phone, password
  });

  const token = data.token;
  const user  = data.user;

  if (!token || !user) {
    throw new Error("Respuesta inesperada del servidor al registrar.");
  }

  saveSession(token, user);
  return { token, user };
};

export const logoutRequest = async () => {
  try {
    await api.post("/auth/logout");
  } catch {
    // Si el token ya expiró igual limpiamos sesión local
  } finally {
    clearSession();
  }
};
