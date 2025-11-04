// src/components/Students/VerifyOTP.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // For login and protected endpoints
import apiPublic from "../../apiPublic"; // For resend OTP (public)
import { Link } from "react-router-dom"; // 

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", code: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle OTP verification
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      // Verify OTP
      const res = await apiPublic.post("/students/verify-otp/", {
        email: formData.email,
        code: formData.code,
      });
      setMessage(res.data.message);

      // Login after successful OTP
      const loginRes = await apiPublic.post("/students/login/", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", loginRes.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      console.log("Error details:", err.response?.data);
      setError(err.response?.data?.error || "Verification failed.");
    }
  };

  // Handle resending OTP
  const handleResend = async () => {
    if (!formData.email) {
      setError("Please enter your email first to resend OTP.");
      return;
    }
    try {
      const res = await apiPublic.post("/students/resend-otp/", {
        email: formData.email,
      });
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to resend OTP.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Student Account Verification</h2>
        <p style={styles.subtext}>Enter your email, password, and OTP code to verify and log in</p>

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}

        <form onSubmit={handleVerify} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="student@university.edu"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>One-Time Passcode (OTP)</label>
          <input
            type="text"
            name="code"
            placeholder="Enter 6-digit OTP"
            value={formData.code}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Verify & Login
          </button>
        </form>

        <button onClick={handleResend} style={styles.resendBtn}>
          Resend OTP
        </button>

        <p style={{ marginTop: 15, textAlign: "center" }}>
          <Link to="/reset-password" style={{ color: "#1d4ed8", fontWeight: "600" }}>
            Forgot Password?
          </Link>
</p>
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
  heading: { fontSize: "1.8rem", marginBottom: 10, color: "#1e3a8a", fontWeight: "700" },
  subtext: { fontSize: 14, color: "#64748b", marginBottom: 25 },
  form: { display: "flex", flexDirection: "column", textAlign: "left", gap: 14 },
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

export default VerifyOTP;
