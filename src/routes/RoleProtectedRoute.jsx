import { Navigate } from "react-router-dom";

export default function RoleProtectedRoute({ children, allowed }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/signin" replace />;

  if (!allowed.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
