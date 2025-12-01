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

const coursesData = {
  courses: [
    {
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
                { id: 1, question: "What does HTML stand for?", options: ["Hyper Text Markup Language","High Tech Modern Language","Home Tool Markup Language","Hyperlinks and Text Markup Language"], correctAnswer: 0 },
                { id: 2, question: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], correctAnswer: 2 },
                { id: 3, question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<br>", "<lb>", "<newline>"], correctAnswer: 1 },
                { id: 4, question: "Which attribute is used to provide alternative text for an image?", options: ["title", "alt", "src", "longdesc"], correctAnswer: 1 },
                { id: 5, question: "What is the correct HTML for creating a hyperlink?", options: ["<a url='http://example.com'>Example</a>","<a href='http://example.com'>Example</a>","<link>http://example.com</link>","<hyperlink>http://example.com</hyperlink>"], correctAnswer: 1 }
              ]
            },
            {
              id: 2,
              weekNumber: 2,
              title: "CSS Fundamentals",
              tasks: [
                { id: 1, question: "What does CSS stand for?", options: ["Computer Style Sheets","Cascading Style Sheets","Creative Style Sheets","Colorful Style Sheets"], correctAnswer: 1 },
                { id: 2, question: "Which CSS property is used to change text color?", options: ["text-color", "font-color", "color", "text-style"], correctAnswer: 2 },
                { id: 3, question: "How do you select an element with id 'header' in CSS?", options: [".header", "#header", "*header", "header"], correctAnswer: 1 },
                { id: 4, question: "Which property is used to change the background color?", options: ["bgcolor", "background-color", "color", "bg-color"], correctAnswer: 1 },
                { id: 5, question: "What is the default value of the position property?", options: ["relative", "fixed", "absolute", "static"], correctAnswer: 3 }
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
                { id: 1, question: "Which keyword is used to declare a variable in JavaScript?", options: ["var","let","const","All of the above"], correctAnswer: 3 },
                { id: 2, question: "What is the correct syntax for a JavaScript comment?", options: ["<!-- comment -->","// comment","# comment","/* comment"], correctAnswer: 1 },
                { id: 3, question: "Which method is used to parse a string to an integer?", options: ["parseInt()","parseInteger()","toInteger()","int()"], correctAnswer: 0 },
                { id: 4, question: "What will 'typeof null' return?", options: ["null","undefined","object","number"], correctAnswer: 2 },
                { id: 5, question: "Which operator is used for strict equality?", options: ["==","===","=","!="], correctAnswer: 1 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Python Programming",
      modules: [
        {
          id: 3,
          name: "Python Fundamentals",
          weeks: [
            {
              id: 4,
              weekNumber: 1,
              title: "Python Basics",
              tasks: [
                { id: 1, question: "Which keyword is used to define a function in Python?", options: ["function","def","func","define"], correctAnswer: 1 },
                { id: 2, question: "What is the output of print(type([]))?", options: ["<class 'array'>","<class 'list'>","<class 'tuple'>","<class 'dict'>"], correctAnswer: 1 },
                { id: 3, question: "Which method is used to add an element to the end of a list?", options: ["add()","append()","insert()","push()"], correctAnswer: 1 },
                { id: 4, question: "What symbol is used for comments in Python?", options: ["//","/*","#","<!--"], correctAnswer: 2 },
                { id: 5, question: "Which of the following is NOT a valid Python data type?", options: ["int","float","char","str"], correctAnswer: 2 }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default function TaskManagementSystem() {
  const [student, setStudent] = useState(null);
  const [studentCourse, setStudentCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
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
        // compare dates without time by converting to date-string
        const amountOwed = Number(res.data.amount_owed ?? 0);
        if (amountOwed > 0) computedLock = true;
      }

      const backendLock = typeof res.data.dashboard_locked === 'boolean' ? res.data.dashboard_locked : null;
      const finalLocked = backendLock !== null ? backendLock : computedLock;

      // attach final computed lock onto the student object so UI can read student.dashboard_locked
      setStudent(prev => ({ ...prev, dashboard_locked: finalLocked }));

      // If locked, stop and show lock screen (don't fetch completed weeks)
      if (finalLocked) {
        setLoading(false);
        return;
      }

      // determine course (backend may return course object or course id or null)
      let courseName = null;
      if (res.data.course && typeof res.data.course === 'object') {
        courseName = res.data.course.name || res.data.course.title || null;
      } else if (res.data.course_name) {
        courseName = res.data.course_name;
      } else if (res.data.course && typeof res.data.course === 'number') {
        courseName = res.data.course; // id - we'll try match by id below
      }

      // find matching course in our sample dataset (fallback)
      const course = coursesData.courses.find(c =>
        c.name === courseName || c.id === courseName || c.id === Number(courseName)
      ) || null;

      setStudentCourse(course);
      // now fetch completed weeks and scores
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

      // res.data should be an array of completed week objects
      const completed = new Set(res.data.map(w => w.week_id));
      setCompletedWeeks(completed);

      // Store scores by week_id
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

    // First week of first module is always unlocked
    if (module.id === studentCourse.modules[0].id && week.weekNumber === 1) {
      return true;
    }

    // Check if previous week in same module is completed
    const previousWeek = module.weeks.find(w => w.weekNumber === week.weekNumber - 1);
    if (previousWeek && completedWeeks.has(previousWeek.id)) {
      return true;
    }

    // If first week of module, check if last week of previous module is completed
    if (week.weekNumber === 1) {
      const moduleIndex = studentCourse.modules.findIndex(m => m.id === module.id);
      if (moduleIndex > 0) {
        const previousModule = studentCourse.modules[moduleIndex - 1];
        const lastWeekOfPrevModule = previousModule.weeks[previousModule.weeks.length - 1];
        return completedWeeks.has(lastWeekOfPrevModule.id);
      }
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

  const handleSubmit = async () => {
    if (!selectedWeek) return;

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

    // Save results to backend
    try {
      const token = localStorage.getItem("token");
      await api.post("/tasks/submit/", {
        week_id: selectedWeek.id,
        module_id: selectedModule.id,
        module_name: selectedModule.name,
        course_id: studentCourse ? studentCourse.id : null,
        answers: answers,
        score: scoreData
      }, {
        headers: { Authorization: `Token ${token}` }
      });

      // Update completed weeks locally
      setCompletedWeeks(prev => new Set([...prev, selectedWeek.id]));
      setWeekScores(prev => ({ ...prev, [selectedWeek.id]: percentage }));
    } catch (error) {
      console.error("Failed to save task results:", error);
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

  // --- LOCK SCREEN: show when student exists AND dashboard_locked is true ---
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

  // --- NO COURSE FOUND (after loading and not locked) ---
  if (!studentCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Course Found</h2>
          <p className="text-gray-600">
            You don't seem to be registered for any course. Please contact the administrator.
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
                onClick={() => setSelectedModule(null)}
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
                disabled={Object.keys(answers).length !== selectedWeek.tasks.length}
                className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
              >
                Submit Answers
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
