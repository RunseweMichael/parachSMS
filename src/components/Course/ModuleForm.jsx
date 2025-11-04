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
      // Editing existing module
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
        alert("Module updated successfully!");
      } else {
        await api.post("courses/modules/", payload, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("Module created successfully!");
      }
      navigate(`/admin/courses/${course}`);

      
    } catch (err) {
      console.error(err);
      alert("Failed to save module.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "1.5rem", color: "#1D4ED8" }}>
        {id ? "✏️ Edit Module" : "➕ Add Module"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>
            Module Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Order</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            required
            min={1}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value === "true")}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#1D4ED8",
            color: "#fff",
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2563EB")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1D4ED8")}
        >
          {loading ? "Saving..." : id ? "Update Module" : "Add Module"}
        </button>
      </form>
    </div>
  );
};

export default ModuleForm;
