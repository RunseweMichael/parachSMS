
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");


    navigate("/signin");
  };

  return logout;
}
