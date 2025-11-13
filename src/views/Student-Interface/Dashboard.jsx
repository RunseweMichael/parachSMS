import React from "react";
import CardCourseChoice from "../../component/Cards/CardCourseChoice.jsx";
import CardSchedule from "../../component/Cards/CardSchedule.jsx";
import CardProgressChart from "../../component/Cards/CardProgressBar.jsx";
import CardSocialFollow from "../../component/Cards/CardSocialFollow.jsx";

export default function Dashboard() {
  return (
    <>
      <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 px-4 md:px-10 mx-auto w-full max-w-7xl py-8">
          {/* Row 1: Course Choice + Schedule */}
          <div className="flex flex-wrap -mx-4">
            <div className="w-full xl:w-8/12 px-4 mb-8">
              <CardCourseChoice />
            </div>
            <div className="w-full xl:w-4/12 px-4 mb-8">
              <CardSchedule />
            </div>
          </div>

          {/* Row 2: Progress Chart + Social Follow */}
          <div className="flex flex-wrap -mx-4 mt-4">
            <div className="w-full xl:w-8/12 px-4 mb-8">
              <CardProgressChart />
            </div>
            <div className="w-full xl:w-4/12 px-4 mb-8">
              <CardSocialFollow />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}