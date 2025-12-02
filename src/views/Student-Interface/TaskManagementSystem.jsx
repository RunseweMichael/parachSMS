import React, { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle,
  XCircle,
  Award,
  BookOpen,
  ChevronRight,
  Loader,
  Lock,
  Check,
  AlertCircle,
  RefreshCw,
  Clock
} from 'lucide-react';

// Mock API service (replace with your actual api import)
const apiService = {
  async request(method, url, data = null, retries = 3) {
    // Simulated API for demo purposes
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url === "/students/me/") {
      return {
        id: 1,
        name: "John Doe",
        course: { id: 1, name: "Web Development" },
        dashboard_locked: false,
        next_due_date: null,
        amount_owed: 0
      };
    }
    
    if (url.includes("/courses/")) {
      return mockCoursesData[1];
    }
    
    if (url === "/tasks/completed/") {
      return [];
    }
    
    if (url === "/tasks/submit/") {
      return { success: true };
    }
    
    throw new Error("API endpoint not found");
  }
};

// Mock course data
const mockCoursesData = {
  1: {
    id: 1,
    name: "Web Development",
    modules: [
      {
        id: 1,
        name: "HTML & CSS Basics",
        weeks: [
          {
            id: 1,
            weekNumber: 1,
            title: "Introduction to HTML",
            tasks: [
              { id: 101, question: "What does HTML stand for?", options: ["Hyper Text Markup Language","High Tech Modern Language","Home Tool Markup Language","Hyperlinks and Text Markup Language"], correctAnswer: 0 },
              { id: 102, question: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], correctAnswer: 2 },
              { id: 103, question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<br>", "<lb>", "<newline>"], correctAnswer: 1 },
              { id: 104, question: "Which attribute is used to provide alternative text for an image?", options: ["title", "alt", "src", "longdesc"], correctAnswer: 1 },
              { id: 105, question: "What is the correct HTML for creating a hyperlink?", options: ["<a url='http://example.com'>Example</a>","<a href='http://example.com'>Example</a>","<link>http://example.com</link>","<hyperlink>http://example.com</hyperlink>"], correctAnswer: 1 }
            ]
          },
          {
            id: 2,
            weekNumber: 2,
            title: "CSS Fundamentals",
            tasks: [
              { id: 201, question: "What does CSS stand for?", options: ["Computer Style Sheets","Cascading Style Sheets","Creative Style Sheets","Colorful Style Sheets"], correctAnswer: 1 },
              { id: 202, question: "Which CSS property is used to change text color?", options: ["text-color", "font-color", "color", "text-style"], correctAnswer: 2 },
              { id: 203, question: "How do you select an element with id 'header' in CSS?", options: [".header", "#header", "*header", "header"], correctAnswer: 1 },
              { id: 204, question: "Which property is used to change the background color?", options: ["bgcolor", "background-color", "color", "bg-color"], correctAnswer: 1 },
              { id: 205, question: "What is the default value of the position property?", options: ["relative", "fixed", "absolute", "static"], correctAnswer: 3 }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "JavaScript Basics",
        weeks: [
          {
            id: 3,
            weekNumber: 1,
            title: "JavaScript Introduction",
            tasks: [
              { id: 301, question: "Which keyword is used to declare a variable in JavaScript?", options: ["var","let","const","All of the above"], correctAnswer: 3 },
              { id: 302, question: "What is the correct syntax for a JavaScript comment?", options: ["<!-- comment -->","// comment","# comment","/* comment"], correctAnswer: 1 },
              { id: 303, question: "Which method is used to parse a string to an integer?", options: ["parseInt()","parseInteger()","toInteger()","int()"], correctAnswer: 0 },
              { id: 304, question: "What will 'typeof null' return?", options: ["null","undefined","object","number"], correctAnswer: 2 },
              { id: 305, question: "Which operator is used for strict equality?", options: ["==","===","=","!="], correctAnswer: 1 }
            ]
          }
        ]
      }
    ]
  }
};

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

  // Timer effect
  useEffect(() => {
    if (!showTimer || !quizTimer || quizTimer <= 0) return;
    
    const interval = setInterval(() => {
      setQuizTimer(prev => {
        if (prev <= 1) {
          setShowTimer(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimer, quizTimer]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.request('GET', "/students/me/");
      
      const nextDue = data.next_due_date ? new Date(data.next_due_date) : null;
      const today = new Date();
      let computedLock = false;
      
      if (nextDue && nextDue < new Date(today.toDateString())) {
        const amountOwed = Number(data.amount_owed ?? 0);
        if (amountOwed > 0) computedLock = true;
      }

      const backendLock = typeof data.dashboard_locked === 'boolean' ? data.dashboard_locked : null;
      const finalLocked = backendLock !== null ? backendLock : computedLock;

      setStudent({ ...data, dashboard_locked: finalLocked });

      if (finalLocked) {
        setLoading(false);
        return;
      }

      await Promise.all([
        fetchCourseStructure(data),
        fetchCompletedWeeks()
      ]);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const fetchCourseStructure = useCallback(async (studentData) => {
    try {
      const courseName = studentData.course?.course_name || 
                        studentData.course?.name || 
                        studentData.course_name || 
                        null;
      const courseId = studentData.course?.id || null;
      
      let course = null;
      
      if (courseId) {
        try {
          const courseData = await apiService.request('GET', `/courses/${courseId}/`);
          course = courseData;
        } catch (err) {
          console.warn("Backend course fetch failed, using mock data", err);
          course = mockCoursesData[courseId] || null;
        }
      }
      
      if (!course && courseName) {
        course = Object.values(mockCoursesData).find(c => c.name === courseName) || null;
      }
      
      setStudentCourse(course);
    } catch (err) {
      console.error("Failed to fetch course structure:", err);
      setError("Could not load course content. " + err.message);
    }
  }, []);

  const fetchCompletedWeeks = useCallback(async () => {
    try {
      const data = await apiService.request('GET', "/tasks/completed/");
      
      const completed = new Set(data.map(w => w.week_id));
      setCompletedWeeks(completed);

      const scores = {};
      data.forEach(w => {
        scores[w.week_id] = w.percentage;
      });
      setWeekScores(scores);
    } catch (err) {
      console.error("Failed to fetch completed weeks:", err);
    }
  }, []);

  const isWeekUnlocked = useCallback((module, week) => {
    if (!studentCourse) return false;

    if (module.id === studentCourse.modules[0]?.id && week.weekNumber === 1) {
      return true;
    }

    const previousWeek = module.weeks.find(w => w.weekNumber === week.weekNumber - 1);
    if (previousWeek && completedWeeks.has(previousWeek.id)) {
      return true;
    }

    if (week.weekNumber === 1) {
      const moduleIndex = studentCourse.modules.findIndex(m => m.id === module.id);
      if (moduleIndex > 0) {
        const previousModule = studentCourse.modules[moduleIndex - 1];
        const lastWeekOfPrevModule = previousModule.weeks[previousModule.weeks.length - 1];
        return completedWeeks.has(lastWeekOfPrevModule.id);
      }
    }

    return false;
  }, [studentCourse, completedWeeks]);

  const handleModuleSelect = useCallback((module) => {
    setSelectedModule(module);
    setSelectedWeek(null);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setQuizTimer(null);
  }, []);

  const handleWeekSelect = useCallback((week) => {
    setSelectedWeek(week);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setQuizTimer(30 * 60);
    setShowTimer(true);
  }, []);

  const handleAnswerChange = useCallback((taskId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [taskId]: answerIndex
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedWeek || submitting) return;

    let correctCount = 0;
    selectedWeek.tasks.forEach(task => {
      if (answers[task.id] === task.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = (correctCount / selectedWeek.tasks.length) * 100;
    const scoreData = {
      correct: correctCount,
      total: selectedWeek.tasks.length,
      percentage: percentage
    };

    setScore(scoreData);
    setSubmitted(true);
    setShowTimer(false);

    try {
      setSubmitting(true);
      await apiService.request('POST', "/tasks/submit/", {
        week_id: selectedWeek.id,
        module_id: selectedModule.id,
        module_name: selectedModule.name,
        course_id: studentCourse?.id || null,
        answers: answers,
        score: scoreData,
        time_taken: 30 * 60 - (quizTimer || 0)
      });

      setCompletedWeeks(prev => new Set([...prev, selectedWeek.id]));
      setWeekScores(prev => ({ ...prev, [selectedWeek.id]: percentage }));
    } catch (err) {
      setError("Failed to save results: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }, [selectedWeek, answers, selectedModule, studentCourse, quizTimer, submitting]);

  const handleReset = useCallback(() => {
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setQuizTimer(30 * 60);
    setShowTimer(true);
  }, []);

  const handleRetry = useCallback(() => {
    fetchCompletedWeeks();
  }, [fetchCompletedWeeks]);

  const getModuleProgress = useCallback((module) => {
    const completedInModule = module.weeks.filter(w => completedWeeks.has(w.id)).length;
    return (completedInModule / module.weeks.length) * 100;
  }, [completedWeeks]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your course...</p>
        </div>
      </div>
    );
  }

  if (error && !student) {
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Error</h2>
        <p className="text-gray-600 mb-4 text-center">{error}</p>
        <button
          onClick={() => {
            setError(null);
            fetchProfile();
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center justify-center gap-2 w-full"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  if (student?.dashboard_locked) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center max-w-md mx-auto">
        <Lock className="w-12 h-12 text-red-600 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-gray-800 mb-2">Dashboard Locked</h2>
        <p className="text-gray-600 mb-3">Your payment is overdue. Please clear your outstanding balance.</p>
        <p className="text-sm font-semibold">Due: {student.next_due_date || 'N/A'}</p>
        <p className="text-sm font-semibold">Owed: ${Number(student.amount_owed || 0).toFixed(2)}</p>
      </div>
    );
  }

  if (!studentCourse) {
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto text-center">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-gray-800 mb-2">No Course Found</h2>
        <p className="text-gray-600 mb-4">You're not registered for any course.</p>
        <button
          onClick={handleRetry}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
  <div className=" bg-gray-50 ">
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

      {/* Clean Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Course Tasks</h1>
       
      </div>

      {/* Course Summary */}
      {studentCourse && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">{studentCourse.name}</h2>
          <p className="mt-3 text-gray-600">
            {completedWeeks.size} week{completedWeeks.size !== 1 ? 's' : ''} completed out of{' '}
            {studentCourse.modules.reduce((a, m) => a + m.weeks.length, 0)}
          </p>
        </div>
      )}

      {/* Module Selection */}
      {!selectedModule && studentCourse && (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Select a Module</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studentCourse.modules.map((module) => {
              const progress = getModuleProgress(module);
              const completed = module.weeks.filter(w => completedWeeks.has(w.id)).length;

              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleSelect(module)}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{module.name}</h3>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span className="font-medium">{completed}/{module.weeks.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-3">{module.weeks.length} week{module.weeks.length !== 1 ? 's' : ''}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Week Selection */}
      {selectedModule && !selectedWeek && (
        <div>
          <button
            onClick={() => setSelectedModule(null)}
            className="mb-8 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors"
          >
            ← Back to Modules
          </button>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">{selectedModule.name}</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedModule.weeks.map((week) => {
              const isUnlocked = isWeekUnlocked(selectedModule, week);
              const isCompleted = completedWeeks.has(week.id);
              const score = weekScores[week.id];

              return (
                <button
                  key={week.id}
                  onClick={() => isUnlocked && handleWeekSelect(week)}
                  disabled={!isUnlocked}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    isUnlocked
                      ? isCompleted
                        ? 'bg-emerald-50 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-white border-gray-300 hover:border-indigo-400 hover:shadow-md'
                      : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {!isUnlocked && (
                    <Lock className="absolute top-3 right-3 w-5 h-5 text-gray-400" />
                  )}
                  {isCompleted && (
                    <Check className="absolute top-3 right-3 w-5 h-5 text-emerald-600" />
                  )}

                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900">Week {week.weekNumber}</h3>
                    <p className="mt-2 text-gray-700">{week.title}</p>
                    <p className="mt-3 text-sm text-gray-500">{week.tasks.length} questions</p>
                    {isCompleted && score !== undefined && (
                      <div className="mt-4 inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                        {score.toFixed(0)}% Score
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quiz */}
      {selectedWeek && !submitted && (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedWeek(null)}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              ← Back to Weeks
            </button>

            {showTimer && quizTimer > 0 && (
              <div className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold ${
                quizTimer < 300 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              }`}>
                <Clock className="w-5 h-5" />
                {formatTime(quizTimer)}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Week {selectedWeek.weekNumber}
            </h2>
            <p className="text-lg text-gray-600 mb-8">{selectedWeek.title}</p>

            <div className="space-y-8">
              {selectedWeek.tasks.map((task, idx) => (
                <div key={task.id} className="border-b border-gray-200 pb-8 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Question {idx + 1} of {selectedWeek.tasks.length}
                  </h3>
                  <p className="text-lg text-gray-800 mb-6">{task.question}</p>

                  <div className="space-y-3">
                    {task.options.map((option, i) => (
                      <label
                        key={i}
                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                          answers[task.id] === i
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${task.id}`}
                          checked={answers[task.id] === i}
                          onChange={() => handleAnswerChange(task.id, i)}
                          className="w-5 h-5 text-indigo-600"
                        />
                        <span className="ml-4 text-gray-800">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== selectedWeek.tasks.length || submitting}
              className="mt-10 w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Answers'}
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {submitted && score && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Award className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
            <div className="text-7xl font-bold text-indigo-600 mb-3">
              {score.percentage.toFixed(0)}%
            </div>
            <p className="text-xl text-gray-600">
              {score.correct} out of {score.total} correct
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
            {selectedWeek.tasks.map((task, idx) => {
              const correct = answers[task.id] === task.correctAnswer;
              return (
                <div key={task.id} className={`p-6 rounded-xl ${correct ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  <div className="flex items-start gap-4">
                    {correct ? (
                      <CheckCircle className="w-7 h-7 text-emerald-600 mt-1" />
                    ) : (
                      <XCircle className="w-7 h-7 text-red-600 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-3">{task.question}</p>
                      <div className="text-sm">
                        <p className="text-gray-700">
                          <span className="font-medium">Your answer:</span> {task.options[answers[task.id]] || 'Not answered'}
                        </p>
                        {!correct && (
                          <p className="mt-2 text-emerald-700">
                            <span className="font-medium">Correct answer:</span> {task.options[task.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 mt-10 max-w-md mx-auto">
            <button
              onClick={handleReset}
              className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => setSelectedWeek(null)}
              className="flex-1 bg-gray-600 text-white py-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
            >
              Back to Weeks
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);
}