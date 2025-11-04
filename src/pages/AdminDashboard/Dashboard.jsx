import React, { useEffect, useState } from "react";
import api from "../../api";
import { 
  FaUsers, FaGraduationCap, FaCertificate, 
  FaDollarSign, FaChartLine, FaBell 
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
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [courseStats, setCourseStats] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, revenueRes, courseRes, studentsRes] = await Promise.all([
        api.get("/admin-panel/dashboard/stats/"),
        api.get("/admin-panel/dashboard/revenue_analytics/?months=6"),
        api.get("/admin-panel/dashboard/course_stats/"),
        api.get("/admin-panel/dashboard/recent_students/?limit=5"),
      ]);

      setStats(statsRes.data);
      setRevenueData(revenueRes.data);
      setCourseStats(courseRes.data);
      setRecentStudents(studentsRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Chart data
  const revenueChartData = {
    labels: revenueData.map(d => d.month).reverse(),
    datasets: [
      {
        label: "Revenue",
        data: revenueData.map(d => d.total_paid).reverse(),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        tension: 0.4,
      },
      {
        label: "Outstanding",
        data: revenueData.map(d => d.total_owed).reverse(),
        borderColor: "#f44336",
        backgroundColor: "rgba(244, 67, 54, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const courseChartData = {
    labels: courseStats.map(c => c.course_name),
    datasets: [
      {
        label: "Students",
        data: courseStats.map(c => c.student_count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const certificateChartData = {
    labels: ["Approved", "Pending"],
    datasets: [
      {
        data: [stats.approved_certificates, stats.pending_certificates],
        backgroundColor: ["#4CAF50", "#FFC107"],
      },
    ],
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <button style={styles.refreshBtn} onClick={fetchDashboardData}>
          🔄 Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <StatCard
          icon={<FaUsers />}
          title="Total Students"
          value={stats.total_students}
          subtitle={`${stats.active_students} active`}
          color="#2196F3"
        />
        <StatCard
          icon={<FaGraduationCap />}
          title="Total Courses"
          value={stats.total_courses}
          subtitle="Available courses"
          color="#9C27B0"
        />
        <StatCard
          icon={<FaCertificate />}
          title="Certificates"
          value={stats.total_certificates}
          subtitle={`${stats.pending_certificates} pending`}
          color="#FF9800"
        />
        <StatCard
          icon={<FaDollarSign />}
          title="Total Revenue"
          value={`$${stats.total_revenue.toLocaleString()}`}
          subtitle={`$${stats.total_outstanding.toLocaleString()} outstanding`}
          color="#4CAF50"
        />
      </div>

      {/* Charts Row */}
      <div style={styles.chartsRow}>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Revenue Trends (Last 6 Months)</h3>
          <Line data={revenueChartData} options={{ responsive: true }} />
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Certificate Status</h3>
          <Doughnut data={certificateChartData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Course Distribution */}
      <div style={styles.fullWidthCard}>
        <h3 style={styles.chartTitle}>Students by Course</h3>
        <Bar data={courseChartData} options={{ responsive: true }} />
      </div>

      {/* Recent Students */}
      <div style={styles.recentStudentsCard}>
        <h3 style={styles.sectionTitle}>Recent Students</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Registration Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentStudents.map((student) => (
              <tr key={student.id} style={styles.tr}>
                <td style={styles.td}>{student.username}</td>
                <td style={styles.td}>{student.email}</td>
                <td style={styles.td}>{student.course_name || "N/A"}</td>
                <td style={styles.td}>
                  {new Date(student.registration_date).toLocaleDateString()}
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, subtitle, color }) => (
  <div style={{ ...styles.statCard, borderLeft: `4px solid ${color}` }}>
    <div style={{ ...styles.statIcon, color }}>{icon}</div>
    <div style={styles.statContent}>
      <h3 style={styles.statValue}>{value}</h3>
      <p style={styles.statTitle}>{title}</p>
      <p style={styles.statSubtitle}>{subtitle}</p>
    </div>
  </div>
);

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
    marginBottom: "30px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#333",
  },
  refreshBtn: {
    padding: "10px 20px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #2196F3",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  statIcon: {
    fontSize: "40px",
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 5px 0",
    color: "#333",
  },
  statTitle: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 5px 0",
  },
  statSubtitle: {
    fontSize: "12px",
    color: "#999",
    margin: 0,
  },
  chartsRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    marginBottom: "30px",
  },
  chartCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  fullWidthCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  chartTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  recentStudentsCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    fontWeight: "600",
    color: "#333",
    borderBottom: "2px solid #dee2e6",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #dee2e6",
    color: "#666",
  },
  tr: {
    transition: "background-color 0.2s",
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
};

export default Dashboard;