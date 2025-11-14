import React, { useEffect, useState } from "react";
import api from "../api"; // ✅ make sure this path is correct

const CouponAdmin = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    code: "",
    discount_amount: 0,
    discount_percent: 0,
    expiry_date: "",
    active: true,
    usage_limit: 0,
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch coupons
  const fetchCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("payments/coupons/");
      if (Array.isArray(res.data)) setCoupons(res.data);
      else if (Array.isArray(res.data.results)) setCoupons(res.data.results);
      else setCoupons([]);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch coupons. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Create or update coupon
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await api.put(`payments/coupons/${editingId}/`, form);
      else await api.post("payments/coupons/", form);

      setForm({
        code: "",
        discount_amount: 0,
        discount_percent: 0,
        expiry_date: "",
        active: true,
        usage_limit: 0,
      });
      setEditingId(null);
      fetchCoupons();
    } catch (err) {
      console.error(err);
      setError("Failed to submit coupon. Check console for details.");
    }
  };

  // Edit coupon
  const handleEdit = (c) => {
    setForm({
      code: c.code,
      discount_amount: c.discount_amount,
      discount_percent: c.discount_percent,
      expiry_date: c.expiry_date,
      active: c.active,
      usage_limit: c.usage_limit,
    });
    setEditingId(c.id);
  };

  // Delete coupon
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await api.delete(`payments/coupons/${id}/`);
      fetchCoupons();
    } catch (err) {
      console.error(err);
      setError("Failed to delete coupon. Check console for details.");
    }
  };

  // Styles
  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "20px auto",
      fontFamily: "Arial, sans-serif",
      padding: "0 20px",
    },
    title: { fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#333" },
    card: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "30px",
    },
    formGroup: { display: "flex", flexDirection: "column", marginBottom: "15px" },
    label: { fontWeight: "600", marginBottom: "6px", color: "#555" },
    input: { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" },
    checkboxContainer: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px" },
    button: { padding: "10px 18px", borderRadius: "6px", border: "none", color: "#fff", fontWeight: "600", cursor: "pointer" },
    submitButton: { backgroundColor: "#007bff", marginTop: "10px" },
    editButton: { backgroundColor: "#f0ad4e" },
    deleteButton: { backgroundColor: "#d9534f" },
    table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "6px", overflow: "hidden" },
    th: { padding: "12px", backgroundColor: "#f4f4f4", borderBottom: "1px solid #ddd", textAlign: "left" },
    td: { padding: "12px", borderBottom: "1px solid #eee" },
    actions: { display: "flex", gap: "8px" },
    badgeActive: { backgroundColor: "#28a745", color: "#fff", padding: "4px 8px", borderRadius: "12px", fontWeight: "600", fontSize: "12px" },
    badgeInactive: { backgroundColor: "#dc3545", color: "#fff", padding: "4px 8px", borderRadius: "12px", fontWeight: "600", fontSize: "12px" },
    error: { color: "red", marginBottom: "16px" },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Coupon Management</h1>
      {error && <div style={styles.error}>{error}</div>}

      {/* Form */}
      <div style={styles.card}>
        <h2>{editingId ? "Edit Coupon" : "Create New Coupon"}</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Coupon Code</label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Discount Amount (fixed amount off, e.g., 100)</label>
            <input
              type="number"
              name="discount_amount"
              value={form.discount_amount}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Discount Percent (%)</label>
            <input
              type="number"
              name="discount_percent"
              value={form.discount_percent}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Expiry Date</label>
            <input
              type="date"
              name="expiry_date"
              value={form.expiry_date}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Usage Limit (number of times this coupon can be used)</label>
            <input
              type="number"
              name="usage_limit"
              value={form.usage_limit}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.checkboxContainer}>
            <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
            <span>Active</span>
          </div>

          <button type="submit" style={{ ...styles.button, ...styles.submitButton }}>
            {editingId ? "Update Coupon" : "Create Coupon"}
          </button>
        </form>
      </div>

      {/* Coupon List */}
      {loading ? (
        <p>Loading...</p>
      ) : coupons.length ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Code</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Percent</th>
              <th style={styles.th}>Expiry</th>
              <th style={styles.th}>Active</th>
              <th style={styles.th}>Usage</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id}>
                <td style={styles.td}>{c.code}</td>
                <td style={styles.td}>{c.discount_amount}</td>
                <td style={styles.td}>{c.discount_percent}</td>
                <td style={styles.td}>{c.expiry_date}</td>
                <td style={styles.td}>
                  <span style={c.active ? styles.badgeActive : styles.badgeInactive}>
                    {c.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={styles.td}>{c.times_used}/{c.usage_limit}</td>
                <td style={{ ...styles.td, ...styles.actions }}>
                  <button onClick={() => handleEdit(c)} style={{ ...styles.button, ...styles.editButton }}>Edit</button>
                  <button onClick={() => handleDelete(c.id)} style={{ ...styles.button, ...styles.deleteButton }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No coupons available.</p>
      )}
    </div>
  );
};

export default CouponAdmin;
