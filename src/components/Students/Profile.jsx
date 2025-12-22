import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import api from "../../api";
import {
  User,
  Mail,
  Book,
  Calendar,
  Phone,
  Home,
  DollarSign,
  CheckCircle,
  XCircle,
  Edit3,
  Save,
  X,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [hasLeftReview, setHasLeftReview] = useState(false);
  const [visibleCerts, setVisibleCerts] = useState({});

  // Fetch profile on mount
  useEffect(() => {
    fetchUserProfile();

    const reviewStatus = localStorage.getItem("hasLeftReview");
    if (reviewStatus === "true") setHasLeftReview(true);
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/students/me/", {
        headers: { Authorization: `Token ${token}` },
      });
      setUser(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error(err.response || err);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.put("/students/me/", formData, {
        headers: { Authorization: `Token ${token}` },
      });
      alert("Profile updated successfully!");
      setEditing(false);
      // Update user and formData with latest values, including amount_paid/owed
      setUser(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error(err.response || err);
      alert("Failed to update profile.");
    }
  };

  const handleDownloadCertificate = async (imageUrl, filename = "certificate.pdf") => {
    if (!hasLeftReview) {
      alert("🔒 Please leave a review to download your certificate.");
      return;
    }

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        const pdf = new jsPDF("landscape", "px", "a4");
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(base64data, "JPEG", 0, 0, imgWidth, imgHeight);
        pdf.save(filename);
      };
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to download certificate.");
    }
  };

  const handleLeaveReview = () => {
    window.open("https://g.page/r/CaN0Psi7wexOEBE/review", "_blank");
    localStorage.setItem("hasLeftReview", "true");
    setHasLeftReview(true);
  };

  const toggleCertificateView = (id) => {
    if (!hasLeftReview) {
      alert("🔒 Please leave a review to view your certificate.");
      return;
    }

    setVisibleCerts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading)
    return (
      <div style={styles.center}>
        <div className="loader" style={styles.loader}></div>
        <p style={{ color: "#475569", marginTop: 10 }}>
          Loading your profile...
        </p>
      </div>
    );

  if (error)
    return (
      <div style={styles.center}>
        <p
          style={{
            color: "#dc2626",
            backgroundColor: "#fee2e2",
            padding: 12,
            borderRadius: 8,
          }}
        >
          {error}
        </p>
      </div>
    );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* PROFILE HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={styles.heading}>👩‍🎓 Student Profile</h2>
            <p style={styles.subtext}>Welcome back, {user.name || user.username}!</p>
          </div>

          {!editing ? (
            <button style={styles.editBtn} onClick={() => setEditing(true)}>
              <Edit3 size={16} /> Edit
            </button>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <button style={styles.saveBtn} onClick={handleSave}>
                <Save size={16} /> Save
              </button>
              <button style={styles.cancelBtn} onClick={() => setEditing(false)}>
                <X size={16} /> Cancel
              </button>
            </div>
          )}
        </div>

        <div style={styles.divider}></div>

        {/* PROFILE GRID */}
        <div style={styles.grid}>
          <EditableField icon={<User size={18} />} label="Full Name" name="name" value={formData.name || ""} editing={editing} onChange={handleChange} />
          <EditableField icon={<Mail size={18} />} label="Email" name="email" value={formData.email || ""} editing={editing} onChange={handleChange} />
          <ProfileField icon={<Book size={18} />} label="Course" value={user.course ? <Link to={`/course/${user.course.id}`} style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}>{user.course_details.course_name}</Link> : "N/A"} />
          <ProfileField icon={<DollarSign size={18} />} label="Course Price" value={user.course ? `₦ ${user.course.price}` : "N/A"} />
          <EditableField icon={<Calendar size={18} />} label="Birth Date" name="birth_date" type="date" value={formData.birth_date || ""} editing={editing} onChange={handleChange} />
          <EditableField icon={<Phone size={18} />} label="Phone" name="phone_number" value={formData.phone_number || ""} editing={editing} onChange={handleChange} />
          <EditableField icon={<Home size={18} />} label="Address" name="address" value={formData.address || ""} editing={editing} onChange={handleChange} />

          {/* ✅ Amount Paid / Owed directly from user object */}
          <ProfileField icon={<DollarSign size={18} />} label="Amount Paid" value={`₦${user.amount_paid ?? 0}`} />
          <ProfileField icon={<DollarSign size={18} />} label="Amount Owed" value={`₦${user.amount_owed ?? 0}`} />

          <button onClick={() => navigate("/payment")} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            💳 Make a Payment
          </button>

          <ProfileField icon={<Calendar size={18} />} label="Next Due Date" value={user.next_due_date || "N/A"} />
          <ProfileField icon={user.is_active ? <CheckCircle size={18} color="#16a34a" /> : <XCircle size={18} color="#dc2626" />} label="Active" value={user.is_active ? "Active" : "Not Active"} />
          <ProfileField icon={user.consent ? <CheckCircle size={18} color="#16a34a" /> : <XCircle size={18} color="#dc2626" />} label="Consent" value={user.consent ? "Yes" : "No"} />

          <ProfileField
            icon={<Book size={18} />}
            label="Course Resource"
            value={
              user.course
                ? user.amount_paid >= 0
                  ? user.course.resource_link
                    ? <a href={user.course.resource_link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", backgroundColor: "#2563eb", color: "#fff", padding: "10px 18px", borderRadius: 8, fontWeight: "600", textDecoration: "none", transition: "background 0.3s" }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}>📂 Access Resource</a>
                    : "Resource not available"
                  : "Pay the course to access resource"
                : "N/A"
            }
          />

          <ProfileField icon={<Calendar size={18} />} label="Registration Date" value={user.registration_date ? new Date(user.registration_date).toLocaleDateString() : "N/A"} />
          <button onClick={() => navigate("/student-transactions")} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
            View Receipts
          </button>
        </div>

        {/* CERTIFICATES */}
        <div style={{ marginTop: 30 }}>
          <h3 style={{ color: "#1e3a8a", marginBottom: 12 }}>🎓 My Certificates</h3>

          {!hasLeftReview && (
            <div style={{ marginBottom: 30, background: "linear-gradient(135deg, #fef9c3, #fef08a)", border: "1px solid #fde047", borderRadius: 12, padding: "20px 24px", textAlign: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
              <h4 style={{ color: "#1e3a8a", fontWeight: "700", fontSize: "1.1rem", marginBottom: 10 }}>⭐ Parach Computers (ICT Training Centre, Orogun, Ibadan)</h4>
              <p style={{ color: "#334155", fontSize: 15, marginBottom: 14, lineHeight: 1.5 }}>
                would love your feedback! Please take a moment to share your experience and help others discover us.
                <br />
                We’d really appreciate a <span style={{ color: "#eab308", fontWeight: "700" }}>5-star review</span> 🌟
              </p>
              <button onClick={handleLeaveReview} style={{ backgroundColor: "#1e3a8a", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: "600", cursor: "pointer", transition: "background 0.3s" }}>💬 Post a Review</button>
            </div>
          )}

          {user.certificates?.length > 0 ? (
            user.certificates.map((cert) => {
              const imageUrl = cert.certificate_file?.startsWith("http") ? cert.certificate_file : `http://127.0.0.1:8000${cert.certificate_file}`;
              return (
                <div key={cert.id} style={styles.certificateBox}>
                  {cert.certificate_file ? (
                    !hasLeftReview ? (
                      <div style={{ backgroundColor: "#f1f5f9", padding: "20px", borderRadius: "8px", textAlign: "center", color: "#475569" }}>
                        🔒 Certificate locked. Please leave a review to unlock it.
                      </div>
                    ) : (
                      <>
                        <button onClick={() => toggleCertificateView(cert.id)} style={{ ...styles.certificateLink, backgroundColor: "#1e40af", marginRight: 8 }}>
                          {visibleCerts[cert.id] ? "Hide Certificate" : "View Certificate"}
                        </button>
                        <button onClick={() => handleDownloadCertificate(imageUrl, `certificate_${user.name}.pdf`)} style={{ ...styles.certificateLink, backgroundColor: "#16a34a" }}>
                          📄 Download Certificate
                        </button>
                        {visibleCerts[cert.id] && (
                          <div style={{ marginTop: 15 }}>
                            <img src={imageUrl} alt="Certificate" style={{ maxWidth: "100%", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
                          </div>
                        )}
                      </>
                    )
                  ) : (
                    <p style={{ color: "#64748b" }}>Certificate not available yet.</p>
                  )}
                </div>
              );
            })
          ) : (
            <p>No certificates assigned yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Editable input field
const EditableField = ({ icon, label, name, value, editing, onChange, type = "text" }) => (
  <div style={styles.field}>
    <div style={styles.labelRow}>
      <span style={styles.icon}>{icon}</span>
      <span style={styles.label}>{label}</span>
    </div>
    {editing ? (
      <input type={type} name={name} value={value} onChange={onChange} style={styles.input} />
    ) : (
      <span style={styles.value}>{value || "N/A"}</span>
    )}
  </div>
);

const ProfileField = ({ icon, label, value }) => (
  <div style={styles.field}>
    <div style={styles.labelRow}>
      <span style={styles.icon}>{icon}</span>
      <span style={styles.label}>{label}</span>
    </div>
    <span style={styles.value}>{value}</span>
  </div>
);

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Inter', sans-serif", padding: "40px 20px" },
  card: { width: "100%", maxWidth: 700, backgroundColor: "#fff", borderRadius: 16, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", padding: "40px 35px" },
  heading: { fontSize: "1.9rem", fontWeight: "700", color: "#1e3a8a", marginBottom: 6 },
  subtext: { fontSize: 14, color: "#64748b", marginBottom: 20 },
  divider: { borderBottom: "1px solid #e2e8f0", marginBottom: 20 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 },
  field: { backgroundColor: "#f8fafc", borderRadius: 10, padding: "12px 15px" },
  labelRow: { display: "flex", alignItems: "center", marginBottom: 5 },
  icon: { marginRight: 8, color: "#2563eb" },
  label: { fontWeight: "600", fontSize: 14, color: "#334155" },
  value: { fontSize: 15, color: "#0f172a" },
  input: { width: "100%", padding: "8px", borderRadius: 6, border: "1px solid #cbd5e1", outline: "none", fontSize: 14 },
  editBtn: { backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: "600" },
  saveBtn: { backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: "600" },
  cancelBtn: { backgroundColor: "#dc2626", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: "600" },
  certificateBox: { marginBottom: 20 },
  certificateLink: { display: "inline-block", padding: "10px 18px", backgroundColor: "#2563eb", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: "600", cursor: "pointer" },
  center: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" },
  loader: { width: 30, height: 30, border: "4px solid #cbd5e1", borderTop: "4px solid #1d4ed8", borderRadius: "50%", animation: "spin 1s linear infinite" },
};

export default Profile;
