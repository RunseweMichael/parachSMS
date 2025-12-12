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
  const [centerFilter, setCenterFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const CENTER_OPTIONS = ["Orogun", "Samonda", "Online"];
  const STATUS_OPTIONS = ["NEW", "FOLLOWED_UP"];

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
      setEnquiries(prev => prev.filter(e => e.id !== id));
      setFiltered(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete enquiry.");
    }
  };

  const toggleStatus = async (enquiry) => {
    const newStatus = enquiry.status === "NEW" ? "FOLLOWED_UP" : "NEW";
    try {
      await api.patch(`enquiries/enquiries/${enquiry.id}/`, { status: newStatus });
      setEnquiries(prev => prev.map(e => e.id === enquiry.id ? { ...e, status: newStatus } : e));
      setFiltered(prev => prev.map(e => e.id === enquiry.id ? { ...e, status: newStatus } : e));
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  const sendEmail = async (enquiry) => {
    if (!window.confirm(`Send follow-up email and SMS to ${enquiry.name}?`)) return;
    
    try {
      const response = await api.post(`enquiries/enquiries/${enquiry.id}/send_email/`);
      
      // Parse the response to show detailed status
      const { email, sms, status: responseStatus } = response.data;
      
      let message = [];
      
      if (email?.success) {
        message.push(`✅ Email sent to ${enquiry.email}`);
      } else if (email?.error) {
        message.push(`❌ Email failed: ${email.error}`);
      }
      
      if (sms?.success) {
        message.push(`✅ SMS sent to ${enquiry.phone}`);
      } else if (sms?.error) {
        message.push(`⚠️ SMS failed: ${sms.error}`);
      }
      
      alert(message.join('\n\n') || responseStatus);
    } catch (err) {
      console.error(err);
      
      // Handle different error responses
      if (err.response?.data) {
        const { email, sms } = err.response.data;
        let errorMsg = "Failed to send notifications:\n\n";
        
        if (email?.error) errorMsg += `Email: ${email.error}\n`;
        if (sms?.error) errorMsg += `SMS: ${sms.error}`;
        
        alert(errorMsg);
      } else {
        alert("Failed to send email and SMS.");
      }
    }
  };

  const getCourseName = (id) => {
    const course = courses.find(c => c.id === id);
    return course ? course.course_name : "—";
  };

  // ------------------ FILTER FUNCTION ------------------
  const applyFilters = () => {
    let temp = [...enquiries];

    if (search.trim()) {
      const s = search.toLowerCase();
      temp = temp.filter(e =>
        e.name.toLowerCase().includes(s) ||
        e.email.toLowerCase().includes(s) ||
        e.phone.includes(s)
      );
    }

    if (centerFilter !== "All") {
      temp = temp.filter(e => e.center === centerFilter);
    }

    if (statusFilter !== "All") {
      temp = temp.filter(e => e.status === statusFilter);
    }

    if (courseFilter !== "All") {
      temp = temp.filter(e => e.course === courseFilter);
    }

    setFiltered(temp);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [search, centerFilter, statusFilter, courseFilter, enquiries]);

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
    <div className="max-w-full mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-2">
        📩 Enquiries Dashboard
      </h2>

      {/* Top bar: Search + Filters + Add */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={centerFilter}
          onChange={e => setCenterFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Centers</option>
          {CENTER_OPTIONS.map(center => (
            <option key={center} value={center}>{center}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Statuses</option>
          {STATUS_OPTIONS.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          value={courseFilter}
          onChange={e => setCourseFilter(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Courses</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.course_name}</option>
          ))}
        </select>

        <Link
          to="/admin/enquiries/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2 justify-center"
        >
          ➕ Add Enquiry
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-3 py-2 text-left text-sm">#</th>
              <th className="px-3 py-2 text-left text-sm">Name</th>
              <th className="px-3 py-2 text-left text-sm">Email</th>
              <th className="px-3 py-2 text-left text-sm">Phone</th>
              <th className="px-3 py-2 text-left text-sm">Gender</th>
              <th className="px-3 py-2 text-left text-sm">Course</th>
              <th className="px-3 py-2 text-left text-sm">Center</th>
              <th className="px-3 py-2 text-center text-sm">Consent</th>
              <th className="px-3 py-2 text-center text-sm">Status</th>
              <th className="px-3 py-2 text-left text-sm">Created</th>
              <th className="px-3 py-2 text-center text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="11" className="text-center py-4 text-gray-500">
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
                <td className="px-3 py-2">{enquiry.center || "—"}</td>
                <td className="px-3 py-2 text-center">{enquiry.consent ? "✅" : "❌"}</td>
                <td
                  className={`px-3 py-1 text-sm font-semibold rounded-full text-center cursor-pointer transition-colors ${
                    enquiry.status === "FOLLOWED_UP" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}
                  onClick={() => toggleStatus(enquiry)}
                  title="Click to toggle status"
                >
                  {enquiry.status === "FOLLOWED_UP" ? "FOLLOWED UP" : "NEW"}
                </td>
                <td className="px-3 py-2">{new Date(enquiry.created_at).toLocaleDateString()}</td>
                <td className="px-3 py-2 flex justify-center gap-2">
                  <Link
                    to={`/admin/enquiries/edit/${enquiry.id}`}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-full"
                    title="Edit enquiry"
                  >
                    <FiEdit />
                  </Link>
                  <button
                    onClick={() => deleteEnquiry(enquiry.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                    title="Delete enquiry"
                  >
                    <FiTrash2 />
                  </button>
                  <button
                    onClick={() => sendEmail(enquiry)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                    title="Send email & SMS"
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
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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