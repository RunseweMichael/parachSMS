import React, { useEffect, useState } from "react";
import axios from "axios";
import { Download } from "lucide-react";

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ student: "", course: "" });
  const [sortConfig, setSortConfig] = useState({ key: "created_at", direction: "desc" });

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${API_BASE}/payments/transactions/?status=success`, {
          headers: { Authorization: `Token ${token}` },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [API_BASE]);

  if (loading) {
    return (
      <div style={styles.centered}>
        <div style={styles.loader}></div>
        <p style={styles.grayText}>Loading your transactions...</p>
      </div>
    );
  }

  // Filter
  const filteredTransactions = transactions.filter(
    (t) =>
      (!filter.student || t.user_name?.toLowerCase().includes(filter.student.toLowerCase())) &&
      (!filter.course || t.user_course?.toLowerCase().includes(filter.course.toLowerCase()))
  );

  // Sort
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const key = sortConfig.key;
    let aVal = key === "amount" ? parseFloat(a[key]) : new Date(a[key] || a.created_at);
    let bVal = key === "amount" ? parseFloat(b[key]) : new Date(b[key] || b.created_at);

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const totalPaid = filteredTransactions.reduce((acc, t) => acc + parseFloat(t.amount), 0);

  // CSV Export
  const downloadCSV = () => {
    const header = ["Student Name", "Course", "Reference", "Amount (₦)", "Date", "Status"];
    const rows = filteredTransactions.map((t) => [
      t.user_name || "N/A",
      t.user_course || "N/A",
      t.reference,
      t.amount.toFixed(2),
      new Date(t.created_at).toLocaleString("en-NG", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      t.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `transactions_${new Date().toLocaleDateString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Download server-generated PDF receipt
  const downloadReceipt = (tx) => {
    if (tx.status !== "success") return;

    const url = `${API_BASE}/payments/download/${tx.reference}/`; // make sure this endpoint returns the PDF
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = `receipt_${tx.reference}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>💳 Payment History</h1>

      {/* Filters + CSV */}
      <div style={{ marginBottom: 15 }}>
        <input
          type="text"
          placeholder="Filter by student..."
          value={filter.student}
          onChange={(e) => setFilter({ ...filter, student: e.target.value })}
          style={styles.inputFilter}
        />
        <input
          type="text"
          placeholder="Filter by course..."
          value={filter.course}
          onChange={(e) => setFilter({ ...filter, course: e.target.value })}
          style={{ ...styles.inputFilter, marginLeft: 10 }}
        />
        <button onClick={downloadCSV} style={styles.downloadBtn}>
          Download CSV
        </button>
      </div>

      {/* Total Paid */}
      <div style={styles.totalPaidContainer}>
        <span style={styles.totalPaidLabel}>Total Paid:</span>
        <span style={styles.totalPaidValue}>₦{totalPaid.toLocaleString()}</span>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th} onClick={() => requestSort("user_name")}>Student Name</th>
              <th style={styles.th} onClick={() => requestSort("user_course")}>Course</th>
              <th style={styles.th} onClick={() => requestSort("reference")}>Reference</th>
              <th style={styles.th} onClick={() => requestSort("amount")}>Amount</th>
              <th style={styles.th} onClick={() => requestSort("created_at")}>Date</th>
              <th style={styles.th} onClick={() => requestSort("status")}>Status</th>
              <th style={styles.th}>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((tx, idx) => (
              <tr
                key={tx.id}
                style={{
                  ...styles.tr,
                  backgroundColor: idx % 2 === 0 ? "#f9fafb" : "#ffffff",
                }}
              >
                <td style={styles.td}>{tx.user_name || "N/A"}</td>
                <td style={styles.td}>{tx.user_course || "N/A"}</td>
                <td style={styles.td}>{tx.reference}</td>
                <td style={styles.td}>₦{parseFloat(tx.amount).toLocaleString()}</td>
                <td style={styles.td}>
                  {new Date(tx.created_at).toLocaleString("en-NG", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: 6,
                      backgroundColor: tx.status === "success" ? "#16a34a" : "#dc2626",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </span>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => downloadReceipt(tx)}
                    style={{
                      backgroundColor: "#1d4ed8",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: 6,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontWeight: 500,
                    }}
                  >
                    <Download size={14} /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles same as before
const styles = {
  container: { padding: "20px", maxWidth: "1000px", margin: "0 auto" },
  heading: { fontSize: "28px", fontWeight: "700", color: "#1D4ED8", marginBottom: "20px" },
  totalPaidContainer: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "10px 15px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalPaidLabel: { fontWeight: "600", color: "#374151" },
  totalPaidValue: { color: "#16A34A", fontWeight: "700", fontSize: "18px" },
  tableWrapper: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  },
  thead: { backgroundColor: "#1D4ED8", color: "#ffffff" },
  th: { padding: "12px", textAlign: "left", cursor: "pointer" },
  tr: { borderBottom: "1px solid #E5E7EB", transition: "background-color 0.2s" },
  td: { padding: "12px", color: "#374151" },
  inputFilter: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: 14,
    width: 180,
  },
  downloadBtn: {
    marginLeft: 10,
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
  centered: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  grayText: { color: "#6B7280" },
  loader: {
    border: "4px solid #E5E7EB",
    borderTop: "4px solid #1D4ED8",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    marginBottom: "10px",
    animation: "spin 1s linear infinite",
  },
};

export default PaymentHistory;
