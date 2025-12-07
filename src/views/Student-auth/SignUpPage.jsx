import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";
import { toast, Toaster } from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  CheckSquare,
  AlertCircle,
} from "lucide-react";
import FloatingBackground from "../../component/FloatingBackground";
import logoImg from "../../assets/1000561121.jpg";

// Fully-fluid animated SignUpPage
export default function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "male",
    course: "",
    birth_date: "",
    phone_number: "",
    // address: "",
    consent: false,
    center: "", // ✅ added
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const inputOrderRef = useRef(0);

  useEffect(() => {
    api
      .get("/courses/courses/")
      .then((res) => {
        setCourses(res.data || []);
        setCourseLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load courses:", err);
        toast.error("Could not load courses.");
        setCourseLoading(false);
      });
  }, []);

  // Validation
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name required";
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = "Valid email required";
    if (!formData.password || formData.password.length < 6) e.password = "Password (min 6)";
    if (!formData.course) e.course = "Please choose a course";
    if (!formData.center) e.center = "Center required"; // ✅ added
    if (!formData.phone_number) e.phone_number = "Phone required";
    // if (!formData.address) e.address = "Address required";
    if (!formData.birth_date) e.birth_date = "Birth date required";
    if (!formData.consent) e.consent = "Consent required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    inputOrderRef.current += 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/students/users/", formData);

      const { token, user_id, user } = res.data;
      if (token) localStorage.setItem("token", token);
      if (user_id) localStorage.setItem("user_id", user_id);
      if (user) localStorage.setItem("user", JSON.stringify(user));

      toast.success("Registration successful!");
      setTimeout(() => navigate("/verify-otp"), 1200);
    } catch (err) {
      const data = err.response?.data;
      if (!err.response) toast.error("Network error — is backend running?");
      else if (data) {
        const msg = Object.entries(data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
          .join(" • ");
        toast.error(msg || "Registration failed.");
      } else toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Animation
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06 },
    },
  };

  const headerVariant = {
    hidden: { opacity: 0, y: -18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const fieldVariant = (i = 0) => ({
    hidden: { opacity: 0, y: 14, scale: 0.995 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, delay: i * 0.03 } },
  });

  const shake = {
    x: [0, -8, 8, -6, 6, -2, 2, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-5">
        <div className="w-full z-10 max-w-2xl relative">

          <FloatingBackground />

          <motion.div
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden relative z-10"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <form onSubmit={handleSubmit} className="p-6 md:p-8 lg:p-10">

              {/* Header */}
              <motion.div variants={headerVariant} className="text-center mb-6">
                <div className="inline-flex items-center justify-center font-bold mb-4">
                  <img className="w-20 h-18 rounded-full  shadow-lg" src={logoImg} alt="" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Join Parach ICT Academy</h1>
                <p className="text-gray-600 mt-2">Start your ICT journey today!</p>
              </motion.div>

              <motion.div className="grid md:grid-cols-2 gap-5" layout>

                {/* Name */}
                <motion.div variants={fieldVariant(0)} animate={errors.name ? shake : undefined} className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border transition ${
                      errors.name ? "border-red-400 bg-red-50" : "border-gray-300 bg-white/70"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p className="text-xs text-red-600 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <AlertCircle className="inline mr-1" size={12} /> {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email */}
                <motion.div variants={fieldVariant(1)} animate={errors.email ? shake : undefined} className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border transition ${
                      errors.email ? "border-red-400 bg-red-50" : "border-gray-300 bg-white/70"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p className="text-xs text-red-600 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <AlertCircle className="inline mr-1" size={12} /> {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password */}
                <motion.div variants={fieldVariant(2)} className="relative md:col-span-2">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Create Password (min. 6 chars)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border transition ${
                      errors.password ? "border-red-400 bg-red-50" : "border-gray-300 bg-white/70"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p className="text-xs text-red-600 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <AlertCircle className="inline mr-1" size={12} /> {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Phone */}
                <motion.div variants={fieldVariant(3)} animate={errors.phone_number ? shake : undefined} className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border transition ${
                      errors.phone_number ? "border-red-400 bg-red-50" : "border-gray-300 bg-white/70"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.phone_number && (
                      <motion.p className="text-xs text-red-600 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <AlertCircle className="inline mr-1" size={12} /> {errors.phone_number}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

      
                {/* Center */}
<motion.div
  variants={fieldVariant(4.5)}
  animate={errors.center ? shake : undefined}
  className="relative"
>
  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />

  <select
    name="center"
    value={formData.center}
    onChange={handleChange}
    required
    className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white/70 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors.center ? "border-red-400 bg-red-50" : "border-gray-300"
    }`}
  >
    <option value="">Select a center</option>
    <option value="Orogun">Orogun</option>
    <option value="Samonda">Samonda</option>
    <option value="Online">Online</option>
  </select>

  {/* Error Message */}
  <AnimatePresence>
    {errors.center && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-xs text-red-600 mt-1"
      >
        <AlertCircle className="inline mr-1" size={12} /> {errors.center}
      </motion.p>
    )}
  </AnimatePresence>
</motion.div>

                {/* Gender */}
                <motion.div variants={fieldVariant(5)} className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </motion.div>

                {/* Birth Date */}
                <motion.div variants={fieldVariant(6)} className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border transition ${
                      errors.birth_date ? "border-red-400 bg-red-50" : "border-gray-300 bg-white/70"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.birth_date && (
                      <motion.p className="text-xs text-red-600 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <AlertCircle className="inline mr-1" size={12} /> {errors.birth_date}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>


                          {/* Course */}
                <motion.div variants={fieldVariant(4)} className="relative">
                  <BookOpen className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border appearance-none transition ${
                      errors.course ? "border-red-400 bg-red-50" : "border-gray-300 bg-white/70"
                    }`}
                  >
                    <option value="">Choose Course</option>
                    {courseLoading ? (
                      <option>Loading...</option>
                    ) : (
                      courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.course_name} (₦{Number(c.price).toLocaleString()})
                        </option>
                      ))
                    )}
                  </select>
                  <AnimatePresence>
                    {errors.course && (
                      <motion.p className="text-xs text-red-600 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <AlertCircle className="inline mr-1" size={12} /> {errors.course}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
                {/* Address */}
                {/* <motion.div variants={fieldVariant(7)} className="relative md:col-span-2">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <textarea
                    name="address"
                    placeholder="Home Address"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border resize-none transition ${
                      errors.address ? "border-red-400 bg-red-50" : "border-gray-300 bg-white/70"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.address && (
                      <motion.p className="text-xs text-red-600 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <AlertCircle className="inline mr-1" size={12} /> {errors.address}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div> */}

                {/* Consent */}
                <motion.label variants={fieldVariant(8)} className="flex items-start gap-3 cursor-pointer md:col-span-2 -mb-2">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 leading-tight">
                    <CheckSquare className="inline mr-1 text-green-500" size={16} />
                    I agree to receive updates & messages via WhatsApp/SMS
                  </span>
                </motion.label>

                {/* Submit */}
                <motion.div className="md:col-span-2 mt-4">
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    disabled={loading || courseLoading}
                    className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                    ) : null}
                    {loading ? "Creating Account..." : "Register Now"}
                  </motion.button>

                  <motion.p className="text-center text-gray-600 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    Already have an account?{" "}
                    <Link to="/signin" className="text-blue-600 font-bold hover:underline">
                      Sign In
                    </Link>
                  </motion.p>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>

          <p className="text-center text-gray-500 text-xs mt-6 relative z-10">
            © 2025 Parach Computers, Orogun, Ibadan
          </p>
        </div>
      </div>
    </>
  );
}
