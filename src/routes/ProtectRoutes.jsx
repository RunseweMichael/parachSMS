import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // "admin" or "student"

  if (!token) return <Navigate to="/signin" replace />;

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
