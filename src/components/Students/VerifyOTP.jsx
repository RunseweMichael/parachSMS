import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiPublic from "../../apiPublic"; 
import { Link } from "react-router-dom"; // 

const VerifyOTP = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(45);
  const inputRefs = useRef([]);

  // Auto countdown
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP box input
  const handleOTPChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only digits allowed

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next box automatically
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // ------------------------------
  // 🔐 Verify OTP (ONLY)
  // ------------------------------
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const otpCode = code.join("");

    try {
      const res = await apiPublic.post("/students/verify-otp/", {
        email,
        code: otpCode,
      });

      setMessage(res.data.message);

      // Redirect after success animation
      setTimeout(() => navigate("/student/dashboard"), 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP.");
    }

    setLoading(false);
  };

  // ------------------------------
  // 🔁 Resend OTP
  // ------------------------------
  const handleResend = async () => {
    if (!email) {
      setError("Enter your email to resend OTP.");
      return;
    }

    setError("");
    setMessage("");
    setTimer(45);

    try {
      const res = await apiPublic.post("/students/resend-otp/", { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 font-inter px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 animate-fade-in">

        <h2 className="text-3xl font-bold text-center text-blue-700">
          Verify Your Email
        </h2>

        <p className="text-center text-slate-600 mt-2 mb-6">
          Enter your email and the 6-digit code sent to you
        </p>

        {/* Alerts */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-3 text-center">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-3 text-center">
            {message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleVerify} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* OTP BOXES */}
          <div className="flex justify-between gap-2 mt-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={1}
                className="w-12 h-14 text-center text-2xl border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                value={digit}
                onChange={(e) => handleOTPChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all font-semibold"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center mt-5">
          {timer > 0 ? (
            <p className="text-slate-500">
              Resend code in <span className="font-bold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-yellow-600 font-semibold hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

        <div className="text-center mt-5">
          <Link to="/reset-password" className="text-blue-600 font-semibold hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
