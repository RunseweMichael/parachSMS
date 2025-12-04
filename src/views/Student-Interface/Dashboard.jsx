import React, { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";
import CardSchedule from "../../component/Cards/CardSchedule.jsx";
import CardProgressChart from "../../component/Cards/CardProgressBar.jsx";
import CardSocialFollow from "../../component/Cards/CardSocialFollow.jsx";
import CourseDetails from "../../components/Students/CourseDetails.jsx"
import api from "../../api";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCourse = async () => {
      try {
        const token = localStorage.getItem("token");

        // Get logged-in user + their assigned course(s)
        const res = await api.get("students/me/", {
          headers: { Authorization: `Token ${token}` },
        });

        // Convert to array in case it's one course
        const courseData = res.data.course
          ? [res.data.course]
          : res.data.courses || [];

        setCourses(courseData);
      } catch (err) {
        console.error("Failed to load user courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourse();
  }, []);

  // If a course is clicked → show its full details
  if (selectedCourseId) {
    return <CourseDetails id={selectedCourseId} />;
  }

  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent pointer-events-none"></div>

      <div className="relative z-10 px-4 md:px-10 mx-auto w-full max-w-7xl py-8">
        
        {/* Row 1: Course List + Schedule */}
        <div className="flex flex-wrap -mx-4">
          
          {/* Courses Section */}
          <div className="w-full xl:w-8/12 px-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold text-blue-700 mb-4">My Courses</h2>

              {loading ? (
                <p>Loading courses...</p>
              ) : courses.length === 0 ? (
                <p className="text-slate-600">No course assigned yet.</p>
              ) : (
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourseId(course.id)}
                      className="p-4 bg-blue-50 border border-blue-200 rounded-xl cursor-pointer hover:bg-blue-100 transition flex items-center gap-3"
                    >
                      <PlayCircle className="text-blue-600 w-6 h-6" />
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800">
                          {course.course_name}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          Click to view full course details
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Schedule Section */}
          <div className="w-full xl:w-4/12 px-4 mb-8">
            <CardSchedule />
          </div>
        </div>

        {/* Row 2 */}
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
  );
}
