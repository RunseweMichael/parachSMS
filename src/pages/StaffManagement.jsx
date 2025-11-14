import React, { useEffect, useState } from "react";
import api from "../api";
import { CheckCircle, XCircle, User, Search } from "lucide-react";

const StaffManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Default filter to staff only
  const [filter, setFilter] = useState("true");

  useEffect(() => {
    fetchUsers();
  }, [page, filter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin-panel/paginated-users/", {
        params: {
          search,
          page,
          per_page: 20,
          is_staff_admin: filter || undefined,
        },
      });
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

  const toggleStaff = async (id, currentStatus) => {
    try {
      const res = await api.post("/admin-panel/toggle-staff-role/", {
        user_id: id,
        is_staff_admin: !currentStatus,
      });
      alert(res.data.message);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, is_staff_admin: !currentStatus } : u
        )
      );
    } catch (err) {
      console.error("Toggle staff failed:", err);
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
      </div>

      <div style={styles.filterBar}>
        <label style={styles.filterLabel}>Filter by Role:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="">All</option>
          <option value="true">Staff Only</option>
          <option value="false">Non-Staff</option>
        </select>
      </div>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Staff Role</th>
              <th style={styles.th}>Action</th>
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
                  <button
                    style={{
                      ...styles.actionBtn,
                      backgroundColor: u.is_staff_admin ? "#ef4444" : "#3b82f6",
                    }}
                    onClick={() => toggleStaff(u.id, u.is_staff_admin)}
                  >
                    {u.is_staff_admin ? "Demote" : "Promote"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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
    </div>
  );
};

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
};

export default StaffManagement;
