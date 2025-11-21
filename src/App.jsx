// Fixed App.jsx with proper role-based routing
import React from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Auth & Layouts
import Login from './pages/Login';
import SignUpPage from './views/Student-auth/SignUpPage.jsx';
import SignInPage from './views/Student-auth/SignInPage.jsx';
import Student from './layout/Student.jsx';
import AdminLayout from './pages/AdminDashboard/AdminLayout';

// Student Auth
import RegistrationForm from './components/Students/RegistrationForm';
import VerifyOTP from './components/Students/VerifyOTP.jsx';
import ResetPassword from './components/Students/ResetPassword';

// Student Interface
import StudentDashboard from './views/Student-Interface/Dashboard.jsx';
import CertificateDashboard from './views/Student-Interface/CertificateDashboard.jsx';
import PaymentDashboard from './views/Student-Interface/PaymentDashboard.jsx';
import Settings from './views/Student-Interface/StudentProfile.jsx';
import Profile from './components/Students/Profile';
import CourseDetails from './components/Students/CourseDetails';
import PaymentPage from './pages/PaymentPage';
import StudentPaymentHistory from './components/Students/StudentPaymentHistory';
import LandingChoicePage from './views/Student-Interface/LandingChoicePage.jsx';
// Admin Pages
import Dashboard from './pages/AdminDashboard/Dashboard';
import StudentManagement from './pages/AdminDashboard/StudentManagement';
import CertificateManagement from './pages/AdminDashboard/CertificateManagement';
import Notifications from './pages/AdminDashboard/Notifications';
import ActivityLog from './pages/AdminDashboard/ActivityLog';
import PaymentHistory from './pages/PaymentHistory';
import CouponAdmin from './pages/CouponAdmin';
import StaffManagement from './pages/StaffManagement';

// Courses
import CourseList from './components/Course/CourseList';
import CourseDetail from './components/Course/CourseDetail';
import CourseForm from './components/Course/CourseForm';
import ModuleForm from './components/Course/ModuleForm';
import LessonForm from './components/Course/LessonForm';

// Enquiries
import EnquiryList from './components/Enquiries/EnquiryList';
import EnquiryForm from './components/Enquiries/EnquiryForm';

// Protected route wrapper with role checking
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // If role is required, check it
  if (requiredRole) {
    try {
      const userRole = localStorage.getItem('role') || 
                       JSON.parse(localStorage.getItem('user'))?.role;
      
      if (userRole !== requiredRole) {
        // Redirect based on actual role
        return <Navigate to={userRole === 'student' ? '/student/dashboard' : '/signin'} replace />;
      }
    } catch (error) {
      console.error('Role check error:', error);
      return <Navigate to="/signin" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>

        {/* PUBLIC AUTH ROUTES */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/choose" element={<LandingChoicePage />} />

        {/* PUBLIC STUDENT ROUTES */}
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/verify" element={<PaymentPage />} />
        <Route path="/student-transactions" element={<StudentPaymentHistory />} />

        {/* ENQUIRIES */}
        <Route path="/enquiries">
          <Route index element={<EnquiryList />} />
          <Route path="add" element={<EnquiryForm />} />
          <Route path="edit/:id" element={<EnquiryForm />} />
        </Route>

        {/* STUDENT DASHBOARD */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute requiredRole="student">
              <Student />
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

        {/* ADMIN DASHBOARD - Fixed with proper role protection */}
        <Route
          path="/super-admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
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

          {/* COURSE ROUTES */}
          <Route path="courses">
            <Route index element={<CourseList />} />
            <Route path="add" element={<CourseForm />} />
            <Route path=":id" element={<CourseDetail />} />
            <Route path="edit/:id" element={<CourseForm />} />
          </Route>

          {/* MODULE ROUTES */}
          <Route path="modules">
            <Route path="add" element={<ModuleForm />} />
            <Route path="edit/:id" element={<ModuleForm />} />
          </Route>

          {/* LESSON ROUTES */}
          <Route path="lessons">
            <Route path="add" element={<LessonForm />} />
            <Route path="edit/:id" element={<LessonForm />} />
          </Route>
        </Route>

        {/* DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;