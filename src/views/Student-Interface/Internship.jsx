import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../../api";
import { Calendar, Clock, Mail, User, ArrowRight, Sparkles } from "lucide-react";

export default function InternshipRequestPage() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    duration: "3 months",
    startDate: "",
  });

  // Pre-fill user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("students/me/");
        setFormData(prev => ({
          ...prev,
          name: prev.name || res.data.name || "",
          email: prev.email || res.data.email || "",
        }));
      } catch (err) { /* silent */ }
    };
    loadUser();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.startDate) newErrors.startDate = "Select your preferred start date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      let name = formData.name.trim();
      let email = formData.email.trim();

      if (!name || !email) {
        const user = await api.get("students/me/");
        name = name || user.data.name;
        email = email || user.data.email;
      }

      await api.post("internship-requests/", {
        student_name: name,
        student_email: email,
        duration: formData.duration,
        preferred_start_date: formData.startDate,
      });

      toast.success("Application submitted successfully! We'll be in touch soon.", {
        icon: "Success",
        style: { borderRadius: "12px", background: "#1e40af", color: "#fff" },
      });

    } catch (err) {
      const msg = err.response?.data?.message || "Failed to submit. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Beautiful Blue Gradient Background */}
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        
        {/* Animated Floating Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-4xl">
            {/* Hero Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-full px-5 py-2 mb-6 border border-white/30">
                <Sparkles className="w-5 h-5 text-cyan-300" />
                <span className="text-white font-semibold">Summer & Year-Round Internships</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Start Your Career With Us
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Work on real projects, learn from top engineers, and grow faster than you ever thought possible.
              </p>
            </div>

            {/* Glassmorphism Form Card */}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <User className="w-5 h-5 text-blue-200" />
                    <label className="text-white font-medium">Full Name</label>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Rivera"
                    className={`w-full px-6 py-4 bg-white/20 border backdrop-blur-lg rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all ${
                      errors.name ? "border-red-400" : "border-white/30"
                    }`}
                  />
                  {errors.name && <p className="mt-2 text-red-300 text-sm">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-blue-200" />
                    <label className="text-white font-medium">Email Address</label>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@university.edu"
                    className={`w-full px-6 py-4 bg-white/20 border backdrop-blur-lg rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all ${
                      errors.email ? "border-red-400" : "border-white/30"
                    }`}
                  />
                  {errors.email && <p className="mt-2 text-red-300 text-sm">{errors.email}</p>}
                </div>

                {/* Duration */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-blue-200" />
                    <label className="text-white font-medium">Internship Duration</label>
                  </div>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/20 border border-white/30 backdrop-blur-lg rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-blue-400/50"
                  >
                    <option value="3 months" className="bg-gray-900">3 Months</option>
                    <option value="6 months" className="bg-gray-900">6 Months</option>
                    <option value="1 year" className="bg-gray-900">1 Year</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-blue-200" />
                    <label className="text-white font-medium">Preferred Start Date</label>
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-white/20 border backdrop-blur-lg rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all ${
                      errors.startDate ? "border-red-400" : "border-white/30"
                    }`}
                  />
                  {errors.startDate && <p className="mt-2 text-red-300 text-sm">{errors.startDate}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-10 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-5 rounded-2xl shadow-xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                >
                  {loading ? (
                    "Submitting Application..."
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-blue-200 text-sm mt-8 font-medium">
                Most applicants hear back within 48 hours • Full-time & remote roles available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 20s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </>
  );
}