import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { PlayCircle, AlertCircle } from "lucide-react";
import CardSchedule from "../../component/Cards/CardSchedule.jsx";
import CardProgressChart from "../../component/Cards/CardProgressBar.jsx";
import CardSocialFollow from "../../component/Cards/CardSocialFollow.jsx";
import CourseDetails from "../../components/Students/CourseDetails.jsx";
import api from "../../api";
import OnboardingModal from "../Student-Interface/OnboardingModal.jsx";
import usePaymentStatus from "../../hooks/usePaymentStatus"; // Your payment hook

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLocked, loading: paymentLoading } = usePaymentStatus();
  
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. Setup Tour State
  const [showDashboardTour, setShowDashboardTour] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(true); // Default to true to prevent flicker

  // 2. Check if Tour is done (RUNS ONCE ON MOUNT)
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const tourKey = `dashboard_tour_completed_${userId}`;
    const hasSeenTour = localStorage.getItem(tourKey);

    if (!hasSeenTour) {
      setTourCompleted(false); // Tour is NOT done
      // Small delay to ensure UI renders before modal pops
      setTimeout(() => setShowDashboardTour(true), 1000); 
    } else {
      setTourCompleted(true); // Tour IS done
    }
  }, []);

  // 3. Handle Redirect Logic (THE FIX)
  useEffect(() => {
    // Wait for payment loading to finish
    if (paymentLoading) return;

    // IF account is locked
    // AND the tour is ALREADY completed (or skipped)
    // THEN redirect.
    // (This stops the redirect if the tour is currently running)
    if (isLocked && tourCompleted) {
      navigate("/student/payment", { replace: true });
    }
  }, [isLocked, paymentLoading, tourCompleted, navigate]);

  // Fetch Courses Logic...
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

  // Render logic...
  if (selectedCourseId) {
    return <CourseDetails id={selectedCourseId} onBack={() => setSelectedCourseId(null)} />;
  }

  // 4. IMPORTANT: Don't return null if locked but tour is showing!
  // Only return null if locked AND tour is done (because the useEffect above will redirect)
  if (!paymentLoading && isLocked && tourCompleted) {
     return null; 
  }

  return (
    <div className={`relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${isLocked ? 'blur-sm pointer-events-none' : ''}`}>
      {/* 
         Note: I added 'blur-sm pointer-events-none' above. 
         This visually "locks" the background while the tour modal is active 
      */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

      <div className="relative z-10 px-4 md:px-10 mx-auto w-full max-w-7xl py-8">
        {/* ... Your Existing Dashboard Grid Code ... */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
           {/* Copy your Card/Grid code here */}
           <div className="xl:col-span-8 gap-7">
              {/* ... Courses List ... */}
               <div className="bg-white p-6 rounded-xl shadow h-auto mb-5">
                  <h2 className="text-xl font-bold text-blue-700 mb-4">My Courses</h2>
                  {/* ... loading/error/list logic ... */}
                  {loading && <p>Loading...</p>}
                  {!loading && !error && courses.map(c => (
                     <div key={c.id} className="p-4 border mb-2">{c.course_name}</div>
                  ))}
               </div>
           </div>
           
           <div className="xl:col-span-4 space-y-8">
             <CardSchedule />
             <CardSocialFollow />
           </div>
        </div>
      </div>

      {/* 5. The Modal - Now it has time to render! */}
      {showDashboardTour && (
        <div className="pointer-events-auto"> 
        {/* pointer-events-auto ensures the modal is clickable even if background is locked */}
          <OnboardingModal 
            type="post-verification"
            isOpen={showDashboardTour}
            onComplete={() => {
              const userId = localStorage.getItem("user_id");
              localStorage.setItem(`dashboard_tour_completed_${userId}`, 'true');
              setTourCompleted(true); // This triggers the Redirect useEffect!
              setShowDashboardTour(false);
            }}
            onSkip={() => {
              const userId = localStorage.getItem("user_id");
              localStorage.setItem(`dashboard_tour_completed_${userId}`, 'true');
              setTourCompleted(true); // This triggers the Redirect useEffect!
              setShowDashboardTour(false);
            }}
          />
        </div>
      )}
    </div>
  );
}