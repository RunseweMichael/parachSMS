import React, { useEffect, useState } from "react";
import api from "../../api"; // your configured Axios instance

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students/users/");
        setStudents(res.data);
      } catch (err) {
        setError("Failed to load students.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Approve certificate
  const handleApprove = async (certificateId, studentName) => {
    // Check if certificate ID exists
    if (!certificateId) {
      alert(`No certificate found for ${studentName}`);
      return;
    }

    if (!window.confirm(`Approve certificate for ${studentName}?`)) return;

    try {
      await api.post(`/certificates/certificates/${certificateId}/approve/`);
      alert("Certificate approved successfully!");

      // Update the local state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.certificates?.some(c => c.id === certificateId)
            ? {
                ...student,
                certificates: student.certificates.map(cert =>
                  cert.id === certificateId ? { ...cert, is_approved: true } : cert
                ),
              }
            : student
        )
      );
    } catch (err) {
      console.error("Approval error:", err);
      const errorMsg = err.response?.data?.message || "Failed to approve certificate.";
      alert(errorMsg);
    }
  };

  // Filter by search
  const filteredStudents = students.filter((student) =>
    `${student.username || ""} ${student.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Student Management Dashboard</h2>

      <input
        type="text"
        placeholder="🔍 Search by username or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchBox}
      />

      {loading ? (
        <p style={styles.message}>Loading students...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : filteredStudents.length === 0 ? (
        <p style={styles.message}>No students found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Full name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Birth Date</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Amount Paid</th>
                <th>Amount Owed</th>
                <th>Next Due Date</th>
                <th>Active</th>
                <th>Consent</th>
                <th>Registration Date</th>
                <th>Certificate Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => {
                const certificate = student.certificates?.[0];
                const hasCertificate = certificate && certificate.id;
                const isApproved = certificate?.is_approved;

                return (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course_name || "—"}</td>
                    <td>
                      {student.birth_date
                        ? new Date(student.birth_date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{student.phone_number || "—"}</td>
                    <td>{student.address || "—"}</td>
                    <td>${student.amount_paid?.toFixed(2) || "0.00"}</td>
                    <td>${student.amount_owed?.toFixed(2) || "0.00"}</td>
                    <td>
                      {student.next_due_date
                        ? new Date(student.next_due_date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <span
                        style={{
                          ...styles.badge,
                          backgroundColor: student.is_active
                            ? "#d4edda"
                            : "#f8d7da",
                          color: student.is_active ? "#155724" : "#721c24",
                        }}
                      >
                        {student.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          ...styles.badge,
                          backgroundColor: student.consent
                            ? "#cce5ff"
                            : "#e2e3e5",
                          color: student.consent ? "#004085" : "#6c757d",
                        }}
                      >
                        {student.consent ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      {new Date(student.registration_date).toLocaleDateString()}
                    </td>
                    <td>
                      {hasCertificate ? (
                        <span
                          style={{
                            ...styles.badge,
                            backgroundColor: isApproved ? "#d4edda" : "#fff3cd",
                            color: isApproved ? "#155724" : "#856404",
                          }}
                        >
                          {isApproved ? "Approved" : "Pending"}
                        </span>
                      ) : (
                        <span style={{ ...styles.badge, backgroundColor: "#e2e3e5", color: "#6c757d" }}>
                          No Certificate
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        style={{
                          ...styles.button,
                          ...((!hasCertificate || isApproved) && styles.buttonDisabled)
                        }}
                        onClick={() => handleApprove(certificate?.id, student.username)}
                        disabled={!hasCertificate || isApproved}
                      >
                        {isApproved ? "Approved" : "Approve"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const styles = {
  container: {
    maxWidth: "95%",
    margin: "40px auto",
    padding: "30px",
    background: "#fdfdfd",
    borderRadius: "15px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#333",
    borderBottom: "2px solid #ddd",
    paddingBottom: "10px",
  },
  searchBox: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden",
  },
  message: {
    textAlign: "center",
    color: "#666",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
    cursor: "not-allowed",
    opacity: 0.6,
  },
};

export default StudentList;