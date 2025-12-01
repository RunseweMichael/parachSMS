import React, { useState } from "react";
import apiPublic from "../../apiPublic";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Send, CheckCircle, AlertCircle } from "lucide-react";
import FloatingBackground from "../../component/FloatingBackground";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    new_password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear messages when user types
    setMessage("");
    setError("");
  };

  // Step 1: Send OTP
  const handleSendOTP = async () => {
    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await apiPublic.post("/students/send-reset-otp/", {
        email: formData.email.trim(),
      });

      setOtpSent(true);
      setMessage(res.data.message || "OTP sent to your email!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.otp || !formData.new_password) {
      setError("Please fill in OTP and new password");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await apiPublic.post("/students/reset-password/", formData);

      setMessage(res.data.message || "Password reset successfully!");
      
      // Redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-12">
   
      <div className="absolute inset-0 overflow-hidden">
       
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
            <FloatingBackground/>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
            <p className="text-gray-600 mt-2">
              {otpSent ? "Enter the code we sent you" : "Recover your account"}
            </p>
          </div>

          {/* Success/Error Messages */}
          {message && (
            <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-6 border border-green-200">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{message}</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-6 border border-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@gmail.com"
                disabled={otpSent}
                className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-gray-50/70 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-70"
              />
            </div>

            {/* OTP Sent → Show OTP + New Password */}
            {otpSent && (
              <>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Verification Code (OTP)
                  </label>
                  <input
                    type="text"
                    name="otp"
                    maxLength={6}
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="123456"
                    className="w-full px-5 py-4 text-center text-2xl tracking-widest font-mono rounded-xl border border-gray-300 bg-gray-50 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Check your email for the 6-digit code
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    placeholder="Enter a strong password"
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-gray-50 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="pt-4">
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={loading || !formData.email}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    "Sending OTP..."
                  ) : (
                    <>
                      Send Reset Code
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? "Resetting Password..." : "Reset Password"}
                </button>
              )}
            </div>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition"
            >
              Back to Login
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Secured with end-to-end encryption
        </p>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;