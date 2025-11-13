import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user"); // or use context/auth state
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
