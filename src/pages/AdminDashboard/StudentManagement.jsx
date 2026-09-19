import React, { useEffect, useState, useMemo } from "react";
import api from "../../api";
import { FaEdit, FaToggleOn, FaToggleOff, FaDownload, FaTrash } from "react-icons/fa";


// ── Discount helpers ──
const discountLabel = (d) =>
  d.discount_type === "percent"
    ? `${Number(d.value)}%`
    : `₦${Number(d.value).toLocaleString()}`;

const formatShortDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showLegacy, setShowLegacy] = useState(false); // ← toggle legacy visibility
  const [discounts, setDiscounts] = useState({}); // ← active admin discounts keyed by student id

  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchDiscounts();
  }, [filter]);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses/courses/");
      setCourses(res.data || []);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  const fetchDiscounts = async () => {
    try {
      const res = await api.get("/payments/admin-discount/list/");
      setDiscounts(res.data || {});
    } catch (err) {
      // Non-fatal: the table still works, just without discount badges
      console.error("Failed to fetch discounts:", err);
    }
  };

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
        course_id: s.course?.id || null,
        course_name: s.course_name || (s.course?.course_name || "—"),
        amount_paid: Number(s.amount_paid || 0),
        amount_owed: Number(s.amount_owed || 0),
        discount: Number(s.discounted_price || 0),
        registration_date: s.registration_date || "—",
        next_due_date: s.next_due_date || null,
        is_active: s.is_active,
        is_staff: s.is_staff,
        is_legacy_student: s.is_legacy_student || false, // ← capture legacy flag
        center: s.center || "Orogun",
        address: s.address || "",
      }));

      data = data.filter((s) => !s.is_staff);
      if (filter === "active") data = data.filter((s) => s.is_active);
      if (filter === "inactive") data = data.filter((s) => !s.is_active);

      // Sort: non-legacy first (by registration_date desc), legacy last
      data.sort((a, b) => {
        if (a.is_legacy_student !== b.is_legacy_student) {
          return a.is_legacy_student ? 1 : -1; // legacy sinks to bottom
        }
        // Within each group, sort newest first
        const dateA = a.registration_date !== "—" ? new Date(a.registration_date) : 0;
        const dateB = b.registration_date !== "—" ? new Date(b.registration_date) : 0;
        return dateB - dateA;
      });

      setStudents(data);
      setSelectedStudents([]);
      setCurrentPage(1);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        // Hide legacy students unless the toggle is on
        if (s.is_legacy_student && !showLegacy) return false;
        return [s.name, s.email, s.course_name, s.center]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
  }, [students, search, showLegacy]);

  const legacyCount = useMemo(
    () => students.filter((s) => s.is_legacy_student).length,
    [students]
  );

  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleNotifyDefaulters = async () => {
    if (!selectedStudents.length) {
      alert("Please select defaulters to notify.");
      return;
    }
    if (!window.confirm(`Send notifications to ${selectedStudents.length} defaulters?`)) return;

    try {
      const res = await api.post("/admin-panel/notify_defaulters/", {
        student_ids: selectedStudents,
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

  const handleDeleteStudent = async (student) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to permanently delete this student?\n\n` +
      `Name: ${student.name}\nEmail: ${student.email}\n\n` +
      `This action CANNOT be undone.`
    );

    if (!confirmed) return;

    try {
      await api.delete(`/students/users/${student.id}/`);
      alert("✅ Student deleted successfully");
      fetchStudents();
    } catch (err) {
      console.error("Delete failed:", err);
      alert(
        err?.response?.data?.error ||
        "❌ Failed to delete student. You may not have permission."
      );
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

  const handleSelectAll = (e) => {
    if (e.target.checked)
      setSelectedStudents(paginatedStudents.map((s) => s.id));
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
    if (!dateString || dateString === "—") return "—";
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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

      {/* Legacy student notice banner */}
      {legacyCount > 0 && (
        <div style={styles.legacyBanner}>
          <span>
            🕰️ <strong>{legacyCount} legacy student{legacyCount !== 1 ? "s" : ""}</strong> enrolled before the system was set up{" "}
            {!showLegacy && "are hidden from this view."}
          </span>
          <button
            style={styles.legacyToggleBtn}
            onClick={() => {
              setShowLegacy((v) => !v);
              setCurrentPage(1);
            }}
          >
            {showLegacy ? "Hide Legacy Students" : "Show Legacy Students"}
          </button>
        </div>
      )}

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
      ) : paginatedStudents.length === 0 ? (
        <p style={styles.message}>No students found.</p>
      ) : (
        <>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedStudents.length === paginatedStudents.length &&
                        paginatedStudents.length > 0
                      }
                    />
                  </th>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Center</th>
                  <th>Reg. Date</th>
                  <th>Discount Price</th>
                  <th>Amount Paid</th>
                  <th>Amount Owed</th>
                  <th>Next Due Date</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((s, i) => (
                  <tr
                    key={s.id}
                    style={{
                      ...styles.tr,
                      ...(s.is_legacy_student ? styles.legacyRow : {}),
                    }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(s.id)}
                        onChange={() => handleSelectStudent(s.id)}
                      />
                    </td>
                    <td>{(currentPage - 1) * pageSize + i + 1}</td>
                    <td>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {s.name}
                        {s.is_legacy_student && (
                          <span style={styles.legacyTag} title="Legacy student — enrolled before the system was set up">
                            Legacy
                          </span>
                        )}
                      </span>
                    </td>
                    <td>{s.email}</td>
                    <td>{s.phone_number}</td>
                    <td>{s.course_name}</td>
                    <td>{s.center}</td>
                    <td>{formatDate(s.registration_date)}</td>
                    <td>
                      {s.discount > 0 ? `₦${s.discount.toLocaleString()}` : "—"}
                      {discounts[s.id] && (
                        <span
                          style={{ ...styles.discountTag, marginLeft: 6 }}
                          title={`${discountLabel(discounts[s.id])} discount applied by ${discounts[s.id].applied_by || "admin"} on ${formatShortDate(discounts[s.id].applied_at)}`}
                        >
                          🏷️ −{discountLabel(discounts[s.id])}
                        </span>
                      )}
                    </td>
                    <td>₦{s.amount_paid.toLocaleString()}</td>
                    <td>₦{s.amount_owed.toLocaleString()}</td>
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
                      <div style={styles.actionCell}>
                        <button
                          style={{
                            ...styles.iconBtn,
                            color: s.is_active ? "#f44336" : "#4CAF50",
                          }}
                          onClick={() => handleToggleActive(s.id)}
                          title={s.is_active ? "Deactivate" : "Activate"}
                        >
                          {s.is_active ? <FaToggleOff /> : <FaToggleOn />}
                        </button>

                        <button
                          style={{ ...styles.iconBtn, color: "#f44336" }}
                          onClick={() => handleDeleteStudent(s)}
                          title="Delete Student"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={styles.filterSelect}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>

            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={styles.bulkBtn}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  style={{
                    ...styles.bulkBtn,
                    backgroundColor:
                      currentPage === idx + 1 ? "#2196F3" : "#e0e0e0",
                    color: currentPage === idx + 1 ? "#fff" : "#000",
                  }}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={styles.bulkBtn}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {showEditModal && editingStudent && (
        <EditStudentModal
          student={editingStudent}
          courses={courses}
          discountRecord={discounts[editingStudent.id] || null}
          onClose={() => {
            setShowEditModal(false);
            setEditingStudent(null);
          }}
          onSuccess={() => {
            fetchStudents();
            fetchDiscounts();
            setShowEditModal(false);
            setEditingStudent(null);
          }}
        />
      )}
    </div>
  );
};

const EditStudentModal = ({ student, courses, discountRecord, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: student.email || "",
    amount_paid: student.amount_paid ?? 0,
    next_due_date: student.next_due_date || "",
    name: student.name || "",
    phone_number: student.phone_number || "",
    address: student.address || "",
    center: student.center || "Orogun",
    course: student.course_id || "",
  });
  const [saving, setSaving] = useState(false);
  const [courseChanging, setCourseChanging] = useState(false);
  const [paymentAdjustment, setPaymentAdjustment] = useState("");
  const [adjustmentNote, setAdjustmentNote] = useState("");

  // ── Discount state ──
  const [discountType, setDiscountType] = useState("percent");
  const [discountValue, setDiscountValue] = useState("");
  const [discountNote, setDiscountNote] = useState("");
  const [applyingDiscount, setApplyingDiscount] = useState(false);
  const [removingDiscount, setRemovingDiscount] = useState(false);

  const coursePrice = Number(
    courses.find((c) => String(c.id) === String(student.course_id))?.price || 0
  );
  // student.discount is discounted_price (0 when none)
  const currentPrice = student.discount > 0 ? student.discount : coursePrice;

  const discountPreview = useMemo(() => {
    const v = parseFloat(discountValue);
    if (!currentPrice || !(v > 0)) return null;
    if (discountType === "percent" && v >= 100)
      return { error: "Percentage must be less than 100." };

    const deduction =
      discountType === "percent" ? Math.round(currentPrice * v) / 100 : v;
    const newPrice = currentPrice - deduction;

    if (newPrice <= 0)
      return { error: "Discount can't reduce the price to zero." };
    if (newPrice < student.amount_paid)
      return {
        error: `Price would fall below what the student already paid (₦${student.amount_paid.toLocaleString()}).`,
      };

    return {
      deduction,
      newPrice,
      newOwed: Math.max(0, newPrice - student.amount_paid),
    };
  }, [discountType, discountValue, currentPrice, student.amount_paid]);

  const handleChange = (key, value) => {
    if (key === "course" && value !== student.course_id) {
      setCourseChanging(true);
      setFormData((prev) => ({ ...prev, course: value, amount_paid: 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handlePaymentAdjustment = async () => {
    const amount = parseFloat(paymentAdjustment?.trim());
    if (isNaN(amount) || amount === 0) {
      alert("Please enter a valid payment amount");
      return;
    }

    if (!window.confirm(
      `Record a payment of ₦${amount.toLocaleString()} for ${student.name}?\n\n` +
      `This will create a transaction record and update the student's balance.`
    )) return;

    const payload = {
      user_id: student.id,
      amount: amount,
      note: adjustmentNote || "Admin manual payment adjustment"
    };

    try {
      const res = await api.post("/payments/admin-payment-adjustment/", payload);
      alert(res.data.message);
      setPaymentAdjustment("");
      setAdjustmentNote("");
      onSuccess();
    } catch (err) {
      console.error("❌ Payment adjustment failed:", err);
      let errorMessage = "Failed to record payment";
      if (err.response) {
        errorMessage = `❌ Payment adjustment failed!\nStatus: ${err.response.status}\nError: ${err.response.data?.error || err.response.data?.details || JSON.stringify(err.response.data)}`;
      } else if (err.request) {
        errorMessage = "No response from server. Please check network or server logs.";
      } else {
        errorMessage = `Error: ${err.message}`;
      }
      alert(errorMessage);
    }
  };

  const handleApplyDiscount = async () => {
    if (!discountPreview || discountPreview.error) return;

    const label =
      discountType === "percent"
        ? `${discountValue}%`
        : `₦${Number(discountValue).toLocaleString()}`;

    if (
      !window.confirm(
        `Give ${student.name} a ${label} discount?\n\n` +
          `Current price: ₦${currentPrice.toLocaleString()}\n` +
          `New price: ₦${discountPreview.newPrice.toLocaleString()}\n` +
          `New balance owed: ₦${discountPreview.newOwed.toLocaleString()}`
      )
    )
      return;

    setApplyingDiscount(true);
    try {
      const res = await api.post("/payments/admin-discount/", {
        user_id: student.id,
        discount_type: discountType,
        value: parseFloat(discountValue),
        note: discountNote,
      });
      alert(res.data.message);
      onSuccess();
    } catch (err) {
      console.error("Discount failed:", err);
      alert(err?.response?.data?.error || "Failed to apply discount");
    } finally {
      setApplyingDiscount(false);
    }
  };

  const handleRemoveDiscount = async () => {
    if (!discountRecord) return;

    if (
      !window.confirm(
        `Remove the ${discountLabel(discountRecord)} discount from ${student.name}?\n\n` +
          `Price will go back to ₦${Number(discountRecord.price_before).toLocaleString()}.`
      )
    )
      return;

    setRemovingDiscount(true);
    try {
      const res = await api.post("/payments/admin-discount/remove/", {
        user_id: student.id,
      });
      alert(res.data.message);
      onSuccess();
    } catch (err) {
      console.error("Remove discount failed:", err);
      alert(err?.response?.data?.error || "Failed to remove discount");
    } finally {
      setRemovingDiscount(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.email) {
      alert("Email is required.");
      return;
    }

    if (courseChanging) {
      const confirmed = window.confirm(
        "⚠️ WARNING: Changing the course will reset all payment information!\n\n" +
        "• Amount Paid will be reset to ₦0\n" +
        "• Amount Owed will be set to the new course price\n" +
        "• All discounts will be removed\n\n" +
        "Previous payment history will be preserved in transaction records.\n\n" +
        "Do you want to continue?"
      );
      if (!confirmed) return;
    }

    setSaving(true);
    try {
      const res = await api.put(`/students/users/${student.id}/`, {
        email: formData.email,
        name: formData.name,
        phone_number: formData.phone_number,
        address: formData.address,
        next_due_date: formData.next_due_date || null,
        center: formData.center,
        course: formData.course,
      });

      if (res.data.warning) {
        alert(`✅ ${res.data.warning}`);
      } else {
        alert("Student updated successfully.");
      }

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
        <h3 style={styles.modalTitle}>
          Edit Student — {student.name}
          {student.is_legacy_student && (
            <span style={{ ...styles.legacyTag, marginLeft: 10, fontSize: 13 }}>
              Legacy
            </span>
          )}
        </h3>

        {courseChanging && (
          <div style={styles.warningBox}>
            ⚠️ <strong>Warning:</strong> Changing course will reset payment data!
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Payment Adjustment Section */}
          <div style={{ ...styles.warningBox, backgroundColor: "#e3f2fd", borderColor: "#2196F3" }}>
            <strong>💰 Record Payment</strong>
            <p style={{ margin: "8px 0", fontSize: "13px", color: "#555" }}>
              Use this to record payments made outside the system (cash, bank transfer, etc.)
            </p>
            <input
              type="number"
              step="0.01"
              placeholder="Enter payment amount..."
              value={paymentAdjustment}
              onChange={(e) => setPaymentAdjustment(e.target.value)}
              style={{ ...styles.input, marginBottom: "8px" }}
            />
            <input
              type="text"
              placeholder="Note (optional)..."
              value={adjustmentNote}
              onChange={(e) => setAdjustmentNote(e.target.value)}
              style={{ ...styles.input, marginBottom: "8px" }}
            />
            <button
              onClick={handlePaymentAdjustment}
              style={{ ...styles.saveBtn, width: "100%", backgroundColor: "#4CAF50" }}
            >
              Record Payment
            </button>
          </div>

          {/* Discount Section */}
          {discountRecord ? (
            <div style={{ ...styles.warningBox, backgroundColor: "#e8f5e9", borderColor: "#4CAF50", color: "#333" }}>
              <strong>🏷️ Discount already applied</strong>
              <p style={{ margin: "8px 0 4px", fontSize: "13px" }}>
                <strong>{discountLabel(discountRecord)} off</strong> (₦
                {Number(discountRecord.amount_deducted).toLocaleString()} deducted): price went from ₦
                {Number(discountRecord.price_before).toLocaleString()} to{" "}
                <strong>₦{Number(discountRecord.price_after).toLocaleString()}</strong>.
              </p>
              <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#555" }}>
                Applied by {discountRecord.applied_by || "an admin"} on{" "}
                {formatShortDate(discountRecord.applied_at)}
                {discountRecord.note ? ` — “${discountRecord.note}”` : ""}
              </p>
              <p style={{ margin: "0 0 10px", fontSize: "12px", color: "#555" }}>
                Only one discount can be given per student. If this was a mistake, remove it and
                apply the correct one.
              </p>
              <button
                onClick={handleRemoveDiscount}
                disabled={removingDiscount}
                style={{
                  ...styles.saveBtn,
                  width: "100%",
                  backgroundColor: "#fff",
                  color: "#c62828",
                  border: "1px solid #c62828",
                }}
              >
                {removingDiscount ? "Removing..." : "Remove Discount"}
              </button>
            </div>
          ) : (
            <div style={{ ...styles.warningBox, backgroundColor: "#f3e5f5", borderColor: "#9c27b0", color: "#333" }}>
              <strong>🏷️ Apply Discount</strong>
              <p style={{ margin: "8px 0", fontSize: "13px", color: "#555" }}>
                Current price: <strong>₦{currentPrice.toLocaleString()}</strong>
                {student.discount > 0 && coursePrice > student.discount && (
                  <> (course price ₦{coursePrice.toLocaleString()})</>
                )}
              </p>

              {!student.course_id || courseChanging ? (
                <p style={{ fontSize: "13px", color: "#888" }}>
                  Save the student's course first before applying a discount.
                </p>
              ) : (
                <>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value)}
                      style={{ ...styles.input, width: "45%" }}
                    >
                      <option value="percent">Percentage (%)</option>
                      <option value="fixed">Fixed amount (₦)</option>
                    </select>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder={discountType === "percent" ? "e.g. 10" : "e.g. 5000"}
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      style={styles.input}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Reason / note (optional)..."
                    value={discountNote}
                    onChange={(e) => setDiscountNote(e.target.value)}
                    style={{ ...styles.input, marginBottom: "8px" }}
                  />

                  {discountPreview && (
                    <p
                      style={{
                        fontSize: "13px",
                        margin: "0 0 8px",
                        color: discountPreview.error ? "#c62828" : "#2e7d32",
                      }}
                    >
                      {discountPreview.error ? (
                        discountPreview.error
                      ) : (
                        <>
                          −₦{discountPreview.deduction.toLocaleString()} → new price{" "}
                          <strong>₦{discountPreview.newPrice.toLocaleString()}</strong>, balance owed{" "}
                          <strong>₦{discountPreview.newOwed.toLocaleString()}</strong>
                        </>
                      )}
                    </p>
                  )}

                  <button
                    onClick={handleApplyDiscount}
                    disabled={applyingDiscount || !discountPreview || !!discountPreview.error}
                    style={{
                      ...styles.saveBtn,
                      width: "100%",
                      backgroundColor: "#9c27b0",
                      opacity: !discountPreview || discountPreview.error ? 0.5 : 1,
                    }}
                  >
                    {applyingDiscount ? "Applying..." : "Apply Discount"}
                  </button>
                </>
              )}
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input value={formData.email} onChange={(e) => handleChange("email", e.target.value)} style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input value={formData.phone_number} onChange={(e) => handleChange("phone_number", e.target.value)} style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Center</label>
            <select value={formData.center} onChange={(e) => handleChange("center", e.target.value)} style={styles.input}>
              <option value="Orogun">Orogun</option>
              <option value="Samonda">Samonda</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Course {courseChanging && <span style={{ color: "#f44336" }}>⚠️</span>}
            </label>
            <select
              value={formData.course}
              onChange={(e) => handleChange("course", e.target.value)}
              style={{ ...styles.input, ...(courseChanging ? { borderColor: "#f44336", borderWidth: 2 } : {}) }}
            >
              <option value="">-- Select Course --</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.course_name} (₦{Number(c.price).toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Current Amount Paid: ₦{student.amount_paid.toLocaleString()}
            </label>
            <small style={{ color: "#666", display: "block", marginTop: "4px" }}>
              Use "Record Payment" section above to add new payments
            </small>
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
            <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button
              type="button"
              style={{ ...styles.saveBtn, ...(courseChanging ? { backgroundColor: "#f44336" } : {}) }}
              disabled={saving}
              onClick={handleSubmit}
            >
              {saving ? "Saving..." : courseChanging ? "Confirm & Reset Payments" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  // Legacy row: subtle warm tint to distinguish without being alarming
  legacyRow: { backgroundColor: "#fffbf0" },
  legacyTag: {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 7px",
    borderRadius: "10px",
    backgroundColor: "#fff3cd",
    color: "#856404",
    border: "1px solid #ffc107",
    letterSpacing: "0.3px",
    whiteSpace: "nowrap",
  },
  legacyBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff8e1",
    border: "1px solid #ffe082",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "16px",
    fontSize: "14px",
    color: "#795548",
    gap: "12px",
  },
  legacyToggleBtn: {
    padding: "6px 14px",
    backgroundColor: "#ff8f00",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  discountTag: {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 7px",
    borderRadius: "10px",
    backgroundColor: "#f3e5f5",
    color: "#6a1b9a",
    border: "1px solid #9c27b0",
    whiteSpace: "nowrap",
    cursor: "help",
  },
  badge: { display: "inline-block", padding: "5px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "600" },
  iconBtn: { padding: "6px 10px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px", backgroundColor: "transparent", color: "#2196F3", transition: "all 0.2s" },
  message: { textAlign: "center", padding: "40px", color: "#666", backgroundColor: "#fff", borderRadius: "12px" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { backgroundColor: "#fff", padding: "30px", borderRadius: "12px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" },
  modalTitle: { fontSize: "20px", fontWeight: "600", marginBottom: "20px", color: "#333", display: "flex", alignItems: "center" },
  warningBox: { backgroundColor: "#fff3cd", border: "1px solid #ffc107", padding: "12px", borderRadius: "6px", marginBottom: "15px", color: "#856404" },
  formGroup: { marginBottom: "12px" },
  label: { display: "block", marginBottom: "6px", fontWeight: "500", color: "#333" },
  input: { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" },
  cancelBtn: { padding: "10px 20px", backgroundColor: "#f5f5f5", color: "#333", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
  saveBtn: { padding: "10px 20px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
  actionCell: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
};

export default StudentManagement;