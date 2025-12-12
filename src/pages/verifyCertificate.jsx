import React, { useState } from "react";
import api from "../api";
import logoImg from "../assets/parach.png";

export default function VerifyCertificate() {
  const [certNumber, setCertNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    if (!certNumber.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await api.get(
        `/certificates/verify-certificate/?certificate_number=${certNumber}`
      );
      setResult(res.data);
    } catch (err) {
      setResult({ error: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-gray-200 p-6">

      {/* Floating + Glassmorphism Card */}
      <div
        className="
          max-w-md w-full p-8 rounded-2xl shadow-2xl border border-white/30
          bg-white/20 backdrop-blur-xl
          animate-floating
        "
      >
        {/* Logo + Company Name */}
        <div className="text-center mb-6">
          <img
            src={logoImg}
            alt="Parach ICT Academy"
            className="mx-auto mb-3"
            style={{ width: "50px", height: "50px" }}
          />
          <h1 className="text-2xl font-bold text-gray-800 drop-shadow-md">
            Parach ICT Academy
          </h1>
          <p className="text-gray-700 text-sm">
            Excellence in Digital Skills & Professional Training
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center text-gray-900">
          Certificate Verification Portal
        </h2>

        <p className="text-gray-700 text-sm text-center mb-4">
          Enter the certificate number below to confirm its authenticity.
        </p>

        <input
          type="text"
          placeholder="Enter Certificate Number"
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
          className="
            w-full p-3 mb-4 rounded-lg
            bg-white/50 border border-gray-300
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            outline-none
          "
        />

        <button
          onClick={verify}
          className="
            w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg 
            transition transform active:scale-95 shadow-lg
          "
        >
          {loading ? "Checking..." : "Verify"}
        </button>

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-white/60 backdrop-blur-md">
            {result.valid ? (
              <>
                <p className="text-green-700 font-semibold mb-2">
                  ✔ Certificate Verified Successfully
                </p>

                <p><strong>Student:</strong> {result.name}</p>
                <p><strong>Course:</strong> {result.course || "N/A"}</p>
                <p><strong>Certificate Number:</strong> {result.certificate_number}</p>
                <p><strong>Issued On:</strong> {result.issued_on}</p>

                <p className="mt-4 text-xs text-gray-800 italic">
                  This certificate is authentic and was officially issued 
                  by Parach ICT Academy.
                </p>
              </>
            ) : result.error ? (
              <p className="text-red-700">{result.error}</p>
            ) : (
              <p className="text-red-700 font-semibold">
                ✖ Invalid certificate number.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Floating Animation Keyframes */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }

          .animate-floating {
            animation: floating 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
