import React, { useState } from "react";
import apiPublic from "../../apiPublic";
import { MailCheck, Lock, UserLock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FloatingBackground from "../../component/FloatingBackground";

export default function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // SEND OTP
  const handleSendOTP = async () => {
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
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative z-10 overflow-hidden">

      <FloatingBackground />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-2xl shadow-2xl border border-white/40 rounded-3xl p-10 w-full max-w-md"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Sign in to continue your learning journey
        </p>

        {error && (
          <p className="text-red-600 bg-red-100 p-3 rounded-xl mb-3">{error}</p>
        )}
        {success && (
          <p className="text-green-600 bg-green-100 p-3 rounded-xl mb-3">
            {success}
          </p>
        )}

        {/* Redirect → Reset Password */}
        <p
          onClick={() => navigate("/reset-password")}
          className="text-right text-sm text-blue-600 hover:underline cursor-pointer mb-4"
        >
          Forgot Password?
        </p>

        <div className="space-y-4 mb-6">

          {/* EMAIL */}
          <div className="relative">
            <MailCheck className="absolute left-4 top-3.5 text-gray-500" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-500" size={20} />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-gray-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* OTP */}
          <div className="relative">
            <UserLock className="absolute left-4 top-3.5 text-gray-500" size={20} />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP Code"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 rounded-2xl shadow-lg transition-all"
          >
            {loading ? "Logging in..." : "Sign In"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSendOTP}
            disabled={sendingOtp}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all"
          >
            {sendingOtp ? "Sending OTP..." : "Send OTP"}
          </motion.button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-2xl shadow-md transition-all hover:scale-[1.02]"
          >
            Create a New Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
