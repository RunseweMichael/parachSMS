import React, { useEffect, useState } from "react";
import axios from "../../api"; // axios instance

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("certificates/certificates/", {
          headers: { Authorization: `Token ${token}` },
        });
        setCertificates(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch certificates");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) return <p>Loading certificates...</p>;
  if (error) return <p>{error}</p>;

  // Normalize is_approved and apply filter
  const filteredCertificates = certificates.filter((cert) => {
    const approved =
      cert.is_approved === true ||
      cert.is_approved === "true" ||
      cert.is_approved === 1;

    if (filter === "approved") return approved;
    if (filter === "pending") return !approved;
    return true; // "all"
  });

  return (
    <div>
      <h2>Certificates</h2>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "20px" }}>
        {["all", "approved", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              fontWeight: filter === f ? "bold" : "normal",
              padding: "6px 12px",
              marginRight: "10px",
              border: filter === f ? "2px solid #007bff" : "1px solid gray",
              borderRadius: "4px",
              backgroundColor: filter === f ? "#e0f0ff" : "#fff",
              cursor: "pointer",
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredCertificates.length === 0 && <p>No certificates to show.</p>}

        {filteredCertificates.map((cert) => (
          <li
            key={cert.id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <strong>{cert.student_name}</strong> - {cert.course_name}
            <br />
            Issued: {new Date(cert.issue_date).toLocaleDateString()}
            <br />
            Approved: {cert.is_approved ? "Yes" : "No"}
            <br />
            {cert.certificate_file && (
              <img
                src={`http://127.0.0.1:8000/media/${cert.certificate_file}`}
                alt="Certificate"
                style={{ width: "400px", marginTop: "10px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certificates;
