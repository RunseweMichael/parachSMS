import React, { useEffect, useState } from "react";
import api from "../../api";
import { ArrowLeft, CheckCircle, XCircle, Download } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const StudentPaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
    fetchProfile();
  }, []);

  // Fetch student transactions
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/payments/student-transactions/", {
        headers: { Authorization: `Token ${token}` },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch student transactions:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch student profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/students/me/", {
        headers: { Authorization: `Token ${token}` },
      });
      setStudent(res.data);
    } catch (error) {
      console.error("Failed to fetch student profile:", error);
    }
  };

  // Download server-generated PDF receipt
  const downloadReceipt = (tx) => {
    if (tx.status !== "success") return; // only allow success payments
    const url = `${api.defaults.baseURL}payments/download/${tx.reference}/`;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = `receipt_${tx.reference}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <div className="loader" style={styles.loader}></div>
        <p style={{ color: "#475569", marginTop: 10 }}>
          Loading your payment history...
        </p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <button onClick={() => navigate(-1)} style={styles.backButton}>
            <ArrowLeft size={16} /> Back
          </button>
          <h2 style={styles.heading}>💳 My Payment History</h2>
        </div>

        {transactions.length === 0 ? (
          <p style={{ textAlign: "center", color: "#64748b", marginTop: 30 }}>
            No payment records found.
          </p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Reference</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} style={styles.row}>
                  <td style={styles.td}>{student?.name || "N/A"}</td>
                  <td style={styles.td}>
                    {student?.course ? student.course_details.course_name : "N/A"}
                  </td>
                  <td style={styles.td}>{tx.reference}</td>
                  <td style={styles.td}>₦{tx.amount?.toLocaleString()}</td>
                  <td style={styles.td}>
                    {tx.status === "success" ? (
                      <span style={styles.success}>
                        <CheckCircle size={14} /> Success
                      </span>
                    ) : (
                      <span style={styles.failed}>
                        <XCircle size={14} /> Failed
                      </span>
                    )}
                  </td>
                  <td style={styles.td}>
                    {tx.created_at
                      ? new Date(tx.created_at).toLocaleString("en-NG", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </td>
                  <td style={styles.td}>
                    {tx.status === "success" ? (
                      <button
                        onClick={() => downloadReceipt(tx)}
                        style={styles.downloadBtn}
                      >
                        <Download size={14} /> Download
                      </button>
                    ) : (
                      <span style={{ color: "#888" }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <Link
            to="/dashboard"
            style={{
              ...styles.backButton,
              backgroundColor: "#2563eb",
              color: "#fff",
            }}
          >
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

// -----------------------------
// Styles
// -----------------------------
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    padding: "40px 20px",
  },
  card: {
    width: "100%",
    maxWidth: 850,
    backgroundColor: "#fff",
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "30px 35px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#1e3a8a",
  },
  backButton: {
    backgroundColor: "#f1f5f9",
    border: "none",
    borderRadius: 8,
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#334155",
    textDecoration: "none",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 20,
  },
  th: {
    textAlign: "left",
    padding: "12px 10px",
    backgroundColor: "#f1f5f9",
    color: "#334155",
    fontWeight: "600",
    borderBottom: "2px solid #e2e8f0",
  },
  td: {
    padding: "10px 10px",
    borderBottom: "1px solid #e2e8f0",
    color: "#0f172a",
  },
  row: {
    transition: "background 0.2s",
  },
  success: {
    color: "#16a34a",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontWeight: "600",
  },
  failed: {
    color: "#dc2626",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontWeight: "600",
  },
  downloadBtn: {
    backgroundColor: "#1d4ed8",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontWeight: "500",
  },
  loader: {
    width: 30,
    height: 30,
    border: "4px solid #cbd5e1",
    borderTop: "4px solid #1d4ed8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
};

export default StudentPaymentHistory;
