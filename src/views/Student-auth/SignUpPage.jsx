import React, { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useNavigate, Link } from "react-router-dom";

import api from "../../api";

import { toast, Toaster } from "react-hot-toast";

import OnboardingModal from "../Student-Interface/OnboardingModal";

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

export default function SignUpPage() {
  const navigate = useNavigate();

  // Show the policies before allowing access to the signup form.
  const [showTermsModal, setShowTermsModal] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    email: "",

    password: "",

    name: "",

    gender: "male",

    course: "",

    birth_date: "",

    phone_number: "",

    alternative_phone_number: "",

    consent: false,

    center: "",
  });

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [courseLoading, setCourseLoading] = useState(true);

  const [errors, setErrors] = useState({});

  const [showOnboarding, setShowOnboarding] = useState(false);

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

    if (!formData.name.trim()) {
      e.name = "Name required";
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      e.email = "Valid email required";
    }

    if (!formData.password || formData.password.length < 6) {
      e.password = "Password (min 6)";
    }

    if (!formData.course) {
      e.course = "Please choose a course";
    }

    if (!formData.center) {
      e.center = "Center required";
    }

    if (!formData.phone_number.trim()) {
      e.phone_number = "Phone required";
    }

    if (!formData.birth_date) {
      e.birth_date = "Birth date required";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,

      [name]: undefined,
    }));

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

      setTimeout(() => {
        setShowOnboarding(true);
      }, 800);
    } catch (err) {
      const data = err.response?.data;

      if (!err.response) {
        toast.error("Network error — is backend running?");
      } else if (data) {
        const msg = Object.entries(data)

          .map(([k, v]) => {
            const message = Array.isArray(v)
              ? v.join(", ")
              : typeof v === "object" && v !== null
                ? JSON.stringify(v)
                : v;

            return `${k}: ${message}`;
          })

          .join(" • ");

        toast.error(msg || "Registration failed.");
      } else {
        toast.error("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Animation variants

  const container = {
    hidden: {},

    show: {
      transition: { staggerChildren: 0.06 },
    },
  };

  const headerVariant = {
    hidden: { opacity: 0, y: -18 },

    show: {
      opacity: 1,

      y: 0,

      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const fieldVariant = (i = 0) => ({
    hidden: { opacity: 0, y: 14, scale: 0.995 },

    show: {
      opacity: 1,

      y: 0,

      scale: 1,

      transition: { duration: 0.45, delay: i * 0.03 },
    },
  });

  const shake = {
    x: [0, -8, 8, -6, 6, -2, 2, 0],

    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <>
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="terms-modal-title"
              className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-5 text-white">
                <h2 id="terms-modal-title" className="text-xl font-bold">
                  Terms & Conditions
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  Please read these terms and conditions carefully before
                  enrolling in any programmes or accessing services offered by
                  Parach ICT Academy (Parach Computers)
                </p>
              </div>

              <div className="p-5 overflow-y-auto text-sm text-gray-700 space-y-5">
                <p>
                  <strong>Preliminary Notice:</strong> These Terms of Enrolment
                  and Conditions (“Terms”) constitute a legally binding
                  educational agreement between the enrollee (“Student”,
                  “Learner”, or “Guardian” where applicable) and{" "}
                  <strong>Parach ICT Academy (Parach Computers)</strong>
                  (“Parach ICT”, “We”, or “Us”). By accessing our website,
                  registering for a course, or using our services, you agree to
                  be bound by these Terms. If you do not agree with any part of
                  these Terms, please discontinue use of our website and
                  services immediately.
                </p>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">1. About Us</h3>
                  <p>
                    Parach ICT Academy is an information and communication
                    technology (ICT) training institute operating physical
                    training centers in Ibadan, Oyo State, Nigeria (Samonda and
                    Orogun branches), as well as interactive online training
                    programs globally.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    2. Eligibility and Enrollment
                  </h3>
                  <p>
                    <strong>Age Requirement:</strong> Our standard adult and
                    professional courses are open to individuals aged 16 and
                    above. Enrollment in our specialized{" "}
                    <strong>Coding Classes for Kids</strong> or programs for
                    minors must be completed and consented to by a parent or
                    legal guardian.
                  </p>
                  <p className="mt-2">
                    <strong>Accurate Information:</strong> When registering for
                    a course or requesting information, you agree to provide
                    accurate, current, and complete personal details.
                    Falsification of identity or academic records may result in
                    immediate dismissal without a refund.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    3. Training Modes, Schedules, and Attendance
                  </h3>
                  <p>
                    <strong>Delivery Modes:</strong> Courses are delivered
                    either physically at our Ibadan training centers or remotely
                    via live interactive online platforms, depending on the
                    option selected at enrollment.
                  </p>
                  <p className="mt-2">
                    <strong>Course Duration:</strong> Program durations range
                    from two (2) weeks to five (5) months depending on the
                    selected track. Parach ICT Academy reserves the right to
                    adjust class timetables, instructors, or delivery formats
                    due to unforeseen operational circumstances, with prior
                    notice to enrolled students.
                  </p>
                  <p className="mt-2">
                    <strong>Attendance & Capstone Projects:</strong>
                    Students are expected to attend scheduled sessions, complete
                    practical assignments, and submit required capstone projects
                    to qualify for course completion.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    4. Course Pause (Leave of Absence) and Completion Grace
                    Period
                  </h3>
                  <p>
                    Parach ICT Academy understands that unforeseen personal,
                    medical, academic, or professional emergencies may
                    temporarily prevent a student from continuing their
                    training.
                  </p>
                  <p className="mt-2">
                    <strong>Eligibility to Pause:</strong> Enrolled students may
                    apply to temporarily pause their classes for legitimate,
                    verifiable reasons (such as medical emergencies,
                    bereavement, mandatory national service/academic exams, or
                    urgent work relocations).
                  </p>
                  <p className="mt-2">
                    <strong>Formal Notification:</strong> To pause a program,
                    the student must submit a formal written request to the
                    academy administration prior to—or immediately upon—the
                    occurrence of the situation, accompanied by relevant
                    supporting documentation where applicable. Informal absence
                    without notice does not qualify as an approved pause.
                  </p>
                  <p className="mt-2">
                    <strong>Six-Month Grace Period:</strong> Upon approval of a
                    pause request, the student is granted a grace period of up
                    to six (6) months from the date the pause takes effect to
                    resume and complete their remaining classes from where they
                    stopped.
                  </p>
                  <p className="mt-2">
                    <strong>Resumption & Expiration (Starting Afresh):</strong>
                    Students must notify the administration at least seven (7)
                    days before their intended return date to be reintegrated
                    into an active cohort. If a student fails to resume and
                    complete their training within the six-month grace period,
                    their prior progress and enrollment will automatically
                    expire. Any student wishing to continue after the six-month
                    grace period has elapsed will be required to{" "}
                    <strong>re-enroll and start the course afresh</strong> from
                    the beginning, subject to prevailing tuition fees.
                  </p>
                  <p className="mt-2">
                    <strong>Financial Standing:</strong> An approved pause does
                    not waive any outstanding tuition balances; any agreed
                    installment obligations remain valid unless otherwise
                    arranged in writing with management.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    5. Fees, Payments, and Refund Policy
                  </h3>
                  <p>
                    <strong>Course Fees:</strong> Course fees are communicated
                    prior to enrollment via our official price list or
                    admissions team and are quoted in Nigerian Naira (NGN)
                    unless otherwise specified for international students.
                  </p>
                  <p className="mt-2">
                    <strong>Payment Terms:</strong> Full payment—or an approved
                    installment plan—must be settled before access to classes,
                    training materials, or online portals is granted.
                  </p>
                  <p className="mt-2">
                    <strong>Refunds and Pre-Start Deferrals:</strong>
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      Tuition fees paid are generally{" "}
                      <strong>non-refundable</strong> once a cohort or training
                      session has commenced.
                    </li>
                    <li>
                      Requests for withdrawal made at least seven (7) days prior
                      to the start of a course may be eligible for a partial
                      refund (subject to an administrative processing fee) or a
                      one-time deferment to the next available cohort at
                      management’s discretion.
                    </li>
                    <li>
                      Failure to attend classes after registration without an
                      approved pause (see Section 4) or formal withdrawal does
                      not entitle the student to a refund.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    6. Certification and Verification
                  </h3>
                  <p>
                    <strong>Issuance of Certificates:</strong> Official
                    certificates of completion are awarded strictly to students
                    who meet minimum attendance requirements, complete all
                    practical assessments/capstone projects, and fulfill all
                    financial obligations.
                  </p>
                  <p className="mt-2">
                    <strong>Verification:</strong> Employers and third parties
                    may verify the authenticity of issued certificates through
                    the
                    <strong> Verify Certificate</strong> portal on our website.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    7. Student Conduct and Facility Use
                  </h3>
                  <p>
                    <strong>Code of Conduct:</strong> Students must maintain
                    respectful, professional behavior toward instructors, staff,
                    and fellow trainees both in physical classrooms and in
                    online learning communities (including WhatsApp groups and
                    live sessions). Harassment, disruption, or academic
                    dishonesty will result in disciplinary action, up to
                    expulsion without refund.
                  </p>
                  <p className="mt-2">
                    <strong>Equipment and Facilities:</strong> Students
                    attending physical classes must handle academy computers,
                    furniture, and network infrastructure with care. Students
                    will be held financially liable for willful or negligent
                    damage to academy property.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    8. Intellectual Property Rights
                  </h3>
                  <p>
                    <strong>Academy Content:</strong> All website content,
                    logos, course curricula, training manuals, video recordings,
                    slides, and source code provided by Parach ICT Academy
                    remain the intellectual property of Parach ICT Academy.
                  </p>
                  <p className="mt-2">
                    <strong>Restrictions:</strong> You may use course materials
                    solely for your personal, non-commercial educational use.
                    You may not copy, distribute, resell, record, or publicly
                    share our proprietary training materials without prior
                    written consent.
                  </p>
                  <p className="mt-2">
                    <strong>Student Projects:</strong> Students retain ownership
                    of original capstone projects and portfolios created during
                    training, though Parach ICT Academy reserves the
                    non-exclusive right to showcase student work for educational
                    or promotional purposes unless the student opts out in
                    writing.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    9. Free Online Tools and Website Use
                  </h3>
                  <p>
                    Parach ICT Academy provides free web-based utilities on its
                    website (including the Online Code Editor, Online Notepad,
                    and PDF Merge Tool).
                  </p>
                  <p className="mt-2">
                    These tools are provided on an{" "}
                    <strong>“as-is” and “as-available”</strong> basis for
                    convenience. We do not guarantee uninterrupted availability
                    or permanent storage of data processed through these tools.
                    Users are responsible for backing up their own files and
                    code.
                  </p>
                  <p className="mt-2">
                    You agree not to use our website or online tools to upload
                    malicious code, infringe third-party copyrights, or engage
                    in unlawful activities.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    10. Disclaimers and Limitation of Liability
                  </h3>
                  <p>
                    <strong>No Employment Guarantee:</strong> While Parach ICT
                    Academy provides career-focused training, mentorship, and
                    practical portfolio projects, enrollment in or completion of
                    any course does <strong>not</strong>
                    guarantee employment, freelance contracts, or specific
                    income levels.
                  </p>
                  <p className="mt-2">
                    <strong>Limitation of Liability:</strong> To the fullest
                    extent permitted by applicable law, Parach ICT Academy, its
                    directors, instructors, and affiliates shall not be liable
                    for any indirect, incidental, consequential, or punitive
                    damages arising out of your use of our website, free tools,
                    or training services.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    11. Privacy and Data Protection
                  </h3>
                  <p>
                    Your personal information is collected and processed in
                    accordance with our <strong>Privacy Policy</strong> and the{" "}
                    <strong>Nigeria Data Protection Act (NDPA) 2023</strong>. By
                    using our website and enrolling in our programs, you consent
                    to the collection and use of your data for admissions,
                    academic administration, certificate verification, and
                    service communications.
                  </p>
                  <p className="mt-2">
                    <strong>Limitation of Liability:</strong> To the fullest
                    extent permitted by applicable law, Parach ICT Academy, its
                    directors, instructors, and affiliates shall not be liable
                    for any indirect, incidental, consequential, or punitive
                    damages arising out of your use of our website, free tools,
                    or training services.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    12. Third-Party Links
                  </h3>
                  <p>
                    Our website may contain links to third-party platforms (such
                    as WhatsApp, Google, Facebook, Instagram, LinkedIn, or
                    external software vendors). Parach ICT Academy is not
                    responsible for the content, terms, or privacy practices of
                    any third-party websites.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    13. Changes to These Terms
                  </h3>
                  <p>
                    Parach ICT Academy reserves the right to update or modify
                    these Terms and Conditions at any time. Any changes will
                    take effect immediately upon posting on this page with an
                    updated “Last Updated” date. Continued use of our website or
                    services constitutes acceptance of the revised Terms.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-gray-900 mb-1">
                    14. Governing Law and Dispute Resolution
                  </h3>
                  <p>
                    These Terms and Conditions shall be governed by and
                    construed in accordance with the laws of the{" "}
                    <strong>Federal Republic of Nigeria</strong>. Any disputes
                    arising under or in connection with these Terms shall first
                    be resolved amicably through good-faith negotiation, failing
                    which they shall be subject to the exclusive jurisdiction of
                    the courts in Oyo State, Nigeria.
                  </p>
                </section>
              </div>

              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <label className="flex items-start gap-3 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    I have read and agree to the{" "}
                    <strong>Terms and Conditions</strong>.
                  </span>
                </label>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    disabled={!termsAccepted}
                    onClick={() => setShowTermsModal(false)}
                    className="flex-1 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-purple-700 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Accept & Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <img
                    className="w-20 h-18 rounded-full shadow-lg"
                    src={logoImg}
                    alt="Parach ICT Academy"
                  />
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Join Parach ICT Academy
                </h1>

                <p className="text-gray-600 mt-2">
                  Start your ICT journey today!
                </p>
              </motion.div>

              <motion.div className="grid md:grid-cols-2 gap-5" layout>
                {/* Full Name */}

                <motion.div
                  variants={fieldVariant(0)}
                  animate={errors.name ? shake : undefined}
                  className="relative"
                >
                  <User
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border transition ${
                      errors.name
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 bg-white/70"
                    }`}
                  />

                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        className="text-xs text-red-600 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle className="inline mr-1" size={12} />

                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email */}

                <motion.div
                  variants={fieldVariant(1)}
                  animate={errors.email ? shake : undefined}
                  className="relative"
                >
                  <Mail
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border transition ${
                      errors.email
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 bg-white/70"
                    }`}
                  />

                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        className="text-xs text-red-600 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle className="inline mr-1" size={12} />

                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password */}

                <motion.div
                  variants={fieldVariant(2)}
                  className="relative md:col-span-2"
                >
                  <Lock
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Create Password (min. 6 chars)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border transition ${
                      errors.password
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 bg-white/70"
                    }`}
                  />

                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        className="text-xs text-red-600 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle className="inline mr-1" size={12} />

                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Primary Phone Number */}

                <motion.div
                  variants={fieldVariant(3)}
                  animate={errors.phone_number ? shake : undefined}
                  className="relative"
                >
                  <Phone
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />

                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border transition ${
                      errors.phone_number
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 bg-white/70"
                    }`}
                  />

                  <AnimatePresence>
                    {errors.phone_number && (
                      <motion.p
                        className="text-xs text-red-600 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle className="inline mr-1" size={12} />

                        {errors.phone_number}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Alternative Phone Number */}

                <motion.div variants={fieldVariant(3.5)} className="relative">
                  <Phone
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />

                  <input
                    type="tel"
                    name="alternative_phone_number"
                    placeholder="Alternative Phone (Optional)"
                    value={formData.alternative_phone_number}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 bg-white/70 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </motion.div>

                {/* Center */}

                <motion.div
                  variants={fieldVariant(4.5)}
                  animate={errors.center ? shake : undefined}
                  className="relative"
                >
                  <MapPin
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />

                  <select
                    name="center"
                    value={formData.center}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white/70 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.center
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a center</option>

                    <option value="Orogun">Orogun</option>

                    <option value="Samonda">Samonda</option>

                    <option value="Online">Online</option>
                  </select>

                  <AnimatePresence>
                    {errors.center && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-red-600 mt-1"
                      >
                        <AlertCircle className="inline mr-1" size={12} />

                        {errors.center}
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

                <motion.div
                  variants={fieldVariant(6)}
                  animate={errors.birth_date ? shake : undefined}
                  className="relative"
                >
                  <Calendar
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />

                  <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border transition ${
                      errors.birth_date
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 bg-white/70"
                    }`}
                  />

                  <AnimatePresence>
                    {errors.birth_date && (
                      <motion.p
                        className="text-xs text-red-600 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle className="inline mr-1" size={12} />

                        {errors.birth_date}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Course */}

                <motion.div
                  variants={fieldVariant(7)}
                  animate={errors.course ? shake : undefined}
                  className="relative"
                >
                  <BookOpen
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={20}
                  />

                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border appearance-none transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.course
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 bg-white/70"
                    }`}
                  >
                    <option value="">Choose Course</option>

                    {courseLoading ? (
                      <option value="" disabled>
                        Loading...
                      </option>
                    ) : (
                      courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.course_name} (₦
                          {Number(c.price).toLocaleString()})
                        </option>
                      ))
                    )}
                  </select>

                  <AnimatePresence>
                    {errors.course && (
                      <motion.p
                        className="text-xs text-red-600 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle className="inline mr-1" size={12} />

                        {errors.course}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Consent */}

                <motion.label
                  variants={fieldVariant(8)}
                  className="flex items-start gap-3 cursor-pointer md:col-span-2 -mb-2"
                >
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />

                  <span className="text-sm text-gray-700 leading-tight">
                    <CheckSquare
                      className="inline mr-1 text-green-500"
                      size={16}
                    />
                    I agree to receive updates & messages via Email and
                    WhatsApp/SMS
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
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />

                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    ) : null}

                    {loading ? "Creating Account..." : "Register Now"}
                  </motion.button>

                  <motion.p
                    className="text-center text-gray-600 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="text-blue-600 font-bold hover:underline"
                    >
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

          {showOnboarding && (
            <OnboardingModal
              type="post-signup"
              isOpen={showOnboarding}
              onComplete={() => {
                setShowOnboarding(false);

                navigate("/signin");
              }}
              onSkip={() => {
                setShowOnboarding(false);

                navigate("/signin");
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
