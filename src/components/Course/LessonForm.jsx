// src/components/LessonForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import api from "../../api";

const LessonForm = () => {
  const [title, setTitle] = useState("");
  const [module, setModule] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();

  const moduleIdFromQuery = searchParams.get("module");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (id) {
      api
        .get(`courses/lessons/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setTitle(res.data.title);
          setModule(res.data.module);
          setContent(res.data.content || "");
        })
        .catch((err) => console.error(err));
    } else if (moduleIdFromQuery) {
      setModule(moduleIdFromQuery);
    }
  }, [id, moduleIdFromQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      if (id) {
        await api.put(
          `courses/lessons/${id}/`,
          { title, module, content },
          { headers: { Authorization: `Token ${token}` } }
        );
        alert("Lesson updated successfully!");
      } else {
        await api.post(
          "courses/lessons/",
          { title, module, content },
          { headers: { Authorization: `Token ${token}` } }
        );
        alert("Lesson added successfully!");
      }
      navigate(-1);
    } catch (err) {
      alert("Failed to save lesson.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>{id ? "✏️ Edit Lesson" : "➕ Add Lesson"}</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Lesson Title</label>
          <input
            type="text"
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Lesson Content</label>
          <textarea
            style={styles.textarea}
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Saving..." : id ? "Update Lesson" : "Add Lesson"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "650px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
  },
  heading: { fontSize: "24px", fontWeight: "700", color: "#1e3a8a", marginBottom: "25px" },
  form: { display: "flex", flexDirection: "column" },
  formGroup: { marginBottom: "18px", display: "flex", flexDirection: "column" },
  label: { marginBottom: "6px", fontWeight: "600", color: "#374151" },
  input: {
    padding: "10px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    transition: "border 0.3s",
  },
  textarea: {
    padding: "10px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    transition: "border 0.3s",
    minHeight: "100px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 16px",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default LessonForm;
