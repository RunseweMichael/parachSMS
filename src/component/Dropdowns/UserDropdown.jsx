import React, { useState, useRef, useEffect } from "react";
import { 
  User, Settings, CreditCard, HelpCircle, LogOut, ChevronDown 
} from "lucide-react";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { icon: <User className="w-4 h-4" />, label: "Profile", href: "/profile" },
    { icon: <CreditCard className="w-4 h-4" />, label: "Billing", href: "/billing" },
    { icon: <Settings className="w-4 h-4" />, label: "Settings", href: "/settings" },
    { icon: <HelpCircle className="w-4 h-4" />, label: "Help Center", href: "/help" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
          JD
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-semibold text-gray-800">John Doe</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div 
            className={`
              absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl 
              border border-gray-200/50 overflow-hidden z-50
              animate-in fade-in slide-in-from-top-2 duration-200
            `}
          >
            {/* User Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-600">john@techacademy.com</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 text-gray-700 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-gray-600 group-hover:text-blue-600 transition">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-gray-200 py-2">
              <a
                href="/logout"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-all duration-200 text-red-600 group"
                onClick={() => setIsOpen(false)}
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition" />
                <span className="text-sm font-medium">Sign Out</span>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDropdown;