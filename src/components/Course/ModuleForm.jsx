// src/components/ModuleForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import api from "../../api";

const ModuleForm = () => {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [order, setOrder] = useState(1);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();

  const courseIdFromQuery = searchParams.get("course");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (id) {
      api
        .get(`courses/modules/${id}/`, { headers: { Authorization: `Token ${token}` } })
        .then((res) => {
          setTitle(res.data.title);
          setCourse(res.data.course);
          setOrder(res.data.order || 1);
          setStatus(res.data.status ?? true);
        })
        .catch((err) => console.error(err));
    } else if (courseIdFromQuery) {
      setCourse(courseIdFromQuery);
    }
  }, [id, courseIdFromQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { title, course, order: Number(order), status };
    const token = localStorage.getItem("token");

    try {
      if (id) {
        await api.put(`courses/modules/${id}/`, payload, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("✅ Module updated successfully!");
      } else {
        await api.post("courses/modules/", payload, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("🎉 Module created successfully!");
      }
      navigate(`/admin/courses/${course}`);
    } catch (err) {
      console.error(err);
      alert("⚠️ Failed to save module.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{id ? "✏️ Edit Module" : "➕ Add Module"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Module Title */}
        <div style={styles.field}>
          <label style={styles.label}>Module Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter module title..."
            style={styles.input}
          />
        </div>

        {/* Order */}
        <div style={styles.field}>
          <label style={styles.label}>Order</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            required
            min={1}
            style={styles.input}
          />
        </div>

        {/* Status */}
        <div style={styles.field}>
          <label style={styles.label}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
            style={styles.select}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
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
          {loading ? "Saving..." : id ? "Update Module" : "Add Module"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "3rem auto",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    padding: "2rem 2.5rem",
    border: "1px solid #e5e7eb",
  },
  title: {
    textAlign: "center",
    color: "#1D4ED8",
    fontSize: "1.6rem",
    fontWeight: "700",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.4rem",
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
  select: {
    padding: "0.7rem 0.9rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "0.95rem",
    backgroundColor: "#fff",
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  button: {
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

export default ModuleForm;
