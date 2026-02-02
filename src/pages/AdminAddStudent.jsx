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

  setSaving(true);
  try {
    const payload = {
      ...formData,
      course: formData.course || null, // DRF expects null instead of empty string
    };

    const res = await api.post("/students/admin/add-student/", payload);

    const message = res.data.message || "Student added successfully";
    const password = res.data.password || "";

    alert(`✅ ${message}\nPassword: ${password}`);

    setFormData({
      name: "",
      email: "",
      phone_number: "",
      address: "",
      center: "Orogun",
      course: "",
    });

    onSuccess?.(); // refresh student list
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

  const labelStyle = { fontWeight: "600", marginBottom: "4px" };

  return (
    <div style={{
      padding: "24px",
      background: "#f9f9f9",
      borderRadius: "12px",
      maxWidth: "500px",
      margin: "25px auto",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Add Student</h3>
      
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Name</label>
        <input style={inputStyle} value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Email</label>
        <input style={inputStyle} value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Phone</label>
        <input style={inputStyle} value={formData.phone_number} onChange={(e) => handleChange("phone_number", e.target.value)} />
      </div>

      {/* <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Address</label>
        <input style={inputStyle} value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />
      </div> */}

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

      <div style={{ marginBottom: "24px" }}>
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
