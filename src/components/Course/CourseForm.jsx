// src/components/CourseForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    course_name: "",
    price: "",
    duration: "",
    skills: "",
    status: true,
    resource_link: "", // NEW FIELD
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        try {
          const token = localStorage.getItem("token");
          const res = await api.get(`courses/courses/${id}/`, {
            headers: { Authorization: `Token ${token}` },
          });
          setFormData(res.data);
        } catch (err) {
          console.error(err);
          alert("Failed to fetch course data.");
        }
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (id) {
        await api.put(`courses/courses/${id}/`, formData, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("Course updated!");
      } else {
        await api.post("courses/courses/", formData, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("Course created!");
      }
      navigate("/"); // Redirect after submission
    } catch (err) {
      console.error(err);
      alert("Error submitting the form.");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>{id ? "✏️ Edit Course" : "➕ Add New Course"}</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Course Name</label>
          <input
            type="text"
            style={styles.input}
            value={formData.course_name}
            onChange={(e) =>
              setFormData({ ...formData, course_name: e.target.value })
            }
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price (₦)</label>
          <input
            type="number"
            style={styles.input}
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Duration (weeks)</label>
          <input
            type="number"
            style={styles.input}
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Skills</label>
          <textarea
            style={styles.textarea}
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </div>

        {/* ===== RESOURCE LINK FIELD ===== */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Resource Link (URL)</label>
          <input
            type="url"
            style={styles.input}
            value={formData.resource_link}
            onChange={(e) =>
              setFormData({ ...formData, resource_link: e.target.value })
            }
            placeholder="https://example.com/resource"
          />
        </div>

        <button type="submit" style={styles.button}>
          {id ? "Update Course" : "Create Course"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  heading: { fontSize: "24px", fontWeight: "700", marginBottom: "20px", color: "#1e3a8a" },
  form: { display: "flex", flexDirection: "column" },
  formGroup: { marginBottom: "16px", display: "flex", flexDirection: "column" },
  label: { marginBottom: "6px", fontWeight: "600", color: "#374151" },
  input: { padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
  textarea: { padding: "10px 12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", minHeight: "80px", outline: "none" },
  button: {
    marginTop: "20px",
    padding: "10px 16px",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "600",
    fontSize: "15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};

export default CourseForm;