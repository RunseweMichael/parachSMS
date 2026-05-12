import React, { useState, useEffect } from "react";
import api from "../api";

const AdminAddStudent = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    center: "Orogun",
    course: "",
    is_legacy_student: false,
    registration_date: "",
  });
  const [courses, setCourses] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses/courses/");
      setCourses(res.data || []);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      alert("Failed to load courses");
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      alert("Name and Email are required.");
      return;
    }

    // Validate: legacy students should have a registration date
    if (formData.is_legacy_student && !formData.registration_date) {
      alert("Please provide a registration date for legacy students.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        center: formData.center,
        course: formData.course || null,
        is_legacy_student: formData.is_legacy_student,
        // Only include registration_date if it's a legacy student with a date set
        ...(formData.is_legacy_student && formData.registration_date
          ? { registration_date: formData.registration_date }
          : {}),
      };

      const res = await api.post("/students/admin/add-student/", payload);

      const message = res.data.message || "Student added successfully";
      const password = res.data.password || "";
      const regDate = res.data.registration_date
        ? `\nRegistration Date: ${new Date(res.data.registration_date).toLocaleDateString()}`
        : "";
      const legacyNote = res.data.is_legacy_student ? "\n(Registered as Legacy Student)" : "";

      alert(`✅ ${message}\nPassword: ${password}${regDate}${legacyNote}`);

      setFormData({
        name: "",
        email: "",
        phone_number: "",
        address: "",
        center: "Orogun",
        course: "",
        is_legacy_student: false,
        registration_date: "",
      });

      onSuccess?.();
    } catch (err) {
      console.error("Failed to add student:", err);
      const errorMsg =
        err?.response?.data?.error ||
        (typeof err?.response?.data === "object"
          ? JSON.stringify(err.response.data)
          : err?.response?.data) ||
        "Failed to add student";
      alert(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    marginTop: "4px",
    boxSizing: "border-box",
  };

  const labelStyle = { fontWeight: "600", marginBottom: "4px", display: "block" };

  const legacyBoxStyle = {
    background: formData.is_legacy_student ? "#fff8e1" : "#f5f5f5",
    border: `1px solid ${formData.is_legacy_student ? "#f5a623" : "#ddd"}`,
    borderRadius: "8px",
    padding: "14px 16px",
    marginBottom: "16px",
    transition: "all 0.25s ease",
  };

  const toggleRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  };

  const switchTrackStyle = {
    width: "44px",
    height: "24px",
    borderRadius: "12px",
    background: formData.is_legacy_student ? "#f5a623" : "#ccc",
    position: "relative",
    transition: "background 0.2s",
    flexShrink: 0,
  };

  const switchThumbStyle = {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "#fff",
    position: "absolute",
    top: "3px",
    left: formData.is_legacy_student ? "23px" : "3px",
    transition: "left 0.2s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  };

  return (
    <div
      style={{
        padding: "24px",
        background: "#f9f9f9",
        borderRadius: "12px",
        maxWidth: "500px",
        margin: "25px auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Add Student</h3>

      {/* Name */}
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Name</label>
        <input
          style={inputStyle}
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Full name"
        />
      </div>

      {/* Email */}
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Email</label>
        <input
          style={inputStyle}
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="student@email.com"
        />
      </div>

      {/* Phone */}
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Phone</label>
        <input
          style={inputStyle}
          value={formData.phone_number}
          onChange={(e) => handleChange("phone_number", e.target.value)}
          placeholder="08012345678"
        />
      </div>

      {/* Center */}
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Center</label>
        <select
          style={inputStyle}
          value={formData.center}
          onChange={(e) => handleChange("center", e.target.value)}
        >
          <option value="Orogun">Orogun</option>
          <option value="Samonda">Samonda</option>
          <option value="Online">Online</option>
        </select>
      </div>

      {/* Course */}
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Course</label>
        <select
          style={inputStyle}
          value={formData.course}
          onChange={(e) => handleChange("course", e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.course_name} (₦{Number(c.price).toLocaleString()})
            </option>
          ))}
        </select>
      </div>

      {/* Legacy Student Toggle */}
      <div style={legacyBoxStyle}>
        <div
          style={toggleRowStyle}
          onClick={() => handleChange("is_legacy_student", !formData.is_legacy_student)}
        >
          <div>
            <div style={{ fontWeight: "600", fontSize: "14px", color: "#333" }}>
              🕰️ Legacy Student
            </div>
            <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
              Student enrolled before the system was set up
            </div>
          </div>
          <div style={switchTrackStyle}>
            <div style={switchThumbStyle} />
          </div>
        </div>

        {/* Registration Date — only shown when legacy is ON */}
        {formData.is_legacy_student && (
          <div style={{ marginTop: "14px" }}>
            <label style={{ ...labelStyle, color: "#b37700", fontSize: "13px" }}>
              Original Registration Date <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              style={{
                ...inputStyle,
                borderColor: "#f5a623",
                background: "#fffdf5",
              }}
              value={formData.registration_date}
              max={new Date().toISOString().split("T")[0]} // can't pick future dates
              onChange={(e) => handleChange("registration_date", e.target.value)}
            />
            <p style={{ fontSize: "11px", color: "#999", marginTop: "5px" }}>
              This will backdate the student's enrollment record.
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={saving}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#4caf50",
          color: "#fff",
          fontWeight: "600",
          border: "none",
          borderRadius: "8px",
          cursor: saving ? "not-allowed" : "pointer",
          transition: "background 0.3s",
          fontSize: "15px",
        }}
        onMouseEnter={(e) => !saving && (e.target.style.backgroundColor = "#45a049")}
        onMouseLeave={(e) => !saving && (e.target.style.backgroundColor = "#4caf50")}
      >
        {saving ? "Adding..." : "Add Student"}
      </button>
    </div>
  );
};

export default AdminAddStudent;