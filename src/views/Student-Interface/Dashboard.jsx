import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircle, AlertCircle, Youtube, Play } from "lucide-react";
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
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Tour State
  const [showDashboardTour, setShowDashboardTour] = useState(false);
  const [checkingTourStatus, setCheckingTourStatus] = useState(true);

  // Featured Videos Configuration
  const featuredVideos = [
    {
      id: 1,
      title: "Welcome to Parach ICT Academy",
      description: "Get started with your learning journey at Parach ICT Academy",
      videoId: "kykMRl8yJKs",
      thumbnail: "https://img.youtube.com/vi/kykMRl8yJKs/maxresdefault.jpg",
      category: "Introduction"
    },
    {
      id: 2,
      title: "Tech Skills to Learn in 2025 and Beyond",
      description: "Stay ahead with the latest tech skills in demand",
      videoId: "B1a_MConMFo", // Replace with actual YouTube video ID
      thumbnail: "https://img.youtube.com/vi/B1a_MConMFo/maxresdefault.jpg",
      category: "Tech Trends"
    },
    {
      id: 3,
      title: "WordPress Web Design Training",
      description: "Hear from our graduates and their experiences",
      videoId: "RMfXHytmVXA", // Replace with actual YouTube video ID
      thumbnail: "https://img.youtube.com/vi/RMfXHytmVXA/maxresdefault.jpg",
      category: "Web Design"
    }
  ];

  // 1. Check Tour Logic
  useEffect(() => {
    if (paymentLoading) return;

    const userId = localStorage.getItem("user_id");
    const part1Seen = localStorage.getItem(`tour_part1_seen_${userId}`);
    const fullTourComplete = localStorage.getItem(`dashboard_tour_completed_${userId}`);

    let shouldShowTour = false;

    if (isLocked && !part1Seen) {
      shouldShowTour = true;
    } else if (!isLocked && !fullTourComplete) {
      shouldShowTour = true;
    }

    if (shouldShowTour) {
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
    if (paymentLoading || checkingTourStatus || showDashboardTour) return;

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
    return <CourseDetails id={selectedCourseId} onBack={() => setSelectedCourseId(null)} />;
  }

  // 5. Prevent "Flash of content" before redirect
  if (!paymentLoading && !checkingTourStatus && !showDashboardTour && isLocked) {
    return null; 
  }

  return (
    <>
      {/* Main Content Wrapper */}
      <div className={`relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-filter duration-300 ${isLocked ? 'blur-sm pointer-events-none select-none' : ''}`}>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 px-4 md:px-10 mx-auto w-full max-w-7xl py-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Left Column */}
            <div className="xl:col-span-8 space-y-6">
              {/* My Courses Section */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
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

              {/* Featured Videos Section */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Youtube className="w-6 h-6 text-red-600" />
                    <h2 className="text-xl font-bold text-slate-800">Featured Videos</h2>
                  </div>
                  <span className="text-sm text-slate-500">Watch & Learn</span>
                </div>

                {/* Video Player */}
                {selectedVideo ? (
                  <div className="mb-6">
                    <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0&autoplay=1`}
                        title={selectedVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-2">
                            {selectedVideo.category}
                          </span>
                          <h3 className="text-lg font-bold text-slate-800">{selectedVideo.title}</h3>
                          <p className="text-slate-600 text-sm mt-1">{selectedVideo.description}</p>
                        </div>
                        <button
                          onClick={() => setSelectedVideo(null)}
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredVideos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      className="group cursor-pointer"
                    >
                      <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-700 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all">
                            <Play className="w-6 h-6 text-white ml-1" fill="white" />
                          </div>
                        </div>
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded">
                            {video.category}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {video.title}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Videos Link */}
                <div className="mt-6 text-center">
                  <a href="https://www.youtube.com/channel/UCbHBjB06C4jm_gFvAMxaRhw" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    <Youtube className="w-5 h-5" />
                    View All Videos on YouTube
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Progress Chart */}
              <div className="mt-6">
                <CardProgressChart />
              </div>
            </div>

            {/* Right Column */}
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