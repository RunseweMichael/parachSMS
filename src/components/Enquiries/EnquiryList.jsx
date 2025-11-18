import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiMail } from "react-icons/fi";
import api from "../../api";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch enquiries and courses
  const fetchData = async () => {
    try {
      const [enqRes, courseRes] = await Promise.all([
        api.get("enquiries/enquiries/"),
        api.get("courses/courses/"),
      ]);
      setEnquiries(enqRes.data);
      setFiltered(enqRes.data);
      setCourses(courseRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await api.delete(`enquiries/enquiries/${id}/`);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      setFiltered((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete enquiry.");
    }
  };

  const toggleStatus = async (enquiry) => {
    const newStatus = enquiry.status === "NEW" ? "FOLLOWED_UP" : "NEW";
    try {
      await api.patch(`enquiries/enquiries/${enquiry.id}/`, { status: newStatus });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiry.id ? { ...e, status: newStatus } : e))
      );
      setFiltered((prev) =>
        prev.map((e) => (e.id === enquiry.id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  const sendEmail = async (enquiry) => {
    if (!window.confirm(`Send predefined email to ${enquiry.name}?`)) return;
    try {
      await api.post(`enquiries/enquiries/${enquiry.id}/send_email/`);
      alert(`Email sent to ${enquiry.email}`);
    } catch (err) {
      console.error(err);
      alert("Failed to send email.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filteredData = enquiries.filter(
      (e) =>
        e.name.toLowerCase().includes(value.toLowerCase()) ||
        e.email.toLowerCase().includes(value.toLowerCase()) ||
        e.phone.includes(value)
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  };

  const getCourseName = (id) => {
    const course = courses.find((c) => c.id === id);
    return course ? course.course_name : "—";
  };

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading)
    return <p className="text-center mt-16 text-gray-600">Loading enquiries...</p>;
  if (error)
    return <p className="text-center mt-16 text-red-600 font-semibold">{error}</p>;

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-2">
        📩 Enquiries Dashboard
      </h2>

      {/* Top bar */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={handleSearch}
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link
          to="/admin/enquiries/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2 justify-center"
        >
          ➕ Add Enquiry
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-3 py-2 text-left text-sm">#</th>
              <th className="px-3 py-2 text-left text-sm">Name</th>
              <th className="px-3 py-2 text-left text-sm">Email</th>
              <th className="px-3 py-2 text-left text-sm">Phone</th>
              <th className="px-3 py-2 text-left text-sm">Gender</th>
              <th className="px-3 py-2 text-left text-sm">Course</th>
              <th className="px-3 py-2 text-center text-sm">Consent</th>
              <th className="px-3 py-2 text-center text-sm">Status</th>
              <th className="px-3 py-2 text-left text-sm">Created</th>
              <th className="px-3 py-2 text-center text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No enquiries found.
                </td>
              </tr>
            )}

            {currentItems.map((enquiry, index) => (
              <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td className="px-3 py-2">{enquiry.name}</td>
                <td className="px-3 py-2">{enquiry.email}</td>
                <td className="px-3 py-2">{enquiry.phone}</td>
                <td className="px-3 py-2">{enquiry.gender}</td>
                <td className="px-3 py-2">{getCourseName(enquiry.course)}</td>
                <td className="px-3 py-2 text-center">{enquiry.consent ? "✅" : "❌"}</td>
                <td
                  className={`px-3 py-1 text-white font-semibold rounded-full text-center cursor-pointer ${
                    enquiry.status === "FOLLOWED_UP" ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => toggleStatus(enquiry)}
                >
                  {enquiry.status === "FOLLOWED_UP" ? "FOLLOWED UP" : "NEW"}
                </td>
                <td className="px-3 py-2">{new Date(enquiry.created_at).toLocaleDateString()}</td>
                <td className="px-3 py-2 flex justify-center gap-2">
                  <Link
                    to={`/enquiries/edit/${enquiry.id}`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-full"
                  >
                    <FiEdit />
                  </Link>
                  <button
                    onClick={() => deleteEnquiry(enquiry.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                  >
                    <FiTrash2 />
                  </button>
                  <button
                    onClick={() => sendEmail(enquiry)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                  >
                    <FiMail />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
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

export default EnquiryList;
