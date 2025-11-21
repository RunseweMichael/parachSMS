import React, { useEffect, useState } from "react";
import axios from "../../api"; 

export default function CardCourseChoice() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`students/users/${userId}/`);
     

        const userCourse = res.data.course; 
        
        if (userCourse) {
          const formatted = {
            name: userCourse.course_name,
            icon: "fas fa-code",
            color: "from-blue-500 to-cyan-500",
          };

          setSelectedCourses([formatted]);
        }

      } catch (error) {
        console.error("Failed to fetch student profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-5 text-center text-gray-600">Loading your courses...</div>;
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg font-bold text-gray-800">Your Learning Path</h6>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md">
            <i className="fas fa-graduation-cap text-sm"></i>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        {selectedCourses.length === 0 ? (
          <p className="text-gray-500 text-sm">No course assigned.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedCourses.map((course, i) => (
              <div
                key={i}
                className={`relative p-4 rounded-xl border-2 bg-gradient-to-br ${course.color} text-white shadow-lg`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                    <i className={`${course.icon} text-white`}></i>
                  </div>

                  <div>
                    <p className="font-medium text-sm text-white">
                      {course.name}
                    </p>
                    <p className="text-xs opacity-90">Currently Enrolled</p>
                  </div>
                </div>

                <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          className="mt-5 w-full py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
        >
          Add More Courses
        </button>
      </div>
    </div>
  );
}
