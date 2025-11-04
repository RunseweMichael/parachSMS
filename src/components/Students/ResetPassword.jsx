// src/components/Students/ResetPassword.jsx
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 1. Send OTP for password reset
  const handleSendOTP = async () => {
    if (!formData.email) {
      setError("Please enter your email before requesting OTP.");
      return;
    }

    try {
      const res = await apiPublic.post("/students/send-reset-otp/", {
        email: formData.email,
      });
      setMessage(res.data.message || "OTP sent to your email.");
      setError("");
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to send OTP.");
    }
  };

  // 🔹 2. Submit reset password form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await apiPublic.post("/students/reset-password/", formData);
      setMessage(res.data.message || "Password reset successful!");
      setError("");
      setTimeout(() => navigate("/verify-otp"), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to reset password.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Reset Password</h2>
        <p style={styles.subtext}>
          Enter your email, request an OTP, then reset your password.
        </p>

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="student@university.edu"
            required
            style={styles.input}
          />

          {/* Send OTP button */}
          <button
            type="button"
            onClick={handleSendOTP}
            style={styles.resendBtn}
          >
            Send OTP
          </button>

          {/* OTP Input */}
          {otpSent && (
            <>
              <label style={styles.label}>OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter 6-digit OTP"
                required
                style={styles.input}
              />

              <label style={styles.label}>New Password</label>
              <input
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                style={styles.input}
              />

              <button type="submit" style={styles.button}>
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "40px 35px",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: 10,
    color: "#1e3a8a",
    fontWeight: "700",
  },
  subtext: { fontSize: 14, color: "#64748b", marginBottom: 25 },
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    gap: 14,
  },
  label: { fontSize: 14, color: "#334155", marginLeft: 4, fontWeight: "600" },
  input: {
    padding: "12px 15px",
    fontSize: 15,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    outline: "none",
    backgroundColor: "#f8fafc",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  button: {
    marginTop: 20,
    padding: "12px 0",
    fontSize: 16,
    borderRadius: 10,
    border: "none",
    backgroundColor: "#1d4ed8",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(29,78,216,0.3)",
    transition: "background-color 0.3s, transform 0.2s",
  },
  resendBtn: {
    marginTop: 15,
    width: "100%",
    padding: "10px 0",
    borderRadius: 10,
    backgroundColor: "#fbbf24",
    border: "none",
    color: "#1e293b",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    color: "#dc2626",
    backgroundColor: "#fee2e2",
    padding: "10px",
    borderRadius: 8,
    marginBottom: 10,
  },
  success: {
    color: "#15803d",
    backgroundColor: "#dcfce7",
    padding: "10px",
    borderRadius: 8,
    marginBottom: 10,
  },
};

export default ResetPassword;
