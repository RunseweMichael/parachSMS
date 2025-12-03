// Fixed App.jsx with proper role-based routing
import React from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
   
//404 page
import NotFound from './component/404page.jsx';

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
import PaymentPage from '../src/views/Student-Interface/PaymentDashboard.jsx';
import StudentPaymentHistory from './components/Students/StudentPaymentHistory';
import LandingChoicePage from './views/Student-Interface/LandingChoicePage.jsx'

// Admin Pages
import Dashboard from './pages/AdminDashboard/Dashboard';
import StudentManagement from './pages/AdminDashboard/StudentManagement';
import CertificateManagement from './pages/AdminDashboard/CertificateManagement';
import Notifications from './pages/AdminDashboard/Notifications';
import ActivityLog from './pages/AdminDashboard/ActivityLog';
import PaymentHistory from './pages/PaymentHistory';
import CouponAdmin from './pages/CouponAdmin';
import StaffManagement from './pages/StaffManagement';
import AdminInternshipRequests from './pages/AdminInternshipRequests.jsx';

// Courses
import CourseList from './components/Course/CourseList';
import CourseDetail from './components/Course/CourseDetail';
import CourseForm from './components/Course/CourseForm';
import ModuleForm from './components/Course/ModuleForm';
import LessonForm from './components/Course/LessonForm';

// Enquiries
import EnquiryList from './components/Enquiries/EnquiryList';
import EnquiryForm from './views/Student-Interface/Enquiry.jsx';

// Internship
import Internship from './views/Student-Interface/Internship.jsx';
import TaskManagement from './views/Student-Interface/TaskManagementSystem.jsx'
import SkillsProgress from './pages/SkillsProgress.jsx';

// Protected route wrapper with role checking
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const user = localStorage.getItem('user');
  

  
  if (!token) {
    console.log('[ProtectedRoute] No token → redirecting to /signin');
    return <Navigate to="/signin" replace />;
  }

  // If role is required, check it
  if (requiredRole) {
    try {
      const checkRole = localStorage.getItem('role') || 
                       JSON.parse(localStorage.getItem('user'))?.role;
      
      
      
      if (checkRole !== requiredRole) {
        // Redirect based on actual role
        console.log('[ProtectedRoute] Role mismatch → redirecting');
        return <Navigate to={checkRole === 'student' ? '/student/dashboard' : '/signin'} replace />;
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
          <Route path="add" element={<EnquiryForm />} />
        </Route>

        {/* STUDENT DASHBOARD - FIXED: Removed nested Routes inside Student layout */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute requiredRole="student">
              <Student />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/*"
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
          <Route path="internship-requests" element={<AdminInternshipRequests />} />

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

          {/* ENQUIRIES */}
          <Route path="enquiries">
            <Route index element={<EnquiryList />} />
            <Route path="add" element={<EnquiryForm />} />
            <Route path="edit/:id" element={<EnquiryForm />} />
          </Route>

          {/* LESSON ROUTES */}
          <Route path="lessons">
            <Route path="add" element={<LessonForm />} />
            <Route path="edit/:id" element={<LessonForm />} />
          </Route>
        </Route>

        {/* DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/choose" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;