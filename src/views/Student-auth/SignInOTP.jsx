import React, { useState } from "react";
import { UserLock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FloatingBackground from "../../component/FloatingBackground";
import apiPublic from "../../apiPublic";

export default function SignInOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {};

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  if (!email || !password) {
    navigate("/signin"); // Redirect if accessed directly
    return null;
  }

  // LOGIN WITH OTP
  const handleLogin = async () => {
    setError("");
    setSuccess("");
    if (!otp) {
      setError("Enter OTP.");
      return;
    }

    try {
      setLoading(true);
      const res = await apiPublic.post("/students/login/", {
        email,
        password,
        code: otp,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role || "student");

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/student/dashboard"), 1200);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const handleResend = async () => {
    setError("");
    setSuccess("");
    try {
      setSendingOtp(true);
      await apiPublic.post("/students/resend-otp/", { email });
      setSuccess("OTP sent to your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-6">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <FloatingBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-80"></div>
      </div>

      {/* Form Box */}
      <div className="z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 md:p-10"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Verify OTP</h1>
            <p className="text-gray-600 mt-2">
              Enter the code sent to <span className="font-semibold">{email}</span>
            </p>
          </div>

          {/* Messages */}
          {error && (
            <p className="text-red-600 bg-red-50 p-3 rounded-xl mb-4">{error}</p>
          )}
          {success && (
            <p className="text-green-600 bg-green-50 p-3 rounded-xl mb-4">{success}</p>
          )}

          {/* OTP Input */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <UserLock className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-purple-500 outline-none shadow-sm transition"
            />
          </motion.div>

          {/* Buttons */}
          <div className="space-y-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 text-white font-bold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {loading ? "Logging in..." : "Login"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleResend}
              disabled={sendingOtp}
              className="w-full py-3 text-purple-700 font-semibold bg-purple-100 rounded-2xl shadow-sm hover:bg-purple-200 transition"
            >
              {sendingOtp ? "Resending..." : "Resend OTP"}
            </motion.button>

            <p
              onClick={() => navigate("/signin")}
              className="text-center text-sm text-gray-600 hover:underline cursor-pointer mt-2"
            >
              Back to Sign In
            </p>
          </div>
        </motion.div>

        {/* Copyright just below the box */}
        <p className="text-center text-gray-500 text-xs mt-4">
          © 2026 Parach ICT Academy
        </p>
      </div>
    </div>
  );
}
