import React from "react";
import CardRequestForm from "../../component/Cards/CardRequestForm.jsx";
import CardCertificateTable from "../../component/Cards/CardCertificateTable.jsx";

export default function CertificateDashboard() {
  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 px-4 md:px-10 mx-auto w-full max-w-7xl py-8">
          {/* Row 1: Request Form */}
          <div className="flex flex-wrap -mx-4 mb-8">
            <div className="w-full px-4">
              <CardRequestForm />
            </div>
          </div>

          {/* Row 2: Certificate Requests Table */}
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <CardCertificateTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}