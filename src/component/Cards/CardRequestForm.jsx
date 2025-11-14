import React, { useState } from "react";

export default function CardRequestForm() {
  const [formData, setFormData] = useState({
    course: "",
    completionDate: "",
    fullName: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Certificate request submitted! We'll review it within 24 hours.");
    // Reset form
    setFormData({ course: "", completionDate: "", fullName: "", email: "" });
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg font-bold text-gray-800">Request Certificate</h6>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md">
            <i className="fas fa-file-certificate text-sm"></i>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Course Completed</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select Course</option>
                <option>Full-Stack Web Development</option>
                <option>Data Science & AI</option>
                <option>UI/UX Design Pro</option>
                <option>DevOps & Cloud Engineering</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Completion Date</label>
              <input
                type="date"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              className="px-6 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}