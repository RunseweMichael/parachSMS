import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaEdit, FaToggleOn, FaToggleOff, FaTrash, FaDownload } from "react-icons/fa";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [filter]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      let url = "/students/users/";
      
      if (filter === "active") {
        url += "?is_active=true";
      } else if (filter === "inactive") {
        url += "?is_active=false";
      } else if (filter === "defaulters") {
        url = "/admin-panel/students/defaulters/";
      }

      const res = await api.get(url);
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (studentId) => {
    try {
      const res = await api.post(`/admin-panel/students/${studentId}/toggle_active/`);
      alert(res.data.message);
      fetchStudents();
    } catch (error) {
      console.error("Failed to toggle status:", error);
      alert("Failed to update student status");
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedStudents.length === 0) {
      alert("Please select students first");
      return;
    }

    if (!window.confirm(`${action} ${selectedStudents.length} students?`)) {
      return;
    }

    try {
      const endpoint = action === "activate" 
        ? "/admin-panel/students/bulk_activate/"
        : "/admin-panel/students/bulk_deactivate/";

      const res = await api.post(endpoint, { student_ids: selectedStudents });
      alert(res.data.message);
      setSelectedStudents([]);
      fetchStudents();
    } catch (error) {
      console.error("Bulk action failed:", error);
      alert("Failed to perform bulk action");
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.post("/admin-panel/export/", 
        { type: "students" },
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `students_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data");
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(filteredStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.username || ""} ${student.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Student Management</h2>
        <button style={styles.exportBtn} onClick={handleExport}>
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Filters and Search */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="🔍 Search by username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchBox}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
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
          <button
            style={styles.bulkBtn}
            onClick={() => handleBulkAction("activate")}
          >
            Activate Selected
          </button>
          <button
            style={{ ...styles.bulkBtn, backgroundColor: "#f44336" }}
            onClick={() => handleBulkAction("deactivate")}
          >
            Deactivate Selected
          </button>
        </div>
      )}

      {/* Students Table */}
      {loading ? (
        <p style={styles.message}>Loading students...</p>
      ) : filteredStudents.length === 0 ? (
        <p style={styles.message}>No students found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedStudents.length === filteredStudents.length}
                  />
                </th>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Amount Paid</th>
                <th style={styles.th}>Amount Owed</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id} style={styles.tr}>
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                    />
                  </td>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.email}</td>
                  <td style={styles.td}>{student.course_name || "—"}</td>
                  <td style={styles.td}>${student.amount_paid?.toFixed(2) || "0.00"}</td>
                  <td style={styles.td}>${student.amount_owed?.toFixed(2) || "0.00"}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor: student.is_active ? "#d4edda" : "#f8d7da",
                        color: student.is_active ? "#155724" : "#721c24",
                      }}
                    >
                      {student.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionBtns}>
                      <button
                        style={styles.iconBtn}
                        onClick={() => {
                          setEditingStudent(student);
                          setShowPaymentModal(true);
                        }}
                        title="Edit Payment"
                      >
                        <FaEdit />
                      </button>
                      <button
                        style={{
                          ...styles.iconBtn,
                          color: student.is_active ? "#f44336" : "#4CAF50",
                        }}
                        onClick={() => handleToggleActive(student.id)}
                        title={student.is_active ? "Deactivate" : "Activate"}
                      >
                        {student.is_active ? <FaToggleOff /> : <FaToggleOn />}
                      </button>
                    </div>
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
          onClose={() => {
            setShowPaymentModal(false);
            setEditingStudent(null);
          }}
          onSuccess={() => {
            fetchStudents();
            setShowPaymentModal(false);
            setEditingStudent(null);
          }}
        />
      )}
    </div>
  );
};

const PaymentModal = ({ student, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount_paid: student.amount_paid || 0,
    amount_owed: student.amount_owed || 0,
    next_due_date: student.next_due_date || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/admin-panel/students/${student.id}/update_payment/`, formData);
      alert("Payment information updated successfully!");
      onSuccess();
    } catch (error) {
      console.error("Failed to update payment:", error);
      alert("Failed to update payment information");
    }
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.modalTitle}>Update Payment - {student.username}</h3>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Amount Paid</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount_paid}
              onChange={(e) =>
                setFormData({ ...formData, amount_paid: e.target.value })
              }
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Amount Owed</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount_owed}
              onChange={(e) =>
                setFormData({ ...formData, amount_owed: e.target.value })
              }
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Next Due Date</label>
            <input
              type="date"
              value={formData.next_due_date}
              onChange={(e) =>
                setFormData({ ...formData, next_due_date: e.target.value })
              }
              style={styles.input}
            />
          </div>

          <div style={styles.modalActions}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={styles.saveBtn}>
              Save Changes
            </button>
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