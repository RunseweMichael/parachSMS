import React, { useState } from "react";
import { MailCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingBackground from "../../component/FloatingBackground";
import apiPublic from "../../apiPublic";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOTP = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      await apiPublic.post("/students/send-reset-otp/", { email });
      setSuccess("OTP sent to your email.");
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1200);
    } catch (err) {
  console.log("RESET OTP ERROR:", err.response?.data);
  setError(
    err.response?.data?.error ||
    err.response?.data?.detail ||
    "Failed to send OTP."
  );
}
 finally {
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
          Forgot Password
        </h1>

        {error && <p className="text-red-600 bg-red-50 p-3 rounded-xl mb-4">{error}</p>}
        {success && <p className="text-green-600 bg-green-50 p-3 rounded-xl mb-4">{success}</p>}

        <div className="relative mb-6">
          <MailCheck className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSendOTP}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold"
        >
          {loading ? "Sending OTP..." : "Send Reset Code"}
        </motion.button>

        <p
          onClick={() => navigate("/signin")}
          className="text-center text-sm mt-4 text-gray-600 hover:underline cursor-pointer"
        >
          Back to Sign In
        </p>
      </motion.div>
    </div>
  );
}
