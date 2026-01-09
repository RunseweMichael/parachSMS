import React, { useState } from "react";
import { Lock, Eye, EyeOff, UserLock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FloatingBackground from "../../component/FloatingBackground";
import apiPublic from "../../apiPublic";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  const handleReset = async () => {
    setError("");
    setSuccess("");

    if (!otp || !password || !confirm) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await apiPublic.post("/students/reset-password/", {
        email,
        otp,
        new_password: password,
      });

      setSuccess("Password reset successful. Redirecting...");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <FloatingBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border p-8 w-full max-w-md z-10"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h1>

        {error && <p className="text-red-600 bg-red-50 p-3 rounded-xl mb-4">{error}</p>}
        {success && <p className="text-green-600 bg-green-50 p-3 rounded-xl mb-4">{success}</p>}

        <div className="space-y-4">
          <div className="relative">
            <UserLock className="absolute left-4 top-3.5 text-gray-400" />
            <input
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full pl-12 py-3 rounded-xl border"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-xl border"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 cursor-pointer"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full py-3 px-4 rounded-xl border"
          />
        </div>

        <motion.button
          onClick={handleReset}
          disabled={loading}
          className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </motion.button>
      </motion.div>
    </div>
  );
}
