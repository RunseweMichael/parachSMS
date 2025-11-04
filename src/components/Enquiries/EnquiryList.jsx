import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [courses, setCourses] = useState([]); // store all courses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch enquiries and courses
  const fetchData = async () => {
    try {
      const [enqRes, courseRes] = await Promise.all([
        api.get("enquiries/enquiries/"),
        api.get("courses/courses/"),
      ]);
      setEnquiries(enqRes.data);
      setFiltered(enqRes.data);
      setCourses(courseRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete enquiry
  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await api.delete(`enquiries/enquiries/${id}/`);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      setFiltered((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete enquiry.");
    }
  };

  // Toggle status
  const toggleStatus = async (enquiry) => {
    const newStatus = enquiry.status === "NEW" ? "FOLLOWED_UP" : "NEW";
    try {
      await api.patch(`enquiries/enquiries/${enquiry.id}/`, { status: newStatus });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiry.id ? { ...e, status: newStatus } : e))
      );
      setFiltered((prev) =>
        prev.map((e) => (e.id === enquiry.id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  // Send predefined email
  const sendEmail = async (enquiry) => {
    if (!window.confirm(`Send predefined email to ${enquiry.name}?`)) return;
    try {
      await api.post(`enquiries/enquiries/${enquiry.id}/send_email/`);
      alert(`Email sent to ${enquiry.email}`);
    } catch (err) {
      console.error(err);
      alert("Failed to send email.");
    }
  };

  // Search/filter
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filteredData = enquiries.filter(
      (e) =>
        e.name.toLowerCase().includes(value.toLowerCase()) ||
        e.email.toLowerCase().includes(value.toLowerCase()) ||
        e.phone.includes(value)
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  };

  // Map course ID to course name
  const getCourseName = (id) => {
    const course = courses.find((c) => c.id === id);
    return course ? course.course_name : "—";
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) return <p style={styles.loading}>Loading enquiries...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📩 Enquiries Dashboard</h2>

      <div style={styles.topBar}>
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={handleSearch}
          style={styles.searchInput}
        />
        <Link to="/enquiries/add" style={{ ...styles.button, ...styles.add }}>
          ➕ Add Enquiry
        </Link>
      </div>

      <table style={styles.table}>
        <thead>
          <tr style={styles.theadRow}>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Consent</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 && (
            <tr>
              <td colSpan="10" style={styles.noData}>
                No enquiries found.
              </td>
            </tr>
          )}
          {currentItems.map((enquiry, index) => (
            <tr key={enquiry.id} style={styles.row}>
              <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
              <td>{enquiry.name}</td>
              <td>{enquiry.email}</td>
              <td>{enquiry.phone}</td>
              <td>{enquiry.gender}</td>
              <td>{getCourseName(enquiry.course)}</td>
              <td>{enquiry.consent ? "✅" : "❌"}</td>
              <td
                style={{
                  ...styles.statusText,
                  backgroundColor:
                    enquiry.status === "FOLLOWED_UP" ? "#10b981" : "#ef4444",
                  cursor: "pointer",
                }}
                onClick={() => toggleStatus(enquiry)}
              >
                {enquiry.status === "FOLLOWED_UP" ? "FOLLOWED UP" : "NEW"}
              </td>
              <td>{new Date(enquiry.created_at).toLocaleDateString()}</td>
              <td style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                <Link
                  to={`/enquiries/edit/${enquiry.id}`}
                  style={{ ...styles.button, ...styles.editSmall }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteEnquiry(enquiry.id)}
                  style={{ ...styles.button, ...styles.deleteSmall }}
                >
                  Delete
                </button>
                <button
                  onClick={() => sendEmail(enquiry)}
                  style={{ ...styles.button, ...styles.emailSmall }}
                >
                  📧 Send Email
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            style={styles.pageButton}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              style={{
                ...styles.pageButton,
                ...(currentPage === i + 1 ? styles.activePage : {}),
              }}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            style={styles.pageButton}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: "1100px", margin: "50px auto", padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  title: { fontSize: "28px", fontWeight: "700", marginBottom: "15px" },
  topBar: { display: "flex", justifyContent: "space-between", marginBottom: "15px", flexWrap: "wrap", gap: "10px" },
  searchInput: { padding: "6px 12px", fontSize: "14px", borderRadius: "6px", border: "1px solid #ccc", flexGrow: 1, minWidth: "200px" },
  button: { padding: "6px 14px", borderRadius: "6px", fontSize: "14px", cursor: "pointer", border: "none", fontWeight: "600" },
  add: { backgroundColor: "#3b82f6", color: "#fff" },
  editSmall: { backgroundColor: "#facc15", color: "#fff", fontSize: "13px", padding: "4px 8px" },
  deleteSmall: { backgroundColor: "#ef4444", color: "#fff", fontSize: "13px", padding: "4px 8px" },
  emailSmall: { backgroundColor: "#3b82f6", color: "#fff", fontSize: "13px", padding: "4px 8px" },
  table: { width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" },
  theadRow: { backgroundColor: "#1e40af", color: "#fff", textAlign: "center" },
  row: { borderBottom: "1px solid #e5e7eb", textAlign: "center", transition: "background 0.2s" },
  noData: { textAlign: "center", padding: "12px", color: "#6b7280" },
  loading: { textAlign: "center", marginTop: "50px", fontSize: "16px" },
  error: { textAlign: "center", marginTop: "50px", color: "#dc2626", fontWeight: "600" },
  statusText: { color: "#fff", padding: "6px 12px", borderRadius: "12px", textAlign: "center", fontWeight: "600", display: "inline-block", minWidth: "80px" },
  pagination: { display: "flex", justifyContent: "center", marginTop: "20px", gap: "5px", flexWrap: "wrap" },
  pageButton: { padding: "6px 10px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "#fff", cursor: "pointer" },
  activePage: { backgroundColor: "#3b82f6", color: "#fff", border: "none" },
};

export default EnquiryList;
