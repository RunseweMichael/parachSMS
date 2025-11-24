import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // "admin" or "student"

  if (!token) return <Navigate to="/signin" replace />;

  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
