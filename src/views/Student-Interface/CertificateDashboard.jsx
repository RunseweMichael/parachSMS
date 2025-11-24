import React, { useState } from "react";
import { Star, Eye, EyeOff, Lock, Download } from "lucide-react";

const Certificates = ({ user }) => {
  const [visibleCerts, setVisibleCerts] = useState({});
  const [hasLeftReview, setHasLeftReview] = useState(false);

  const toggleCertificateView = (id) => {
    setVisibleCerts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLeaveReview = () => {
    // Open review page
    window.open(
      "https://play.google.com/store/apps/details?id=com.yourapp",
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

  return (
    <div className="relative flex flex-col bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 min-w-0 break-words">
      <div className="px-6 py-6">
        <h6 className="text-xl font-bold text-gray-800 mb-4">My Certificates</h6>

        {/* Review Banner */}
        {!hasLeftReview && (
          <div className="mb-6 p-5 bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-300 rounded-xl text-center animate-fade-in">
            <p className="text-sm font-semibold text-amber-900 mb-3">
              Help us grow! Leave a{" "}
              <Star className="inline text-yellow-500" size={16} /> 5-star review
            </p>
            <button
              onClick={handleLeaveReview}
              className="px-5 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition"
            >
              Leave Review Now
            </button>
          </div>
        )}

        {/* Certificates List */}
        {user?.certificates?.length > 0 ? (
          user.certificates.map((cert) => {
            const imageUrl = cert.certificate_file?.startsWith("http")
              ? cert.certificate_file
              : `http://127.0.0.1:8000${cert.certificate_file}`;

            return (
              <div
                key={cert.id}
                className="mb-5 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
              >
                {/* Locked State */}
                {!hasLeftReview ? (
                  <div className="text-center py-6 text-gray-500">
                    <Lock className="mx-auto mb-2" size={32} />
                    <p>Certificate locked. Please leave a review to unlock.</p>
                  </div>
                ) : (
                  <>
                    {/* Buttons */}
                    <div className="flex gap-2 justify-center mb-3">
                      <button
                        onClick={() => toggleCertificateView(cert.id)}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition"
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
                            `${user?.name || "certificate"}.pdf`
                          )
                        }
                        className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition"
                      >
                        <Download size={14} /> Download
                      </button>
                    </div>

                    {/* Certificate Image */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        visibleCerts[cert.id] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
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
          <p className="text-center text-gray-500 py-8">No certificates yet.</p>
        )}
      </div>
    </div>
  );
};

export default Certificates;
