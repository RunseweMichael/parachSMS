import React from "react";

export default function CardCertificateTable() {
  const requests = [
    {
      id: "CERT-2025-001",
      course: "Full-Stack Web Dev",
      requested: "Nov 10, 2025",
      status: "approved",
      action: "Download",
    },
    {
      id: "CERT-2025-002",
      course: "Data Science & AI",
      requested: "Nov 8, 2025",
      status: "pending",
      action: "Pending",
    },
    {
      id: "CERT-2025-003",
      course: "UI/UX Design Pro",
      requested: "Nov 5, 2025",
      status: "rejected",
      action: "Resubmit",
    },
    {
      id: "CERT-2025-004",
      course: "DevOps & Cloud",
      requested: "Nov 3, 2025",
      status: "approved",
      action: "Download",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg font-bold text-gray-800">Certificate Requests</h6>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-md">
            <i className="fas fa-scroll text-sm"></i>
          </div>
        </div>
        <p className="text-sm text-gray-600">Track your certificate status</p>
      </div>

      <div className="px-6 pb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b border-gray-200">
              <th className="pb-3 font-medium">Certificate ID</th>
              <th className="pb-3 font-medium">Course</th>
              <th className="pb-3 font-medium">Requested</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-white/50 transition">
                <td className="py-4 font-medium text-gray-800">{req.id}</td>
                <td className="py-4 text-gray-700">{req.course}</td>
                <td className="py-4 text-gray-600">{req.requested}</td>
                <td className="py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      req.status
                    )}`}
                  >
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 text-center">
                  {req.action === "Download" ? (
                    <button className="text-blue-600 hover:text-blue-800 font-medium transition">
                      Download
                    </button>
                  ) : req.action === "Pending" ? (
                    <span className="text-amber-600 text-xs font-medium">Waiting...</span>
                  ) : (
                    <button className="text-red-600 hover:text-red-800 font-medium transition">
                      Resubmit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 pb-5">
        <button className="w-full py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
          Load More Requests
        </button>
      </div>
    </div>
  );
}