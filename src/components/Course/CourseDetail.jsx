// src/components/CourseDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`courses/courses/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setCourse(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load course details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const deleteModule = async (moduleId) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`courses/modules/${moduleId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      alert("Module deleted successfully!");
      fetchCourse();
    } catch (err) {
      alert("Failed to delete module.");
      console.error(err);
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`courses/lessons/${lessonId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      alert("Lesson deleted successfully!");
      fetchCourse();
    } catch (err) {
      alert("Failed to delete lesson.");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div style={styles.center}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading course details...</p>
      </div>
    );

  if (error) return <p style={styles.error}>{error}</p>;
  if (!course) return null;

  return (
    <div style={styles.container}>
      {/* Course Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>{course.course_name}</h2>
      </div>

      <hr style={styles.divider} />

      {/* Modules & Lessons */}
      <div>
        <div style={styles.moduleHeader}>
          <h4 style={styles.moduleTitle}>📚 Modules</h4>
          <Link to={`/admin/modules/add?course=${course.id}`} style={{ ...styles.button, ...styles.addSmall }}>
  ➕ Add Module
</Link>


        </div>

        {course.modules?.length > 0 ? (
          course.modules.map((module) => (
            <div key={module.id} style={styles.moduleCard}>
              <div style={styles.moduleCardBody}>
                <div style={styles.moduleHeaderFlex}>
                  <h5 style={styles.moduleName}>📗 {module.title}</h5>
                  <div>
                    <Link
  to={`/admin/modules/edit/${module.id}`}
  style={{ ...styles.button, ...styles.editSmall }}
>
  Edit
</Link>

                    <button
                      style={{ ...styles.button, ...styles.deleteSmall }}
                      onClick={() => deleteModule(module.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <ul style={styles.lessonList}>
                  {module.lessons?.length > 0 ? (
                    module.lessons.map((lesson) => (
                      <li key={lesson.id} style={styles.lessonItem}>
                        <span>📘 {lesson.title}</span>
                        <div>
                          <Link
                            to={`/admin/lessons/edit/${lesson.id}`}
                            style={{ ...styles.button, ...styles.editSmall }}
                          >
                            Edit
                          </Link>
                          <button
                            style={{ ...styles.button, ...styles.deleteSmall }}
                            onClick={() => deleteLesson(lesson.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li style={styles.noLesson}>No lessons found.</li>
                  )}
                </ul>

                <div>
                  <Link
                    to={`/admin/lessons/add?module=${module.id}`}
                    style={{ ...styles.button, ...styles.addSmall }}
                  >
                    ➕ Add Lesson
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noModules}>No modules found for this course.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "50px auto", padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  center: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" },
  spinner: { width: "50px", height: "50px", border: "5px solid #2563eb", borderTop: "5px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" },
  loadingText: { marginTop: "15px", color: "#4b5563", fontSize: "16px" },
  error: { color: "#dc2626", textAlign: "center", fontWeight: "600", marginTop: "50px" },
  header: { textAlign: "center", marginBottom: "30px" },
  title: { fontSize: "28px", fontWeight: "700", color: "#2563eb" },
  divider: { margin: "30px 0", borderColor: "#d1d5db" },
  moduleHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
  moduleTitle: { fontSize: "20px", fontWeight: "700", color: "#1e40af" },
  add: { backgroundColor: "#16a34a", color: "#fff" },
  moduleCard: { backgroundColor: "#f9fafb", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: "20px" },
  moduleCardBody: { padding: "15px 20px" },
  moduleHeaderFlex: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  moduleName: { fontSize: "18px", fontWeight: "600" },
  lessonList: { listStyle: "none", padding: 0, marginTop: "10px" },
  lessonItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", backgroundColor: "#fff", borderRadius: "6px", marginBottom: "6px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  noLesson: { padding: "8px 12px", fontStyle: "italic", color: "#6b7280" },
  addSmall: { backgroundColor: "#16a34a", color: "#fff", fontSize: "13px", padding: "5px 10px", marginTop: "10px" },
  editSmall: { backgroundColor: "#3b82f6", color: "#fff", fontSize: "13px", padding: "5px 10px", marginRight: "5px" },
  deleteSmall: { backgroundColor: "#ef4444", color: "#fff", fontSize: "13px", padding: "5px 10px" },
  noModules: { textAlign: "center", color: "#6b7280", fontStyle: "italic", marginTop: "20px" },
};

export default CourseDetail;
