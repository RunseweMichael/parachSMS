import React, { useState, useEffect, useRef } from "react";
import { 
  Moon, Sun, Globe, Bell, BellOff, Eye, EyeOff, ChevronDown, Settings
} from "lucide-react";

const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      return saved === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const dropdownRef = useRef(null);

  // Apply dark mode to document and persist preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#111827"; // gray-950
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "en", flag: "US", name: "English" },
    { code: "es", flag: "ES", name: "Español" },
    { code: "fr", flag: "FR", name: "Français" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={`
            absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl 
            border border-gray-200/50 overflow-hidden z-50
            animate-in fade-in slide-in-from-top-2 duration-200
            dark:bg-gray-900/95 dark:border-gray-700/50
          `}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Settings</h3>
            </div>

            {/* Dark Mode */}
            <SettingItem
              icon={darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              label="Dark Mode"
              control={
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`
                    relative w-12 h-6 rounded-full transition-all duration-300
                    ${darkMode ? "bg-blue-600" : "bg-gray-300"}
                  `}
                >
                  <span
                    className={`
                      absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md
                      transition-transform duration-300
                      ${darkMode ? "translate-x-6" : "translate-x-0"}
                    `}
                  />
                </button>
              }
            />

            {/* Language */}
            <SettingItem
              icon={<Globe className="w-5 h-5" />}
              label="Language"
              control={
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              }
            />

            {/* Notifications */}
            <SettingItem
              icon={notifications ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
              label="Notifications"
              control={
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`
                    w-10 h-6 rounded-full transition-all duration-300 flex items-center
                    ${notifications ? "bg-blue-600 justify-end" : "bg-gray-300 justify-start"}
                  `}
                >
                  <span className="w-5 h-5 bg-white rounded-full shadow-md" />
                </button>
              }
            />

            {/* Profile Visibility */}
            <SettingItem
              icon={profileVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              label="Public Profile"
              control={
                <button
                  onClick={() => setProfileVisible(!profileVisible)}
                  className={`
                    w-10 h-6 rounded-full transition-all duration-300 flex items-center
                    ${profileVisible ? "bg-emerald-500 justify-end" : "bg-gray-300 justify-start"}
                  `}
                >
                  <span className="w-5 h-5 bg-white rounded-full shadow-md" />
                </button>
              }
            />

            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition">
                View All Settings
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Reusable Setting Row
const SettingItem = ({ icon, label, control }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
      <div className="flex items-center space-x-3">
        <span className="text-gray-600 dark:text-gray-400">{icon}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      </div>
      <div>{control}</div>
    </div>
  );
};

export default SettingsDropdown;