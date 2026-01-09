import React, { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle,
  XCircle,
  Award,
  ChevronRight,
  Loader,
  Lock,
  AlertCircle,
  RefreshCw,
  Clock
} from 'lucide-react';
import api from "../../api";
import { useNavigate } from "react-router-dom";
import CourseQuestions from '../../data/mockCoursesData'



export default function TaskManagementSystem() {
  const [student, setStudent] = useState(null);
  const [studentCourse, setStudentCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [completedWeeks, setCompletedWeeks] = useState(new Set());
  const [weekScores, setWeekScores] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [quizTimer, setQuizTimer] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const navigate = useNavigate();

  // Submit handler
  const handleSubmit = useCallback(async () => {
    if (!selectedWeek || submitting || submitted) return;

    let correctCount = 0;
    selectedWeek.tasks.forEach(task => {
      if (answers[task.id] === task.correctAnswer) correctCount++;
    });

    const percentage = Math.round((correctCount / selectedWeek.tasks.length) * 100);
    const scoreData = { correct: correctCount, total: selectedWeek.tasks.length, percentage };

    setScore(scoreData);
    setSubmitted(true);
    setShowTimer(false);

    try {
      setSubmitting(true);
      await api.post("/tasks/submit/", {
        week_id: selectedWeek.id,
        module_id: selectedModule.id,
        module_name: selectedModule.name,
        course_id: studentCourse.id,
        answers,
        score: scoreData,
        time_taken: 1800 - (quizTimer || 0)
      });

      setCompletedWeeks(prev => new Set([...prev, selectedWeek.id]));
      setWeekScores(prev => ({ ...prev, [selectedWeek.id]: percentage }));
    } catch (err) {
      console.error("Submit failed:", err);
      setError("Failed to save. Check internet and try again.");
    } finally {
      setSubmitting(false);
    }
  }, [selectedWeek, answers, selectedModule, studentCourse, quizTimer, submitting, submitted]);

  // Timer
  useEffect(() => {
    if (!showTimer || quizTimer <= 0) return;

    const interval = setInterval(() => {
      setQuizTimer(prev => {
        if (prev <= 1) {
          handleSubmit(); // Auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimer, quizTimer, handleSubmit]);

  // Fetch completed weeks
  const fetchCompletedWeeks = useCallback(async () => {
    try {
      const res = await api.get("/tasks/completed/");
      const completed = new Set(res.data.map(item => item.week_id));
      setCompletedWeeks(completed);

      const scores = {};
      res.data.forEach(item => {
        scores[item.week_id] = item.percentage;
      });
      setWeekScores(scores);
    } catch (err) {
      console.warn("No completed tasks yet");
    }
  }, []);


const fetchProfile = useCallback(async () => {
    try {
        setLoading(true);
        setError(null);

        const res = await api.get("/students/users/me");
        

        const studentData = Array.isArray(res.data) ? res.data[0] : res.data;

        if (!studentData) throw new Error("No profile found");

    
        const nextDue = studentData.next_due_date ? new Date(studentData.next_due_date) : null;
        const today = new Date();
        const isOverdue = nextDue && nextDue < new Date(today.setHours(0,0,0,0));
        const hasDebt = Number(studentData.amount_owed || 0) > 0;
        const locked = isOverdue && hasDebt;

        setStudent({ ...studentData, dashboard_locked: locked });
        
        if (locked) {
            setLoading(false);
            return;
        }

      
        let courseName = studentData.course?.course_name || studentData.course?.name || studentData.course;

        if (!courseName) throw new Error("No course assigned");

        let courseData = null;


        const courseId = studentData.course?.id || studentData.course;
        if (courseId && typeof courseId === 'number') {
            try {
                const backendRes = await api.get(`/courses/${courseId}/`);
                courseData = backendRes.data;
                console.log("Loaded course from backend");
            } catch (err) {
                console.warn("Backend course not available, falling back to mock");
            }
        } else {
            console.warn("No valid course ID from backend, falling directly to mock");
        }

        
        if (!courseData) {
                    const normalizedCourseName = String(courseName).trim();
            
           
            courseData = mockCoursesData[normalizedCourseName]; 
            
            if (!courseData) {
               
                const lowerCaseName = normalizedCourseName.toLowerCase();
                const matchedKey = Object.keys(mockCoursesData).find(key => key.toLowerCase() === lowerCaseName);
                
                if (matchedKey) {
                    courseData = mockCoursesData[matchedKey];
                } else {
                    throw new Error(`No course content found for course name: "${normalizedCourseName}"`);
                }
            }
            console.log("Using mock course:", courseData.course_name);
        }

        setStudentCourse(courseData);
        await fetchCompletedWeeks();
        setLoading(false);

    } catch (err) {
        console.error("Load failed:", err);
        setError(err.message || "Failed to load dashboard. Please refresh.");
        setLoading(false);
    }
}, [fetchCompletedWeeks]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Helper functions
  const getModuleProgress = useCallback((module) => {
    const completed = module.weeks.filter(w => completedWeeks.has(w.id)).length;
    return module.weeks.length ? (completed / module.weeks.length) * 100 : 0;
  }, [completedWeeks]);

  const isWeekUnlocked = useCallback((module, week) => {
    if (!studentCourse) return false;
    if (module.id === studentCourse.modules[0]?.id && week.weekNumber === 1) return true;

    const prevWeek = module.weeks.find(w => w.weekNumber === week.weekNumber - 1);
    if (prevWeek && completedWeeks.has(prevWeek.id)) return true;

    if (week.weekNumber === 1) {
      const modIdx = studentCourse.modules.findIndex(m => m.id === module.id);
      if (modIdx > 0) {
        const prevMod = studentCourse.modules[modIdx - 1];
        const lastWeek = prevMod.weeks[prevMod.weeks.length - 1];
        return completedWeeks.has(lastWeek.id);
      }
    }
    return false;
  }, [studentCourse, completedWeeks]);

  // --- FIXED: ADDED MISSING HANDLER ---
  const handleModuleSelect = useCallback((module) => {
    setSelectedModule(module);
  }, []);
  // ------------------------------------

  const handleWeekSelect = useCallback((week) => {
    setSelectedWeek(week);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setQuizTimer(1800);
    setShowTimer(true);
  }, []);

  const handleAnswerChange = useCallback((taskId, index) => {
    setAnswers(prev => ({ ...prev, [taskId]: index }));
  }, []);

  const handleReset = useCallback(() => {
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setQuizTimer(1800);
    setShowTimer(true);
  }, []);

  const formatTime = (seconds) => {
    if (seconds === null) return "30:00";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // RENDER
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen"><Loader className="w-16 h-16 text-indigo-600 animate-spin" /><p className="ml-4 text-xl">Loading...</p></div>
  );

  if (error && !student) return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow text-center">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-3">Error</h2>
      <p>{error}</p>
      <button onClick={fetchProfile} className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl">
        <RefreshCw className="inline w-5 h-5 mr-2" /> Retry
      </button>
    </div>
  );

  if (student?.dashboard_locked) return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow text-center">
      <Lock className="w-16 h-16 text-red-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-3">Dashboard Locked</h2>
      <p>Payment overdue. Clear balance to continue.</p>
      <p className="mt-4 font-bold text-xl text-red-600">₦{Number(student.amount_owed || 0).toLocaleString()}</p>
    </div>
  );

  if (!studentCourse) return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow text-center">
      <XCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-3">No Course Found</h2>
      <p>Not enrolled in any course yet.</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900">Course Tasks</h1>
          <p className="text-2xl text-gray-600 mt-4">Welcome back, {student?.name}!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 text-center border">
          <h2 className="text-4xl font-bold text-indigo-700">{studentCourse.course_name}</h2>
          <p className="text-xl text-gray-600 mt-4">
            {completedWeeks.size} / {studentCourse.modules.reduce((a, m) => a + m.weeks.length, 0)} weeks completed
          </p>
        </div>

        {!selectedModule && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-10">Select a Module</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {studentCourse.modules.map(mod => {
                const progress = getModuleProgress(mod);
                const done = mod.weeks.filter(w => completedWeeks.has(w.id)).length;
                return (
                  <button
                    key={mod.id}
                    onClick={() => handleModuleSelect(mod)}
                    className="bg-white rounded-2xl shadow hover:shadow-2xl border-2 border-gray-200 p-8 text-left transition-all hover:-translate-y-2"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold">{mod.name}</h3>
                      <ChevronRight className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Progress</span>
                        <span className="font-bold">{done}/{mod.weeks.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selectedModule && !selectedWeek && (
          <div className="animate-fade-in">
            {/* Back Button */}
            <button
              onClick={() => setSelectedModule(null)}
              className="mb-10 flex items-center gap-3 text-indigo-600 hover:text-indigo-800 font-semibold text-lg transition-colors focus:outline-none"
            >
              Back to Modules
            </button>

            {/* Module Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
              {selectedModule.name}
            </h2>

            {/* Weeks Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {selectedModule.weeks.map((week) => {
                const unlocked = isWeekUnlocked(selectedModule, week);
                const done = completedWeeks.has(week.id);
                const weekScore = weekScores[week.id];

                return (
                  <button
                    key={week.id}
                    onClick={() => unlocked && handleWeekSelect(week)}
                    disabled={!unlocked}
                    className={`
                      relative overflow-hidden rounded-3xl shadow-lg transition-all duration-300 
                      focus:outline-none focus:ring-4 focus:ring-indigo-300
                      ${unlocked ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : 'cursor-not-allowed opacity-70'}
                    `}
                  >
                    {/* Card Background */}
                    <div
                      className={`
                        h-full p-8 border-4 rounded-3xl transition-all
                        ${unlocked
                          ? done
                            ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-500'
                            : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-400'
                          : 'bg-gray-100 border-gray-300'
                        }
                      `}
                    >
                      {/* Status Icons */}
                      <div className="absolute top-6 right-6">
                        {done ? (
                          <CheckCircle className="w-12 h-12 text-emerald-600 drop-shadow-md" />
                        ) : !unlocked ? (
                          <Lock className="w-10 h-10 text-gray-500" />
                        ) : null}
                      </div>

                      {/* Content */}
                      <div className="text-left pr-16">
                        
                        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                          {week.title}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-lg text-gray-600">
                            {week.tasks?.length || 0} questions
                          </span>

                          {done && (
                            <div className="px-5 py-2 bg-emerald-600 text-white font-bold text-xl rounded-full shadow-md">
                              {weekScore || 0}%
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Locked Overlay */}
                      {!unlocked && (
                        <div className="absolute inset-0 bg-black/10 rounded-3xl flex items-center justify-center">
                          <p className="text-2xl font-bold text-gray-600">Locked</p>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SAFE QUIZ RENDERING */}
        {selectedWeek && !submitted && selectedWeek.tasks && selectedWeek.tasks.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setSelectedWeek(null)} className="text-indigo-600 font-bold">← Back</button>
              {showTimer && quizTimer > 0 && (
                <div className={`px-8 py-4 rounded-full text-xl font-bold shadow-lg ${quizTimer < 300 ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'}`}>
                  <Clock className="inline w-6 h-6 mr-3" />
                  {formatTime(quizTimer)}
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-10">
              <h2 className="text-4xl font-bold mb-4">Week {selectedWeek.weekNumber}</h2>
              <p className="text-2xl text-gray-600 mb-12">{selectedWeek.title}</p>

              <div className="space-y-12">
                {selectedWeek.tasks.map((task, i) => (
                  <div key={task.id}>
                    <p className="text-xl font-bold mb-6">Question {i + 1}</p>
                    <p className="text-2xl mb-8">{task.question}</p>
                    <div className="space-y-4">
                      {task.options.map((opt, idx) => (
                        <label key={idx} className={`block p-6 rounded-xl border-2 cursor-pointer transition-all ${answers[task.id] === idx ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:bg-gray-50'}`}>
                          <input
                            type="radio"
                            name={`q${task.id}`}
                            checked={answers[task.id] === idx}
                            onChange={() => handleAnswerChange(task.id, idx)}
                            className="w-6 h-6 text-indigo-600"
                          />
                          <span className="ml-4 text-xl">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== selectedWeek.tasks.length || submitting}
                className="w-full mt-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-2xl font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-800 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            </div>
          </div>
        ) : selectedWeek ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No questions available for this week yet.</p>
            <button onClick={() => setSelectedWeek(null)} className="mt-8 px-8 py-4 bg-indigo-600 text-white rounded-xl text-xl">
              ← Back to Weeks
            </button>
          </div>
        ) : null}

        {/* Results */}
        {submitted && score && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <Award className="w-32 h-32 text-yellow-500 mx-auto mb-8" />
            <h2 className="text-6xl font-bold mb-8">Quiz Complete!</h2>
            <div className="text-9xl font-bold text-indigo-600 mb-8">{score.percentage}%</div>
            <p className="text-3xl text-gray-700 mb-12">{score.correct} / {score.total} correct</p>

            <div className="bg-white rounded-3xl shadow-2xl p-10 space-y-8">
              {selectedWeek.tasks.map(task => {
                const correct = answers[task.id] === task.correctAnswer;
                return (
                  <div key={task.id} className={`p-8 rounded-2xl ${correct ? 'bg-emerald-100' : 'bg-red-100'}`}>
                    <p className="text-xl font-bold mb-4">{task.question}</p>
                    <p>Your answer: <strong>{task.options[answers[task.id]] || "Skipped"}</strong></p>
                    {!correct && <p className="text-emerald-700 mt-3">Correct: <strong>{task.options[task.correctAnswer]}</strong></p>}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-8 mt-12 max-w-lg mx-auto">
              <button onClick={handleReset} className="flex-1 py-5 bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-bold rounded-2xl">
                Retake Quiz
              </button>
              <button onClick={() =>navigate("/student/skills-progress")} className="flex-1 py-5 bg-gray-700 hover:bg-gray-800 text-white text-2xl font-bold rounded-2xl">
                Back to Progress
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}