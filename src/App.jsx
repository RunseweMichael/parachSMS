import React from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/* === OLD FRONTEND IMPORTS === */
import AdminLayout from './pages/AdminDashboard/AdminLayout';
import Dashboard from './pages/AdminDashboard/Dashboard';
import StudentManagement from './pages/AdminDashboard/StudentManagement';
import CertificateManagement from './pages/AdminDashboard/CertificateManagement';
import Notifications from './pages/AdminDashboard/Notifications';
import ActivityLog from './pages/AdminDashboard/ActivityLog';
import Login from './pages/Login';
import CourseList from './components/Course/CourseList';
import CourseDetail from './components/Course/CourseDetail';
import CourseForm from './components/Course/CourseForm';
import RegistrationForm from './components/Students/RegistrationForm';
import VerifyOTP from './components/Students/VerifyOTP.jsx';
import ResetPassword from './components/Students/ResetPassword';
import Profile from './components/Students/Profile';
import EnquiryList from './components/Enquiries/EnquiryList';
import EnquiryForm from './components/Enquiries/EnquiryForm';
import ModuleForm from "./components/Course/ModuleForm";
import LessonForm from "./components/Course/LessonForm";
import CourseDetails from "./components/Students/CourseDetails";
import CouponAdmin from './pages/CouponAdmin';
import StaffManagement from "./pages/StaffManagement";
import PaymentPage from "./pages/PaymentPage";
import PaymentHistory from "./pages/PaymentHistory";
import StudentPaymentHistory from "./components/Students/StudentPaymentHistory";

<<<<<<< HEAD
/* === NEW FRONTEND IMPORTS === */
import AuthForm from './views/Student-auth/Authform.jsx';
// import Admin from './layout/Admin.jsx';
=======
/* === NEW FRONTEND IMPORTS (STUDENT INTERFACE) === */
import SignUpPage from './views/Student-auth/SignUpPage.jsx';
import SignInPage from './views/Student-auth/SignInPage.jsx';
import Admin from './layout/Admin.jsx';
>>>>>>> 24dbefce3589e95aa9f7858374215e87b7c4e016

import CertificateDashboard from "./views/Student-Interface/CertificateDashboard.jsx";
import PaymentDashboard from "./views/Student-Interface/PaymentDashboard.jsx";
import Settings from "./views/Student-Interface/Settings.jsx";
import StudentDashboard from "./views/Student-Interface/Dashboard.jsx";

<<<<<<< HEAD
=======
/* === AUTH CHECK === */
const user = localStorage.getItem("token") || localStorage.getItem("user_id");

/* === PROTECTED ROUTE WRAPPER === */
>>>>>>> 24dbefce3589e95aa9f7858374215e87b7c4e016
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log("Token from ProtectedRoute:", token);
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>
<<<<<<< HEAD
        {/* === NEW AUTH ROUTES === */}
        <Route path="/auth" element={<AuthForm />} />
=======
        {/* === AUTH === */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
>>>>>>> 24dbefce3589e95aa9f7858374215e87b7c4e016
        <Route path="/AdminLogin" element={<Login />} />

        {/* === PUBLIC STUDENT ROUTES === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/enquiries/add" element={<EnquiryForm />} />
        <Route path="/enquiries/edit/:id" element={<EnquiryForm />} />

        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/verify" element={<PaymentPage />} />
        <Route path="/student-transactions" element={<StudentPaymentHistory />} />

        {/* ======================================
            STUDENT INTERFACE ( /student/* )
        ====================================== */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute>
<<<<<<< HEAD
              <AdminLayout />
=======
              <Admin />
>>>>>>> 24dbefce3589e95aa9f7858374215e87b7c4e016
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="certificate" element={<CertificateDashboard />} />
          <Route path="payment" element={<PaymentDashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ======================================
            OLD ADMIN PANEL ( /super-admin/* )
        ====================================== */}
        <Route
          path="/super-admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />

<<<<<<< HEAD
          {/* ADMIN DASHBOARD */}
          <Route index element={<Dashboard />} />

          {/* STUDENTS */}
=======
          <Route path="dashboard" element={<Dashboard />} />
>>>>>>> 24dbefce3589e95aa9f7858374215e87b7c4e016
          <Route path="students" element={<StudentManagement />} />
          <Route path="certificates" element={<CertificateManagement />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="payments/history" element={<PaymentHistory />} />
          <Route path="coupons" element={<CouponAdmin />} />
          <Route path="staff-management" element={<StaffManagement />} />

<<<<<<< HEAD
          {/* EQUIRIES LIST */}
          <Route path="enquiries">
            <Route index element={<EnquiryList />} />
            <Route path="add" element={<EnquiryForm />} />
            <Route path="edit/:id" element={<EnquiryForm />} />
          </Route>

          {/* COURSES */}
=======
          {/* Courses */}
>>>>>>> 24dbefce3589e95aa9f7858374215e87b7c4e016
          <Route path="courses">
            <Route index element={<CourseList />} />
            <Route path="add" element={<CourseForm />} />
            <Route path=":id" element={<CourseDetail />} />
            <Route path="edit/:id" element={<CourseForm />} />
          </Route>

          {/* Modules */}
          <Route path="modules">
            <Route path="add" element={<ModuleForm />} />
            <Route path="edit/:id" element={<ModuleForm />} />
          </Route>

          {/* Lessons */}
          <Route path="lessons">
            <Route path="add" element={<LessonForm />} />
            <Route path="edit/:id" element={<LessonForm />} />
          </Route>
        </Route>

<<<<<<< HEAD
        {/* DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/admin" />} />


=======
        {/* === DEFAULT === */}
     <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
>>>>>>> 24dbefce3589e95aa9f7858374215e87b7c4e016
      </Routes>
    </BrowserRouter>
  );
}

export default App;
