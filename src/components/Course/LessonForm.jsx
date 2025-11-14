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
        alert("✅ Lesson updated successfully!");
      } else {
        await api.post(
          "courses/lessons/",
          { title, module, content },
          { headers: { Authorization: `Token ${token}` } }
        );
        alert("🎉 Lesson added successfully!");
      }
      navigate(-1);
    } catch (err) {
      alert("⚠️ Failed to save lesson.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>
          {id ? "✏️ Edit Lesson" : "➕ Add Lesson"}
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Lesson Title */}
          <div style={styles.field}>
            <label style={styles.label}>Lesson Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter lesson title..."
              style={styles.input}
            />
          </div>

          {/* Lesson Content */}
          <div style={styles.field}>
            <label style={styles.label}>Lesson Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter lesson details or notes..."
              rows="6"
              style={styles.textarea}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#93C5FD" : "#1D4ED8",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#2563EB")}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#1D4ED8")}
          >
            {loading ? "Saving..." : id ? "Update Lesson" : "Add Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  container: {
    width: "100%",
    maxWidth: "650px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    padding: "2rem 2.5rem",
    border: "1px solid #e5e7eb",
  },
  heading: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.5rem",
    fontSize: "0.95rem",
  },
  input: {
    padding: "0.7rem 0.9rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  textarea: {
    padding: "0.7rem 0.9rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "0.95rem",
    outline: "none",
    resize: "vertical",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  button: {
    marginTop: "0.5rem",
    backgroundColor: "#1D4ED8",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    padding: "0.75rem 1.2rem",
    borderRadius: "8px",
    fontSize: "1rem",
    boxShadow: "0 3px 8px rgba(29,78,216,0.3)",
    transition: "background-color 0.2s ease, transform 0.1s ease",
  },
};

export default LessonForm;
