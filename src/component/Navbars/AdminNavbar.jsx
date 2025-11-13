import React, { useState } from "react";
import { Search, Menu, X, Bell, LogOut, User, Settings as SettingsIcon } from "lucide-react";
import UserDropdown from "../Dropdowns/UserDropdown";
import SettingsDropdown from "../Dropdowns/SettingsDropdown";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-100 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo / Brand */}
            <div className="flex items-center">
              <a
                href="/dashboard"
                className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                  T
                </div>
                <span className="hidden sm:inline-block">Parach Academy</span>
              </a>
            </div>

      

            {/* Desktop Right Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {/* <SettingsDropdown /> */}
              <UserDropdown />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:bg-indigo-100 rounded-xl transition"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>


        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg">
            <div className="px-4 py-3 space-y-2">
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Notifications</span>
                <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition">
                <SettingsIcon className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Settings</span>
              </a>
              <div className="pt-2 border-t border-gray-200">
                <UserDropdown />
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* End Navbar */}
    </>
  );
}