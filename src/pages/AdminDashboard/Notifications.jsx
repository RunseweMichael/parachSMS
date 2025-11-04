import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin-panel/notifications/");
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const res = await api.get("/admin-panel/notifications/unread_count/");
      setUnreadCount(res.data.count);
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  };

  const handleMarkRead = async (notificationId) => {
    try {
      await api.post(`/admin-panel/notifications/${notificationId}/mark_read/`);
      fetchNotifications();
      fetchUnreadCount();
    } catch (error) {
      console.error("Failed to mark as read:", error);
      alert("Failed to mark notification as read");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.post("/admin-panel/notifications/mark_all_read/");
      fetchNotifications();
      fetchUnreadCount();
      alert("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      alert("Failed to mark all notifications as read");
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "URGENT":
        return <FaExclamationCircle style={{ color: "#f44336" }} />;
      case "HIGH":
        return <FaExclamationCircle style={{ color: "#ff9800" }} />;
      case "MEDIUM":
        return <FaInfoCircle style={{ color: "#2196F3" }} />;
      case "LOW":
        return <FaInfoCircle style={{ color: "#9e9e9e" }} />;
      default:
        return <FaBell />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "URGENT":
        return "#f44336";
      case "HIGH":
        return "#ff9800";
      case "MEDIUM":
        return "#2196F3";
      case "LOW":
        return "#9e9e9e";
      default:
        return "#666";
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.is_read;
    if (filter === "read") return notif.is_read;
    return true;
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Notifications</h2>
          {unreadCount > 0 && (
            <span style={styles.unreadBadge}>{unreadCount} unread</span>
          )}
        </div>
        <button style={styles.markAllBtn} onClick={handleMarkAllRead}>
          <FaCheckCircle /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={styles.filterTabs}>
        <button
          style={{
            ...styles.tab,
            ...(filter === "all" && styles.activeTab),
          }}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          style={{
            ...styles.tab,
            ...(filter === "unread" && styles.activeTab),
          }}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
        <button
          style={{
            ...styles.tab,
            ...(filter === "read" && styles.activeTab),
          }}
          onClick={() => setFilter("read")}
        >
          Read
        </button>
      </div>

      {/* Notifications List */}
      {loading ? (
        <p style={styles.message}>Loading notifications...</p>
      ) : filteredNotifications.length === 0 ? (
        <div style={styles.emptyState}>
          <FaBell style={styles.emptyIcon} />
          <p>No notifications found</p>
        </div>
      ) : (
        <div style={styles.notificationsList}>
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                ...styles.notificationCard,
                backgroundColor: notif.is_read ? "#fff" : "#f0f7ff",
                borderLeft: `4px solid ${getPriorityColor(notif.priority)}`,
              }}
            >
              <div style={styles.notifHeader}>
                <div style={styles.notifIcon}>
                  {getPriorityIcon(notif.priority)}
                </div>
                <div style={styles.notifContent}>
                  <h4 style={styles.notifTitle}>{notif.title}</h4>
                  <p style={styles.notifMessage}>{notif.message}</p>
                  <div style={styles.notifMeta}>
                    <span style={styles.notifTime}>
                      {new Date(notif.created_at).toLocaleString()}
                    </span>
                    <span
                      style={{
                        ...styles.priorityBadge,
                        backgroundColor: getPriorityColor(notif.priority),
                      }}
                    >
                      {notif.priority}
                    </span>
                  </div>
                </div>
                {!notif.is_read && (
                  <button
                    style={styles.markReadBtn}
                    onClick={() => handleMarkRead(notif.id)}
                  >
                    Mark as Read
                  </button>
                )}
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "5px",
  },
  unreadBadge: {
    display: "inline-block",
    padding: "4px 12px",
    backgroundColor: "#f44336",
    color: "#fff",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  markAllBtn: {
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
  filterTabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  tab: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "transparent",
    color: "#666",
    transition: "all 0.2s",
  },
  activeTab: {
    backgroundColor: "#2196F3",
    color: "#fff",
  },
  notificationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  notificationCard: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  notifHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
  },
  notifIcon: {
    fontSize: "24px",
    paddingTop: "5px",
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  notifMessage: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
    lineHeight: "1.5",
  },
  notifMeta: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  notifTime: {
    fontSize: "12px",
    color: "#999",
  },
  priorityBadge: {
    padding: "3px 10px",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#fff",
  },
  markReadBtn: {
    padding: "8px 16px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
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

export default Notifications;