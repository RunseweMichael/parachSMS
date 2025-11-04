import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    message: "",
    status: "NEW",
    course: "", // store course ID
    consent: false,
  });

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch courses and enquiry data
  const fetchCourses = async () => {
    try {
      const res = await api.get("courses/courses/");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
    if (id) {
      api.get(`enquiries/enquiries/${id}/`).then(res => {
        setFormData({
          ...res.data,
          course: res.data.course?.id || "",
        });
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`enquiries/enquiries/${id}/`, formData);
        alert("Enquiry updated!");
      } else {
        await api.post("enquiries/enquiries/", formData);
        alert("Enquiry created!");
      }
      navigate("/enquiries");
    } catch (err) {
      console.error(err);
      alert("Failed to save enquiry.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{id ? "Edit Enquiry" : "Add Enquiry"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Text Inputs */}
        {[
          { label: "Name", key: "name", type: "text" },
          { label: "Email", key: "email", type: "email" },
          { label: "Phone", key: "phone", type: "text" },
        ].map(field => (
          <div style={styles.field} key={field.key}>
            <label style={styles.label}>{field.label}</label>
            <input
              type={field.type}
              value={formData[field.key]}
              onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
              required
              style={styles.input}
            />
          </div>
        ))}

        {/* Course Dropdown */}
        <div style={styles.field}>
          <label style={styles.label}>Course</label>
          <select
            value={formData.course}
            onChange={e => setFormData({ ...formData, course: e.target.value })}
            required
            style={styles.select}
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Dropdown */}
        <div style={styles.field}>
          <label style={styles.label}>Gender</label>
          <select
            value={formData.gender}
            onChange={e => setFormData({ ...formData, gender: e.target.value })}
            style={styles.select}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Message */}
        <div style={styles.field}>
          <label style={styles.label}>Message</label>
          <textarea
            rows="4"
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            required
            style={styles.textarea}
          />
        </div>

        {/* Consent */}
        <div style={styles.consentWrapper}>
          <input
            type="checkbox"
            id="consent"
            checked={formData.consent}
            onChange={e => setFormData({ ...formData, consent: e.target.checked })}
            required
            style={styles.checkbox}
          />
          <label htmlFor="consent" style={styles.consentLabel}>
            I consent to receive newsletters and email updates about courses, events, and promotions.
            I understand that I can withdraw my consent at any time by unsubscribing or contacting support.
            My personal data will be stored securely and will not be shared with third parties.
          </label>
        </div>

        <button type="submit" style={styles.submit}>
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "25px",
    textAlign: "center",
    color: "#1e3a8a",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#374151",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    backgroundColor: "#fff",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    resize: "vertical",
  },
  consentWrapper: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  checkbox: {
    marginTop: "4px",
    width: "18px",
    height: "18px",
    accentColor: "#3b82f6",
  },
  consentLabel: {
    fontSize: "13px",
    color: "#374151",
    lineHeight: "1.5",
  },
  submit: {
    padding: "12px 0",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  submitHover: {
    backgroundColor: "#2563eb",
  },
};

export default EnquiryForm;
