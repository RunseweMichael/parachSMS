import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaHistory, FaFilter } from "react-icons/fa";

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    action: "",
    start_date: "",
    end_date: "",
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchActivities();
  }, [filters, page]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      let url = "/admin-panel/activities/?";

      if (filters.action) url += `action=${filters.action}&`;
      if (filters.start_date) url += `start_date=${filters.start_date}&`;
      if (filters.end_date) url += `end_date=${filters.end_date}&`;

      const res = await api.get(url);
      setActivities(res.data);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      action: "",
      start_date: "",
      end_date: "",
    });
    setPage(1);
  };

  const getActionColor = (action) => {
    switch (action) {
      case "CREATE":
        return "#4CAF50";
      case "UPDATE":
        return "#2196F3";
      case "DELETE":
        return "#f44336";
      case "APPROVE":
        return "#9C27B0";
      case "REJECT":
        return "#FF9800";
      case "LOGIN":
        return "#00BCD4";
      case "LOGOUT":
        return "#607D8B";
      default:
        return "#666";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          <FaHistory /> Activity Log
        </h2>
      </div>

      {/* Filters */}
      <div style={styles.filtersCard}>
        <div style={styles.filterRow}>
          <div style={styles.filterGroup}>
            <label style={styles.label}>Action Type</label>
            <select
              value={filters.action}
              onChange={(e) => handleFilterChange("action", e.target.value)}
              style={styles.select}
            >
              <option value="">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="APPROVE">Approve</option>
              <option value="REJECT">Reject</option>
              <option value="LOGIN">Login</option>
              <option value="LOGOUT">Logout</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.label}>Start Date</label>
            <input
              type="date"
              value={filters.start_date}
              onChange={(e) => handleFilterChange("start_date", e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.label}>End Date</label>
            <input
              type="date"
              value={filters.end_date}
              onChange={(e) => handleFilterChange("end_date", e.target.value)}
              style={styles.input}
            />
          </div>

          <button style={styles.clearBtn} onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Activities List */}
      {loading ? (
        <p style={styles.message}>Loading activities...</p>
      ) : activities.length === 0 ? (
        <div style={styles.emptyState}>
          <FaHistory style={styles.emptyIcon} />
          <p>No activities found</p>
        </div>
      ) : (
        <div style={styles.activitiesList}>
          {activities.map((activity) => (
            <div key={activity.id} style={styles.activityCard}>
              <div
                style={{
                  ...styles.actionBadge,
                  backgroundColor: getActionColor(activity.action),
                }}
              >
                {activity.action}
              </div>

              <div style={styles.activityContent}>
                <div style={styles.activityHeader}>
                  <span style={styles.adminName}>{activity.admin_name}</span>
                  <span style={styles.modelName}>{activity.model_name}</span>
                </div>

                <p style={styles.description}>{activity.description}</p>

                <div style={styles.activityFooter}>
                  <span style={styles.timestamp}>
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                  {activity.ip_address && (
                    <span style={styles.ipAddress}>IP: {activity.ip_address}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
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
    marginBottom: "25px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  filtersCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "25px",
  },
  filterRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    alignItems: "end",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  select: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  clearBtn: {
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  activitiesList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  activityCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },
  actionBadge: {
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#fff",
    whiteSpace: "nowrap",
    alignSelf: "center",
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    display: "flex",
    gap: "15px",
    marginBottom: "10px",
    flexWrap: "wrap",
  },
  adminName: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#333",
  },
  modelName: {
    fontSize: "13px",
    color: "#666",
    backgroundColor: "#f5f5f5",
    padding: "3px 10px",
    borderRadius: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
    lineHeight: "1.5",
  },
  activityFooter: {
    display: "flex",
    gap: "20px",
    fontSize: "12px",
    color: "#999",
  },
  timestamp: {},
  ipAddress: {},
  message: {
    textAlign: "center",
    padding: "40px",
    color: "#666",
    backgroundColor: "#fff",
    borderRadius: "12px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    color: "#999",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "15px",
    color: "#ccc",
  },
};

export default ActivityLog;