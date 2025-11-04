// RegistrationForm.jsx
import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "male",
    course: null,
    birth_date: "",
    phone_number: "",
    address: "",
    consent: false,
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch available courses
  useEffect(() => {
    api
      .get("/courses/courses/")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "course" && value === "" ? null : value,
    }));
  };

  // Handle registration submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/students/users/", formData);
      alert("Registration successful! Check your email for OTP verification.");
      navigate("/verify-otp");
    } catch (err) {
      if (err.response?.data) {
        const messages = Object.entries(err.response.data)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
          .join(" ");
        setError(messages);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <select style={styles.select} name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <select style={styles.select} name="course" value={formData.course || ""} onChange={handleChange}>
          <option value="">Select Course (optional)</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.course_name}
            </option>
          ))}
        </select>

        <input
          style={styles.input}
          name="birth_date"
          type="date"
          value={formData.birth_date}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
        />

        <textarea
          style={styles.textarea}
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        ></textarea>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            style={styles.checkbox}
          />{" "}
          I consent to receive updates
        </label>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

// Inline styling (you can later migrate to Tailwind or CSS file)
const styles = {
  container: {
    maxWidth: 500,
    margin: "50px auto",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  form: { display: "flex", flexDirection: "column", gap: 15 },
  input: {
    padding: "10px 12px",
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
    transition: "border 0.2s",
  },
  select: {
    padding: "10px 12px",
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
  },
  textarea: {
    padding: "10px 12px",
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
    resize: "vertical",
    minHeight: 60,
  },
  checkboxLabel: { display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#555" },
  checkbox: { width: 16, height: 16 },
  button: {
    padding: "12px 0",
    fontSize: 16,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  },
  error: { color: "red", textAlign: "center", fontSize: 14 },
};

export default RegistrationForm;
