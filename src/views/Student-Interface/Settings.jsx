import React from "react";
import CardSettings from "../../component/Cards/CardSettings.jsx";
import CardProfile from "../../component/Cards/CardProfile.jsx";

export default function Settings() {
  return (
    <>
      {/* Background with subtle gradient fade */}
      <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Optional: Subtle overlay for depth */}
        <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-wrap -mx-4 pt-10 pb-20 px-4 md:px-10 w-full max-w-7xl">
          {/* Left Column - Settings Form */}
          <div className="w-full lg:w-8/12 px-4 mb-10 lg:mb-0">
            <CardSettings />
          </div>

          {/* Right Column - Profile Card */}
          <div className="w-full lg:w-4/12 px-4">
            <CardProfile />
          </div>
        </div>
      </div>
    </>
  );
}