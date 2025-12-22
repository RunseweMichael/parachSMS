// src/components/CourseList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("courses/courses/", {
        headers: { Authorization: `Token ${token}` },
      });
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load courses. Please check your API connection.");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `courses/courses/${id}/`,
        { status: !currentStatus },
        { headers: { Authorization: `Token ${token}` } }
      );
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: !currentStatus } : c))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update course status.");
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`courses/courses/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading)
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Fetching courses...</p>
      </div>
    );

  if (error) return <p style={styles.errorText}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🎓 Course Management</h2>
        <Link to="add" style={styles.addButton}>
          + Add Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <p style={styles.noCourses}>No courses available.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Price (₦)</th>
                <th>Duration (weeks)</th>
                <th>Skills</th>
                <th>Resource</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`${course.id}`} style={styles.courseLink}>
                      {course_details.course_name}
                    </Link>
                  </td>
                  <td>{Number(course.price).toLocaleString()}</td>
                  <td>{course.duration}</td>
                  <td style={styles.skills}>{course.skills || "—"}</td>
                  <td style={{ textAlign: "center" }}>
                    {course.resource_link ? (
                      <a
                        href={course.resource_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.resourceButton}
                      >
                        📂 Access
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      onClick={() => toggleStatus(course.id, course.status)}
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: course.status
                          ? "#DCFCE7"
                          : "#FEE2E2",
                        color: course.status ? "#166534" : "#991B1B",
                        cursor: "pointer",
                      }}
                      title="Click to toggle status"
                    >
                      {course.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ color: "#6b7280", textAlign: "center" }}>
                    {new Date(course.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div style={styles.actions}>
                      <Link to={`edit/${course.id}`} style={styles.editButton}>
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteCourse(course.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// -------------------------
// Inline Modern Styles
// -------------------------
const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 20px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  title: {
    color: "#1d4ed8",
    fontSize: "26px",
    fontWeight: "700",
  },
  addButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "background 0.3s",
  },
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  courseLink: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
  },
  skills: {
    fontSize: "14px",
    color: "#6b7280",
  },
  resourceButton: {
    display: "inline-block",
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "background 0.3s",
  },
  statusBadge: {
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "13px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },
  editButton: {
    backgroundColor: "#16a34a",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  noCourses: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "18px",
    padding: "40px 0",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #3b82f6",
    borderTop: "4px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "16px",
    color: "#6b7280",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: "60px",
    fontWeight: "600",
  },
};

// Apply minimal row styling via CSS
const tableStyle = document.createElement("style");
tableStyle.innerHTML = `
  table th, table td {
    padding: 14px 12px;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
  }
  table th {
    background-color: #f3f4f6;
    color: #374151;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
  }
  table tr:hover {
    background-color: #f9fafb;
    transition: background 0.3s;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(tableStyle);

export default CourseList;
