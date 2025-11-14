import React from "react";

export default function CardSettings() {
  return (
    <div className="relative flex flex-col min-w-0 wrap-break-word bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h6 className="text-xl font-bold text-gray-800">Account Settings</h6>
          <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <i className="fas fa-cog text-sm"></i>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="John Doe"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="john@example.com"
                defaultValue="john@example.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Bio</label>
            <textarea
              rows="4"
              className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              placeholder="Tell us about yourself..."
              defaultValue="Full-stack developer passionate about UI/UX and modern web apps."
            ></textarea>
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New York"
                defaultValue="San Francisco"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Country</label>
              <select className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-6 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 text-sm font-medium text-white bg-linear-to-r from-blue-600 to-indigo-700 rounded-xl hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}