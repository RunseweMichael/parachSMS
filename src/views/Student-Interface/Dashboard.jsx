import React, { useEffect, useState } from "react";
// 1. Added AlertCircle to imports
import { PlayCircle, AlertCircle } from "lucide-react"; 
// 2. Check your paths: 'component' vs 'components'
import CardSchedule from "../../component/Cards/CardSchedule.jsx"; 
import CardProgressChart from "../../component/Cards/CardProgressBar.jsx";
import CardSocialFollow from "../../component/Cards/CardSocialFollow.jsx";
import CourseDetails from "../../components/Students/CourseDetails.jsx";
import api from "../../api";
import OnboardingModal from "../Student-Interface/OnboardingModal.jsx";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDashboardTour, setShowDashboardTour] = useState(false);

  useEffect(() => {
    const fetchUserCourse = async () => {
      try {
        const token = localStorage.getItem("token");

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
        // 3. Update error state so the UI reacts
        setError("Failed to load courses. Please try again."); 
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourse();
  }, []);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('dashboard_tour_completed');
    if (!hasSeenTour) {
      setTimeout(() => setShowDashboardTour(true), 500);
    }
  }, []);

  // 4. Pass a callback to CourseDetails to allow going back (Optional but recommended)
  if (selectedCourseId) {
    return (
      <CourseDetails 
        id={selectedCourseId} 
        onBack={() => setSelectedCourseId(null)} // Assuming CourseDetails accepts this prop
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

      <div className="relative z-10 px-4 md:px-10 mx-auto w-full max-w-7xl py-8">
        
        {/* Row 1: Course List + Schedule */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Courses Section (Left Side) */}
          <div className="xl:col-span-8 gap-7">
            <div className="bg-white p-6 rounded-xl shadow h-auto mb-5">
              <h2 className="text-xl font-bold text-blue-700 mb-4">My Courses</h2>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-slate-600">Loading courses...</span>
                </div>
              ) : error ? (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              ) : courses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-600 text-lg">No course assigned yet.</p>
                  <p className="text-slate-500 text-sm mt-2">Check back later or contact your administrator.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourseId(course.id)}
                      className="p-4 bg-blue-50 border border-blue-200 rounded-xl cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 flex items-center gap-3 group"
                    >
                      <PlayCircle className="text-blue-600 group-hover:text-blue-700 w-6 h-6 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-800 group-hover:text-blue-900">
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
            
            <div className="mt-16">
              <CardProgressChart />
            </div>
          </div>

          {/* Right Sidebar - Schedule & Social */}
          <div className="xl:col-span-4 space-y-8">
            <CardSchedule />
            <CardSocialFollow />
          </div>

        </div>
      </div>

      {/* 5. MOVED MODAL INSIDE RETURN */}
      {showDashboardTour && (
        <OnboardingModal 
          type="post-verification"
          isOpen={showDashboardTour}
          onComplete={() => {
            localStorage.setItem('dashboard_tour_completed', 'true');
            setShowDashboardTour(false);
          }}
          onSkip={() => {
            localStorage.setItem('dashboard_tour_completed', 'true');
            setShowDashboardTour(false);
          }}
        />
      )}
    </div>
  );
}