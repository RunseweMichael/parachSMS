import React from "react";

export default function CardCourseChoice() {
  const courses = [
    { name: "Full-Stack Web Dev", icon: "fas fa-code", color: "from-blue-500 to-cyan-500", enrolled: true },
    { name: "Data Science & AI", icon: "fas fa-brain", color: "from-purple-500 to-pink-500", enrolled: false },
    { name: "UI/UX Design", icon: "fas fa-paint-brush", color: "from-orange-400 to-red-500", enrolled: false },
    { name: "DevOps & Cloud", icon: "fas fa-cloud", color: "from-indigo-500 to-blue-600", enrolled: false },
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg font-bold text-gray-800">Your Learning Path</h6>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md">
            <i className="fas fa-graduation-cap text-sm"></i>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((course, i) => (
            <div
              key={i}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                course.enrolled
                  ? "bg-gradient-to-br " + course.color + " text-white border-transparent shadow-lg"
                  : "bg-white/60 border-gray-200 hover:border-blue-400 hover:shadow-md"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full ${course.enrolled ? "bg-white/30" : "bg-gray-100"} flex items-center justify-center`}>
                  <i className={`${course.icon} ${course.enrolled ? "text-white" : "text-gray-600"}`}></i>
                </div>
                <div>
                  <p className={`font-medium text-sm ${course.enrolled ? "text-white" : "text-gray-800"}`}>
                    {course.name}
                  </p>
                  {course.enrolled && <p className="text-xs opacity-90">Currently Enrolled</p>}
                </div>
              </div>
              {course.enrolled && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="mt-5 w-full py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
          Explore All Courses
        </button>
      </div>
    </div>
  );
}