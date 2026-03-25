import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * PrivateRoute
 * - Redirects to /login if not authenticated
 * - Redirects to /dashboard if authenticated but wrong role
 */
export default function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Save attempted URL so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}