import React, { useState, useEffect } from "react"; 
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api";
import {
  FaHome,
  FaUsers,
  FaCertificate,
  FaBell,
  FaHistory,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaTicketAlt,
  FaUserTie,
} from "react-icons/fa";
import logoImg from "../../assets/1000561121.jpg";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch unread notifications and user info
  useEffect(() => {
    fetchUnreadCount();
    fetchUserInfo();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const res = await api.get("/admin-panel/notifications/unread_count/");
      setUnreadCount(res.data.count);
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const res = await api.get("/students/me/"); // must return role info
      setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  // Redirect assistants immediately to /admin/enquiries
  useEffect(() => {
    if (user) {
      if (user.is_assistant && !user.is_superadmin && !user.is_staff_admin) {
        navigate("/admin/enquiries", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  // ✅ All available sidebar menu items
  const allMenuItems = [
    { path: "/admin", icon: <FaHome />, label: "Dashboard", exact: true },
    { path: "/admin/courses", icon: <FaHistory />, label: "Courses" },
    { path: "/admin/students", icon: <FaUsers />, label: "Students" },
    { path: "/admin/add-student", icon: <FaUsers />, label: "Add Student" },
    { path: "/admin/staff-management", icon: <FaUserTie />, label: "Staff Management" },
    { path: "/admin/certificates", icon: <FaCertificate />, label: "Certificates" },
    { path: "/admin/payments/history", icon: <FaUsers />, label: "Payments" },
    { path: "/admin/coupons", icon: <FaTicketAlt />, label: "Coupons" },
    { path: "/admin/enquiries", icon: <FaUsers />, label: "Enquiries" },
    { path: "/admin/internship-requests", icon: <FaUsers />, label: "Internship Requests" },
    {
      path: "/admin/notifications",
      icon: <FaBell />,
      label: "Notifications",
      badge: unreadCount,
    },
    { path: "/admin/activity", icon: <FaHistory />, label: "Activity Log" },
  ];

  // ✅ Filter menu items based on role
  const filteredMenuItems = allMenuItems.filter((item) => {
    if (!user) return false; // wait until user loads

    // Staff user: hide restricted pages
    if (user.is_staff_admin && !user.is_superadmin) {
      const hiddenForStaff = [
        "/admin/staff-management",
        "/admin/coupons",
        "/admin/activity",
        "/admin/certificates",
      ];
      return !hiddenForStaff.includes(item.path);
    }

    // Assistant: only allow enquiries
    if (user.is_assistant && !user.is_superadmin && !user.is_staff_admin) {
      const allowedForAssistant = ["/admin/enquiries"];
      return allowedForAssistant.includes(item.path);
    }

    // Superadmin: show everything
    if (user.is_superadmin) return true;

    // Other users: show only dashboard
    return ["/admin"].includes(item.path);
  });

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div style={styles.sidebarHeader}>
          <img
            src={logoImg}
            alt="Logo"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "12px",
              border: "2px solid white",
            }}
          />
          <div>
            <h6 style={styles.logo}>Parach ICT Academy</h6>
          </div>
          <button
            style={styles.toggleBtn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaTimes />
          </button>
        </div>

        <nav style={styles.nav}>
          {filteredMenuItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...styles.navItem,
                  ...(isActive && styles.activeNavItem),
                }}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                <span style={styles.navLabel}>{item.label}</span>
                {item.badge > 0 && (
                  <span style={styles.badge}>{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div style={styles.sidebarFooter}>
          {user && (
            <div style={styles.userInfo}>
              <div style={styles.avatar}>
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={styles.userName}>{user.username}</p>
                <p style={styles.userRole}>
                  {user.is_superadmin
                    ? "Super Admin"
                    : user.is_staff_admin
                    ? "Staff"
                    : user.is_assistant
                    ? "Assistant"
                    : "User"}
                </p>
              </div>
            </div>
          )}
          <button style={styles.logoutBtn} onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Mobile Header */}
        <header style={styles.mobileHeader}>
          <button
            style={styles.menuBtn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <h2 style={styles.mobileTitle}>Admin Panel</h2>
          <div
            style={styles.notificationBell}
            onClick={() => navigate("/admin/notifications")}
          >
            <FaBell />
            {unreadCount > 0 && (
              <span style={styles.bellBadge}>{unreadCount}</span>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div style={styles.content}>
          {!user ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              Loading dashboard...
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  sidebar: {
    width: "280px",
    backgroundColor: "#1a237e",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    height: "100vh",
    left: 0,
    top: 0,
    zIndex: 1000,
    transition: "transform 0.3s ease",
    overflowY: "auto",
  },
  sidebarHeader: {
    padding: "25px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
  },
  toggleBtn: {
    display: "none",
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    padding: "5px",
  },
  nav: {
    flex: 1,
    padding: "20px 0",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px 25px",
    color: "#fff",
    textDecoration: "none",
    transition: "all 0.2s",
    position: "relative",
  },
  activeNavItem: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderLeft: "4px solid #fff",
  },
  navIcon: {
    fontSize: "20px",
    marginRight: "15px",
    width: "24px",
  },
  navLabel: {
    fontSize: "15px",
    fontWeight: "500",
    flex: 1,
  },
  badge: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "3px 8px",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: "700",
  },
  sidebarFooter: {
    padding: "20px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "15px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    color: "#1a237e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "700",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    margin: 0,
  },
  userRole: {
    fontSize: "12px",
    opacity: 0.8,
    margin: 0,
  },
  logoutBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s",
  },
  main: {
    flex: 1,
    marginLeft: "280px",
    transition: "margin-left 0.3s ease",
  },
  mobileHeader: {
    display: "none",
    backgroundColor: "#1a237e",
    color: "#fff",
    padding: "15px 20px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    padding: "5px",
  },
  mobileTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },
  notificationBell: {
    position: "relative",
    cursor: "pointer",
    fontSize: "20px",
    padding: "5px",
  },
  bellBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#f44336",
    color: "#fff",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
  },
  content: {
    minHeight: "calc(100vh - 60px)",
  },
  overlay: {
    display: "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
};

export default AdminLayout;
