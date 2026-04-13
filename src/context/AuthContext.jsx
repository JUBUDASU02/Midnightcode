// src/context/AuthContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  getStoredUser,
} from "../services/authService";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

// Mapeo de roles a rutas
export const roleRedirect = (role) => {
  switch (role) {
    case "admin":    return "/admin";
    case "dj":       return "/dj";
    case "empleado": return "/empleado";
    default:         return "/dashboard";
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ LOGIN
  const login = useCallback(async ({ correo_usu, password_usu }) => {
    setAuthError(null);
    setLoading(true);
    try {
      const { user: apiUser, token } = await loginRequest({ correo_usu, password_usu });
      setUser(apiUser);
      return { 
        success: true, 
        role: apiUser?.rol || apiUser?.role,
        user: apiUser 
      };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error al iniciar sesión";
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ REGISTER - Corregido con todos los campos incluyendo teléfono
  const register = useCallback(async ({ name, email, documentId, telefono, password }) => {
    setAuthError(null);
    setLoading(true);
    try {
      const { user: apiUser, token } = await registerRequest({ 
        nombre_usu: name,
        correo_usu: email,
        doc_identidad: documentId,
        telefono_usu: telefono,  // ✅ Teléfono agregado
        password_usu: password,
        cod_rol: 1
      });
      setUser(apiUser);
      return { 
        success: true, 
        role: apiUser?.rol || apiUser?.role,
        user: apiUser 
      };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error al registrar usuario";
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ FORGOT PASSWORD
  const forgotPassword = useCallback(async (correo_usu) => {
    setAuthError(null);
    setLoading(true);
    try {
      const response = await authService.forgotPassword(correo_usu);
      return response;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error al enviar el correo";
      setAuthError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ RESET PASSWORD
  const resetPassword = useCallback(async (token, nuevaPassword) => {
    setAuthError(null);
    setLoading(true);
    try {
      const response = await authService.resetPassword(token, nuevaPassword);
      return response;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error al restablecer la contraseña";
      setAuthError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ LOGOUT
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
      value={{
        user,
        authError,
        loading,
        login,
        register,
        forgotPassword,
        resetPassword,
        logout,
        updateUser,
        clearError,
        isAuthenticated: !!user,
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