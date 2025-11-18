import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { toast } from "react-hot-toast";

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
    address: "",
    consent: false,
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  /** Load courses */
  useEffect(() => {
    api
      .get("/courses/courses/")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Course load error:", err));
  }, []);

  /** Handle input */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /** Submit registration */
   /** Submit registration */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/students/users/", formData);

      const { token, user_id, user } = res.data;

      /** Save auth data */
      if (token) localStorage.setItem("token", token);
      if (user_id) localStorage.setItem("user_id", user_id);
      if (user) localStorage.setItem("user", JSON.stringify(user));

      toast.success("Registration successful!");

      /** Redirect to Dashboard */
      navigate("/verify-otp");

    } catch (err) {
      console.error("Registration Error:", err);

      /** 🔥 DEBUG POPUP ADDED HERE */
      console.log("BACKEND ERROR DATA:", err.response?.data);
      alert(
        "Backend Response:\n\n" +
          JSON.stringify(err.response?.data, null, 2)
      );
      /** END DEBUG */

      const data = err.response?.data;

      if (!err.response) {
        toast.error("Network connection error.");
      } else if (err.response.status === 400 && typeof data === "object") {
        const msg = Object.entries(data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
          .join(" | ");
        toast.error(msg);
      } else {
        toast.error("Registration failed.");
      }
    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl shadow-xl border border-white/40 rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Your Student Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border bg-white"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border bg-white"
          />

          <input
            name="password"
            type="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border bg-white"
          />

          <input
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border bg-white"
          />

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border bg-white"
          >
            <option value="">Select Course (optional)</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.course_name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border bg-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border bg-white"
            />
          </div>

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border bg-white"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm">I consent to receive updates</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
          >
            {loading ? "Registering…" : "Sign Up"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="w-full py-3 rounded-xl border bg-white text-blue-600 font-semibold"
          >
            Already have an account? Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
