// src/components/StudentManagement.jsx
import React, { useEffect, useState } from "react";
import api from "../../api"; // your axios instance with auth
import { FaEdit, FaToggleOn, FaToggleOff, FaDownload } from "react-icons/fa";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [filter]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      let data = [];

      const endpoint =
        filter === "defaulters"
          ? "/admin-panel/students/defaulters/"
          : "/students/users/";

      const res = await api.get(endpoint);
      data = (res.data || []).map((s) => ({
        id: s.id,
        name: s.name || "—",
        email: s.email,
        phone_number: s.phone_number || "—",
        course_name: s.course_name || (s.course?.course_name || "—"),
        amount_paid: Number(s.amount_paid || 0),
        amount_owed: Number(s.amount_owed || 0),
        discount: Number(s.discounted_price || 0),
        next_due_date: s.next_due_date || null,
        is_active: s.is_active,
        is_staff: s.is_staff,
        center: s.center || "Orogun",
        address: s.address || "",
      }));

      // filter out staff users
      data = data.filter((s) => !s.is_staff);

      // additional filters
      if (filter === "active") data = data.filter((s) => s.is_active);
      if (filter === "inactive") data = data.filter((s) => !s.is_active);

      setStudents(data);
      setSelectedStudents([]);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- ACTION HANDLERS ----------------
  const handleNotifyDefaulters = async () => {
  if (!selectedStudents.length) {
    alert("Please select defaulters to notify.");
    return;
  }
  if (!window.confirm(`Send notifications to ${selectedStudents.length} defaulters?`)) return;

  try {
    const res = await api.post("/admin-panel/notify_defaulters/", {
      student_ids: selectedStudents
    });
    alert(res.data.message || "Notifications sent successfully!");
  } catch (err) {
    console.error("Failed to send notifications:", err);
    alert(err?.response?.data?.error || "Failed to send notifications");
  }
};


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

  const handleBulkAction = async (action) => {
    if (!selectedStudents.length) {
      alert("Please select students first");
      return;
    }
    if (!window.confirm(`${action} ${selectedStudents.length} students?`)) return;

    try {
      const endpoint =
        action === "activate"
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

  const handleExport = async () => {
    try {
      const response = await api.post(
        "/admin-panel/export/",
        { type: "students" },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `students_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export data");
    }
  };

  // ---------------- SELECTION ----------------
  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedStudents(filteredStudents.map((s) => s.id));
    else setSelectedStudents([]);
  };

  const handleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((sid) => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const openEdit = (student) => {
    setEditingStudent(student);
    setShowEditModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const options = { month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // ---------------- FILTERED STUDENTS (search by name/email/course/center) ----------------
  const filteredStudents = students.filter((s) =>
    [s.name, s.email, s.course_name, s.center]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ---------------- JSX ----------------
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Student Management</h2>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={styles.exportBtn} onClick={handleExport}>
            <FaDownload /> Export CSV
          </button>
        </div>
      </div>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="🔍 Search by name, email, course, or center..."
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

      {selectedStudents.length > 0 && (
        <div style={styles.bulkActions}>
          <span>{selectedStudents.length} selected</span>
          {filter !== "defaulters" && (
            <>
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
            </>
          )}
          {filter === "defaulters" && (
            <button
              style={{ ...styles.bulkBtn, backgroundColor: "#FF9800" }}
              onClick={handleNotifyDefaulters}
            >
              Notify Selected Defaulters
            </button>
          )}
        </div>
      )}

      {loading ? (
        <p style={styles.message}>Loading students...</p>
      ) : filteredStudents.length === 0 ? (
        <p style={styles.message}>No students found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedStudents.length === filteredStudents.length &&
                      filteredStudents.length > 0
                    }
                  />
                </th>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Center</th>
                <th>Amount Paid</th>
                <th>Amount Owed</th>
                <th>Discount</th>
                <th>Next Due Date</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, i) => (
                <tr key={s.id} style={styles.tr}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(s.id)}
                      onChange={() => handleSelectStudent(s.id)}
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone_number}</td>
                  <td>{s.course_name}</td>
                  <td>{s.center}</td>
                  <td>${s.amount_paid.toFixed(2)}</td>
                  <td>${s.amount_owed.toFixed(2)}</td>
                  <td>${s.discount.toFixed(2)}</td>
                  <td>{formatDate(s.next_due_date)}</td>
                  <td>
                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor: s.is_active ? "#d4edda" : "#f8d7da",
                        color: s.is_active ? "#155724" : "#721c24",
                      }}
                    >
                      {s.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      style={styles.iconBtn}
                      onClick={() => openEdit(s)}
                      title="Edit Student"
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      style={{
                        ...styles.iconBtn,
                        color: s.is_active ? "#f44336" : "#4CAF50",
                      }}
                      onClick={() => handleToggleActive(s.id)}
                    >
                      {s.is_active ? <FaToggleOff /> : <FaToggleOn />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showEditModal && editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={() => {
            setShowEditModal(false);
            setEditingStudent(null);
          }}
          onSuccess={() => {
            fetchStudents();
            setShowEditModal(false);
            setEditingStudent(null);
          }}
        />
      )}
    </div>
  );
};

// --------- Edit Student Modal ----------
const EditStudentModal = ({ student, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: student.email || "",
    amount_paid: student.amount_paid ?? 0,
    next_due_date: student.next_due_date || "",
    name: student.name || "",
    phone_number: student.phone_number || "",
    address: student.address || "",
    center: student.center || "Orogun",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      alert("Email is required.");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/students/users/${student.id}/`, {
        email: formData.email,
        name: formData.name,
        phone_number: formData.phone_number,
        address: formData.address,
        amount_paid: formData.amount_paid,
        next_due_date: formData.next_due_date || null,
        center: formData.center,
      });
      alert("Student updated successfully.");
      onSuccess();
    } catch (err) {
      console.error("Update failed:", err);
      alert(err?.response?.data?.error || "Failed to update student");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.modalTitle}>Edit Student — {student.name}</h3>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input
              value={formData.phone_number}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <input
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Center</label>
            <select
              value={formData.center}
              onChange={(e) => handleChange("center", e.target.value)}
              style={styles.input}
            >
              <option value="Orogun">Orogun</option>
              <option value="Samonda">Samonda</option>
              <option value="Online">Online</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Amount Paid</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount_paid}
              onChange={(e) => handleChange("amount_paid", e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Next Due Date</label>
            <input
              type="date"
              value={formData.next_due_date || ""}
              onChange={(e) => handleChange("next_due_date", e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.modalActions}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" style={styles.saveBtn} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ---------------- styles object ----------------
const styles = {
  container: { padding: "30px", backgroundColor: "#f5f5f5", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" },
  title: { fontSize: "28px", fontWeight: "700", color: "#333" },
  exportBtn: { padding: "10px 20px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" },
  controls: { display: "flex", gap: "15px", marginBottom: "20px" },
  searchBox: { flex: 1, padding: "12px 15px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px" },
  filterSelect: { padding: "12px 15px", border: "1px solid #ccc", borderRadius: "8px", fontSize: "14px", minWidth: "200px" },
  bulkActions: { backgroundColor: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "15px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
  bulkBtn: { padding: "8px 16px", backgroundColor: "#2196F3", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "600" },
  tableContainer: { backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  tr: { transition: "background-color 0.2s" },
  badge: { display: "inline-block", padding: "5px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" },
  iconBtn: { padding: "6px 10px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px", backgroundColor: "transparent", color: "#2196F3", transition: "all 0.2s" },
  message: { textAlign: "center", padding: "40px", color: "#666", backgroundColor: "#fff", borderRadius: "12px" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "90%", maxWidth: "600px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" },
  modalTitle: { fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: "#333" },
  formGroup: { marginBottom: "12px" },
  label: { display: "block", marginBottom: "6px", fontWeight: "500", color: "#333" },
  input: { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "14px" },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" },
  cancelBtn: { padding: "10px 20px", backgroundColor: "#f5f5f5", color: "#333", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
  saveBtn: { padding: "10px 20px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
};

export default StudentManagement;
