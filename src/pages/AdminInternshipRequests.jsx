import React, { useEffect, useState, useMemo } from "react";
import {
  Download,
  CheckCircle,
  XCircle,
  RefreshCcw,
  Clock,
  User,
  Mail,
  Calendar,
  FileText,
} from "lucide-react";

const AdminInternshipRequests = ({ apiBaseUrl = "https://studentmgt.whalesharkengineering.com.ng/api/", authToken }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // ⭐ PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Updated: TokenAuthentication format for DRF
  const buildFetchOptions = (method = "GET", body = null) => {
    const token = authToken || localStorage.getItem("token");

    const headers = { "Content-Type": "application/json" };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const opts = { method, headers, credentials: "include" };
    if (body) opts.body = JSON.stringify(body);
    return opts;
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/internship-requests/`, buildFetchOptions("GET"));
      if (!res.ok) throw new Error("Failed to fetch internship requests");
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    if (!window.confirm("Approve this internship request and send the letter?")) return;

    setApprovingId(id);
    try {
      const res = await fetch(
        `${apiBaseUrl}/internship-requests/${id}/approve/`,
        buildFetchOptions("POST")
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Approval failed");
      }

      await fetchRequests();
      alert("Request approved successfully.");
    } catch (err) {
      alert(err.message);
    } finally {
      setApprovingId(null);
    }
  };

  // FILTER + SEARCH
  const filtered = useMemo(() => {
    let list = [...requests];

    if (filter === "approved") list = list.filter((r) => r.is_approved);
    if (filter === "pending") list = list.filter((r) => !r.is_approved);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          (r.student_name && r.student_name.toLowerCase().includes(q)) ||
          (r.student_email && r.student_email.toLowerCase().includes(q))
      );
    }

    return list;
  }, [requests, query, filter]);

  // ⭐ RESET PAGE WHEN FILTERS CHANGE
  useEffect(() => {
    setCurrentPage(1);
  }, [query, filter]);

  // ⭐ PAGINATION SLICE
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-lg">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText size={32} /> Internship Requests
          </h1>
          <p className="text-sm text-blue-100 mt-1">Manage all submitted internship applications</p>
        </div>

        <button
          onClick={fetchRequests}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all"
        >
          <RefreshCcw size={18} />
          Refresh
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-5 rounded-2xl shadow-md border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-blue-300"
            />
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-300"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>

          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="mr-2" size={18} />
            <span>{filtered.length} record(s) found</span>
          </div>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 bg-red-100 text-red-800 p-4 border border-red-300 rounded-xl shadow-sm">
          {error}
        </div>
      )}

      {/* LIST */}
      {loading ? (
        <div className="text-center text-gray-600 py-10 animate-pulse">Loading…</div>
      ) : currentItems.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No internship requests found.</div>
      ) : (
        <div className="space-y-5">
          {currentItems.map((r) => {
            const pdfUrl =
              r.internship_pdf?.startsWith("http") || r.internship_pdf?.startsWith("/")
                ? r.internship_pdf
                : r.internship_pdf
                ? `${apiBaseUrl.replace(/\/api\/?$/, "")}${r.internship_pdf}`
                : null;

            return (
              <div
                key={r.id}
                className="bg-white p-6 rounded-2xl border shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* LEFT */}
                  <div className="flex gap-5">
                    <div className="bg-blue-100 text-blue-700 p-3 rounded-full self-start shadow">
                      <User />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{r.student_name}</h2>
                      <p className="text-gray-600">{r.student_email}</p>

                      <div className="mt-4 text-sm space-y-1">
                        <p className="flex items-center gap-2">
                          <Clock size={16} className="text-blue-500" />
                          Duration: <span className="font-medium">{r.duration}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Calendar size={16} className="text-blue-500" />
                          Start Date: <span className="font-medium">{r.preferred_start_date}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Submitted: {new Date(r.submitted_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3 md:self-center">
                    {r.is_approved ? (
                      <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl shadow-sm">
                        <CheckCircle size={18} />
                        Approved
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl shadow-sm">
                        <XCircle size={18} />
                        Pending
                      </div>
                    )}

                    {!r.is_approved && (
                      <button
                        onClick={() => approveRequest(r.id)}
                        disabled={approvingId === r.id}
                        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 shadow-md transition-all disabled:opacity-50"
                      >
                        {approvingId === r.id ? "Approving…" : "Approve"}
                      </button>
                    )}

                    {pdfUrl && (
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 shadow-md transition-all"
                      >
                        <Download size={16} />
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ⭐ PAGINATION UI */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          <button
            className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded hover:bg-gray-200 ${
                currentPage === i + 1 ? "bg-blue-600 text-white border-blue-600" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminInternshipRequests;
