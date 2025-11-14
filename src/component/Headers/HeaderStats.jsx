import React from "react";
import CardStats from "../Cards/CardStats.jsx";

export default function HeaderStats() {
  return (
    <>
      {/* Modern blue header */}
      <div className="relative bg-linear-to-b from-blue-600 to-indigo-700 md:pt-32 pb-32 pt-12  overflow-hidden">
        {/* Subtle dark overlay for depth */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Light gradient fade from bottom */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        <div className="px-4 md:px-10 mx-auto w-full relative z-10">
          <div>
            {/* Card Stats Grid */}
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
                <CardStats
                  statSubtitle="PAYMENT STATUS"
                  statPercentColor="text-emerald-400"
                  statIconColor="bg-gradient-to-br from-red-500 to-pink-500"
                  hoverEffect
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
                <CardStats
                  statSubtitle="NEW USERS"
                  statPercentColor="text-red-400"
                  statIconColor="bg-gradient-to-br from-orange-400 to-yellow-500"
                  hoverEffect
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
                <CardStats
                  statSubtitle="SALES"
                  statIconName="fas fa-users"
                  statIconColor="bg-gradient-to-br from-pink-500 to-rose-500"
                  hoverEffect
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statPercentColor="text-emerald-400"
                  statIconColor="bg-gradient-to-br from-cyan-500 to-blue-600"
                  hoverEffect
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}