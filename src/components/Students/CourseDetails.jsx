import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`courses/courses/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setCourse(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading)
    return (
      <div style={styles.center}>
        <div className="loader" style={styles.loader}></div>
        <p>Loading course details...</p>
      </div>
    );

  if (error)
    return (
      <div style={styles.center}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  if (!course) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📘 {course.course_name}</h2>
        <Link to="/profile" style={styles.backLink}>← Back to Profile</Link>
      </div>

      <p style={styles.info}>💰 Price: ₦{Number(course.price).toLocaleString()}</p>
      <div style={styles.section}>
        <h3 style={styles.subtitle}>📚 Modules</h3>
        {course.modules?.length ? (
          course.modules.map((module) => (
            <div key={module.id} style={styles.moduleCard}>
              <h4 style={styles.moduleTitle}>{module.title}</h4>
              <ul style={styles.lessonList}>
                {module.lessons?.length ? (
                  module.lessons.map((lesson) => (
                    <li key={lesson.id} style={styles.lessonItem}>
                      <strong>{lesson.title}</strong>
                      <p>{lesson.description}</p>
                    </li>
                  ))
                ) : (
                  <p style={styles.emptyText}>No lessons available in this module.</p>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p style={styles.emptyText}>No modules found for this course.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: 900, margin: "0 auto", padding: 20, background: "#fff", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: "1.8rem", fontWeight: "700", color: "#1e3a8a" },
  info: { fontSize: "1rem", color: "#334155", marginBottom: 8 },
  subtitle: { fontSize: "1.3rem", color: "#1d4ed8", marginBottom: 10 },
  section: { marginTop: 30 },
  moduleCard: { background: "#f8fafc", padding: 15, borderRadius: 8, marginBottom: 16 },
  moduleTitle: { color: "#0f172a", fontWeight: "600", marginBottom: 6 },
  lessonList: { listStyleType: "none", padding: 0 },
  lessonItem: { background: "#fff", padding: 10, marginBottom: 8, borderRadius: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  emptyText: { color: "#94a3b8", fontStyle: "italic" },
  backLink: { color: "#2563eb", textDecoration: "none", fontWeight: "600" },
  center: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh" },
  loader: { width: 30, height: 30, border: "4px solid #cbd5e1", borderTop: "4px solid #2563eb", borderRadius: "50%", animation: "spin 1s linear infinite" },
};

export default CourseDetails;
