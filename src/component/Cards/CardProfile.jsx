import React from "react";

export default function CardProfile() {
  return (
    <div className="relative flex flex-col min-w-0 wrap-break-word bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="px-6 py-8 text-center">
        {/* Avatar with gradient ring */}
        <div className="relative inline-block mb-5">
          <div className="w-28 h-28 mx-auto rounded-full bg-linear-to-br from-blue-500 to-indigo-600 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-white p-1">
              <img
                alt="Profile"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-md">
            <i className="fas fa-check text-white text-xs"></i>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800">Alex Thompson</h3>
        <p className="text-sm text-gray-500 mt-1">@alexthomp</p>

        <div className="mt-4 flex justify-center gap-4 text-gray-600">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">2.4k</p>
            <p className="text-xs">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">184</p>
            <p className="text-xs">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">89</p>
            <p className="text-xs">Awards</p>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="text-left space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Role</span>
            <span className="font-medium text-gray-800">Senior Developer</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Member Since</span>
            <span className="font-medium text-gray-800">Jan 2023</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span className="font-medium text-emerald-600 flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></span>
              Active
            </span>
          </div>
        </div>

        <button className="mt-6 w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
          View Full Profile
        </button>
      </div>
    </div>
  );
}