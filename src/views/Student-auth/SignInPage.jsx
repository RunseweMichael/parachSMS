import React, { useState } from "react";
import { MailCheck, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FloatingBackground from "../../component/FloatingBackground";
import apiPublic from "../../apiPublic";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Enter your email first.");
      return;
    }

    try {
      setSendingOtp(true);

      const res = await apiPublic.post("/students/resend-otp/", {
        email: email,
      });

      setSuccess("OTP sent to your email.");
      console.log("SEND OTP RESPONSE:", res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP.");
    }

    setSendingOtp(false);
  };

  // LOGIN WITH OTP
  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email || !password || !otp) {
      setError("Fill all fields including OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await apiPublic.post("/students/login/", {
        email: email,
        password: password,
        code: otp,
      });

      console.log("LOGIN RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("username", res.data.username);

      const userRole = res.data.role || res.data.user_role || "student";
      localStorage.setItem("role", userRole);

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      setSuccess("Login Successful!");

      setTimeout(() => {
        if (userRole === "admin" || userRole === "super-admin") {
          navigate("/super-admin/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      }, 1200);

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);

      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Login failed";

      setError(errorMsg);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
      {/* 🎨 DYNAMIC FLOATING GRADIENT BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {/* Base Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-300/30 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-300/30 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 60, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-br from-indigo-400/30 to-blue-300/30 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.55, 0.35],
            x: [0, -50, 0],
            y: [0, 70, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-violet-400/30 to-purple-300/30 rounded-full blur-3xl"
        />

        {/* Optional: Add FloatingBackground component */}
        <FloatingBackground />
      </div>

      {/* Main Form */}
      <div className="z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 md:p-10"
        >
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Sign In
          </h1>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 bg-red-50 p-3 rounded-xl mb-4 text-sm"
            >
              {error}
            </motion.p>
          )}

          {/* Input Fields */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <MailCheck className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-sm transition"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-sm transition"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500 cursor-pointer hover:text-gray-700 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </motion.div>
          </div>

          {/* Next Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleNext}
            disabled={loading}
            className="w-full mt-6 py-3 text-white font-bold bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : null}
            {loading ? "Sending OTP..." : "Next"}
          </motion.button>

          {/* Footer Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate("/signup")}
            className="text-center text-gray-600 hover:text-indigo-600 hover:underline cursor-pointer mt-4 text-sm transition"
          >
            Don't have an account? <span className="font-semibold">Sign Up</span>
          </motion.p>
        </motion.div>

        {/* Copyright below the box */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-500 text-xs mt-4"
        >
          © 2026 Parach ICT Academy
        </motion.p>
      </div>
    </div>
  );
}