import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import apiPublic from "../../apiPublic";
import { Mail, Shield, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

export default function VerifyOTP() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // Countdown Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      setCanResend(false);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle OTP input
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Navigation inside input fields
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
 const handleVerify = async (e) => {
  e.preventDefault();
  const otpCode = code.join("");

  if (otpCode.length !== 6) return toast.error("Enter all 6 digits");

  setLoading(true);
  try {
    const res = await apiPublic.post("students/verify-otp/", {
      email,
      code: otpCode,
    });
    console.log("OTP RESPONSE:", res.data);

    // 🚀 SAVE TOKEN (Adjust this to match your backend)
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    if (res.data.access) {
      localStorage.setItem("token", res.data.access);
    }
    if (res.data.key) {
      localStorage.setItem("token", res.data.key);
    }

    toast.success("Email verified! Redirecting...");

    setTimeout(() => navigate("/student"), 1000);
  } catch (err) {
    toast.error(err.response?.data?.error || "Invalid or expired OTP");
  } finally {
    setLoading(false);
  }
};


  // Resend OTP
  const handleResend = async () => {
    if (!email) return toast.error("Enter your email first");

    try {
      await apiPublic.post("students/resend-otp/", { email }); // FIXED ROUTE
      toast.success("New OTP sent! Check your email");

      setTimer(45);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to resend OTP");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg mb-4">
                <Shield size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Verify Your Email</h1>
              <p className="text-gray-600 mt-2">We sent a 6-digit code to your email</p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* OTP Inputs */}
              <div className="flex justify-center gap-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl bg-white/70 focus:border-blue-500 transition-all"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-lg disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={22} />
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </motion.button>
            </form>

            {/* Resend OTP */}
            <div className="text-center mt-6">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-blue-600 font-bold hover:underline text-lg"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-gray-600">
                  Resend available in{" "}
                  <span className="font-bold text-purple-600">{timer}s</span>
                </p>
              )}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              © 2025 Parach Computers • Orogun, Ibadan
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
