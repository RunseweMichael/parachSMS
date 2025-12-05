// src/layout/Student.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../component/Sidebar/Sidebar.jsx";
import HeaderStats from "../component/Headers/HeaderStats.jsx";
import {CourseProvider} from "../hooks/CourseContext.jsx";

// Import all student pages
import Dashboard from "../views/Student-Interface/Dashboard.jsx";
import Payment from "../views/Student-Interface/PaymentDashboard.jsx";
import Profile from "../views/Student-Interface/StudentProfile.jsx";
import Certificate from "../views/Student-Interface/CertificateDashboard.jsx";
import TaskManagement from "../views/Student-Interface/TaskManagementSystem.jsx";
import Internship from "../views/Student-Interface/Internship.jsx";
import SkillsProgress from "../pages/SkillsProgress.jsx";

export default function Student() {
  return (
    <div className="min-h-screen bg-blueGray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="relative ml-0 md:ml-64 bg-blueGray-100 min-h-screen">
        {/* Header */}
        <HeaderStats />

        {/* Page content */}
        <div className="px-4 md:px-10 mx-auto w-full  pb-8">

          <CourseProvider>

        
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="payment" element={<Payment />} />
            <Route path="profile" element={<Profile />} />
            <Route path="certificate" element={<Certificate />} />
            <Route path="internship" element={<Internship />} />
            <Route path="task" element={<TaskManagement />} />
            <Route path="skills-progress" element={<SkillsProgress />} />
            
            {/* Catch any other paths and redirect to dashboard */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
            </CourseProvider>
        </div>
      </div>
    </div>
  );
}