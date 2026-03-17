import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * PublicRoute
 * If user is already logged in, redirect away from auth pages
 * (login, register, forgot-password)
 */
export default function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return children;
}