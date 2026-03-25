/**
 * src/services/authService.js
 *
 * Todas las llamadas al backend relacionadas con autenticación.
 * Endpoints implementados en el backend Express:
 *   POST /auth/login
 *   POST /auth/register
 *   POST /auth/logout
 *
 * El token JWT se guarda en localStorage bajo la clave "neon_token".
 * El objeto usuario (sin contraseña) se guarda en "neon_user".
 */

import api from "./api";

// ─── Helpers de almacenamiento ────────────────────────────────────────────────

/** Guarda token y usuario en localStorage después de login exitoso */
const saveSession = (token, user) => {
  localStorage.setItem("neon_token", token);
  localStorage.setItem("neon_user", JSON.stringify(user));
};

/** Limpia la sesión del navegador */
const clearSession = () => {
  localStorage.removeItem("neon_token");
  localStorage.removeItem("neon_user");
};

/** Devuelve el usuario guardado en localStorage (para hidratar el contexto) */
export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("neon_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/** Devuelve true si hay un token guardado */
export const hasToken = () => Boolean(localStorage.getItem("neon_token"));

// ─── Auth API calls ───────────────────────────────────────────────────────────

/**
 * POST /auth/login
 *
 * El backend Express devuelve algo así:
 * {
 *   token: "eyJhbGciOiJIUzI1NiJ9...",
 *   user: { id, name, email, role, ... }
 * }
 *
 * Si tu backend devuelve una estructura diferente, ajusta las líneas
 * donde se extrae `token` y `user` debajo.
 */
export const loginRequest = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });

  // ── Ajusta según la respuesta real de tu backend ──────────────────────────
  // Caso A: { token, user }          → data.token, data.user
  // Caso B: { access_token, user }   → data.access_token, data.user
  // Caso C: { data: { token, user }} → data.data.token, data.data.user
  const token = data.token || data.access_token || data.data?.token;
  const user  = data.user  || data.data?.user;
  // ─────────────────────────────────────────────────────────────────────────

  if (!token || !user) {
    throw new Error("Respuesta inesperada del servidor. Contacta al administrador.");
  }

  saveSession(token, user);
  return { token, user };
};

/**
 * POST /auth/register
 *
 * El backend normalmente devuelve el mismo formato que login.
 */
export const registerRequest = async ({ name, email, password }) => {
  const { data } = await api.post("/auth/register", { name, email, password });

  const token = data.token || data.access_token || data.data?.token;
  const user  = data.user  || data.data?.user;

  if (!token || !user) {
    throw new Error("Respuesta inesperada del servidor al registrar.");
  }

  saveSession(token, user);
  return { token, user };
};

/**
 * POST /auth/logout
 *
 * Notifica al backend que el token ya no es válido
 * y limpia la sesión local.
 */
export const logoutRequest = async () => {
  try {
    // El interceptor de api.js adjunta el token automáticamente
    await api.post("/auth/logout");
  } catch {
    // Si el servidor falla al hacer logout (ej: token ya expirado),
    // igual limpiamos la sesión local
  } finally {
    clearSession();
  }
};
