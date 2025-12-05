import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  Award,
  BookOpen,
  ChevronRight,
  Loader,
  Lock,
  Check
} from 'lucide-react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
const coursesData = {
  courses: [
    // ====================================
    // 5. WEB DEVELOPMENT - ID 5
    // ====================================
    {
      id: 5,
      name: "Web Development",
      modules: [
        // HTML ---------------------- ID 12
        {
          id: 12,
          name: "HTML",
          weeks: [
            {
              id: 34, // UNIQUE
              weekNumber: 1,
              title: "HTML Basics",
              tasks: [
                { id: 101, question: "HTML stands for?", options: ["Hyper Text Makeup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "High Tech Markup Language"], correctAnswer: 1 },
                { id: 102, question: "Which tag creates a link?", options: ["<link>", "<href>", "<a>", "<url>"], correctAnswer: 2 },
                { id: 103, question: "Which tag creates a list?", options: ["<ul>", "<ls>", "<list>", "<li>"], correctAnswer: 0 }
              ]
            },
            {
              id: 35, // UNIQUE
              weekNumber: 2,
              title: "Forms",
              tasks: [
                { id: 104, question: "Which tag creates a form?", options: ["<form>", "<input>", "<text>", "<enter>"], correctAnswer: 0 },
                { id: 105, question: "Which input type hides text?", options: ["email", "text", "password", "tel"], correctAnswer: 2 },
                { id: 106, question: "Which attribute submits form?", options: ["send", "action", "direct", "method"], correctAnswer: 1 }
              ]
            },
            {
              id: 36, // UNIQUE
              weekNumber: 3,
              title: "Media Tags",
              tasks: [
                { id: 107, question: "Which tag displays images?", options: ["<pic>", "<img>", "<picture>", "<src>"], correctAnswer: 1 },
                { id: 108, question: "Which tag embeds a video?", options: ["<video>", "<media>", "<vid>", "<mp4>"], correctAnswer: 0 },
                { id: 109, question: "Which provides alternative text?", options: ["title", "alt", "src", "label"], correctAnswer: 1 }
              ]
            }
          ]
        },

        // CSS ------------------------ ID 13
        {
          id: 13,
          name: "CSS",
          weeks: [
            {
              id: 37, // UNIQUE
              weekNumber: 1,
              title: "CSS Basics",
              tasks: [
                { id: 110, question: "CSS stands for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correctAnswer: 1 },
                { id: 111, question: "Which changes text color?", options: ["font-color", "color", "text", "text-color"], correctAnswer: 1 },
                { id: 112, question: "Which selects an id?", options: [".id", "#id", "id", "@id"], correctAnswer: 1 }
              ]
            },
            {
              id: 38, // UNIQUE
              weekNumber: 2,
              title: "Layout",
              tasks: [
                { id: 113, question: "Which position is default?", options: ["relative", "static", "absolute", "fixed"], correctAnswer: 1 },
                { id: 114, question: "Flexbox aligns items?", options: ["Vertically", "Horizontally", "Both", "None"], correctAnswer: 2 },
                { id: 115, question: "Which creates a grid?", options: ["display:flex", "display:block", "display:grid", "grid:on"], correctAnswer: 2 }
              ]
            },
            {
              id: 39, // UNIQUE
              weekNumber: 3,
              title: "Styling",
              tasks: [
                { id: 116, question: "Which sets background color?", options: ["bg", "background-color", "color", "bg-color"], correctAnswer: 1 },
                { id: 117, question: "Which changes font size?", options: ["font-size", "text-size", "size", "font"], correctAnswer: 0 },
                { id: 118, question: "Which sets margin?", options: ["space", "margin", "padding", "offset"], correctAnswer: 1 }
              ]
            }
          ]
        },

        // JavaScript --------------------- ID 14
        {
          id: 14,
          name: "JavaScript",
          weeks: [
            {
              id: 40, // UNIQUE
              weekNumber: 1,
              title: "JavaScript Basics",
              tasks: [
                { id: 119, question: "Which declares a variable?", options: ["let", "var", "const", "All of the above"], correctAnswer: 3 },
                { id: 120, question: "Which logs output?", options: ["console.print", "log.console", "console.log", "print()"], correctAnswer: 2 },
                { id: 121, question: "typeof null returns?", options: ["null", "object", "undefined", "number"], correctAnswer: 1 }
              ]
            },
            {
              id: 41, // UNIQUE
              weekNumber: 2,
              title: "Functions",
              tasks: [
                { id: 122, question: "How do you define a function?", options: ["func my()", "function my()", "make function()", "create fn()"], correctAnswer: 1 },
                { id: 123, question: "Arrow functions use?", options: ["=>", "->", "<=", "==>"], correctAnswer: 0 },
                { id: 124, question: "Functions return?", options: ["Variables", "Values", "Arrays", "Nothing"], correctAnswer: 1 }
              ]
            },
            {
              id: 42, // UNIQUE
              weekNumber: 3,
              title: "DOM Manipulation",
              tasks: [
                { id: 125, question: "Which selects an element?", options: ["select()", "find()", "querySelector()", "getElement()"], correctAnswer: 2 },
                { id: 126, question: "Which changes HTML content?", options: ["innerText", "innerHTML", "textContent", "All of the above"], correctAnswer: 3 },
                { id: 127, question: "Which listens to events?", options: ["event()", "listen()", "addEventListener()", "onEvent()"], correctAnswer: 2 }
              ]
            }
          ]
        }
      ]
    },

    // ====================================
    // 6. BACKEND DEVELOPMENT - ID 6
    // ====================================
    {
      id: 6,
      name: "Backend Development",
      modules: [
        // Python Basics ---------------------- ID 20
        {
          id: 20,
          name: "Python Basics",
          weeks: [
            {
              id: 50, // UNIQUE
              weekNumber: 1,
              title: "Data Types and Variables",
              tasks: [
                { id: 201, question: "Which of these is NOT a Python data type?", options: ["List", "Tuple", "Dict", "Array"], correctAnswer: 3 },
                { id: 202, question: "How do you declare a variable in Python?", options: ["int x = 5", "variable x = 5", "x = 5", "declare x = 5"], correctAnswer: 2 },
                { id: 203, question: "Which Python function outputs text?", options: ["display()", "show()", "print()", "write()"], correctAnswer: 2 },
              ],
            },
            {
              id: 51, // UNIQUE
              weekNumber: 2,
              title: "Control Flow",
              tasks: [
                { id: 204, question: "Which keyword is used for conditional execution?", options: ["if", "then", "when", "check"], correctAnswer: 0 },
                { id: 205, question: "Which loop iterates a specified number of times?", options: ["while", "do-while", "for", "loop-n"], correctAnswer: 2 },
                { id: 206, question: "What is the purpose of 'pass'?", options: ["Exit loop", "Skip iteration", "Placeholder for future code", "Declare a constant"], correctAnswer: 2 },
              ],
            },
          ],
        },

        // Databases (SQL) ------------------------ ID 21
        {
          id: 21,
          name: "Databases (SQL)",
          weeks: [
            {
              id: 52, // UNIQUE
              weekNumber: 1,
              title: "Basic Queries",
              tasks: [
                { id: 207, question: "What does SQL stand for?", options: ["Structured Query Language", "Sequential Query Logic", "Standard Query Link", "Simple Question Language"], correctAnswer: 0 },
                { id: 208, question: "Which command retrieves data from a database?", options: ["INSERT", "UPDATE", "DELETE", "SELECT"], correctAnswer: 3 },
                { id: 209, question: "The clause used to filter records is?", options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"], correctAnswer: 2 },
              ],
            },
            {
              id: 53, // UNIQUE
              weekNumber: 2,
              title: "Table Modification",
              tasks: [
                { id: 210, question: "Which command adds new rows to a table?", options: ["ADD", "CREATE", "INSERT", "MAKE"], correctAnswer: 2 },
                { id: 211, question: "Which statement changes existing data?", options: ["ALTER", "MODIFY", "CHANGE", "UPDATE"], correctAnswer: 3 },
                { id: 212, question: "Which command removes a column?", options: ["DROP COLUMN", "REMOVE FIELD", "DELETE COLUMN", "ERASE"], correctAnswer: 0 },
              ],
            }
          ]
        },

        // API Development --------------------- ID 22
        {
          id: 22,
          name: "API Development",
          weeks: [
            {
              id: 54, // UNIQUE
              weekNumber: 1,
              title: "HTTP Methods",
              tasks: [
                { id: 213, question: "Which HTTP method is used to create a resource?", options: ["GET", "PUT", "POST", "DELETE"], correctAnswer: 2 },
                { id: 214, question: "Which HTTP method is idempotent?", options: ["POST", "PATCH", "PUT", "CONNECT"], correctAnswer: 2 },
                { id: 215, question: "What status code means 'OK'?", options: ["404", "500", "200", "301"], correctAnswer: 2 },
              ],
            }
          ]
        }
      ]
    }
  ]
};


export default function TaskManagementSystem() {
   const navigate = useNavigate(); 
  const [student, setStudent] = useState(null);
  const [studentCourse, setStudentCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false); // Added missing state
  const [score, setScore] = useState(null);
  const [completedWeeks, setCompletedWeeks] = useState(new Set());
  const [weekScores, setWeekScores] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/students/me/", {
        headers: { Authorization: `Token ${token}` },
      });

      setStudent(res.data);
      
      // rule: lock if next_due_date exists and is in the past AND amount_owed > 0
      const nextDue = res.data.next_due_date ? new Date(res.data.next_due_date) : null;
      const today = new Date();
      let computedLock = false;
      if (nextDue && nextDue < new Date(today.toDateString())) {
        const amountOwed = Number(res.data.amount_owed ?? 0);
        if (amountOwed > 0) computedLock = true;
      }

      const backendLock = typeof res.data.dashboard_locked === 'boolean' ? res.data.dashboard_locked : null;
      const finalLocked = backendLock !== null ? backendLock : computedLock;

      // attach final computed lock onto the student object
      setStudent(prev => ({ ...prev, dashboard_locked: finalLocked }));

      // If locked, stop and show lock screen
      if (finalLocked) {
        setLoading(false);
        return;
      }

      // determine course 
      let courseName = null;
      if (res.data.course && typeof res.data.course === 'object') {
        courseName = res.data.course.name || res.data.course.title || null;
      } else if (res.data.course_name) {
        courseName = res.data.course_name;
      } else if (res.data.course && typeof res.data.course === 'number') {
        courseName = res.data.course; 
      }

      const course = coursesData.courses.find(c =>
      c.name.toLowerCase() === courseName?.toLowerCase() ||
      c.id.toString() === courseName?.toString() // Match by ID if courseName is an ID number
      ) || null;  

      setStudentCourse(course);
      await fetchCompletedWeeks();
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch student profile:", error);
      setLoading(false);
    }
  };

  const fetchCompletedWeeks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/tasks/completed/", {
        headers: { Authorization: `Token ${token}` }
      });

      const completed = new Set(res.data.map(w => w.week_id));
      setCompletedWeeks(completed);

      const scores = {};
      res.data.forEach(w => {
        scores[w.week_id] = w.percentage;
      });
      setWeekScores(scores);
    } catch (error) {
      console.error("Failed to fetch completed weeks:", error);
    }
  };

  const isWeekUnlocked = (module, week) => {
    if (!studentCourse) return false;

    // Find the current module's index
    const moduleIndex = studentCourse.modules.findIndex(m => m.id === module.id);
    if (moduleIndex === -1) return false;

    // First week of the very first module is always unlocked
    if (moduleIndex === 0 && week.weekNumber === 1) {
      return true;
    }

    // Check if previous week in same module is completed
    const previousWeek = module.weeks.find(w => w.weekNumber === week.weekNumber - 1);
    if (previousWeek && completedWeeks.has(previousWeek.id)) {
      return true;
    }

    // If first week of module (weekNumber === 1), check if last week of previous module is completed
    if (week.weekNumber === 1 && moduleIndex > 0) {
      const previousModule = studentCourse.modules[moduleIndex - 1];
      const lastWeekOfPrevModule = previousModule.weeks[previousModule.weeks.length - 1];
      return completedWeeks.has(lastWeekOfPrevModule.id);
    }

    return false;
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setSelectedWeek(null);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const handleWeekSelect = (week) => {
    setSelectedWeek(week);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const handleAnswerChange = (taskId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [taskId]: answerIndex
    }));
  };

  // --- FIXED HANDLESUBMIT ---
  const handleSubmit = async () => {
    if (!selectedWeek || submitting || submitted) return;

    // Calculate score
    let correctCount = 0;
    selectedWeek.tasks.forEach(task => {
      if (answers[task.id] === task.correctAnswer) correctCount++;
    });

    const percentage = Math.round((correctCount / selectedWeek.tasks.length) * 100);
    const scoreData = { correct: correctCount, total: selectedWeek.tasks.length, percentage };

    // Update UI immediately
    setScore(scoreData);
    setSubmitted(true);
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      await api.post("/tasks/submit/", {
        week_id: selectedWeek.id,
        module_id: selectedModule.id,
        module_name: selectedModule.name,
        course_id: studentCourse ? studentCourse.id : null,
        answers: answers,
        score: scoreData,
        // Removed time_taken logic as variable wasn't present in your provided state
      }, {
        headers: { Authorization: `Token ${token}` }
      });

      // Update completed weeks locally upon success
      setCompletedWeeks(prev => new Set([...prev, selectedWeek.id]));
      setWeekScores(prev => ({ ...prev, [selectedWeek.id]: percentage }));

    } catch (err) {
      console.error("Submit failed:", err);
      // Optional: Add an error state display here if needed
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  const getModuleProgress = (module) => {
    const completedInModule = module.weeks.filter(w => completedWeeks.has(w.id)).length;
    return (completedInModule / module.weeks.length) * 100;
  };

  // --- LOADING SCREEN ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your course...</p>
        </div>
      </div>
    );
  }

  // --- LOCK SCREEN ---
  if (student && student.dashboard_locked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md">
          <Lock className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Locked</h2>
          <p className="text-gray-600 mb-4">
            Your payment is overdue. Please clear your outstanding balance to continue.
          </p>
          <p className="text-lg font-semibold">
            Next Due Date:{' '}
            <span className="text-red-500">
              {student.next_due_date ?? 'N/A'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // --- NO COURSE FOUND ---
  if (!studentCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Course Found</h2>
          <p className="text-gray-600">
            You don't seem to be registered for any course or the course is not defined locally. Please contact the administrator.
          </p>
        </div>
      </div>
    );
  }

  // --- MAIN UI ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Course Task System</h1>
              {student && (
                <p className="text-gray-600 mt-1">
                  Welcome, {student.name || student.email}
                </p>
              )}
            </div>
          </div>

          {/* Course Info Banner */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-2">{studentCourse.name}</h2>
            <p className="text-indigo-100">
              {studentCourse.modules.length} module(s) • {completedWeeks.size} week(s) completed
            </p>
          </div>

          {/* Module Selection */}
          {!selectedModule && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Select a Module</h2>
              <div className="grid grid-cols-1 gap-4">
                {studentCourse.modules.map(module => {
                  const progress = getModuleProgress(module);
                  return (
                    <button
                      key={module.id}
                      onClick={() => handleModuleSelect(module)}
                      className="p-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-semibold">{module.name}</span>
                        <ChevronRight className="w-6 h-6" />
                      </div>
                      <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mb-2">
                        <div
                          className="bg-white h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-teal-100">
                        {module.weeks.filter(w => completedWeeks.has(w.id)).length}/{module.weeks.length} weeks completed
                      </p>
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
                onClick={() => handleModuleSelect(null)}
                className="mb-4 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                ← Back to Modules
              </button>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {selectedModule.name} - Select a Week
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedModule.weeks.map(week => {
                  const isCompleted = completedWeeks.has(week.id);
                  const isUnlocked = isWeekUnlocked(selectedModule, week);
                  const weekScore = weekScores[week.id];

                  return (
                    <button
                      key={week.id}
                      onClick={() => isUnlocked && handleWeekSelect(week)}
                      disabled={!isUnlocked}
                      className={`p-6 rounded-xl transition-all shadow-lg relative ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transform hover:scale-105 cursor-pointer'
                          : 'bg-gray-300 cursor-not-allowed opacity-60'
                      }`}
                    >
                      {!isUnlocked && (
                        <Lock className="absolute top-4 right-4 w-6 h-6 text-gray-600" />
                      )}
                      {isCompleted && (
                        <Check className="absolute top-4 right-4 w-6 h-6 text-white" />
                      )}
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className={`text-lg font-semibold ${isUnlocked ? 'text-white' : 'text-gray-600'}`}>
                            Week {week.weekNumber}
                          </div>
                          <div className={`text-sm mt-1 ${isUnlocked ? 'text-emerald-100' : 'text-gray-500'}`}>
                            {week.title}
                          </div>
                          {isCompleted && weekScore !== undefined && (
                            <div className="text-sm font-semibold text-white mt-2">
                              Score: {weekScore.toFixed(0)}%
                            </div>
                          )}
                        </div>
                        {isUnlocked && <ChevronRight className="w-6 h-6 text-white" />}
                      </div>
                      <p className={`text-sm mt-2 ${isUnlocked ? 'text-emerald-100' : 'text-gray-500'}`}>
                        {week.tasks.length} questions
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Task Questions */}
          {selectedWeek && !submitted && (
            <div>
              <button
                onClick={() => setSelectedWeek(null)}
                className="mb-4 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                ← Back to Weeks
              </button>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Week {selectedWeek.weekNumber}: {selectedWeek.title}
                </h2>
                <p className="text-gray-600 mt-2">Answer all questions and submit to see your score</p>
              </div>

              <div className="space-y-6">
                {selectedWeek.tasks.map((task, index) => (
                  <div key={task.id} className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">
                      Question {index + 1}: {task.question}
                    </h3>
                    <div className="space-y-3">
                      {task.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="flex items-center p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-400 cursor-pointer transition-all"
                        >
                          <input
                            type="radio"
                            name={`task-${task.id}`}
                            value={optionIndex}
                            checked={answers[task.id] === optionIndex}
                            onChange={() => handleAnswerChange(task.id, optionIndex)}
                            className="w-5 h-5 text-indigo-600"
                          />
                          <span className="ml-3 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== selectedWeek.tasks.length || submitting}
                className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg flex justify-center items-center"
              >
                {submitting ? (
                  <>
                    <Loader className="w-6 h-6 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Answers"
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {submitted && score && (
            <div>
              <div className="text-center mb-8">
                <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Results</h2>
                <div className="text-6xl font-bold text-indigo-600 mb-2">
                  {score.percentage.toFixed(0)}%
                </div>
                <p className="text-xl text-gray-600">
                  You got {score.correct} out of {score.total} questions correct
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {selectedWeek.tasks.map((task, index) => {
                  const userAnswer = answers[task.id];
                  const isCorrect = userAnswer === task.correctAnswer;

                  return (
                    <div key={task.id} className={`p-6 rounded-xl border-2 ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800 mb-3">
                            Question {index + 1}: {task.question}
                          </h3>
                          <div className="space-y-2">
                            <div className={`p-3 rounded-lg ${userAnswer === task.correctAnswer ? 'bg-green-100' : 'bg-red-100'}`}>
                              <span className="font-medium">Your answer: </span>
                              {task.options[userAnswer]}
                            </div>
                            {!isCorrect && (
                              <div className="p-3 rounded-lg bg-green-100">
                                <span className="font-medium">Correct answer: </span>
                                {task.options[task.correctAnswer]}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
            
                <button
                  onClick={handleReset}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
                >
                  Retake Test
                </button>
                {/* Note: Navigate is a function from react-router-dom, but you called it incorrectly as onClick={() => Navigate}.
                    I'm leaving the original behavior, but correcting the function call to navigate back to the module selection.
                */}
                <button
                  onClick={() => setSelectedWeek(null)} 
                  className="flex-1 bg-gray-600 text-white py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all"
                >
                  Back to Weeks
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}