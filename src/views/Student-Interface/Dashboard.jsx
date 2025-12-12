import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircle, AlertCircle } from "lucide-react";
import CardProgressChart from "../../component/Cards/CardProgressBar.jsx";
import CourseDetails from "../../components/Students/CourseDetails.jsx";
import api from "../../api";
import OnboardingModal from "../Student-Interface/OnboardingModal.jsx";
import usePaymentStatus from "../../hooks/usePaymentStatus";
import CardSchedule from "../../component/Cards/CardSchedule.jsx";
import CardSocialFollow from "../../component/Cards/CardSocialFollow.jsx";



export default function Dashboard() {
  const navigate = useNavigate();
  const { isLocked, loading: paymentLoading } = usePaymentStatus();

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tour State
  const [showDashboardTour, setShowDashboardTour] = useState(false);
  // We use this to prevent redirecting while we are determining if tour should show
  const [checkingTourStatus, setCheckingTourStatus] = useState(true);

  // 1. Check Tour Logic
  useEffect(() => {
    if (paymentLoading) return;

    const userId = localStorage.getItem("user_id");
    const part1Seen = localStorage.getItem(`tour_part1_seen_${userId}`);
    const fullTourComplete = localStorage.getItem(`dashboard_tour_completed_${userId}`);

    let shouldShowTour = false;

    // SCENARIO 1: Locked & hasn't seen Part 1
    if (isLocked && !part1Seen) {
      shouldShowTour = true;
    }
    // SCENARIO 2: Unlocked & hasn't seen full tour
    else if (!isLocked && !fullTourComplete) {
      shouldShowTour = true;
    }

    if (shouldShowTour) {
      // Delay slightly for UI smoothness
      const timer = setTimeout(() => {
        setShowDashboardTour(true);
        setCheckingTourStatus(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setCheckingTourStatus(false);
    }
  }, [isLocked, paymentLoading]);

  // 2. Redirect Logic
  useEffect(() => {
    // Don't redirect if loading, checking tour, or if tour is currently open
    if (paymentLoading || checkingTourStatus || showDashboardTour) return;

    // Only redirect if Locked AND we are strictly not showing the tour
    if (isLocked) {
      navigate("/student/payment", { replace: true });
    }
  }, [isLocked, paymentLoading, checkingTourStatus, showDashboardTour, navigate]);

  // 3. Fetch Courses
  useEffect(() => {
    const fetchUserCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("students/me/", {
          headers: { Authorization: `Token ${token}` },
        });
        const courseData = res.data.course ? [res.data.course] : res.data.courses || [];
        setCourses(courseData);
      } catch (err) {
        console.error("Failed to load user courses", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserCourse();
  }, []);

  // 4. Handle Course Details View
  if (selectedCourseId) {
    // FIX: Removed duplicate return and ensured onBack is present
    return <CourseDetails id={selectedCourseId} onBack={() => setSelectedCourseId(null)} />;
  }

  // 5. Prevent "Flash of content" before redirect
  if (!paymentLoading && !checkingTourStatus && !showDashboardTour && isLocked) {
    return null; 
  }

  return (
    <>
      {/* Main Content Wrapper - Gets Blurred if Locked */}
      <div className={`relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-filter duration-300 ${isLocked ? 'blur-sm pointer-events-none select-none' : ''}`}>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 px-4 md:px-10 mx-auto w-full max-w-7xl py-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Left Column */}
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

            {/* Right Column (Placeholder for missing components if needed) */}
            <div className="xl:col-span-4 space-y-8">
            <CardSchedule />
            <CardSocialFollow />
          </div>

          </div>
        </div>
      </div>


      {showDashboardTour && (
        <OnboardingModal
          type="post-verification"
          isOpen={showDashboardTour}
          isLocked={isLocked}
          
          onComplete={() => {
            const userId = localStorage.getItem("user_id");
            if (isLocked) {
              localStorage.setItem(`tour_part1_seen_${userId}`, 'true');
         
              setShowDashboardTour(false); 
            } else {
              localStorage.setItem(`dashboard_tour_completed_${userId}`, 'true');
              setShowDashboardTour(false);
            }
          }}

          onSkip={() => {
            const userId = localStorage.getItem("user_id");
            localStorage.setItem(`dashboard_tour_completed_${userId}`, 'true');
            
            localStorage.setItem(`tour_part1_seen_${userId}`, 'true');
            setShowDashboardTour(false);
          }}
        />
      )}
    </>
  );
}