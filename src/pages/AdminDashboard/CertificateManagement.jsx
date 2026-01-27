import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaEye,
  FaFileAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

const CertificateManagement = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCertificates();
  }, [filter]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      let url = "/certificates/certificates/";

      if (filter === "approved") {
        url += "?is_approved=true";
      } else if (filter === "pending") {
        url += "?is_approved=false";
      }

      const res = await api.get(url);
      setCertificates(res.data);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (certificateId, amountOwed) => {
    if (amountOwed > 0) {
      alert(
        `Cannot approve certificate. Student still owes ₦${amountOwed.toLocaleString()}. Full payment is required before certificate approval.`
      );
      return;
    }

    if (!window.confirm("Approve this certificate?")) return;

    try {
      await api.post(`/certificates/certificates/${certificateId}/approve/`);
      alert("Certificate approved successfully!");
      fetchCertificates();
    } catch (error) {
      console.error("Failed to approve certificate:", error);
      alert(error.response?.data?.error || "Failed to approve certificate");
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.post(
        "/admin-panel/export/",
        { type: "certificates" },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `certificates_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data");
    }
  };

  const ADMIN_STUDENT_IDS = [15, 17];

  const filteredCertificates = certificates
    // 🚫 Exclude admin students by ID
    .filter(cert => !ADMIN_STUDENT_IDS.includes(cert.student_id))
    // 🔍 Apply search filter
    .filter(cert =>
    `${cert.student_name || ""} ${cert.certificate_number || ""} ${cert.course_name || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Certificate Management</h2>
        <button style={styles.exportBtn} onClick={handleExport}>
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statIconWrapper}>
            <FaFileAlt style={styles.statIconBlue} />
          </div>
          <div style={styles.statValue}>{certificates.length}</div>
          <div style={styles.statLabel}>Total Certificates</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconWrapper}>
            <FaCheckCircle style={styles.statIconGreen} />
          </div>
          <div style={styles.statValue}>
            {certificates.filter((c) => c.is_approved).length}
          </div>
          <div style={styles.statLabel}>Approved</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIconWrapper}>
            <FaClock style={styles.statIconOrange} />
          </div>
          <div style={styles.statValue}>
            {certificates.filter((c) => !c.is_approved).length}
          </div>
          <div style={styles.statLabel}>Pending</div>
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="🔍 Search by student, certificate number, or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchBox}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="all">All Certificates</option>
          <option value="approved">Approved Only</option>
          <option value="pending">Pending Only</option>
        </select>
      </div>

      {/* Certificates Table */}
      {loading ? (
        <p style={styles.message}>Loading certificates...</p>
      ) : filteredCertificates.length === 0 ? (
        <p style={styles.message}>No certificates found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Certificate Number</th>
                <th style={styles.th}>Student</th>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Issue Date</th>
                <th style={styles.th}>Amount Owed</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.map((cert, index) => {
                const hasOutstanding = cert.amount_owed > 0;
                return (
                  <tr key={cert.id} style={styles.tr}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>
                      <strong>{cert.certificate_number}</strong>
                    </td>
                    <td style={styles.td}>{cert.student_name || "N/A"}</td>
                    <td style={styles.td}>{cert.course_name || "N/A"}</td>
                    <td style={styles.td}>
                      {cert.issue_date
                        ? new Date(cert.issue_date).toLocaleDateString()
                        : "—"}
                    </td>
                    <td style={styles.td}>
                      {hasOutstanding ? (
                        <span style={styles.owedBadge}>
                          <FaExclamationTriangle />
                          ₦{cert.amount_owed.toLocaleString()}
                        </span>
                      ) : (
                        <span style={styles.paidBadge}>
                          <FaCheckCircle />
                          Paid
                        </span>
                      )}
                    </td>
                    <td style={styles.td}>
                      {cert.is_approved ? (
                        <span style={styles.approvedBadge}>
                          <FaCheckCircle /> Approved
                        </span>
                      ) : (
                        <span style={styles.pendingBadge}>
                          <FaClock /> Pending
                        </span>
                      )}
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionBtns}>
                        {!cert.is_approved && (
                          <button
                            style={{
                              ...styles.approveBtn,
                              ...(hasOutstanding ? styles.disabledBtn : {}),
                            }}
                            onClick={() =>
                              handleApprove(cert.id, cert.amount_owed)
                            }
                            disabled={hasOutstanding}
                            title={
                              hasOutstanding
                                ? `Student owes ₦${cert.amount_owed.toLocaleString()}`
                                : "Approve certificate"
                            }
                          >
                            Approve
                          </button>
                        )}
                        {cert.certificate_file && (
                          <a
                            href={cert.certificate_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.viewBtn}
                          >
                            <FaEye /> View
                          </a>
                        )}
                      </div>
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

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
  },
  exportBtn: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
  },
  statCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  statValue: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#2196F3",
    marginBottom: "8px",
  },
  statLabel: {
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
  },
  controls: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  searchBox: {
    flex: 1,
    padding: "12px 15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
  },
  filterSelect: {
    padding: "12px 15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    minWidth: "200px",
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    fontWeight: "600",
    color: "#333",
    borderBottom: "2px solid #dee2e6",
  },
  td: {
    padding: "12px 15px",
    borderBottom: "1px solid #dee2e6",
    color: "#666",
  },
  tr: {
    transition: "background-color 0.2s",
  },
  approvedBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 12px",
    backgroundColor: "#d4edda",
    color: "#155724",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  statIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 12px auto",
    backgroundColor: "#eef5ff",
  },
  statIconBlue: {
    color: "#2196F3",
    fontSize: 30,
  },
  statIconGreen: {
    color: "#4CAF50",
    fontSize: 30,
  },
  statIconOrange: {
    color: "#FF9800",
    fontSize: 30,
  },
  pendingBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 12px",
    backgroundColor: "#fff3cd",
    color: "#856404",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  owedBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 12px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  paidBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 12px",
    backgroundColor: "#d4edda",
    color: "#155724",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  actionBtns: {
    display: "flex",
    gap: "8px",
  },
  approveBtn: {
    padding: "6px 12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "opacity 0.2s",
  },
  disabledBtn: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
    opacity: 0.6,
  },
  viewBtn: {
    padding: "6px 12px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  message: {
    textAlign: "center",
    padding: "40px",
    color: "#666",
    backgroundColor: "#fff",
    borderRadius: "12px",
  },
};

export default CertificateManagement;