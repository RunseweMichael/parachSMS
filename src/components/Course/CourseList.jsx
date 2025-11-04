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
        prev.map((c) =>
          c.id === id ? { ...c, status: !currentStatus } : c
        )
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

  if (error)
    return <p style={styles.errorText}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🎓 Course Management</h2>
        <Link to="add" className="btn btn-add shadow rounded">
          + Add Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <p style={styles.noCourses}>No courses available.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table className="course-table" style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Price (₦)</th>
                <th>Duration (hrs)</th>
                <th>Skills</th>
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

                      {course.course_name}
                    </Link>
                  </td>
                  <td>{Number(course.price).toLocaleString()}</td>
                  <td>{course.duration}</td>
                  <td style={styles.skills}>{course.skills || "—"}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      onClick={() => toggleStatus(course.id, course.status)}
                      className={`status-badge ${
                        course.status ? "status-active" : "status-inactive"
                      }`}
                      title="Click to toggle status"
                    >
                      {course.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ textAlign: "center", color: "#6b7280" }}>
                    {new Date(course.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div style={styles.actions}>
                      <Link
                        to={`edit/${course.id}`}
                        className="btn btn-edit"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="btn btn-delete"
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

const styles = {
  container: { maxWidth: "1100px", margin: "0 auto", padding: "30px" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  title: { color: "#1d4ed8", fontSize: "24px", fontWeight: "700" },
  tableContainer: {
    overflowX: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  courseLink: { color: "#2563eb", fontWeight: "600", textDecoration: "none" },
  skills: { fontSize: "14px", color: "#6b7280" },
  actions: { display: "flex", justifyContent: "center", gap: "8px" },
  noCourses: { textAlign: "center", color: "#6b7280", fontSize: "18px" },
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
  loadingText: { marginTop: "16px", color: "#6b7280" },
  errorText: { textAlign: "center", color: "red", marginTop: "60px", fontWeight: "600" },
};

export default CourseList;
