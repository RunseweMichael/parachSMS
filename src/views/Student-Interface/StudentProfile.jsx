import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Edit3, Save, X } from "lucide-react";

export default function StudentProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);


  const avatarUrl = user?.name
  ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundType=gradientLinear`
  : `https://api.dicebear.com/7.x/initials/svg?seed=Student`;

  // =======================
  // Fetch Logged-in Student
  // =======================
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/students/me/", {
        headers: { Authorization: `Token ${token}` },
      });

      setUser(res.data);
      setFormData(res.data);
    } catch (err) {
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // Handle Form Change
  // =======================
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    setFormData(updated); // immediate update across UI
  };

  // =======================
  // Save Profile
  // =======================
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put("/students/me/", formData, {
        headers: { Authorization: `Token ${token}` },
      });

      setUser(res.data);
      setFormData(res.data);
      setEditing(false);

      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  // =======================
  // Loading Spinner
  // =======================
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="relative z-10 flex flex-wrap -mx-4 pt-10 pb-20 px-4 md:px-10 max-w-7xl mx-auto">
        
        {/* =======================
            LEFT SECTION – FORM
        ======================= */}
        <div className="w-full lg:w-8/12 px-4 mb-10">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30">
            <div className="px-6 py-6">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h6 className="text-2xl font-bold text-gray-800">Profile Settings</h6>

                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition"
                  >
                    <Edit3 size={16} /> Edit
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700"
                    >
                      <Save size={16} /> Save
                    </button>

                    <button
                      onClick={() => {
                        setEditing(false);
                        setFormData(user);
                      }}
                      className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <hr className="my-6 border-gray-200" />

              {/* FORM FIELDS */}
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                {[
                  { label: "Full Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone Number", name: "phone_number", type: "text" },
                  { label: "Birth Date", name: "birth_date", type: "date" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      disabled={!editing}
                      className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl disabled:bg-gray-100"
                    />
                  </div>
                ))}

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl disabled:bg-gray-100"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* =======================
            RIGHT SECTION – SUMMARY
        ======================= */}
        <div className="w-full lg:w-4/12 px-4">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 mb-8">
            <div className="px-6 py-8 text-center">
              
              {/* Avatar */}
           <div className="relative inline-block mb-5">
  <div className="w-32 h-32 mx-auto rounded-full bg-white p-1 shadow-xl border border-indigo-200">
    <img
      src={avatarUrl}
      alt="avatar"
      className="w-full h-full rounded-full object-cover"
    />
  </div>

  <div className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-md">
    {user?.is_active ? (
      <CheckCircle className="text-white" size={20} />
    ) : (
      <XCircle className="text-white" size={20} />
    )}
  </div>
</div>


              {/* User Summary */}
              <h3 className="text-2xl font-bold text-gray-800">{user?.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Student ID: {user?.id}</p>

              <hr className="my-6 border-gray-200" />

              {/* Stats */}
              <div className="flex gap-4 justify-around text-center">
                <div>
                  <p className="text-xl font-bold text-blue-600">₦{user?.amount_paid}</p>
                  <p className="text-xs text-gray-600">Paid</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-red-600">₦{user?.amount_owed}</p>
                  <p className="text-xs text-gray-600">Owed</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-purple-600">{user?.course ? "Enrolled" : "None"}</p>
                  <p className="text-xs text-gray-600">Course</p>
                </div>
              </div>

              <hr className="my-6 border-gray-200" />

              <div className="space-y-3 text-sm text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course</span>
                  <span className="font-medium text-gray-800">
                    {user?.course?.course_name || "Not enrolled"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`font-medium flex items-center ${
                      user?.is_active ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        user?.is_active ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    ></span>
                    {user?.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Next Due</span>
                  <span className="font-medium text-gray-800">{user?.next_due_date || "N/A"}</span>
                </div>

                {/* Course Resource Button */}
                {user?.course?.resource_link && user.amount_paid > 0 && (
                  <a
                    href={user.course.resource_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl font-medium hover:shadow-lg transition"
                  >
                    Access Course Resource
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
