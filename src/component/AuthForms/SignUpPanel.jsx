import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPen,
  MailPlus,
  Lock,
  Phone,
  Scroll,
  MapPinHouse,
  Calendar,
  User,
  CheckSquare,
} from "lucide-react";
import api from "../../api";   // <-- your axios instance

// -------------------------------------------------
// Reusable Input with Icon (same as before)
const InputWithIcon = ({ icon, placeholder, type = "text", ...props }) => (
  <div className="relative w-full group">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300 pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-gray-300 
                 placeholder:text-gray-400 text-gray-900 text-sm tracking-wide
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 transition-all duration-300 ease-out ${props.className || ""}`}
      {...props}
    />
  </div>
);

// -------------------------------------------------
const SignUpPanel = ({ isSignUp }) => {
  const navigate = useNavigate();

  // ---------- Form state ----------
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "male",
    course: null,
    birth_date: "",
    phone_number: "",
    address: "",
    consent: false,
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------- Fetch courses ----------
  useEffect(() => {
    api
      .get("/courses/courses/")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, []);

  // ---------- Input change ----------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "course" && value === ""
          ? null
          : value,
    }));
  };

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/students/users/", formData);
      alert("Registration successful! Check your email for OTP verification.");
      navigate("/verify-otp");
    } catch (err) {
      if (err.response?.data) {
        const msgs = Object.entries(err.response.data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
          .join(" | ");
        setError(msgs);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------
  return (
    <div
     className={` inset-y-0  w-full flex flex-col items-center justify-center
        p-5
              transition-all duration-700 ease-in-out transform
              ${isSignUp
                ? "translate-x-0 opacity-100 z-10"
                : "translate-x-full opacity-0 z-0"}`}
    >
     

      {error && (
        <p className="w-full max-w-sm mb-4 text-sm text-red-600 bg-red-50 p-2 rounded-lg text-center">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-3.5"
      >
        <div className="">
            
        </div>
        {/* ----- Name ----- */}
        <InputWithIcon
          icon={<UserPen size={20} />}
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* ----- Email ----- */}
        <InputWithIcon
          icon={<MailPlus size={20} />}
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* ----- Password ----- */}
        <InputWithIcon
          icon={<Lock size={20} />}
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* ----- Phone ----- */}
        <InputWithIcon
          icon={<Phone size={20} />}
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
        />
            {/* ----- Course ----- */}
        
             <div className="relative">
          <Scroll className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select
            name="course"
            value={formData.course || ""}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-gray-300 
                       text-gray-900 text-sm tracking-wide
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-300"
          >
            <option value="">Select Course (optional)</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.course_name}
              </option>
            ))}
          </select>
        </div>


        <div className="flex w-full justify-between ">
              
    {/* ----- Gender ----- */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-3.5 rounded-xl bg-white border border-gray-300 
                       text-gray-900 text-sm tracking-wide
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-300"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        {/* ----- Birth Date ----- */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-gray-300 
                       text-gray-900 text-sm tracking-wide
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-300"
          />
        </div>
        </div>

        {/* ----- Address ----- */}
        <div className="relative">
          <MapPinHouse className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <textarea
            name="address"
            placeholder="Current Address"
            value={formData.address}
            onChange={handleChange}
            rows={2}
            className="w-full pl-10 pr-4 py-3.5 rounded-xs bg-white border border-gray-300 
                       placeholder:text-gray-400 text-gray-900 text-sm tracking-wide resize-none
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-300"
          />
        </div>

        {/* ----- Consent ----- */}
        <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <CheckSquare size={18} className="text-gray-400" />
          <span>I consent to receive updates</span>
        </label>

        {/* ----- Submit ----- */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 
                     hover:from-blue-700 hover:to-purple-700 
                     text-white font-bold py-4 rounded-2xl 
                     uppercase tracking-wider text-sm 
                     transition-all duration-300 transform hover:scale-[1.02] 
                     active:scale-100 shadow-lg
                     ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? "Registering…" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpPanel;