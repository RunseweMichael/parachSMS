import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
 const user = localStorage.getItem("token") || localStorage.getItem("user_id");
  return user ? children : <Navigate to="/signin" replace />;
  }
  return children;

