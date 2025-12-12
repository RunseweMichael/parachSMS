import React, { useState } from "react";
import api from "../api";
import logoImg from "../assets/parach.png"

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
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      
      {/* Logo + Company Name */}
      <div className="text-center mb-6">
        <img
          src={logoImg} // <-- use local image
          alt="Parach ICT Academy"
          className="mx-auto mb-3"
          style={{ width: "100px", height: "50px" }} // adjust as needed
        />
        <h1 className="text-2xl font-bold">Parach ICT Academy</h1>
        <p className="text-gray-600 text-sm">
          Excellence in Digital Skills & Professional Training
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center">
        Certificate Verification Portal
      </h2>

      <p className="text-gray-600 text-sm text-center mb-4">
        Enter the certificate number below to confirm its authenticity.  
        This verification service is officially provided by Parach ICT Academy.
      </p>

      <input
        type="text"
        placeholder="Enter Certificate Number"
        value={certNumber}
        onChange={(e) => setCertNumber(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
      />

      <button
        onClick={verify}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
      >
        {loading ? "Checking..." : "Verify"}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          {result.valid ? (
            <>
              <p className="text-green-600 font-semibold mb-2">
                ✔ Certificate Verified Successfully
              </p>

              <p><strong>Student:</strong> {result.name}</p>
              <p><strong>Course:</strong> {result.course || "N/A"}</p>
              <p>
                <strong>Certificate Number:</strong> {result.certificate_number}
              </p>
              <p><strong>Issued On:</strong> {result.issued_on}</p>

              <p className="mt-4 text-xs text-gray-600 italic">
                This certificate has been confirmed as authentic and was 
                officially issued by Parach ICT Academy.
              </p>
            </>
          ) : result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <p className="text-red-600 font-semibold">
              ✖ Invalid certificate number. No matching record was found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
