import React, { useState, useEffect } from "react";
import { Star, Eye, EyeOff, Lock, Download, Award, TrendingUp } from "lucide-react";
import api from "../../api";
import { useCourseProgress } from "../../hooks/CourseContext";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCerts, setVisibleCerts] = useState({});
  const [hasLeftReview, setHasLeftReview] = useState(false);

  // Get completion status from context
  const { 
    courseCompleted, 
    completionPercentage, 
    completedWeeks, 
    totalWeeks 
  } = useCourseProgress();

  // Fetch certificates on component mount
  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const res = await api.get("certificates/certificates/");
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

  // Check review status from localStorage
  useEffect(() => {
    const reviewStatus = localStorage.getItem("hasLeftReview");
    if (reviewStatus === "true") {
      setHasLeftReview(true);
    }
  }, []);

  const toggleCertificateView = (id) => {
    setVisibleCerts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLeaveReview = () => {
    window.open("https://g.page/r/CaN0Psi7wexOEBE/review", "_blank");
    localStorage.setItem("hasLeftReview", "true");
    setHasLeftReview(true);
  };

  const handleDownloadCertificate = async (url, baseName) => {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      const blob = await response.blob();
      const contentType = response.headers.get('content-type') || blob.type;
      
      let extension = 'pdf';
      if (contentType.includes('image/jpeg') || contentType.includes('image/jpg')) {
        extension = 'jpg';
      } else if (contentType.includes('image/png')) {
        extension = 'png';
      } else if (contentType.includes('image/webp')) {
        extension = 'webp';
      } else if (contentType.includes('application/pdf')) {
        extension = 'pdf';
      }

      const cleanBaseName = baseName.replace(/\.(pdf|jpg|jpeg|png|webp)$/i, '');
      const fileName = `${cleanBaseName}.${extension}`;

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      
    } catch (error) {
      console.error("Certificate download failed:", error);
      alert("Failed to download certificate. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30">
      <div className="px-6 py-6">
        <h6 className="text-xl font-bold text-gray-800 mb-4">My Certificates</h6>

        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading certificates...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-8">{error}</p>
        ) : (
          <>
            {/* LOCK 1: Course Not Completed */}
            {!courseCompleted ? (
              <div className="text-center py-12 px-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                <Lock className="mx-auto mb-4 text-indigo-500" size={56} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Complete Your Course First
                </h3>
                <p className="text-gray-600 mb-6">
                  Finish all weekly tasks to unlock your certificate
                </p>
                
                {/* Progress Display */}
                <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="text-indigo-600" size={20} />
                      <span className="font-semibold text-gray-700">Your Progress</span>
                    </div>
                    <span className="text-3xl font-bold text-indigo-600">
                      {completionPercentage}%
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Weeks Completed</span>
                      <span className="font-bold">
                        {completedWeeks.size}/{totalWeeks}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-4">
                    {totalWeeks - completedWeeks.size} {totalWeeks - completedWeeks.size === 1 ? 'week' : 'weeks'} remaining
                  </p>
                </div>

                <button
                  onClick={() => window.location.href = '/student/tasks'}
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Continue Learning
                </button>
              </div>
            ) : !hasLeftReview ? (
              /* LOCK 2: Course Complete but No Review */
              <div className="mb-6 p-6 bg-gradient-to-r from-amber-50 to-yellow-100 border-2 border-amber-300 rounded-xl text-center">
                <Award className="mx-auto mb-3 text-amber-600" size={48} />
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  🎉 Course Completed!
                </h3>
                <p className="text-sm font-semibold text-amber-900 mb-4">
                  One last step: Help us grow by leaving a{" "}
                  <Star className="inline text-yellow-500" size={16} /> 5-star review
                </p>
                <button
                  onClick={handleLeaveReview}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition"
                >
                  Leave Review & Unlock Certificate
                </button>
              </div>
            ) : certificates.length > 0 ? (
              /* UNLOCKED: Show Certificates */
              certificates
                .filter((cert) => {
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
                      className="mb-5 p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow-sm hover:shadow-md border-2 border-emerald-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="text-emerald-600" size={24} />
                        <h4 className="font-bold text-lg text-gray-800">
                          {cert.certificate_name || 'Certificate of Completion'}
                        </h4>
                      </div>

                      <div className="flex gap-2 justify-center mb-3">
                        <button
                          onClick={() => toggleCertificateView(cert.id)}
                          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                        >
                          {visibleCerts[cert.id] ? (
                            <><EyeOff size={16} /> Hide</>
                          ) : (
                            <><Eye size={16} /> View</>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            handleDownloadCertificate(
                              imageUrl,
                              cert.certificate_name || "certificate"
                            )
                          }
                          className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
                        >
                          <Download size={16} /> Download
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
                          className="w-full rounded-lg shadow-md border-2 border-emerald-300 mt-2"
                        />
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Award className="mx-auto mb-3 text-gray-300" size={48} />
                <p className="text-lg">No certificates available yet.</p>
                <p className="text-sm mt-2">Check back after admin approval.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Certificates;