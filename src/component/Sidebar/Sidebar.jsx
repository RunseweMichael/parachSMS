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
  Bell,
  TrendingUp,
  Lock,
} from "lucide-react";
import api from "../../api";
import useLogout from "../../hooks/useLogout";
// import usePaymentStatus from "../../hooks/usePaymentStatus";
import logoImg from "../../assets/1000561121.jpg";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const logout = useLogout();
  // const { isLocked, loading } = usePaymentStatus();

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(saved === "true" || (!saved && prefersDark));
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const [isCertApproved, setIsCertApproved] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const BADGE_DURATION_MS = 10000;

  const menuItems = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/student/dashboard" },
    { name: "Profile", icon: <User className="w-5 h-5" />, path: "/student/profile" },
    { name: "Certificate", icon: <FileText className="w-5 h-5" />, path: "/student/certificate" },
    { name: "Payment", icon: <CreditCard className="w-5 h-5" />, path: "/student/payment", alwaysAccessible: true },
    { name: "Internship", icon: <CreditCard className="w-5 h-5" />, path: "/student/internship" },
    { name: "Tasks", icon: <FileText className="w-5 h-5" />, path: "/student/task" },
    { name: "Skills Progress", icon: <TrendingUp className="w-5 h-5" />, path: "/student/skills-progress" },

  ];

  useEffect(() => {
    let mounted = true;

    const checkCertificates = async () => {
      try {
        const res = await api.get("certificates/certificates/");
        const certs = res.data || [];
        const approved = certs.some((c) => c.is_approved === true || c.is_approved === "true" || c.is_approved === 1);
        if (!mounted) return;
        setIsCertApproved(approved);

        const badgeShown = localStorage.getItem("internshipBadgeShown") === "true";
        if (approved && !badgeShown) {
          setShowBadge(true);
          localStorage.setItem("internshipBadgeShown", "true");
          setTimeout(() => setShowBadge(false), BADGE_DURATION_MS);
        }
      } catch (err) {
        console.debug("Could not fetch certificates for sidebar badge", err);
      }
    };

    checkCertificates();
    return () => {
      mounted = false;
    };
  }, []);

  const renderMenuItem = (item, active, isMobile = false) => {
    // Payment page is always accessible
    // const isAccessible = item.alwaysAccessible || !isLocked;
    
    // Handle Internship special case
    if (item.name === "Internship") {
      if (!isCertApproved) {
        return (
          <div
            title="Available after certificate approval"
            className="flex items-center gap-3 p-3 rounded-lg text-blue-100 opacity-50 cursor-not-allowed"
          >
            {item.icon}
            {(open || isMobile) && <span className="text-sm">{item.name}</span>}
          </div>
        );
      }
      
      if (!isAccessible) {
        return (
          <div
            title="Payment required to access"
            className="flex items-center gap-3 p-3 rounded-lg text-blue-100 opacity-50 cursor-not-allowed"
          >
            {item.icon}
            {(open || isMobile) && <span className="text-sm">{item.name}</span>}
            <Lock className="w-4 h-4 ml-auto" />
          </div>
        );
      }
    }

    // Locked items (non-payment pages)
    // if (!isAccessible) {
    //   return (
    //     <div
    //       title="Payment required to access"
    //       className="flex items-center gap-3 p-3 rounded-lg text-blue-100 opacity-50 cursor-not-allowed"
    //     >
    //       {item.icon}
    //       {(open || isMobile) && <span className="text-sm">{item.name}</span>}
    //       <Lock className="w-4 h-4 ml-auto" />
    //     </div>
    //   );
    // }

    // Accessible items
    return (
      <Link
        to={item.path}
        onClick={isMobile ? () => setMobileOpen(false) : undefined}
        className={`flex items-center gap-3 p-3 rounded-lg transition-all 
          ${active ? "bg-white/20 text-white font-semibold shadow-md"
            : "text-blue-100 hover:bg-white/10 hover:text-white"}`}
      >
        {item.icon}
        {(open || isMobile) && <span className="text-sm">{item.name}</span>}
        {/* Show Internship badge only if payment is done and certificate approved */}
        {item.name === "Internship" && isCertApproved && !isLocked && showBadge && (
          <Bell className="w-4 h-4 text-amber-300 ml-2 animate-pulse" />
        )}
      </Link>
    );
  };

  // if (loading) {
  //   return null; // Or a loading spinner
  // }

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
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-lg bg-white">
                <img 
                src={logoImg} 
                alt="Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            {open && <span className="text-lg font-semibold tracking-wide">Parach ICT Academy</span>}
          </Link>
        </div>

        {/* Payment Lock Warning */}
        {/* {isLocked && open && (
          <div className="mx-3 mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
            <div className="flex items-center gap-2 text-red-100 mb-1">
              <Lock className="w-4 h-4" />
              <span className="text-xs font-semibold">Account Locked</span>
            </div>
            <p className="text-xs text-red-100/80">Payment overdue</p>
          </div>
        )} */}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto mt-5">
          <ul className="flex flex-col gap-2 px-3">
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.name}>
                  {renderMenuItem(item, active, false)}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* LOGOUT */}
        <div className="px-3 pb-4">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-blue-100 hover:bg-white/10 hover:text-white
                       rounded-lg p-3 transition-all w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            {open && <span className="text-sm">Log Out</span>}
          </button>
        </div>
      </aside>

      {/* MOBILE HAMBURGER BUTTON */}
      <div className="md:hidden fixed left-0 top-1/2 transform -translate-y-1/2 z-40">
        <button 
          onClick={() => setMobileOpen(true)}
          className="bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-3 rounded-r-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* MOBILE SIDEBAR DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div 
            className="flex-1 bg-black/50 backdrop-blur-sm" 
            onClick={() => setMobileOpen(false)} 
          />

          {/* Sidebar */}
          <div className="w-64 bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-5 flex flex-col shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
              <Link to="/student/dashboard" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
               <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-lg bg-white">
                <img 
                src={logoImg} 
                alt="Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
                <span className="font-semibold">Parach ICT Academy</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Payment Lock Warning */}
            {isLocked && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
                <div className="flex items-center gap-2 text-red-100 mb-1">
                  <Lock className="w-4 h-4" />
                  <span className="text-xs font-semibold">Account Locked</span>
                </div>
                <p className="text-xs text-red-100/80">Payment overdue</p>
              </div>
            )}

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-3">
                {menuItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <li key={item.name}>
                      {renderMenuItem(item, active, true)}
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
                         rounded-lg p-3 mt-2 w-full text-left"
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
