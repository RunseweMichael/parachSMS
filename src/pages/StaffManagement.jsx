import React, { useEffect, useState } from "react";
import api from "../api";
import { CheckCircle, XCircle, User, Search, Plus, X } from "lucide-react";

const StaffManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Filter defaults to staff only, options: staff / assistant
  const [filter, setFilter] = useState("staff");

  // Add User modal state
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    is_staff_admin: false,
    is_assistant: false,
  });

  useEffect(() => {
    fetchUsers();
  }, [page, filter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = {
        search,
        page,
        per_page: 20,
      };

      // Only request staff or assistants
      if (filter === "staff") params.is_staff_admin = true;
      if (filter === "assistant") params.is_assistant = true;

      const res = await api.get("/admin-panel/paginated-users/", { params });
      setUsers(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 20));
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const createUser = async () => {
    if (!newUser.name || !newUser.email) {
      alert("Name and email are required");
      return;
    }
    try {
      const res = await api.post("/admin-panel/create-user/", newUser);
      alert(res.data.message);
      setUsers((prev) => [res.data.user, ...prev]);
      setNewUser({
        name: "",
        email: "",
        password: "",
        is_staff_admin: false,
        is_assistant: false,
      });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create user");
    }
  };

  if (loading)
    return (
      <div style={styles.loading}>
        <p style={styles.loadingText}>Loading staff list...</p>
      </div>
    );

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <User size={26} style={{ marginRight: 8 }} /> Staff Management
        </h1>

        <div style={{ display: "flex", gap: 10 }}>
          <form style={styles.searchForm} onSubmit={handleSearch}>
            <div style={styles.searchContainer}>
              <Search size={18} color="#6b7280" />
              <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <button type="submit" style={styles.searchBtn}>
              Search
            </button>
          </form>

          <button
            onClick={() => setShowModal(true)}
            style={{ ...styles.searchBtn, display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Plus size={16} /> Add User
          </button>
        </div>
      </div>

      <div style={styles.filterBar}>
        <label style={styles.filterLabel}>Filter by Role:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="staff">Staff Only</option>
          <option value="assistant">Assistant Only</option>
        </select>
      </div>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Staff Role</th>
              <th style={styles.th}>Assistant</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  {u.is_staff_admin ? (
                    <span style={styles.activeRole}>
                      <CheckCircle size={16} style={{ marginRight: 4 }} /> Yes
                    </span>
                  ) : (
                    <span style={styles.inactiveRole}>
                      <XCircle size={16} style={{ marginRight: 4 }} /> No
                    </span>
                  )}
                </td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  {u.is_assistant ? (
                    <span style={styles.activeRole}>Yes</span>
                  ) : (
                    <span style={styles.inactiveRole}>No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.pagination}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              ...styles.pageBtn,
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            Prev
          </button>
          <span style={styles.pageText}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              ...styles.pageBtn,
              opacity: page === totalPages ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3>Add New User</h3>
              <button onClick={() => setShowModal(false)}><X /></button>
            </div>
            <div style={styles.modalBody}>
              <input
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                style={styles.modalInput}
              />
              <input
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                style={styles.modalInput}
              />
              <input
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                style={styles.modalInput}
              />
              <label>
                <input
                  type="checkbox"
                  checked={newUser.is_staff_admin}
                  onChange={(e) =>
                    setNewUser({ ...newUser, is_staff_admin: e.target.checked })
                  }
                /> Staff Admin
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={newUser.is_assistant}
                  onChange={(e) =>
                    setNewUser({ ...newUser, is_assistant: e.target.checked })
                  }
                /> Assistant
              </label>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={createUser} style={styles.searchBtn}>Create User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Add some modal styles
const styles = {
  wrapper: {
    background: "#f9fafb",
    minHeight: "100vh",
    padding: "32px",
    fontFamily: "Inter, sans-serif",
  },
  header: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    display: "flex",
    alignItems: "center",
  },
  searchForm: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "6px 10px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  searchInput: {
    border: "none",
    outline: "none",
    marginLeft: "6px",
    fontSize: "14px",
    color: "#374151",
  },
  searchBtn: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
  filterBar: {
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  filterLabel: {
    fontWeight: "600",
    color: "#374151",
  },
  filterSelect: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    backgroundColor: "#fff",
  },
  card: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    backgroundColor: "#f3f4f6",
  },
  th: {
    textAlign: "left",
    padding: "12px 16px",
    fontWeight: "600",
    color: "#374151",
    fontSize: "14px",
    borderBottom: "1px solid #e5e7eb",
  },
  tr: {
    transition: "background 0.2s",
  },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#374151",
    borderBottom: "1px solid #f3f4f6",
  },
  activeRole: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#16a34a",
    fontWeight: "600",
  },
  inactiveRole: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#dc2626",
    fontWeight: "600",
  },
  actionBtn: {
    padding: "8px 14px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
  },
  pageBtn: {
    background: "#4f46e5",
    color: "white",
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  pageText: {
    fontSize: "14px",
    color: "#374151",
  },
  loading: {
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: "16px",
    color: "#6b7280",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "400px",
    padding: 20,
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalBody: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 12,
  },
  modalInput: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

export default StaffManagement;
