import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

// Mock users for demo — replace with real API calls
const MOCK_USERS = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "user@neon.com",
    password: "password123",
    role: "user",
    phone: "+57 300 000 0000",
    city: "Bogotá",
    avatar: "https://i.pravatar.cc/200?img=3",
    memberSince: "Enero 2025",
  },
  {
    id: 2,
    name: "System Admin",
    email: "admin@neon.com",
    password: "admin123",
    role: "admin",
    phone: "+57 310 000 0000",
    city: "Bogotá",
    avatar: "https://i.pravatar.cc/200?img=10",
    memberSince: "Enero 2024",
  },
{
  id: 3,
  name: "DJ Jubu",
  email: "dj@neon.com",
  password: "dj123",
  role: "dj",
  avatar: "https://i.pravatar.cc/200?img=15",
  memberSince: "Marzo 2025",
},
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("neon_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [authError, setAuthError] = useState(null);

  const login = useCallback(({ email, password }) => {
    setAuthError(null);
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      setAuthError("Correo o contraseña incorrectos");
      return { success: false, error: "Correo o contraseña incorrectos" };
    }
    // Don't store password in state/localStorage
    const { password: _pw, ...safeUser } = found;
    localStorage.setItem("neon_user", JSON.stringify(safeUser));
    setUser(safeUser);
    return { success: true, role: safeUser.role };
  }, []);

  const register = useCallback(({ name, email, password }) => {
    setAuthError(null);
    const exists = MOCK_USERS.find((u) => u.email === email);
    if (exists) {
      setAuthError("Ya existe una cuenta con ese correo");
      return { success: false, error: "Ya existe una cuenta con ese correo" };
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      role: "user",
      phone: "",
      city: "",
      avatar: `https://i.pravatar.cc/200?img=${Math.floor(Math.random() * 70)}`,
      memberSince: new Date().toLocaleDateString("es-CO", { month: "long", year: "numeric" }),
    };
    localStorage.setItem("neon_user", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true, role: newUser.role };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("neon_user");
    setUser(null);
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
      value={{ user, authError, login, register, logout, updateUser, clearError }}
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