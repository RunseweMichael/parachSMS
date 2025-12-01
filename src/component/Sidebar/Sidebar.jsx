// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  FileText,
  CreditCard,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Bell
} from "lucide-react";
import api from "../../api";
import useLogout from "../../hooks/useLogout"; // <-- NEW

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const logout = useLogout(); // <-- NEW centralized logout

  // Load dark mode setting
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(saved === "true" || (!saved && prefersDark));
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const [isCertApproved, setIsCertApproved] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  // How long the badge should be visible (milliseconds)
  const BADGE_DURATION_MS = 10000; // 10s

  const menuItems = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/student/dashboard" },
    { name: "Profile", icon: <User className="w-5 h-5" />, path: "/student/profile" },
    { name: "Certificate", icon: <FileText className="w-5 h-5" />, path: "/student/certificate" },
    { name: "Payment", icon: <CreditCard className="w-5 h-5" />, path: "/student/payment" },
    { name: "Internship", icon: <CreditCard className="w-5 h-5" />, path: "/student/internship" }
  ];

  // Check if the student has any approved certificates
  useEffect(() => {
    let mounted = true;

    const checkCertificates = async () => {
      try {
        const res = await api.get("certificates/certificates/");
        const certs = res.data || [];
        const approved = certs.some((c) => c.is_approved === true || c.is_approved === "true" || c.is_approved === 1);
        if (!mounted) return;
        setIsCertApproved(approved);

        // Show badge once when approval is first observed
        const badgeShown = localStorage.getItem("internshipBadgeShown") === "true";
        if (approved && !badgeShown) {
          setShowBadge(true);
          localStorage.setItem("internshipBadgeShown", "true");
          setTimeout(() => setShowBadge(false), BADGE_DURATION_MS);
        }
      } catch (err) {
        // silently fail; sidebar shouldn't break if API fails
        console.debug("Could not fetch certificates for sidebar badge", err);
      }
    };

    checkCertificates();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden md:flex fixed inset-y-0 left-0 z-50 flex-col transition-all duration-500
        ${open ? "w-64" : "w-20"} bg-gradient-to-b from-blue-600 to-indigo-700 text-white`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/20">
          <Link to="/student/dashboard" className="flex items-center gap-2 select-none">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center text-lg font-bold">
              P
            </div>
            {open && <span className="text-lg font-semibold tracking-wide">Parach ICT</span>}
          </Link>

          {/* <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-white/10">
            {open ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button> */}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto mt-5">
          <ul className="flex flex-col gap-2 px-3">
            {menuItems.map((item) => {
              const active = location.pathname === item.path;

              // Special handling for Internship item: remain dormant until certificate approved
              if (item.name === "Internship") {
                if (isCertApproved) {
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2 p-3 rounded-lg transition-all 
                      ${active ? "bg-white/20 text-white font-semibold shadow-md"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"}`}
                      >
                        {item.icon}
                        {open && <span className="text-sm">{item.name}</span>}
                        {showBadge && (
                          <Bell className="w-4 h-4 text-amber-300 ml-2 animate-pulse" />
                        )}
                      </Link>
                    </li>
                  );
                }

                // Not approved yet: show dormant, non-clickable item
                return (
                  <li key={item.name}>
                    <div
                      title="Available after certificate approval"
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all text-blue-100 opacity-50 cursor-not-allowed`}
                    >
                      {item.icon}
                      {open && <span className="text-sm">{item.name}</span>}
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all 
                      ${active ? "bg-white/20 text-white font-semibold shadow-md"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"}`}
                  >
                    {item.icon}
                    {open && <span className="text-sm">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Dark Mode */}
        <div className="px-3 pb-3">
          <button onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              {open && <span className="text-sm">Dark Mode</span>}
            </div>
          </button>
        </div>

        {/* LOGOUT */}
        <div className="px-3 pb-4">
          <button
            onClick={logout}     // <-- uses central logout handler
            className="flex items-center gap-3 text-blue-100 hover:bg-white/10 hover:text-white
                       rounded-lg p-3 transition-all w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            {open && <span className="text-sm">Log Out</span>}
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40 flex items-center justify-between 
                      px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <Link to="/student/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold">P</div>
          <span className="font-semibold">Parach ICT</span>
        </Link>

        <button onClick={() => setMobileOpen(true)} className="p-2 hover:bg-white/10">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />

          <div className="w-64 bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-5 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-3">
                {menuItems.map((item) => {
                  const active = location.pathname === item.path;

                  if (item.name === "Internship") {
                    if (isCertApproved) {
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all
                            ${active ? "bg-white/20 text-white" : "text-blue-100 hover:bg-white/10"}`}
                          >
                            {item.icon}
                            <span className="text-sm">{item.name}</span>
                            {showBadge && <Bell className="w-4 h-4 text-amber-300 ml-2 animate-pulse" />}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={item.name}>
                        <div
                          className="flex items-center gap-3 p-3 rounded-lg text-blue-100 opacity-50 cursor-not-allowed"
                          title="Available after certificate approval"
                        >
                          {item.icon}
                          <span className="text-sm">{item.name}</span>
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all
                        ${active ? "bg-white/20 text-white" : "text-blue-100 hover:bg-white/10"}`}
                      >
                        {item.icon}
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Logout */}
            <button
              onClick={() => {
                setMobileOpen(false);
                logout();
              }}
              className="flex items-center gap-3 text-blue-100 hover:bg-white/10 hover:text-white 
                         rounded-lg p-3 mt-4 w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
