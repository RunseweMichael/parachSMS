import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import AdminNavbar from "../component/Navbars/AdminNavbar.jsx";
import Sidebar from "../component/Sidebar/Sidebar.jsx";
import HeaderStats from "../component/Headers/HeaderStats.jsx";
import FooterAdmin from "../component/Footers/FooterAdmin.jsx";

// Views
import Dashboard from "../views/Student-Interface/Dashboard.jsx";
import Maps from "../views/Student-Interface/PaymentDashboard.jsx";
import Settings from "../views/Student-Interface/Settings.jsx";
import Tables from "../views/Student-Interface/CertificateDashboard.jsx";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen  duration-300">
        {/* <AdminNavbar /> */}
        {/* Header */}
        <HeaderStats />

        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="maps" element={<Maps />} />
            <Route path="settings" element={<Settings />} />
            <Route path="tables" element={<Tables />} />

            {/* Default redirect to /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            {/* Or catch-all for /admin/* */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>

        </div>
      </div>
    </>
  );
}
