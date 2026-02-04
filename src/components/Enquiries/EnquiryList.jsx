import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiMail, FiSearch, FiFilter, FiPlus, FiCheckCircle, FiClock, FiInfo } from "react-icons/fi";
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
  const [showFilters, setShowFilters] = useState(false);
  const [registrationFilter, setRegistrationFilter] = useState("All");


  const CENTER_OPTIONS = ["Orogun", "Samonda", "Online"];
  const STATUS_OPTIONS = ["NEW", "FOLLOWED_UP"];
  const REGISTRATION_OPTIONS = ["All", "Registered", "Not Registered"];


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

    if (registrationFilter !== "All") {
      temp = temp.filter(e =>
        registrationFilter === "Registered"
          ? e.has_registered === true
          : e.has_registered === false
        );
      }


    setFiltered(temp);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [search, centerFilter, statusFilter, courseFilter, registrationFilter, enquiries]);


  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // Stats
  const newCount = enquiries.filter(e => e.status === "NEW").length;
  const followedUpCount = enquiries.filter(e => e.status === "FOLLOWED_UP").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-md">
          <p className="text-red-800 font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center gap-3">
                <span className="text-4xl">📩</span>
                Enquiries Dashboard
              </h1>
              <p className="text-slate-600 mt-2">Manage and track all student enquiries</p>
            </div>
            <Link
              to="/admin/enquiries/add"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FiPlus className="text-xl" />
              Add New Enquiry
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Total Enquiries</p>
                  <p className="text-3xl font-bold text-blue-900 mt-1">{enquiries.length}</p>
                </div>
                <div className="text-blue-500 text-3xl">📊</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-700 font-medium">New Enquiries</p>
                  <p className="text-3xl font-bold text-amber-900 mt-1">{newCount}</p>
                </div>
                <FiClock className="text-amber-500 text-3xl" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">Followed Up</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">{followedUpCount}</p>
                </div>
                <FiCheckCircle className="text-green-500 text-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <FiFilter className="text-blue-600" />
              Filters & Search
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden text-blue-600 font-medium"
            >
              {showFilters ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email or phone..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Center Filter */}
              <select
                value={centerFilter}
                onChange={e => setCenterFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="All">All Centers</option>
                {CENTER_OPTIONS.map(center => (
                  <option key={center} value={center}>{center}</option>
                ))}
              </select>

              <select
                value={registrationFilter}
                onChange={e => setRegistrationFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
              >
                {REGISTRATION_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>


              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="All">All Statuses</option>
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status.replace('_', ' ')}</option>
                ))}
              </select>

              {/* Course Filter */}
              <select
                value={courseFilter}
                onChange={e => setCourseFilter(e.target.value === "All" ? "All" : Number(e.target.value))}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer lg:col-span-2"
              >
                <option value="All">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.course_name}</option>
                ))}
              </select>
            </div>

            {/* Active Filters Display */}
            {(search || centerFilter !== "All" || statusFilter !== "All" || courseFilter !== "All") && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-slate-600">Active filters:</span>
                {search && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Search: "{search}"
                  </span>
                )}
                {centerFilter !== "All" && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Center: {centerFilter}
                  </span>
                )}
                {statusFilter !== "All" && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Status: {statusFilter.replace('_', ' ')}
                  </span>
                )}
                {courseFilter !== "All" && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Course: {getCourseName(courseFilter)}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-gradient-to-r from-slate-800 to-slate-900">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">#</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Course</th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Center</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-slate-500 text-lg font-medium">No enquiries found</p>
                        <p className="text-slate-400 text-sm mt-1">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                )}

                {currentItems.map((enquiry, index) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-slate-900">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">{enquiry.name}</span>
                        {enquiry.has_registered && (
                          <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          Registered
                          </span>
                )}

                        <span className="text-xs text-slate-500">{enquiry.gender}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm text-slate-700">{enquiry.email}</span>
                        <span className="text-xs text-slate-500">{enquiry.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getCourseName(enquiry.course)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-700">{enquiry.center || "—"}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => toggleStatus(enquiry)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:shadow-md ${
                          enquiry.status === "FOLLOWED_UP" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                        title="Click to toggle status"
                      >
                        {enquiry.status === "FOLLOWED_UP" ? (
                          <>
                            <FiCheckCircle className="text-sm" />
                            Followed Up
                          </>
                        ) : (
                          <>
                            <FiClock className="text-sm" />
                            New
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/admin/enquiries/edit/${enquiry.id}`}
                          className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg transition-all hover:shadow-md"
                          title="Edit enquiry"
                        >
                          <FiEdit className="text-base" />
                        </Link>
                        <button
                          onClick={() => deleteEnquiry(enquiry.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all hover:shadow-md"
                          title="Delete enquiry"
                        >
                          <FiTrash2 className="text-base" />
                        </button>
                        <div className="relative group">
  <button
    onClick={() => !enquiry.has_registered && sendEmail(enquiry)}
    disabled={enquiry.has_registered}
    className={`p-2 rounded-lg transition-all ${
      enquiry.has_registered
        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md"
    }`}
  >
    <FiMail className="text-base" />
  </button>

  {enquiry.has_registered && (
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="flex items-center gap-1 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
        <FiInfo className="text-sm" />
        Already registered
      </div>
    </div>
  )}
</div>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing <span className="font-semibold">{indexOfFirst + 1}</span> to{" "}
                  <span className="font-semibold">{Math.min(indexOfLast, filtered.length)}</span> of{" "}
                  <span className="font-semibold">{filtered.length}</span> results
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-slate-700"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  <div className="hidden md:flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          currentPage === i + 1 
                            ? "bg-blue-600 text-white shadow-md" 
                            : "border border-slate-300 hover:bg-white text-slate-700"
                        }`}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-slate-700"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryList;