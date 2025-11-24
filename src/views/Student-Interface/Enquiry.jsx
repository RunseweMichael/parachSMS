import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Listbox, Transition } from "@headlessui/react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    message: "",
    status: "NEW",
    course: "",
    consent: false,
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, enquiryRes] = await Promise.all([
          api.get("courses/courses/"),
          id ? api.get(`enquiries/enquiries/${id}/`) : Promise.resolve(null),
        ]);

        setCourses(coursesRes.data);

        if (enquiryRes) {
          const data = enquiryRes.data;
          setFormData({
            ...data,
            course:
              typeof data.course === "object" && data.course !== null
                ? data.course.id ?? ""
                : data.course ?? "",
          });
        }
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Sync selected course
  useEffect(() => {
    if (courses.length > 0 && formData.course) {
      const match = courses.find((c) => c.id === formData.course);
      setSelectedCourse(match || null);
    }
  }, [courses, formData.course]);

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setFormData({ ...formData, course: course.id });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      if (id) await api.put(`enquiries/enquiries/${id}/`, formData);
      else await api.post("enquiries/enquiries/", formData);

      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      const msg =
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading screen animation
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-indigo-600 text-xl font-medium animate-pulse"
        >
          Just a miniute &#128516;...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h2 className="text-3xl font-bold text-center">
              {id ? "Edit Enquiry" : "New Enquiry"}
            </h2>
            <p className="text-center mt-2 text-indigo-100">
              Fill in your details and we'll get back to you.
            </p>
          </div>

          <div className="p-8 lg:p-10 space-y-6">
            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            {/* Success */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center font-semibold"
              >
                Saved Successfully ✔
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Text Fields */}
              {["name", "email", "phone"].map((key, idx) => (
                <motion.div
                  key={key}
                  variants={fadeIn}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: idx * 0.1 + 0.2 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                    {key}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                  />
                </motion.div>
              ))}

              {/* Course Dropdown */}
              <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.5 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course
                </label>

                <Listbox value={selectedCourse} onChange={handleCourseChange}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full py-4 pl-5 pr-12 text-left bg-white rounded-xl border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100">
                      <span className="block truncate">
                        {selectedCourse ? selectedCourse.course_name : "-- Choose a course --"}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <ChevronUpDownIcon className="h-5 w-5 text-indigo-500" />
                      </span>
                    </Listbox.Button>

                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-50 mt-2 max-h-80 w-full rounded-xl bg-white shadow-2xl border border-gray-200 overflow-auto">
                        {courses.map((course) => (
                          <Listbox.Option
                            key={course.id}
                            className={({ active }) =>
                              `cursor-pointer select-none py-3 pl-10 pr-4 ${
                                active ? "bg-indigo-50 text-indigo-900" : "text-gray-900"
                              }`
                            }
                            value={course}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? "font-semibold" : "font-medium"}`}>
                                  {course.course_name}
                                </span>
                                {selected && (
                                  <span className="absolute left-0 inset-y-0 flex items-center pl-3 text-indigo-600">
                                    <CheckIcon className="h-5 w-5" />
                                  </span>
                                )}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>

                {!selectedCourse && <p className="text-xs text-red-500 mt-1 animate-pulse">Please select a course</p>}
              </motion.div>

              {/* Gender */}
              <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.6 }} className="grid grid-cols-3 gap-4">
                <label className="col-span-3 text-sm font-semibold text-gray-700">Gender</label>
                {['Male', 'Female'].map((g) => (
                  <label
                    key={g}
                    className={`py-3 text-center border-2 rounded-xl cursor-pointer transition-all ${
                      formData.gender === g
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold shadow"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input type="radio" value={g} checked={formData.gender === g} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="sr-only" />
                    {g}
                  </label>
                ))}
              </motion.div>

              {/* Message */}
              <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.7 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </motion.div>

              {/* Consent */}
              <motion.div variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.8 }} className="flex items-start gap-4 p-5 bg-indigo-50 rounded-xl border border-indigo-100">
                <input type="checkbox" checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} className="mt-1 w-5 h-5" />
                <p className="text-sm text-gray-700">I agree to receive updates and promotional emails.</p>
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={fadeIn}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.9 }}
                type="submit"
                disabled={submitting}
                className={`w-full py-5 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105"
                }`}
              >
                {submitting ? "Saving..." : id ? "Update Enquiry" : "Submit Enquiry"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnquiryForm;
