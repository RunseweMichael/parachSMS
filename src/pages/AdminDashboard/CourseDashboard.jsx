import React, { useEffect, useState } from "react";
import api from "../../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0d0f14;
    --ink-soft: #3a3d47;
    --ink-muted: #8a8d99;
    --surface: #f4f3ef;
    --card: #ffffff;
    --border: #e4e2dc;
    --gold: #c9a84c;
    --gold-pale: #f5edd8;
    --emerald: #1a7a5e;
    --emerald-pale: #d4ede7;
    --crimson: #b83232;
    --crimson-pale: #fae6e6;
    --sky: #1c5fa8;
    --sky-pale: #ddeaf8;
    --shadow-sm: 0 1px 3px rgba(13,15,20,0.08), 0 1px 2px rgba(13,15,20,0.06);
    --shadow-md: 0 4px 16px rgba(13,15,20,0.08), 0 2px 6px rgba(13,15,20,0.06);
    --shadow-lg: 0 12px 40px rgba(13,15,20,0.10), 0 4px 12px rgba(13,15,20,0.08);
    --radius: 14px;
    --radius-sm: 8px;
  }

  .dashboard {
    font-family: 'DM Sans', sans-serif;
    background: var(--surface);
    min-height: 100vh;
    padding-bottom: 80px;
    color: var(--ink);
  }

  /* ── TITLE / HEADER BAND ── */
  .title {
    background: var(--ink);
    color: #fff;
    margin: 0;
    padding: 36px 48px 28px;
    font-family: 'Syne', sans-serif;
    font-size: clamp(22px, 3.5vw, 36px);
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  /* ── STATS GRID ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    background: var(--ink);
    padding: 0 48px 36px;
  }
  @media (max-width: 860px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); padding: 0 20px 28px; }
    .title { padding: 28px 20px 20px; }
    .search-box { padding: 24px 20px 0; }
    .course-card { margin: 24px 20px 0; }
  }

  .stat-card {
    background: var(--card);
    border-radius: var(--radius);
    padding: 22px 24px 20px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  .stat-card:nth-child(1) { border-top: 3px solid var(--sky); }
  .stat-card:nth-child(2) { border-top: 3px solid var(--emerald); }
  .stat-card:nth-child(3) { border-top: 3px solid var(--crimson); }
  .stat-card:nth-child(4) { border-top: 3px solid var(--gold); }

  .stat-card h3 {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    color: var(--ink-muted);
    margin-bottom: 10px;
  }
  .stat-card p {
    font-family: 'Syne', sans-serif;
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
  }
  .stat-card:nth-child(1) p { color: var(--sky); }
  .stat-card:nth-child(2) p { color: var(--emerald); }
  .stat-card:nth-child(3) p { color: var(--crimson); }
  .stat-card:nth-child(4) p { color: var(--gold); }

  /* ── SEARCH ── */
  .search-box {
    padding: 28px 48px 0;
  }
  .search-box input {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 11px 16px 11px 42px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--card) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none' viewBox='0 0 24 24' stroke='%238a8d99' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E") no-repeat 14px center;
    color: var(--ink);
    width: 300px;
    max-width: 100%;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: var(--shadow-sm);
  }
  .search-box input::placeholder { color: var(--ink-muted); }
  .search-box input:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
  }

  /* ── EMPTY MESSAGE ── */
  .empty-message {
    margin: 32px 48px;
    padding: 56px 24px;
    text-align: center;
    color: var(--ink-muted);
    font-size: 15px;
    background: var(--card);
    border-radius: var(--radius);
    border: 1.5px dashed var(--border);
    display: block;
  }

  /* ── LOADING ── */
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    color: var(--ink-muted);
    background: var(--surface);
  }

  /* ── COURSE CARD ── */
  .course-card {
    background: var(--card);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    margin: 28px 48px 0;
    overflow: hidden;
    animation: slideUp 0.4s ease both;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .course-header {
    padding: 20px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    background: #fafaf8;
    gap: 16px;
    flex-wrap: wrap;
  }
  .course-header h2 {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin-bottom: 3px;
  }
  .course-header p {
    font-size: 13px;
    color: var(--ink-muted);
  }
  .defaulter-alert {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--crimson-pale);
    color: var(--crimson);
    font-size: 12px;
    font-weight: 600;
    padding: 5px 13px;
    border-radius: 100px;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }
  .defaulter-alert::before {
    content: '';
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--crimson);
    flex-shrink: 0;
  }

  /* ── TABLE ── */
  .course-card table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  .course-card thead tr {
    background: #f7f6f2;
    border-bottom: 2px solid var(--border);
  }
  .course-card th {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--ink-muted);
    padding: 12px 20px;
    text-align: left;
    white-space: nowrap;
  }
  .course-card th:last-child { text-align: right; }

  .course-card tbody tr {
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
  }
  .course-card tbody tr:last-child { border-bottom: none; }
  .course-card tbody tr:hover { background: #faf9f6; }
  .course-card tbody tr.defaulter-row { background: #fef9f9; }
  .course-card tbody tr.defaulter-row:hover { background: #fdf2f2; }

  .course-card td {
    padding: 14px 20px;
    vertical-align: middle;
    color: var(--ink);
  }
  .course-card td:last-child { text-align: right; }

  /* ── BADGES ── */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 100px;
    white-space: nowrap;
    line-height: 1;
  }
  .badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .badge.active    { background: var(--emerald-pale); color: var(--emerald); }
  .badge.active::before  { background: var(--emerald); }
  .badge.inactive  { background: #ededeb; color: var(--ink-muted); }
  .badge.inactive::before { background: var(--ink-muted); }
  .badge.paid      { background: var(--emerald-pale); color: var(--emerald); }
  .badge.paid::before    { background: var(--emerald); }
  .badge.owing     { background: var(--crimson-pale); color: var(--crimson); }
  .badge.owing::before   { background: var(--crimson); }

  /* ── ACTION BUTTONS ── */
  .actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
  .actions button {
    font-family: 'DM Sans', sans-serif;
    font-size: 12.5px;
    font-weight: 500;
    padding: 6px 13px;
    border-radius: var(--radius-sm);
    border: 1.5px solid transparent;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
    line-height: 1;
  }
  .actions button:nth-child(1) { background: var(--sky-pale);     color: var(--sky);     }
  .actions button:nth-child(2) { background: var(--emerald-pale); color: var(--emerald); }
  .actions button:nth-child(3) { background: var(--gold-pale);    color: #a07c2a;        }
  .actions button:nth-child(1):hover { background: #c6daf4; border-color: var(--sky);     }
  .actions button:nth-child(2):hover { background: #bde2d8; border-color: var(--emerald); }
  .actions button:nth-child(3):hover { background: #eedcb0; border-color: var(--gold);    }
`;

const CourseDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [courseRes, studentRes] = await Promise.all([
        api.get("/courses/courses/"),
        api.get("/students/users/")
      ]);

      const studentsOnly = studentRes.data.filter((u) => !u.is_staff);

      setCourses(courseRes.data);
      setStudents(studentsOnly);
    } catch (err) {
      console.error("Dashboard error", err);
    } finally {
      setLoading(false);
    }
  };

  const paymentStatus = (student) => {
    if (Number(student.amount_owed) <= 0) return "Paid";
    return "Owing";
  };

  const getCourseStudents = (courseId) => {
    return students
      .filter((s) => s.course?.id === courseId)
      .filter((s) =>
        (s.name || "").toLowerCase().includes(search.toLowerCase())
      );
  };

  const stats = () => {
    const totalStudents = students.length;

    const active = students.filter((s) => s.is_active).length;

    const owing = students.filter(
      (s) => Number(s.amount_owed) > 0
    ).length;

    const paid = students.filter(
      (s) => Number(s.amount_owed) <= 0
    ).length;

    return { totalStudents, active, owing, paid };
  };

  const dashboardStats = stats();

  /* FILTER COURSES THAT ACTUALLY HAVE STUDENTS */
  const coursesWithStudents = courses
    .filter((course) => students.some((s) => s.course?.id === course.id))
    .sort((a, b) => {
      const countA = students.filter((s) => s.course?.id === a.id).length;
      const countB = students.filter((s) => s.course?.id === b.id).length;
      return countB - countA;
    });

  if (loading) return <p className="loading">Loading dashboard...</p>;

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">

        <h1 className="title">Student Course Dashboard</h1>

        {/* Statistics Section */}
        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{dashboardStats.totalStudents}</p>
          </div>

          <div className="stat-card">
            <h3>Active Students</h3>
            <p>{dashboardStats.active}</p>
          </div>

          <div className="stat-card">
            <h3>Defaulters</h3>
            <p>{dashboardStats.owing}</p>
          </div>

          <div className="stat-card">
            <h3>Fully Paid</h3>
            <p>{dashboardStats.paid}</p>
          </div>

        </div>

        {/* Search */}
        <div className="search-box">
          <input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Empty State */}
        {coursesWithStudents.length === 0 && (
          <p className="empty-message">
            No students have been enrolled in any course yet.
          </p>
        )}

        {/* Courses */}
        {coursesWithStudents.map((course) => {

          const courseStudents = getCourseStudents(course.id);

          const courseOwing = courseStudents.filter(
            (s) => Number(s.amount_owed) > 0
          ).length;

          return (
            <div className="course-card" key={course.id}>

              <div className="course-header">

                <div>
                  <h2>{course.course_name}</h2>
                  <p>{courseStudents.length} Students</p>
                </div>

                {courseOwing > 0 && (
                  <span className="defaulter-alert">
                    {courseOwing} Owing
                  </span>
                )}

              </div>

              <table>

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Center</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {courseStudents.map((student) => {

                    const owing =
                      Number(student.amount_owed) > 0;

                    return (
                      <tr
                        key={student.id}
                        className={owing ? "defaulter-row" : ""}
                      >

                        <td>{student.name}</td>

                        <td>
                          <span
                            className={
                              student.is_active
                                ? "badge active"
                                : "badge inactive"
                            }
                          >
                            {student.is_active
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              paymentStatus(student) === "Paid"
                                ? "badge paid"
                                : "badge owing"
                            }
                          >
                            {paymentStatus(student)}
                          </span>
                        </td>

                        <td>{student.center}</td>

                        <td className="actions">

                          <button
                            onClick={() =>
                              window.location.href =
                                `/admin/students/${student.id}`
                            }
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              window.location.href =
                                `/admin/payments/${student.id}`
                            }
                          >
                            Payments
                          </button>

                          <button
                            onClick={() =>
                              window.location.href =
                                `/admin/edit-student/${student.id}`
                            }
                          >
                            Edit
                          </button>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          );
        })}
      </div>
    </>
  );
};

export default CourseDashboard;