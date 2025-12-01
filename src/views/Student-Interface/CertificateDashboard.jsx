import React, { useState, useEffect } from "react";
import { Star, Eye, EyeOff, Lock, Download } from "lucide-react";
import api from "../../api";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCerts, setVisibleCerts] = useState({});
  const [hasLeftReview, setHasLeftReview] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch certificates on component mount
  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const res = await api.get("certificates/certificates/");
        // Deduplicate by id in case the backend returns duplicates
        const uniqueById = Array.from(
          new Map(res.data.map((c) => [c.id, c])).values()
        );
        setCertificates(uniqueById);
        setError("");
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
        setError("Failed to load certificates. Please try again.");
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    duration: "3 months",
    startDate: "",
  });

  const toggleCertificateView = (id) => {
    setVisibleCerts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLeaveReview = () => {
    window.open(
      "https://g.page/r/CaN0Psi7wexOEBE/review",
      "_blank"
    );
    setHasLeftReview(true);
  };

  const handleDownloadCertificate = async (url, fileName) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

 


  // Custom Tailwind Button
  const Button = ({ children, className = "", ...rest }) => (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition ${className}`}
      {...rest}
    >
      {children}
    </button>
  );

  return (
    <div className="relative flex flex-col bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30">
      <div className="px-6 py-6">
        <h6 className="text-xl font-bold text-gray-800 mb-4">My Certificates</h6>

 

        {/* Review Banner */}
        {!hasLeftReview && (
          <div className="mb-6 p-5 bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-300 rounded-xl text-center">
            <p className="text-sm font-semibold text-amber-900 mb-3">
              Help us grow! Leave a{" "}
              <Star className="inline text-yellow-500" size={16} /> 5-star review
            </p>
            <button
              onClick={handleLeaveReview}
              className="px-5 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700"
            >
              Leave Review Now
            </button>
          </div>
        )}

        {/* Certificates */}
        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading certificates...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-8">{error}</p>
        ) : certificates.length > 0 ? (
          certificates
            .filter((cert) => {
              // Only show approved certificates to students
              const approved =
                cert.is_approved === true ||
                cert.is_approved === "true" ||
                cert.is_approved === 1;
              return approved;
            })
            .map((cert) => {
              const imageUrl = cert.certificate_file?.startsWith("http")
                ? cert.certificate_file
                : `http://127.0.0.1:8000/media/${cert.certificate_file}`;

              return (
                <div
                  key={cert.id}
                  className="mb-5 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md"
                >
                  {!hasLeftReview ? (
                    <div className="text-center py-6 text-gray-500">
                      <Lock className="mx-auto mb-2" size={32} />
                      <p>Certificate locked. Please leave a review to unlock.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2 justify-center mb-3">
                        <button
                          onClick={() => toggleCertificateView(cert.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700"
                        >
                          {visibleCerts[cert.id] ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                          {visibleCerts[cert.id] ? "Hide" : "View"}
                        </button>

                        <button
                          onClick={() =>
                            handleDownloadCertificate(
                              imageUrl,
                              `${cert.course_name || "certificate"}.pdf`
                            )
                          }
                          className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700"
                        >
                          <Download size={14} /> Download
                        </button>
                      </div>

                      {/* Certificate Preview */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          visibleCerts[cert.id]
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <img
                          src={imageUrl}
                          alt="Certificate"
                          className="w-full rounded-lg shadow-md border mt-2"
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })
        ) : (
          <p className="text-center text-gray-500 py-8">
            No certificates yet.
          </p>
        )}
      </div>

      {/* ---------------------- */}
      {/* CUSTOM TAILWIND MODAL */}
      {/* ---------------------- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-11/12 max-w-md p-6 rounded-xl shadow-xl animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Request Internship</h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border rounded-lg p-2"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border rounded-lg p-2"
              />

              <select
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="border rounded-lg p-2"
              >
                <option>3 months</option>
                <option>6 months</option>
                <option>9 months</option>
                <option>1 year</option>
              </select>

              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="border rounded-lg p-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                className="bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>

              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSubmitRequest}
              >
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
