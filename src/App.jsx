import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from './views/Student-auth/Authform.jsx';
import Login from './pages/Login.jsx';
import Admin from './layout/Admin.jsx';

function App() {
  // For testing: you can temporarily bypass auth by setting this to true
  // In production, check: const user = localStorage.getItem("user_id") || localStorage.getItem("token");
  const isDevMode = true; // Set to false for production auth enforcement
  const user = isDevMode ? true : (localStorage.getItem("user_id") || localStorage.getItem("token"));
  
  // // Apply dark mode preference on app load
  // useEffect(() => {
  //   const darkModePreference = localStorage.getItem("darkMode");
  //   if (darkModePreference === "true") {
  //     document.documentElement.classList.add("dark");
  //     document.body.style.backgroundColor = "#111827";
  //   } else if (darkModePreference === "false") {
  //     document.documentElement.classList.remove("dark");
  //     document.body.style.backgroundColor = "#ffffff";
  //   }
  // }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/AdminLogin" element={<Login />} />

        {/* Admin routes */}
        {user ? (
          <Route path="/admin/*" element={<Admin />} />
        ) : (
          <Route path="/admin/*" element={<Navigate to="/AdminLogin" replace />} />
        )}

        {/* Redirect home to admin dashboard */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* Redirect all unknown paths */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
