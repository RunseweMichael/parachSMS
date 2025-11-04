// src/components/Certificates.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api"; // assuming api.js exports an axios instance with baseURL

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // make sure token is stored after login
        const res = await axios.get("certificates/certificates/", {
          headers: {
            Authorization: `Token ${token}`,
          },
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

  return (
    <div>
      <h2>Certificates</h2>
      <ul>
        {certificates.map((cert) => (
          <li key={cert.id} style={{ marginBottom: "20px" }}>
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
