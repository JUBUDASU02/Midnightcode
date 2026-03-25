/**
 * src/services/api.js
 *
 * Instancia central de axios para todas las llamadas al backend.
 * Maneja automáticamente:
 *   - Adjuntar el JWT en cada request (Authorization: Bearer <token>)
 *   - Logout automático cuando el servidor responde 401
 *   - Mensajes de error legibles en español
 */

import axios from "axios";

// ─── Instancia base ───────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000, // 10 segundos antes de dar error de red
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── REQUEST interceptor — adjunta el token JWT ───────────────────────────────
api.interceptors.request.use(
  (config) => {
    // El token lo guardamos en localStorage como "neon_token"
    const token = localStorage.getItem("neon_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── RESPONSE interceptor — maneja errores globalmente ───────────────────────
api.interceptors.response.use(
  // Respuestas exitosas (2xx) pasan directo
  (response) => response,

  // Errores HTTP
  (error) => {
    const status  = error.response?.status;
    const message = error.response?.data?.message
                 || error.response?.data?.error
                 || error.message;

    // 401 = token expirado o inválido → logout automático
    if (status === 401) {
      localStorage.removeItem("neon_token");
      localStorage.removeItem("neon_user");
      // Redirigir al login sin recargar el estado de React
      window.location.href = "/login";
      return Promise.reject(new Error("Sesión expirada. Vuelve a iniciar sesión."));
    }

    // 403 = sin permisos
    if (status === 403) {
      return Promise.reject(new Error("No tienes permisos para realizar esta acción."));
    }

    // 404 = recurso no encontrado
    if (status === 404) {
      return Promise.reject(new Error("El recurso solicitado no existe."));
    }

    // 422 = error de validación del backend
    if (status === 422) {
      return Promise.reject(new Error(message || "Datos inválidos. Revisa el formulario."));
    }

    // 500+ = error del servidor
    if (status >= 500) {
      return Promise.reject(new Error("Error del servidor. Intenta de nuevo en unos segundos."));
    }

    // Error de red (sin respuesta del servidor)
    if (!error.response) {
      return Promise.reject(new Error("Sin conexión. Verifica que el backend esté corriendo."));
    }

    // Cualquier otro error
    return Promise.reject(new Error(message || "Ocurrió un error inesperado."));
  }
);

export default api;
