import React, { useState } from "react";
import apiPublic from "../../apiPublic";
import { useNavigate } from "react-router-dom";

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
  };

  // STEP 1 → Send OTP
  const handleSendOTP = async () => {
    if (!formData.email) {
      setError("Please enter your email first.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await apiPublic.post("/students/send-reset-otp/", {
        email: formData.email,
      });

      setOtpSent(true);
      setMessage(res.data.message || "OTP sent successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP.");
    }

    setLoading(false);
  };

  // STEP 2 → Reset Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await apiPublic.post("/students/reset-password/", formData);
      setMessage(res.data.message || "Password reset successful!");

      setTimeout(() => navigate("/verify-otp"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient from-blue-50 to-slate-100 flex items-center justify-center px-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        
        <h2 className="text-3xl font-bold text-center text-blue-700">
          Reset Your Password
        </h2>

        <p className="text-center text-slate-600 mt-2 mb-6">
          Enter your email to receive a reset code.
        </p>

        {/* Alerts */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-slate-600 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="student@university.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Send OTP Button */}
          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-yellow-400 text-slate-800 py-3 rounded-xl font-semibold shadow-md hover:bg-yellow-500 transition-all"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )}

          {/* OTP + New Password */}
          {otpSent && (
            <>
              <div>
                <label className="text-sm font-semibold text-slate-600 mb-1 block">
                  OTP Code
                </label>
                <input
                  type="text"
                  name="otp"
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter 6-digit code"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 mb-1 block">
                  New Password
                </label>
                <input
                  type="password"
                  name="new_password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter new password"
                  value={formData.new_password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
