import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  FaUsers,
  FaGraduationCap,
  FaCertificate,
  FaArrowUp,
  FaArrowDown,
  FaSyncAlt,
  FaExternalLinkAlt,
  FaUserGraduate,
  FaChartLine,
  FaWallet,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaCalendarAlt,
  FaBookOpen,
} from "react-icons/fa";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

const COLORS = {
  primary: "#6C63FF",
  primaryDark: "#5145CD",
  purple: "#8B5CF6",
  blue: "#3B82F6",
  green: "#10B981",
  orange: "#F59E0B",
  red: "#EF4444",
  text: "#1E293B",
  muted: "#64748B",
  border: "#E9EDF5",
  background: "#F6F7FB",
};

const money = (value) =>
  `₦${Number(value || 0).toLocaleString("en-NG")}`;

const number = (value) =>
  Number(value || 0).toLocaleString("en-NG");

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        color: COLORS.muted,
        font: { size: 11 },
      },
    },
    tooltip: {
      backgroundColor: "#1E293B",
      titleColor: "#FFFFFF",
      bodyColor: "#E2E8F0",
      padding: 12,
      cornerRadius: 10,
    },
  },
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [courseStats, setCourseStats] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserInfo();
    fetchDashboardData();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await api.get("/students/me/");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      setError("");

      const [statsRes, revenueRes, courseRes, studentsRes] =
        await Promise.all([
          api.get("/admin-panel/dashboard/stats/"),
          api.get(
            "/admin-panel/dashboard/revenue_analytics/?months=6"
          ),
          api.get("/admin-panel/dashboard/course_stats/"),
          api.get(
            "/admin-panel/dashboard/recent_students/?limit=5"
          ),
        ]);

      setStats(statsRes.data);
      setRevenueData(revenueRes.data || []);
      setCourseStats(courseRes.data || []);
      setRecentStudents(studentsRes.data || []);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError(
        "We couldn't load your dashboard. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const isSuperadmin = Boolean(user?.is_superadmin);

  const revenueChartData = {
    labels: [...revenueData].reverse().map((item) => item.month),
    datasets: [
      {
        label: "Revenue received",
        data: [...revenueData]
          .reverse()
          .map((item) => Number(item.total_paid || 0)),
        borderColor: COLORS.primary,
        backgroundColor: "rgba(108, 99, 255, 0.10)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 3,
      },
      {
        label: "Outstanding",
        data: [...revenueData]
          .reverse()
          .map((item) => Number(item.total_owed || 0)),
        borderColor: COLORS.orange,
        backgroundColor: "rgba(245, 158, 11, 0.05)",
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const revenueOptions = {
    ...chartDefaults,
    interaction: { intersect: false, mode: "index" },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: COLORS.muted, font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#F0F2F7" },
        border: { display: false, dash: [4, 4] },
        ticks: {
          color: COLORS.muted,
          font: { size: 10 },
          callback: (value) =>
            value >= 1000000
              ? `₦${(value / 1000000).toFixed(1)}m`
              : value >= 1000
              ? `₦${(value / 1000).toFixed(0)}k`
              : `₦${value}`,
        },
      },
    },
  };

  const courseChartData = {
    labels: courseStats.map((course) => course.course_name),
    datasets: [
      {
        label: "Students",
        data: courseStats.map((course) =>
          Number(course.student_count || 0)
        ),
        backgroundColor: [
          "#6C63FF",
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EC4899",
          "#8B5CF6",
          "#06B6D4",
          "#F97316",
        ],
        borderRadius: 7,
        borderSkipped: false,
        maxBarThickness: 42,
      },
    ],
  };

  const courseOptions = {
    ...chartDefaults,
    plugins: {
      ...chartDefaults.plugins,
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: COLORS.muted,
          font: { size: 10 },
          maxRotation: 35,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#F0F2F7" },
        border: { display: false },
        ticks: {
          precision: 0,
          color: COLORS.muted,
          font: { size: 11 },
        },
      },
    },
  };

  const certificateChartData = {
    labels: ["Approved", "Pending"],
    datasets: [
      {
        data: [
          Number(stats?.approved_certificates || 0),
          Number(stats?.pending_certificates || 0),
        ],
        backgroundColor: [COLORS.green, "#FBBF24"],
        borderWidth: 0,
        hoverOffset: 7,
        spacing: 4,
      },
    ],
  };

  const certificateOptions = {
    ...chartDefaults,
    cutout: "76%",
    plugins: {
      ...chartDefaults.plugins,
      legend: {
        ...chartDefaults.plugins.legend,
        position: "bottom",
      },
    },
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: COLORS.background,
      padding: "30px",
      color: COLORS.text,
      fontFamily:
        "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "18px",
      marginBottom: "28px",
    },
    eyebrow: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      color: COLORS.primary,
      fontSize: "11px",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "1.6px",
      marginBottom: "9px",
    },
    title: {
      fontSize: "clamp(25px, 3vw, 32px)",
      lineHeight: 1.2,
      fontWeight: 800,
      letterSpacing: "-1px",
      margin: "0 0 9px",
      color: "#172033",
    },
    subtitle: {
      color: COLORS.muted,
      fontSize: "14px",
      margin: 0,
      lineHeight: 1.6,
    },
    actions: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "9px",
      padding: "12px 17px",
      background: "#FFFFFF",
      color: "#475569",
      border: `1px solid ${COLORS.border}`,
      borderRadius: "11px",
      fontSize: "12px",
      fontWeight: 700,
      cursor: "pointer",
      textDecoration: "none",
      boxShadow: "0 2px 5px rgba(30,41,59,0.025)",
    },
    primaryButton: {
      background: COLORS.primary,
      color: "#FFFFFF",
      border: "1px solid transparent",
      boxShadow: "0 5px 14px rgba(108,99,255,0.22)",
    },
    hero: {
      position: "relative",
      overflow: "hidden",
      background:
        "linear-gradient(115deg, #5145CD 0%, #6C63FF 52%, #9175F5 100%)",
      borderRadius: "20px",
      padding: "28px 30px",
      marginBottom: "25px",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "22px",
      boxShadow: "0 12px 30px rgba(108,99,255,0.15)",
    },
    heroTitle: {
      fontSize: "23px",
      fontWeight: 800,
      letterSpacing: "-0.5px",
      margin: "0 0 9px",
    },
    heroText: {
      fontSize: "13px",
      lineHeight: 1.7,
      color: "rgba(255,255,255,0.82)",
      margin: 0,
      maxWidth: "520px",
    },
    heroIcon: {
      width: "62px",
      height: "62px",
      borderRadius: "18px",
      background: "rgba(255,255,255,0.15)",
      border: "1px solid rgba(255,255,255,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "27px",
      flexShrink: 0,
    },
    sectionLabel: {
      fontSize: "15px",
      fontWeight: 800,
      color: "#243047",
      margin: "0 0 16px",
      letterSpacing: "-0.2px",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
      gap: "17px",
      marginBottom: "30px",
    },
    statCard: {
      background: "#FFFFFF",
      border: `1px solid ${COLORS.border}`,
      borderRadius: "16px",
      padding: "21px",
      minWidth: 0,
      boxShadow: "0 3px 12px rgba(30,41,59,0.025)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    statTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
      marginBottom: "22px",
    },
    statIcon: {
      width: "45px",
      height: "45px",
      borderRadius: "13px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      flexShrink: 0,
    },
    statTag: {
      fontSize: "10px",
      fontWeight: 800,
      color: COLORS.green,
      background: "#ECFDF5",
      padding: "6px 9px",
      borderRadius: "7px",
      whiteSpace: "nowrap",
    },
    statValue: {
      fontSize: "clamp(25px, 3vw, 30px)",
      fontWeight: 800,
      letterSpacing: "-1px",
      color: "#1E293B",
      margin: "0 0 7px",
      overflowWrap: "anywhere",
    },
    statTitle: {
      fontSize: "13px",
      fontWeight: 700,
      color: "#64748B",
      margin: "0 0 8px",
    },
    statSubtitle: {
      fontSize: "11px",
      color: "#94A3B8",
      margin: 0,
      lineHeight: 1.6,
    },
    chartsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
      gap: "20px",
      marginBottom: "22px",
    },
    panel: {
      background: "#FFFFFF",
      border: `1px solid ${COLORS.border}`,
      borderRadius: "17px",
      padding: "23px",
      minWidth: 0,
      boxShadow: "0 3px 12px rgba(30,41,59,0.025)",
    },
    panelHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "24px",
    },
    panelTitle: {
      fontSize: "15px",
      fontWeight: 800,
      color: "#243047",
      margin: "0 0 7px",
    },
    panelSubtitle: {
      fontSize: "11px",
      color: "#94A3B8",
      margin: 0,
      lineHeight: 1.5,
    },
    chartWrap: {
      position: "relative",
      height: "270px",
      width: "100%",
    },
    certificateChartWrap: {
      position: "relative",
      height: "225px",
      maxWidth: "300px",
      margin: "0 auto",
    },
    certificateCenter: {
      position: "absolute",
      top: "43%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      pointerEvents: "none",
    },
    certificateNumber: {
      fontSize: "30px",
      fontWeight: 800,
      color: "#1E293B",
      margin: 0,
      letterSpacing: "-1px",
    },
    certificateLabel: {
      fontSize: "10px",
      color: COLORS.muted,
      margin: "5px 0 0",
      fontWeight: 600,
    },
    coursePanel: {
      background: "#FFFFFF",
      border: `1px solid ${COLORS.border}`,
      borderRadius: "17px",
      padding: "23px",
      marginBottom: "22px",
      boxShadow: "0 3px 12px rgba(30,41,59,0.025)",
    },
    tablePanel: {
      background: "#FFFFFF",
      border: `1px solid ${COLORS.border}`,
      borderRadius: "17px",
      padding: "23px",
      boxShadow: "0 3px 12px rgba(30,41,59,0.025)",
      minWidth: 0,
    },
    tableScroll: {
      width: "100%",
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
    },
    table: {
      width: "100%",
      minWidth: "700px",
      borderCollapse: "collapse",
      textAlign: "left",
    },
    th: {
      padding: "13px 15px",
      background: "#F8FAFC",
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`,
      color: "#94A3B8",
      fontSize: "10px",
      fontWeight: 800,
      letterSpacing: "0.7px",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    },
    td: {
      padding: "15px",
      borderBottom: "1px solid #F1F5F9",
      color: "#475569",
      fontSize: "12px",
      verticalAlign: "middle",
    },
    avatar: {
      width: "37px",
      height: "37px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#EEECFF",
      color: COLORS.primaryDark,
      fontWeight: 800,
      fontSize: "13px",
      flexShrink: 0,
    },
    studentName: {
      color: "#243047",
      fontWeight: 750,
      fontSize: "12px",
      margin: "0 0 4px",
    },
    studentEmail: {
      color: "#94A3B8",
      fontSize: "10px",
      margin: 0,
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "7px 10px",
      borderRadius: "8px",
      fontSize: "10px",
      fontWeight: 800,
      whiteSpace: "nowrap",
    },
    empty: {
      padding: "35px 15px",
      textAlign: "center",
      color: "#94A3B8",
      fontSize: "13px",
    },
    alert: {
      padding: "17px 20px",
      background: "#FEF2F2",
      border: "1px solid #FECACA",
      color: "#B91C1C",
      borderRadius: "12px",
      fontSize: "13px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "20px",
    },
    loading: {
      minHeight: "65vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      color: COLORS.muted,
      fontSize: "13px",
    },
    spinner: {
      width: "42px",
      height: "42px",
      border: "4px solid #E9E7FF",
      borderTop: `4px solid ${COLORS.primary}`,
      borderRadius: "50%",
      animation: "dashboardSpin 0.8s linear infinite",
    },
  };

  const StatCard = ({
    icon,
    title,
    value,
    subtitle,
    color,
    background,
    tag,
  }) => (
    <div style={styles.statCard}>
      <div style={styles.statTop}>
        <div
          style={{
            ...styles.statIcon,
            color,
            background,
          }}
        >
          {icon}
        </div>
        {tag && <span style={styles.statTag}>{tag}</span>}
      </div>

      <h2 style={styles.statValue}>{value}</h2>
      <p style={styles.statTitle}>{title}</p>
      <p style={styles.statSubtitle}>{subtitle}</p>
    </div>
  );

  const PanelHeader = ({ title, subtitle, right }) => (
    <div style={styles.panelHeader}>
      <div>
        <h3 style={styles.panelTitle}>{title}</h3>
        <p style={styles.panelSubtitle}>{subtitle}</p>
      </div>
      {right}
    </div>
  );

  if (loading && !stats) {
    return (
      <div style={styles.page}>
        <style>{`
          @keyframes dashboardSpin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div style={styles.loading}>
          <div style={styles.spinner} />
          <strong>Preparing your dashboard...</strong>
          <span>Loading your latest academy statistics</span>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={styles.page}>
        <style>{`
          @keyframes dashboardSpin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div style={styles.alert}>
          <span>{error || "Unable to load dashboard data."}</span>
          <button
            type="button"
            onClick={fetchDashboardData}
            style={{ ...styles.button, ...styles.primaryButton }}
          >
            <FaSyncAlt /> Try again
          </button>
        </div>
      </div>
    );
  }

  const totalCertificates = Number(stats.total_certificates || 0);
  const approvedCertificates = Number(
    stats.approved_certificates || 0
  );
  const pendingCertificates = Number(
    stats.pending_certificates || 0
  );

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes dashboardSpin {
          to { transform: rotate(360deg); }
        }

        .dashboard-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(30,41,59,0.07) !important;
        }

        .dashboard-table-row:hover {
          background: #FAFAFF;
        }

        .dashboard-action:hover {
          filter: brightness(0.97);
        }

        .dashboard-action:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .dashboard-page {
            padding: 17px !important;
          }

          .dashboard-hero {
            padding: 22px !important;
          }

          .dashboard-panel {
            padding: 17px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-stat-card,
          .dashboard-table-row {
            transition: none !important;
          }
        }
      `}</style>

      {/* Page Header */}
      <header style={styles.header}>
        <div>
          <div style={styles.eyebrow}>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: COLORS.green,
              }}
            />
            ADMINISTRATION
          </div>

          <h1 style={styles.title}>Dashboard Overview</h1>

          <p style={styles.subtitle}>
            Here's what's happening with your academy today.
          </p>
        </div>

        <div style={styles.actions}>
          <a
            href="https://report.excelpracticehub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-action"
            style={styles.button}
          >
            <FaExternalLinkAlt style={{ color: COLORS.primary }} />
            Report Management
          </a>

          <button
            type="button"
            onClick={fetchDashboardData}
            disabled={refreshing}
            className="dashboard-action"
            style={{ ...styles.button, ...styles.primaryButton }}
          >
            <FaSyncAlt
              style={{
                animation: refreshing
                  ? "dashboardSpin 0.8s linear infinite"
                  : "none",
              }}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </header>

      {/* Error Notice */}
      {error && (
        <div style={styles.alert}>
          <span>{error}</span>
          <button
            type="button"
            onClick={fetchDashboardData}
            style={styles.button}
          >
            Retry
          </button>
        </div>
      )}

      {/* Welcome Banner */}
      <section className="dashboard-hero" style={styles.hero}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#DDD9FF",
              margin: "0 0 12px",
            }}
          >
            YOUR ACADEMY AT A GLANCE
          </p>

          <h2 style={styles.heroTitle}>
            Welcome to your dashboard 👋
          </h2>

          <p style={styles.heroText}>
            Manage students, track certificates, monitor course
            enrolments, and stay on top of your academy's progress
            from one place.
          </p>
        </div>

        <div style={styles.heroIcon}>
          <FaGraduationCap />
        </div>

        <div
          style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "50%",
            right: "45px",
            top: "-95px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "120px",
            height: "120px",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "50%",
            right: "0",
            bottom: "-65px",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* Statistics */}
      <h3 style={styles.sectionLabel}>Performance at a glance</h3>

      <section style={styles.statsGrid}>
        <div className="dashboard-stat-card" style={styles.statCard}>
          <div style={styles.statTop}>
            <div
              style={{
                ...styles.statIcon,
                color: COLORS.primary,
                background: "#EEECFF",
              }}
            >
              <FaUsers />
            </div>
            <span style={styles.statTag}>Students</span>
          </div>
          <h2 style={styles.statValue}>
            {number(stats.total_students)}
          </h2>
          <p style={styles.statTitle}>Total Students</p>
          <p style={styles.statSubtitle}>
            {number(stats.active_students)} active students
          </p>
        </div>

        <div className="dashboard-stat-card" style={styles.statCard}>
          <div style={styles.statTop}>
            <div
              style={{
                ...styles.statIcon,
                color: COLORS.blue,
                background: "#EFF6FF",
              }}
            >
              <FaBookOpen />
            </div>
            <span
              style={{
                ...styles.statTag,
                color: COLORS.blue,
                background: "#EFF6FF",
              }}
            >
              Learning
            </span>
          </div>
          <h2 style={styles.statValue}>
            {number(stats.total_courses)}
          </h2>
          <p style={styles.statTitle}>Available Courses</p>
          <p style={styles.statSubtitle}>
            Courses offered by your academy
          </p>
        </div>

        <div className="dashboard-stat-card" style={styles.statCard}>
          <div style={styles.statTop}>
            <div
              style={{
                ...styles.statIcon,
                color: COLORS.orange,
                background: "#FFF7ED",
              }}
            >
              <FaCertificate />
            </div>
            <span
              style={{
                ...styles.statTag,
                color: COLORS.orange,
                background: "#FFF7ED",
              }}
            >
              Certificates
            </span>
          </div>
          <h2 style={styles.statValue}>
            {number(stats.total_certificates)}
          </h2>
          <p style={styles.statTitle}>Total Certificates</p>
          <p style={styles.statSubtitle}>
            {number(stats.pending_certificates)} awaiting approval
          </p>
        </div>

        {isSuperadmin && (
          <div className="dashboard-stat-card" style={styles.statCard}>
            <div style={styles.statTop}>
              <div
                style={{
                  ...styles.statIcon,
                  color: COLORS.green,
                  background: "#ECFDF5",
                }}
              >
                <FaWallet />
              </div>
              <span style={styles.statTag}>Finance</span>
            </div>
            <h2
              style={{
                ...styles.statValue,
                fontSize: "clamp(22px, 2.5vw, 28px)",
              }}
            >
              {money(stats.total_revenue)}
            </h2>
            <p style={styles.statTitle}>Total Revenue</p>
            <p style={styles.statSubtitle}>
              {money(stats.total_outstanding)} outstanding
            </p>
          </div>
        )}
      </section>

      {/* Analytics */}
      <h3 style={styles.sectionLabel}>Analytics & insights</h3>

      <section style={styles.chartsGrid}>
        {isSuperadmin && (
          <div className="dashboard-panel" style={styles.panel}>
            <PanelHeader
              title="Revenue Overview"
              subtitle="Payments received vs outstanding balances"
              right={
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: COLORS.primary,
                    background: "#EEECFF",
                    padding: "7px 10px",
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  LAST 6 MONTHS
                </span>
              }
            />

            <div style={styles.chartWrap}>
              {revenueData.length > 0 ? (
                <Line
                  data={revenueChartData}
                  options={revenueOptions}
                />
              ) : (
                <div style={styles.empty}>
                  No revenue analytics available yet.
                </div>
              )}
            </div>
          </div>
        )}

        <div className="dashboard-panel" style={styles.panel}>
          <PanelHeader
            title="Certificate Status"
            subtitle="Approval progress across all certificates"
          />

          <div style={styles.certificateChartWrap}>
            <Doughnut
              data={certificateChartData}
              options={certificateOptions}
            />

            <div style={styles.certificateCenter}>
              <p style={styles.certificateNumber}>
                {number(totalCertificates)}
              </p>
              <p style={styles.certificateLabel}>Certificates</p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                padding: "13px",
                background: "#F0FDF4",
                borderRadius: "11px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: COLORS.green,
                  fontSize: "10px",
                  fontWeight: 750,
                  marginBottom: "8px",
                }}
              >
                <FaCheckCircle />
                Approved
              </div>
              <div
                style={{
                  fontSize: "23px",
                  fontWeight: 800,
                  color: "#166534",
                }}
              >
                {number(approvedCertificates)}
              </div>
            </div>

            <div
              style={{
                padding: "13px",
                background: "#FFFBEB",
                borderRadius: "11px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: COLORS.orange,
                  fontSize: "10px",
                  fontWeight: 750,
                  marginBottom: "8px",
                }}
              >
                <FaClock />
                Pending
              </div>
              <div
                style={{
                  fontSize: "23px",
                  fontWeight: 800,
                  color: "#92400E",
                }}
              >
                {number(pendingCertificates)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Students by Course */}
      <section className="dashboard-panel" style={styles.coursePanel}>
        <PanelHeader
          title="Students by Course"
          subtitle="Distribution of students across your available courses"
          right={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                fontSize: "11px",
                color: COLORS.muted,
                background: "#F8FAFC",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "9px",
                padding: "9px 12px",
              }}
            >
              <FaUserGraduate style={{ color: COLORS.primary }} />
              {number(
                courseStats.reduce(
                  (sum, course) =>
                    sum + Number(course.student_count || 0),
                  0
                )
              )}{" "}
              enrolments
            </div>
          }
        />

        <div style={{ ...styles.chartWrap, height: "300px" }}>
          {courseStats.length > 0 ? (
            <Bar data={courseChartData} options={courseOptions} />
          ) : (
            <div style={styles.empty}>
              No course statistics available yet.
            </div>
          )}
        </div>
      </section>

      {/* Recent Students */}
      <section className="dashboard-panel" style={styles.tablePanel}>
        <PanelHeader
          title="Recently Registered Students"
          subtitle="The latest students to join your academy"
          right={
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                color: COLORS.green,
                background: "#ECFDF5",
                borderRadius: "8px",
                padding: "8px 11px",
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              <FaUsers />
              LATEST 5
            </div>
          }
        />

        <div style={styles.tableScroll}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student</th>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Registration Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentStudents.length > 0 ? (
                recentStudents.map((student, index) => {
                  const active = Boolean(student.is_active);
                  const username = student.username || "Student";
                  const initials = username
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase();

                  return (
                    <tr
                      key={student.id ?? index}
                      className="dashboard-table-row"
                    >
                      <td style={styles.td}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div style={styles.avatar}>{initials}</div>

                          <div>
                            <p style={styles.studentName}>
                              {username}
                            </p>
                            <p style={styles.studentEmail}>
                              {student.email || "No email provided"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td style={styles.td}>
                        <span
                          style={{
                            display: "inline-block",
                            maxWidth: "220px",
                            whiteSpace: "normal",
                            lineHeight: 1.6,
                            color: "#475569",
                            fontWeight: 600,
                          }}
                        >
                          {student.course_name || "Not assigned"}
                        </span>
                      </td>

                      <td style={styles.td}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <FaCalendarAlt
                            style={{ color: "#94A3B8" }}
                          />
                          {student.registration_date
                            ? new Date(
                                student.registration_date
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A"}
                        </div>
                      </td>

                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            color: active ? "#047857" : "#B91C1C",
                            background: active
                              ? "#ECFDF5"
                              : "#FEF2F2",
                          }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: active
                                ? COLORS.green
                                : COLORS.red,
                            }}
                          />
                          {active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" style={styles.empty}>
                    <FaUsers
                      style={{
                        fontSize: "25px",
                        display: "block",
                        margin: "0 auto 12px",
                        color: "#CBD5E1",
                      }}
                    />
                    No recent students to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: "17px",
            paddingTop: "15px",
            borderTop: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "11px", color: "#94A3B8" }}>
            Showing {recentStudents.length} recent{" "}
            {recentStudents.length === 1 ? "student" : "students"}
          </span>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "10px",
              color: COLORS.green,
              fontWeight: 750,
            }}
          >
            <FaCheckCircle />
            Dashboard data loaded
          </span>
        </div>
      </section>

      <footer
        style={{
          textAlign: "center",
          padding: "25px 10px 5px",
          color: "#94A3B8",
          fontSize: "10px",
        }}
      >
        Academy Administration Dashboard
      </footer>
    </div>
  );
};

export default Dashboard;