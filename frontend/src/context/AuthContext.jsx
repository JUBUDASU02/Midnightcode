/**
 * src/context/AuthContext.jsx
 *
 * Context de autenticación conectado al backend Express + JWT.
 * Ya no usa MOCK_USERS — todas las operaciones van al servidor.
 *
 * Flujo:
 *  1. Al montar, hidrata el usuario desde localStorage (sesión persistente)
 *  2. login()    → POST /auth/login    → guarda token + user en localStorage
 *  3. register() → POST /auth/register → guarda token + user en localStorage
 *  4. logout()   → POST /auth/logout   → limpia localStorage
 */

import { createContext, useContext, useState, useCallback } from "react";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  getStoredUser,
} from "../services/authService";

const AuthContext = createContext(null);

// ─── Redirección por rol ──────────────────────────────────────────────────────
export const roleRedirect = (role) => {
  switch (role) {
    case "admin":    return "/admin";
    case "dj":       return "/dj";
    case "empleado": return "/empleado";
    default:         return "/dashboard";
  }
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {

  // Hidrata el usuario desde localStorage (sesión persistente entre recargas)
  const [user,      setUser]      = useState(() => getStoredUser());
  const [authError, setAuthError] = useState(null);
  const [loading,   setLoading]   = useState(false);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ email, password }) => {
    setAuthError(null);
    setLoading(true);
    try {
      const { user: apiUser } = await loginRequest({ email, password });
      setUser(apiUser);
      return { success: true, role: apiUser.role };
    } catch (err) {
      const msg = err.message || "Error al iniciar sesión";
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(async ({ docId, name, email, phone, password }) => {
    setAuthError(null);
    setLoading(true);
    try {
      const { user: apiUser } = await registerRequest({ docId, name, email, phone, password });
      setUser(apiUser);
      return { success: true, role: apiUser.role };
    } catch (err) {
      const msg = err.message || "Error al registrar la cuenta";
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutRequest();
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  // ── Update user (local — para cambios de perfil) ───────────────────────────
  // Cuando tengas PATCH /users/me en el backend, reemplaza esto por una llamada real
  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem("neon_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearError = useCallback(() => setAuthError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authError,
        loading,
        login,
        register,
        logout,
        updateUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
