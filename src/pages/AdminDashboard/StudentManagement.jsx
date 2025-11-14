import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaEdit, FaToggleOn, FaToggleOff, FaDownload } from "react-icons/fa";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch students whenever filter changes
  useEffect(() => {
    fetchStudents();
  }, [filter]);

  // -------------------------------
  // Fetch students
  // -------------------------------
  const fetchStudents = async () => {
    try {
      setLoading(true);
      let data = [];

      if (filter === "defaulters") {
        const res = await api.get("/admin-panel/students/defaulters/");
        data = res.data;
      } else {
        const res = await api.get("/students/users/");
        data = res.data;

        if (filter === "active") data = data.filter(s => s.is_active);
        if (filter === "inactive") data = data.filter(s => !s.is_active);
      }

      setStudents(data);
      setSelectedStudents([]); // clear selection on refetch
    } catch (err) {
      console.error("Failed to fetch students:", err);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Toggle individual student active status
  // -------------------------------
  const handleToggleActive = async (studentId) => {
    try {
      const res = await api.post(`/admin-panel/students/${studentId}/toggle_active/`);
      alert(res.data.message);
      fetchStudents();
    } catch (err) {
      console.error("Failed to toggle status:", err);
      alert("Failed to update student status");
    }
  };

  // -------------------------------
  // Bulk activate/deactivate
  // -------------------------------
  const handleBulkAction = async (action) => {
    if (!selectedStudents.length) {
      alert("Please select students first");
      return;
    }
    if (!window.confirm(`${action} ${selectedStudents.length} students?`)) return;

    try {
      const endpoint = action === "activate" 
        ? "/admin-panel/students/bulk_activate/"
        : "/admin-panel/students/bulk_deactivate/";

      const res = await api.post(endpoint, { student_ids: selectedStudents });
      alert(res.data.message);
      fetchStudents();
    } catch (err) {
      console.error("Bulk action failed:", err);
      alert("Failed to perform bulk action");
    }
  };

  // -------------------------------
  // Export students
  // -------------------------------
  const handleExport = async () => {
    try {
      const response = await api.post("/admin-panel/export/", { type: "students" }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `students_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export data");
    }
  };

  // -------------------------------
  // Selection
  // -------------------------------
  const filteredStudents = students.filter(s => 
    `${s.username || ""} ${s.email || ""}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedStudents(filteredStudents.map(s => s.id));
    else setSelectedStudents([]);
  };

  const handleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(sid => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Student Management</h2>
        <button style={styles.exportBtn} onClick={handleExport}>
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Filters & Search */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="🔍 Search by username or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.searchBox}
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="all">All Students</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
          <option value="defaulters">Defaulters</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedStudents.length > 0 && (
        <div style={styles.bulkActions}>
          <span>{selectedStudents.length} selected</span>
          <button style={styles.bulkBtn} onClick={() => handleBulkAction("activate")}>
            Activate Selected
          </button>
          <button style={{ ...styles.bulkBtn, backgroundColor: "#f44336" }} onClick={() => handleBulkAction("deactivate")}>
            Deactivate Selected
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p style={styles.message}>Loading students...</p>
      ) : filteredStudents.length === 0 ? (
        <p style={styles.message}>No students found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th><input type="checkbox" onChange={handleSelectAll} checked={selectedStudents.length === filteredStudents.length} /></th>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Amount Paid</th>
                <th>Amount Owed</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, i) => (
                <tr key={s.id} style={styles.tr}>
                  <td><input type="checkbox" checked={selectedStudents.includes(s.id)} onChange={() => handleSelectStudent(s.id)} /></td>
                  <td>{i + 1}</td>
                  <td>{s.username}</td>
                  <td>{s.email}</td>
                  <td>{s.course_name || "—"}</td>
                  <td>${Number(s.amount_paid || 0).toFixed(2)}</td>
                  <td>${Number(s.amount_owed || 0).toFixed(2)}</td>
                  <td>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: s.is_active ? "#d4edda" : "#f8d7da",
                      color: s.is_active ? "#155724" : "#721c24"
                    }}>
                      {s.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button style={styles.iconBtn} onClick={() => { setEditingStudent(s); setShowPaymentModal(true); }} title="Edit Payment">
                      <FaEdit />
                    </button>
                    <button style={{ ...styles.iconBtn, color: s.is_active ? "#f44336" : "#4CAF50" }} onClick={() => handleToggleActive(s.id)}>
                      {s.is_active ? <FaToggleOff /> : <FaToggleOn />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          student={editingStudent}
          onClose={() => { setShowPaymentModal(false); setEditingStudent(null); }}
          onSuccess={() => { fetchStudents(); setShowPaymentModal(false); setEditingStudent(null); }}
        />
      )}
    </div>
  );
};

// -------------------------------
// Payment Modal (unchanged)
// -------------------------------
const PaymentModal = ({ student, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount_paid: student.amount_paid || 0,
    amount_owed: student.amount_owed || 0,
    next_due_date: student.next_due_date || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        amount_paid: formData.amount_paid !== "" ? Number(formData.amount_paid) : null,
        amount_owed: formData.amount_owed !== "" ? Number(formData.amount_owed) : null,
        next_due_date: formData.next_due_date || null,
      };
      if ((payload.amount_paid !== null && isNaN(payload.amount_paid)) || (payload.amount_owed !== null && isNaN(payload.amount_owed))) {
        alert("Please enter valid numbers");
        return;
      }

      await api.post(`/admin-panel/students/${student.id}/update_payment/`, payload);
      alert("Payment updated successfully");
      onSuccess();
    } catch (err) {
      console.error("Payment update failed:", err);
      alert(err?.response?.data?.error || "Failed to update payment");
    }
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <h3 style={styles.modalTitle}>Update Payment - {student.username}</h3>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Amount Paid</label>
            <input type="number" step="0.01" value={formData.amount_paid} onChange={e => setFormData({ ...formData, amount_paid: e.target.value })} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Amount Owed</label>
            <input type="number" step="0.01" value={formData.amount_owed} onChange={e => setFormData({ ...formData, amount_owed: e.target.value })} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Next Due Date</label>
            <input type="date" value={formData.next_due_date} onChange={e => setFormData({ ...formData, next_due_date: e.target.value })} style={styles.input} />
          </div>
          <div style={styles.modalActions}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.saveBtn}>Save Changes</button>
          </div>
        </form>
      </div>
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
  bulkActions: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  bulkBtn: {
    padding: "8px 16px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
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
  badge: {
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  actionBtns: {
    display: "flex",
    gap: "8px",
  },
  iconBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "transparent",
    color: "#2196F3",
    transition: "all 0.2s",
  },
  message: {
    textAlign: "center",
    padding: "40px",
    color: "#666",
    backgroundColor: "#fff",
    borderRadius: "12px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  },
  cancelBtn: {
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  saveBtn: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default StudentManagement;