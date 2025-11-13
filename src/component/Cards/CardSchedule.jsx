import React from "react";

export default function CardSchedule() {
  const days = [
    { day: "Mon", sessions: 3, color: "bg-blue-500" },
    { day: "Tue", sessions: 3, color: "bg-indigo-500" },
    { day: "Wed", sessions: 3, color: "bg-purple-500" },
    { day: "Thu", sessions: 2, color: "bg-pink-500" },
    { day: "Fri", sessions: 2, color: "bg-rose-500" },
    { day: "Sat", sessions: 0, color: "bg-gray-300" },
    { day: "Sun", sessions: 0, color: "bg-gray-300" },
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg font-bold text-gray-800">Weekly Schedule</h6>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-md">
            <i className="fas fa-calendar-alt text-sm"></i>
          </div>
        </div>
        <p className="text-xs text-gray-600">3–2 Format (Mon–Fri)</p>
      </div>

      <div className="px-6 pb-6">
        <div className="space-y-2">
          {days.map((d, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 w-12">{d.day}</span>
              <div className="flex space-x-1 flex-1 mx-2">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className={`h-8 flex-1 rounded-lg transition-all ${
                      j < d.sessions ? d.color + " shadow-sm" : "bg-gray-200"
                    }`}
                  ></div>
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-600 w-10 text-right">{d.sessions > 0 ? `${d.sessions}h` : "—"}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center space-x-3 text-xs">
          <span className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded mr-1"></div> Live Class</span>
          <span className="flex items-center"><div className="w-3 h-3 bg-gray-200 rounded mr-1"></div> Off</span>
        </div>
      </div>
    </div>
  );
}