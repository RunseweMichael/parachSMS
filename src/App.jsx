import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

// import StudentList from './components/Students/StudentList';
// import Certificates from './components/Certificates/Certificates';

// import StudentPaymentPortal from './components/StudentPaymentPortal';
// import AdminPaymentDashboard from './components/AdminPaymentDashboard';




// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log("🔐 Token from ProtectedRoute:", token);
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Profile />} />
        <Route path="/enquiries" element={<EnquiryList />} />
        <Route path="/enquiries/add" element={<EnquiryForm />} />
        <Route path="/enquiries/edit/:id" element={<EnquiryForm />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        {/* <Route path='/certificate' element={<Certificates />} /> */}
        {/* <Route path="/student_list" element={<StudentList />} /> */}

        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/verify" element={<PaymentPage />} />
        <Route path="/student-transactions" element={<StudentPaymentHistory />} />


        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="certificates" element={<CertificateManagement />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="payments/history" element={<PaymentHistory />} />
          <Route path="coupons" element={<CouponAdmin />} />
          <Route path="staff-management" element={<StaffManagement />} />
          {/* ✅ Courses section */}
          <Route path="courses">
            <Route index element={<CourseList />} />
            <Route path="add" element={<CourseForm />} /> 
            <Route path=":id" element={<CourseDetail />} />
            <Route path="edit/:id" element={<CourseForm />} />
          </Route>

          {/* ✅ Modules */}
  <Route path="modules">
    <Route path="add" element={<ModuleForm />} />
    <Route path="edit/:id" element={<ModuleForm />} />
  </Route>

  {/* ✅ Lessons */}
  <Route path="lessons">
    <Route path="add" element={<LessonForm />} />
    <Route path="edit/:id" element={<LessonForm />} />
  </Route>
          </Route>

        {/* Redirect root to admin */}
        <Route path="/" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
