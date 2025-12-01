import React, { useEffect, useState } from "react";
import api from "../api";
import { Award, TrendingUp, CheckCircle } from "lucide-react";

const SkillsProgress = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallAverage, setOverallAverage] = useState(0);

  useEffect(() => {
    fetchSkillsProgress();
  }, []);

  const fetchSkillsProgress = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get("/tasks/skills-progress/", {
        headers: { Authorization: `Token ${token}` }
      });
      
      setSkillsData(res.data);
      
      // Calculate overall average
      if (res.data.length > 0) {
        const totalAvg = res.data.reduce((sum, skill) => sum + skill.average_score, 0) / res.data.length;
        setOverallAverage(totalAvg);
      }
    } catch (error) {
      console.error("Failed to fetch skills progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#4CAF50";
    if (score >= 60) return "#FF9800";
    return "#f44336";
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    return "D";
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading skills progress...</p>
      </div>
    );
  }

  if (skillsData.length === 0) {
    return (
      <div style={styles.emptyState}>
        <Award style={{ width: 48, height: 48, color: "#999", marginBottom: 16 }} />
        <h3 style={styles.emptyTitle}>No Task Progress Yet</h3>
        <p style={styles.emptyText}>Complete tasks to see your skills progress here</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <TrendingUp style={{ width: 28, height: 28, color: "#2196F3" }} />
          <h2 style={styles.title}>Skills Progress</h2>
        </div>
        <div style={styles.overallScore}>
          <div style={styles.overallLabel}>Overall Average</div>
          <div style={{ ...styles.overallValue, color: getScoreColor(overallAverage) }}>
            {overallAverage.toFixed(1)}%
          </div>
          <div style={styles.overallGrade}>{getScoreGrade(overallAverage)}</div>
        </div>
      </div>

      <div style={styles.skillsGrid}>
        {skillsData.map((skill, index) => (
          <div key={index} style={styles.skillCard}>
            <div style={styles.skillHeader}>
              <h3 style={styles.skillName}>{skill.module_name}</h3>
              <div style={{ ...styles.scoreCircle, borderColor: getScoreColor(skill.average_score) }}>
                <span style={{ ...styles.scoreValue, color: getScoreColor(skill.average_score) }}>
                  {skill.average_score.toFixed(0)}%
                </span>
              </div>
            </div>

            <div style={styles.skillStats}>
              <div style={styles.statItem}>
                <CheckCircle style={{ width: 16, height: 16, color: "#4CAF50" }} />
                <span style={styles.statText}>
                  {skill.completed_weeks} week{skill.completed_weeks !== 1 ? 's' : ''} completed
                </span>
              </div>
              <div style={styles.statItem}>
                <Award style={{ width: 16, height: 16, color: "#FF9800" }} />
                <span style={styles.statText}>
                  Grade: {getScoreGrade(skill.average_score)}
                </span>
              </div>
            </div>

            <div style={styles.progressBarContainer}>
              <div 
                style={{
                  ...styles.progressBar,
                  width: `${skill.average_score}%`,
                  backgroundColor: getScoreColor(skill.average_score)
                }}
              ></div>
            </div>

            <div style={styles.performanceLabel}>
              {skill.average_score >= 80 ? "Excellent" : 
               skill.average_score >= 60 ? "Good" : "Needs Improvement"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #2196F3",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "16px",
    color: "#666",
    fontSize: "14px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
  },
  emptyTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  emptyText: {
    fontSize: "14px",
    color: "#666",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f0f0f0",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#333",
    margin: 0,
  },
  overallScore: {
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    padding: "16px 24px",
    borderRadius: "12px",
  },
  overallLabel: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "8px",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  overallValue: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "4px",
  },
  overallGrade: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#666",
  },
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  skillCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e0e0e0",
    transition: "all 0.3s ease",
  },
  skillHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  skillName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    margin: 0,
    flex: 1,
  },
  scoreCircle: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "3px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  scoreValue: {
    fontSize: "16px",
    fontWeight: "700",
  },
  skillStats: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  statText: {
    fontSize: "13px",
    color: "#666",
  },
  progressBarContainer: {
    width: "100%",
    height: "8px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "12px",
  },
  progressBar: {
    height: "100%",
    transition: "width 0.3s ease",
    borderRadius: "4px",
  },
  performanceLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
};

export default SkillsProgress;