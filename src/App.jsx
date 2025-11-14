import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/* === OLD FRONTEND IMPORTS (KEEP ALL) === */
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
import VerifyOTP from './components/Students/VerifyOtp';
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

/* === NEW FRONTEND IMPORTS === */
import AuthForm from './views/Student-auth/Authform.jsx';
import Admin from './layout/Admin.jsx';

/* === COMBINED AUTH LOGIC === */
const isDevMode = false; // set true to bypass login during testing
const user = isDevMode ? true : (localStorage.getItem("token") || localStorage.getItem("user_id"));

/* === Protected Route === */
const ProtectedRoute = ({ children }) => {
  return user ? children : <Navigate to="/AdminLogin" replace />;
};


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* === NEW AUTH ROUTES === */}
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/AdminLogin" element={<Login />} />

        {/* === PUBLIC ROUTES (STUDENT SIDE) === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Profile />} />

        <Route path="/enquiries" element={<EnquiryList />} />
        <Route path="/enquiries/add" element={<EnquiryForm />} />
        <Route path="/enquiries/edit/:id" element={<EnquiryForm />} />

        <Route path="/course/:id" element={<CourseDetails />} />

        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/verify" element={<PaymentPage />} />
        <Route path="/student-transactions" element={<StudentPaymentHistory />} />

        {/* === OLD ADMIN ROUTES INSIDE NEW ADMIN LAYOUT === */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin /> 
            </ProtectedRoute>
          }
        >

          {/* ADMIN DASHBOARD */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* STUDENTS */}
          <Route path="students" element={<StudentManagement />} />

          {/* CERTIFICATES */}
          <Route path="certificates" element={<CertificateManagement />} />

          {/* NOTIFICATIONS */}
          <Route path="notifications" element={<Notifications />} />

          {/* ACTIVITY */}
          <Route path="activity" element={<ActivityLog />} />

          {/* PAYMENTS */}
          <Route path="payments/history" element={<PaymentHistory />} />

          {/* COUPONS */}
          <Route path="coupons" element={<CouponAdmin />} />

          {/* STAFF */}
          <Route path="staff-management" element={<StaffManagement />} />

          {/* COURSES */}
          <Route path="courses">
            <Route index element={<CourseList />} />
            <Route path="add" element={<CourseForm />} />
            <Route path=":id" element={<CourseDetail />} />
            <Route path="edit/:id" element={<CourseForm />} />
          </Route>

          {/* MODULES */}
          <Route path="modules">
            <Route path="add" element={<ModuleForm />} />
            <Route path="edit/:id" element={<ModuleForm />} />
          </Route>

          {/* LESSONS */}
          <Route path="lessons">
            <Route path="add" element={<LessonForm />} />
            <Route path="edit/:id" element={<LessonForm />} />
          </Route>

        </Route>

        {/* DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;