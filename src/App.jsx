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

/* === NEW FRONTEND IMPORTS (STUDENT INTERFACE) === */
import SignUpPage from './views/Student-auth/SignUpPage.jsx';
import SignInPage from './views/Student-auth/SignInPage.jsx';
import Admin from './layout/Admin.jsx';

import CertificateDashboard from "./views/Student-Interface/CertificateDashboard.jsx";
import PaymentDashboard from "./views/Student-Interface/PaymentDashboard.jsx";
import Settings from "./views/Student-Interface/Settings.jsx";
import StudentDashboard from "./views/Student-Interface/Dashboard.jsx";

/* === AUTH CHECK === */
const user = localStorage.getItem("token") || localStorage.getItem("user_id");

/* === PROTECTED ROUTE WRAPPER === */
const ProtectedRoute = ({ children }) => {
  return user ? children : <Navigate to="/AdminLogin" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>
        {/* === AUTH === */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/AdminLogin" element={<Login />} />

        {/* === PUBLIC STUDENT ROUTES === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/enquiries" element={<EnquiryList />} />
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
              <Admin />
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

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="certificates" element={<CertificateManagement />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="payments/history" element={<PaymentHistory />} />
          <Route path="coupons" element={<CouponAdmin />} />
          <Route path="staff-management" element={<StaffManagement />} />

          {/* Courses */}
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

        {/* === DEFAULT === */}
     <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
