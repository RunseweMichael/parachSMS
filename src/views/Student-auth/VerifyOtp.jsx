import React, { useState, useEffect } from "react";
import apiPrivate from "../../apiPrivate";
import { UserLock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const savedLogin = sessionStorage.getItem("login_payload");

    if (!savedLogin) {
      navigate("/signin", { replace: true });
      return;
    }

    try {
      const parsed = JSON.parse(savedLogin);
      if (!parsed.email || !parsed.password) {
        navigate("/signin", { replace: true });
        return;
      }
      setCredentials(parsed);
    } catch (err) {
      navigate("/signin", { replace: true });
      return;
    }

    setIsChecking(false);
  }, [navigate]);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isChecking || !credentials) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const handleLogin = async () => {
    setError("");

    if (!otp) {
      setError("Enter OTP.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Login without attaching token
      const res = await apiPrivate.post("/students/login/", {
        email: credentials.email,
        password: credentials.password,
        code: otp,
      });

      // Remove temp credentials
      sessionStorage.removeItem("login_payload");

      // Save auth tokens for future requests
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user_id", res.data.user_id);
      sessionStorage.setItem("username", res.data.username);
      sessionStorage.setItem("role", res.data.role || "student");

      navigate(
        res.data.role === "admin" || res.data.role === "super-admin"
          ? "/super-admin/dashboard"
          : "/student/dashboard"
      );

    } catch (err) {
      console.error("Login Error:", err.response);
      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Login failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-3xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Verify OTP 🔐
        </h2>

        {error && <p className="text-red-600 bg-red-100 p-3 rounded mb-3">{error}</p>}

        <div className="relative mb-6">
          <UserLock className="absolute left-4 top-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full pl-12 py-3 rounded-xl border"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          {loading ? "Logging in..." : "Verify & Login"}
        </motion.button>
      </motion.div>
    </div>
  );
}
