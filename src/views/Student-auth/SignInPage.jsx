import React, { useState } from "react";
import apiPublic from "../../apiPublic";
import { MailCheck, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FloatingBackground from "../../component/FloatingBackground";

export default function SignInStepOne() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOTP = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Enter email and password first.");
      return;
    }

    try {
      setSendingOtp(true);

      await apiPublic.post("/students/resend-otp/", { email });

      setSuccess("OTP sent to your email.");

      setTimeout(() => {
        navigate("/verify-otp-page", {
          state: { email, password },
        });
      }, 800);

    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP.");
    }

    setSendingOtp(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <FloatingBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h1>

        {error && <p className="text-red-600 bg-red-100 p-3 rounded mb-3">{error}</p>}
        {success && <p className="text-green-600 bg-green-100 p-3 rounded mb-3">{success}</p>}

        {/* Email */}
        <div className="relative mb-4">
          <MailCheck className="absolute left-4 top-3.5 text-gray-500" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 py-3 rounded-xl border"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <Lock className="absolute left-4 top-3.5 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSendOTP}
          disabled={sendingOtp}
          className="w-full bg-purple-600 text-white py-3 rounded-xl"
        >
          {sendingOtp ? "Sending OTP..." : "Continue"}
        </motion.button>
      </motion.div>
    </div>
  );
}
