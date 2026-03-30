/**
 * src/context/AuthContext.jsx
 */

import { createContext, useContext, useState, useCallback } from "react";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  getStoredUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const roleRedirect = (role) => {
  switch (role) {
    case "admin":    return "/admin";
    case "dj":       return "/dj";
    case "empleado": return "/empleado";
    default:         return "/dashboard";
  }
};

export function AuthProvider({ children }) {
  const [user,      setUser]      = useState(() => getStoredUser());
  const [authError, setAuthError] = useState(null);
  const [loading,   setLoading]   = useState(false);

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

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutRequest();
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

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
      value={{ user, authError, loading, login, register, logout, updateUser, clearError }}
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
