import React, { useState, useEffect, useCallback } from "react";
import {
  CheckCircle,
  XCircle,
  Award,
  ChevronRight,
  Loader,
  Lock,
  AlertCircle,
  RefreshCw,
  Clock,
} from "lucide-react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useCourseProgress } from "../../hooks/CourseContext";

const mockCoursesData = {
  // ====================================
  // 1. WEB DEVELOPMENT (Key: "Web Development")
  // ====================================
  "Web Development": {
    id: 1, // Keep the ID inside the object for submission
    course_name: "Web Development",
    modules: [
      // HTML Module (ID: 10)
      {
        id: 10,
        name: "HTML",
        weeks: [
          {
            id: 100, // Week ID
            weekNumber: 1,
            title: "HTML Structure & Tags",
            tasks: [
              {
                id: 1001,
                question: "HTML stands for?",
                options: [
                  "Hyper Text Makeup Language",
                  "Hyper Text Markup Language",
                  "Home Tool Markup Language",
                ],
                correctAnswer: 1,
              },
              {
                id: 1002,
                question: "Which tag is used for the largest heading?",
                options: ["<h1>", "<h6>", "<head>", "<title>"],
                correctAnswer: 0,
              },
            ],
          },
        ],
      },
      // CSS Module (ID: 11)
      {
        id: 11,
        name: "CSS",
        weeks: [
          {
            id: 101, // Week ID
            weekNumber: 1,
            title: "CSS Selectors & Styling",
            tasks: [
              {
                id: 1011,
                question: "CSS stands for?",
                options: [
                  "Computer Style Sheets",
                  "Cascading Style Sheets",
                  "Creative Style Sheets",
                ],
                correctAnswer: 1,
              },
              {
                id: 1012,
                question: "Which changes text color?",
                options: ["font-color", "color", "text-color"],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
      // JavaScript Module (ID: 12)
      {
        id: 12,
        name: "JavaScript",
        weeks: [
          {
            id: 102, // Week ID
            weekNumber: 1,
            title: "JS Variables & Data Types",
            tasks: [
              {
                id: 1021,
                question:
                  "Which keyword is NOT used to declare a variable in modern JS?",
                options: ["var", "let", "const", "def"],
                correctAnswer: 3,
              },
              {
                id: 1022,
                question: "How do you output data to the web console?",
                options: ["console.print()", "print()", "console.log()"],
                correctAnswer: 2,
              },
            ],
          },
        ],
      },
    ],
  },

  // ====================================
  // 2. BACKEND DEVELOPMENT (Key: "Backend Development")
  // ====================================
  "Backend Development": {
    id: 2,
    course_name: "Backend Development",
    modules: [
      // Python Module (ID: 20)
      {
        id: 20,
        name: "Python",
        weeks: [
          {
            id: 200,
            weekNumber: 1,
            title: "Python Fundamentals & Data Types",
            tasks: [
              {
                id: 2001,
                question: "Which Python data type is immutable?",
                options: ["List", "Dictionary", "Tuple"],
                correctAnswer: 2,
              },
              {
                id: 2002,
                question:
                  "Which keyword is used to define a variable in Python?",
                options: ["var", "define", "No keyword needed"],
                correctAnswer: 2,
              },
              {
                id: 2003,
                question: "What will type(10.5) return?",
                options: ["int", "float", "str"],
                correctAnswer: 1,
              },
              {
                id: 2004,
                question:
                  "Which symbol is used for single-line comments in Python?",
                options: ["//", "#", "/*"],
                correctAnswer: 1,
              },
              {
                id: 2005,
                question: "Which of the following is a correct variable name?",
                options: ["1value", "value_1", "value-1"],
                correctAnswer: 1,
              },
            ],
          },

          {
            id: 201,
            weekNumber: 2,
            title: "Control Flow & Loops",
            tasks: [
              {
                id: 2011,
                question:
                  "Which statement is used to make decisions in Python?",
                options: ["for", "if", "while"],
                correctAnswer: 1,
              },
              {
                id: 2012,
                question:
                  "Which loop is best when the number of iterations is known?",
                options: ["while", "do-while", "for"],
                correctAnswer: 2,
              },
              {
                id: 2013,
                question: "What does the 'break' statement do?",
                options: [
                  "Skips current iteration",
                  "Stops the loop",
                  "Restarts the loop",
                ],
                correctAnswer: 1,
              },
              {
                id: 2014,
                question: "Which operator is used for logical AND?",
                options: ["&&", "and", "&"],
                correctAnswer: 1,
              },
              {
                id: 2015,
                question: "What function is used to take input from a user?",
                options: ["input()", "scan()", "read()"],
                correctAnswer: 0,
              },
            ],
          },

          {
            id: 202,
            weekNumber: 3,
            title: "Functions & Error Handling",
            tasks: [
              {
                id: 2021,
                question:
                  "Which keyword is used to define a function in Python?",
                options: ["function", "def", "fun"],
                correctAnswer: 1,
              },
              {
                id: 2022,
                question:
                  "What keyword is used to return a value from a function?",
                options: ["return", "break", "yield"],
                correctAnswer: 0,
              },
              {
                id: 2023,
                question: "Which block is used to handle errors?",
                options: ["try-except", "if-else", "for-loop"],
                correctAnswer: 0,
              },
              {
                id: 2024,
                question: "What will happen if an exception is not handled?",
                options: [
                  "Program ignores it",
                  "Program crashes",
                  "Program continues",
                ],
                correctAnswer: 1,
              },
              {
                id: 2025,
                question:
                  "Which keyword is executed whether an error occurs or not?",
                options: ["except", "else", "finally"],
                correctAnswer: 2,
              },
            ],
          },

          {
            id: 203,
            weekNumber: 4,
            title: "Object-Oriented Programming (OOP)",
            tasks: [
              {
                id: 2031,
                question: "Which keyword is used to create a class?",
                options: ["class", "object", "struct"],
                correctAnswer: 0,
              },
              {
                id: 2032,
                question: "What does 'self' represent in a class?",
                options: ["Current class", "Current object", "Parent class"],
                correctAnswer: 1,
              },
              {
                id: 2033,
                question:
                  "Which method is called automatically when an object is created?",
                options: ["__init__", "__start__", "__create__"],
                correctAnswer: 0,
              },
              {
                id: 2034,
                question:
                  "Which OOP concept allows one class to inherit from another?",
                options: ["Polymorphism", "Encapsulation", "Inheritance"],
                correctAnswer: 2,
              },
              {
                id: 2035,
                question:
                  "Which concept hides internal implementation details?",
                options: ["Inheritance", "Abstraction", "Looping"],
                correctAnswer: 1,
              },
            ],
          },

          {
            id: 204,
            weekNumber: 5,
            title: "Advanced Python & Best Practices",
            tasks: [
              {
                id: 2041,
                question: "Which module is used to work with dates and time?",
                options: ["time", "datetime", "calendar"],
                correctAnswer: 1,
              },
              {
                id: 2042,
                question: "Which keyword is used to import a module?",
                options: ["include", "import", "require"],
                correctAnswer: 1,
              },
              {
                id: 2043,
                question: "What does PEP 8 refer to?",
                options: ["Python version", "Style guide", "Error handler"],
                correctAnswer: 1,
              },
              {
                id: 2044,
                question: "Which data structure is best for key-value pairs?",
                options: ["List", "Tuple", "Dictionary"],
                correctAnswer: 2,
              },
              {
                id: 2045,
                question: "Which practice improves code reusability?",
                options: ["Hardcoding", "Functions", "Global variables"],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
      // Django Module (ID: 21)
      {
        id: 21,
        name: "Django",
        weeks: [
          {
            id: 300,
            weekNumber: 1,
            title: "Django Fundamentals & Project Structure",
            tasks: [
              {
                id: 3001,
                question:
                  "What command is used to create a new Django project?",
                options: [
                  "django-admin startproject",
                  "python manage.py startapp",
                  "pip install django",
                ],
                correctAnswer: 0,
              },
              {
                id: 3002,
                question: "Which file contains project-level settings?",
                options: ["urls.py", "views.py", "settings.py"],
                correctAnswer: 2,
              },
              {
                id: 3003,
                question: "What does MVT stand for in Django?",
                options: [
                  "Model View Template",
                  "Main View Tool",
                  "Model View Type",
                ],
                correctAnswer: 0,
              },
              {
                id: 3004,
                question: "Which file handles URL routing in Django?",
                options: ["views.py", "settings.py", "urls.py"],
                correctAnswer: 2,
              },
              {
                id: 3005,
                question: "ORM stands for?",
                options: [
                  "Object Related Module",
                  "Object-Relational Mapping",
                  "Output Rendering Model",
                ],
                correctAnswer: 1,
              },
            ],
          },

          {
            id: 301,
            weekNumber: 2,
            title: "Models, ORM & Databases",
            tasks: [
              {
                id: 3011,
                question: "Which command is used to create migrations?",
                options: ["migrate", "makemigrations", "createsuperuser"],
                correctAnswer: 1,
              },
              {
                id: 3012,
                question: "Which file is used to define models?",
                options: ["models.py", "views.py", "admin.py"],
                correctAnswer: 0,
              },
              {
                id: 3013,
                question: "Which database is used by default in Django?",
                options: ["MySQL", "PostgreSQL", "SQLite"],
                correctAnswer: 2,
              },
              {
                id: 3014,
                question:
                  "Which method saves a model instance to the database?",
                options: ["commit()", "save()", "insert()"],
                correctAnswer: 1,
              },
              {
                id: 3015,
                question:
                  "Which Django feature allows database interaction using Python code?",
                options: ["DTL", "ORM", "API"],
                correctAnswer: 1,
              },
            ],
          },

          {
            id: 302,
            weekNumber: 3,
            title: "Django REST APIs",
            tasks: [
              {
                id: 3021,
                question: "Which package is used to build APIs in Django?",
                options: ["django-api", "django-rest-framework", "django-http"],
                correctAnswer: 1,
              },
              {
                id: 3022,
                question: "What is the role of a serializer?",
                options: [
                  "Render templates",
                  "Convert data to JSON",
                  "Handle URLs",
                ],
                correctAnswer: 1,
              },
              {
                id: 3023,
                question: "Which HTTP method is used to create data?",
                options: ["GET", "POST", "PUT"],
                correctAnswer: 1,
              },
              {
                id: 3024,
                question: "Which class is commonly used for API views?",
                options: ["APIView", "TemplateView", "DetailView"],
                correctAnswer: 0,
              },
              {
                id: 3025,
                question: "What format is commonly used for API responses?",
                options: ["HTML", "XML", "JSON"],
                correctAnswer: 2,
              },
            ],
          },

          {
            id: 303,
            weekNumber: 4,
            title: "Authentication & Authorization",
            tasks: [
              {
                id: 3031,
                question: "Which Django app handles authentication by default?",
                options: ["auth", "users", "accounts"],
                correctAnswer: 0,
              },
              {
                id: 3032,
                question: "Which function logs in a user?",
                options: ["authenticate()", "login()", "signin()"],
                correctAnswer: 1,
              },
              {
                id: 3033,
                question:
                  "Which decorator restricts access to logged-in users?",
                options: ["@admin_only", "@login_required", "@secure"],
                correctAnswer: 1,
              },
              {
                id: 3034,
                question: "What are permissions used for?",
                options: [
                  "Styling pages",
                  "Restricting access",
                  "Handling requests",
                ],
                correctAnswer: 1,
              },
              {
                id: 3035,
                question: "Which file is used to configure permissions?",
                options: ["models.py", "settings.py", "permissions.py"],
                correctAnswer: 0,
              },
            ],
          },

          {
            id: 304,
            weekNumber: 5,
            title: "Deployment & Best Practices",
            tasks: [
              {
                id: 3041,
                question: "Which command collects static files for deployment?",
                options: ["makestatic", "collectstatic", "gatherstatic"],
                correctAnswer: 1,
              },
              {
                id: 3042,
                question:
                  "Which platform is commonly used to deploy Django apps?",
                options: ["Render", "Figma", "Netlify"],
                correctAnswer: 0,
              },
              {
                id: 3043,
                question: "What file lists project dependencies?",
                options: ["requirements.txt", "settings.py", "packages.json"],
                correctAnswer: 0,
              },
              {
                id: 3044,
                question: "Which setting should be False in production?",
                options: ["DEBUG", "STATIC_URL", "ALLOWED_HOSTS"],
                correctAnswer: 0,
              },
              {
                id: 3045,
                question: "What is a recommended best practice?",
                options: [
                  "Hardcode secrets",
                  "Use environment variables",
                  "Disable migrations",
                ],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
      // Git & GitHub Module (ID: 22)
      {
        id: 22,
        name: "Git & GitHub",
        weeks: [
          {
            id: 402, // Week ID
            weekNumber: 1,
            title: "Version Control Basics",
            tasks: [
              {
                id: 4021,
                question: "Command to create a new branch in Git?",
                options: [
                  "git branch new-name",
                  "git create branch",
                  "git checkout -b new-name",
                ],
                correctAnswer: 2,
              },
              {
                id: 4022,
                question: "What is a 'pull request' on GitHub?",
                options: [
                  "Downloading code",
                  "Asking to merge a branch",
                  "Committing changes",
                ],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
    ],
  },

  // ====================================
  // 3. DATA SCIENCE (Key: "Data Science")
  // ====================================
  "Data Science": {
    id: 3,
    course_name: "Data Science",
    modules: [
      // Excel Module (ID: 30)
      {
        id: 30,
        name: "Excel",
        weeks: [
          {
            id: 500, // Week ID
            weekNumber: 1,
            title: "Excel Formulas & Functions",
            tasks: [
              {
                id: 5001,
                question: "Function used for conditional sum?",
                options: ["SUM()", "IFSUM()", "SUMIF()"],
                correctAnswer: 2,
              },
              {
                id: 5002,
                question: "What is an absolute reference in Excel?",
                options: ["A$1", "$A$1", "A1$"],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
      // Python Module (ID: 31)
      {
        id: 31,
        name: "Python",
        weeks: [
          {
            id: 501, // Week ID
            weekNumber: 1,
            title: "Python Setup for DS",
            tasks: [
              {
                id: 5011,
                question: "What is the primary environment for Python in DS?",
                options: ["VS Code", "Jupyter Notebook", "Sublime Text"],
                correctAnswer: 1,
              },
              {
                id: 5012,
                question: "Which is a good practice for virtual environments?",
                options: ["pip freeze", "pip install env", "python -m venv"],
                correctAnswer: 2,
              },
            ],
          },
        ],
      },
      // Numpy Module (ID: 32)
      {
        id: 32,
        name: "Numpy",
        weeks: [
          {
            id: 502, // Week ID
            weekNumber: 1,
            title: "Numpy Arrays",
            tasks: [
              {
                id: 5021,
                question: "Main data structure in NumPy?",
                options: ["DataFrame", "np.array", "List"],
                correctAnswer: 1,
              },
              {
                id: 5022,
                question: "What does `shape` property return?",
                options: [
                  "Size in bytes",
                  "Dimensions of the array",
                  "Data type",
                ],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
      // Pandas Module (ID: 33)
      {
        id: 33,
        name: "Pandas",
        weeks: [
          {
            id: 503, // Week ID
            weekNumber: 1,
            title: "DataFrames and Series",
            tasks: [
              {
                id: 5031,
                question: "The 2-dimensional data structure in Pandas is the:",
                options: ["Series", "DataFrame", "Panel"],
                correctAnswer: 1,
              },
              {
                id: 5032,
                question: "How do you handle missing values in Pandas?",
                options: ["df.remove_nan()", "df.fillna()", "df.skip_nulls()"],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
    ],
  },

  // ====================================
  // 4. DATA ANALYTICS (Key: "Data Analytics")
  // ====================================
  "Data Analytics": {
    id: 4,
    course_name: "Data Analytics",
    modules: [
      // Advanced Excel Module (ID: 40)
      {
        id: 40,
        name: "Advanced Excel",
        weeks: [
          {
            id: 600, // Week ID
            weekNumber: 1,
            title: "VLOOKUP & HLOOKUP",
            tasks: [
              {
                id: 6001,
                question:
                  "Which function is better for complex lookups (VLOOKUP, HLOOKUP, XLOOKUP)?",
                options: ["VLOOKUP", "HLOOKUP", "XLOOKUP"],
                correctAnswer: 2,
              },
              {
                id: 6002,
                question:
                  "What does the `range_lookup` argument in VLOOKUP specify?",
                options: [
                  "The lookup range",
                  "Exact or approximate match",
                  "The column number",
                ],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
      // SQL Module (ID: 41)
      {
        id: 41,
        name: "SQL",
        weeks: [
          {
            id: 701, // Week ID
            weekNumber: 1,
            title: "Data Retrieval and Filtering",
            tasks: [
              {
                id: 7011,
                question: "Which SQL clause is used to filter records?",
                options: ["SELECT", "FROM", "WHERE"],
                correctAnswer: 2,
              },
              {
                id: 7012,
                question: "The `INNER JOIN` keyword returns:",
                options: [
                  "All rows from both tables",
                  "Matching rows only",
                  "Non-matching rows only",
                ],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
    ],
  },

  // ====================================
  // 5. GRAPHIC DESIGN (Key: "Graphic Design")
  // ====================================
  "Graphic Design": {
    id: 5,
    course_name: "Graphic Design",
    modules: [
      // CorelDraw Module (ID: 50)
      {
        id: 50,
        name: "CorelDraw",
        weeks: [
          {
            id: 800, // Week ID
            weekNumber: 1,
            title: "Vector Graphics Fundamentals",
            tasks: [
              {
                id: 8001,
                question: "CorelDraw primarily creates which type of image?",
                options: ["Raster", "Bitmap", "Vector"],
                correctAnswer: 2,
              },
              {
                id: 8002,
                question: "The tool used to reshape objects is called the:",
                options: ["Pick Tool", "Shape Tool", "Crop Tool"],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
      // Figma Module (ID: 51)
      {
        id: 51,
        name: "Figma",
        weeks: [
          {
            id: 801, // Week ID
            weekNumber: 1,
            title: "Figma Interface and Prototyping",
            tasks: [
              {
                id: 8011,
                question: "Figma is primarily used for:",
                options: ["3D Modeling", "UI/UX Design", "Photo Editing"],
                correctAnswer: 1,
              },
              {
                id: 8012,
                question: "What is an 'Auto Layout' in Figma?",
                options: [
                  "A grid system",
                  "A feature for responsive design",
                  "A pre-designed template",
                ],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
    ],
  },
};

export default function TaskManagementSystem() {
  const {
    completedWeeks,
    weekScores,
    markWeekComplete,
    setTotalWeeksCount,
    loadCompletedWeeks,
    completionPercentage,
  } = useCourseProgress();
  const [student, setStudent] = useState(null);
  const [studentCourse, setStudentCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [quizTimer, setQuizTimer] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const navigate = useNavigate();

  // Submit handler
  const handleSubmit = useCallback(async () => {
    if (!selectedWeek || submitting || submitted) return;

    let correctCount = 0;
    selectedWeek.tasks.forEach((task) => {
      if (answers[task.id] === task.correctAnswer) correctCount++;
    });

    const percentage = Math.round(
      (correctCount / selectedWeek.tasks.length) * 100
    );
    const scoreData = {
      correct: correctCount,
      total: selectedWeek.tasks.length,
      percentage,
    };

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
        time_taken: 1800 - (quizTimer || 0),
      });

      setCompletedWeeks((prev) => new Set([...prev, selectedWeek.id]));
      setWeekScores((prev) => ({ ...prev, [selectedWeek.id]: percentage }));
    } catch (err) {
      console.error("Submit failed:", err);
      setError("Failed to save. Check internet and try again.");
    } finally {
      setSubmitting(false);
    }
  }, [
    selectedWeek,
    answers,
    selectedModule,
    studentCourse,
    quizTimer,
    submitting,
    submitted,
  ]);

  // Timer
  useEffect(() => {
    if (!showTimer || quizTimer <= 0) return;

    const interval = setInterval(() => {
      setQuizTimer((prev) => {
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
      const weekIds = res.data.map((item) => item.week_id);
      const scores = {};
      res.data.forEach((item) => {
        scores[item.week_id] = item.percentage;
      });

      // Update context instead of local state
      loadCompletedWeeks(weekIds, scores);
    } catch (err) {
      console.warn("No completed tasks yet");
    }
  }, [loadCompletedWeeks]);

  useEffect(() => {
    if (studentCourse?.modules) {
      const total = studentCourse.modules.reduce(
        (a, m) => a + m.weeks.length,
        0
      );
      setTotalWeeksCount(total);
    }
  }, [studentCourse, setTotalWeeksCount]);

  // Main loader
  // Main loader
  // Main loader
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/students/users/me");
        const studentData = Array.isArray(res.data) ? res.data[0] : res.data;
        if (!studentData) throw new Error("No profile found");

        // Payment lock logic
        const nextDue = studentData.next_due_date
          ? new Date(studentData.next_due_date)
          : null;
        const today = new Date();
        const isOverdue =
          nextDue && nextDue < new Date(today.setHours(0, 0, 0, 0));
        const hasDebt = Number(studentData.amount_owed || 0) > 0;
        const locked = isOverdue && hasDebt;
        setStudent({ ...studentData, dashboard_locked: locked });
        if (locked) {
          setLoading(false);
          return;
        }

        let courseName =
          studentData.course?.course_name ||
          studentData.course?.name ||
          studentData.course;
        if (!courseName) throw new Error("No course assigned");

        let courseData =
          mockCoursesData[courseName] ||
          Object.values(mockCoursesData).find(
            (c) =>
              c.course_name.toLowerCase() === String(courseName).toLowerCase()
          );

        setStudentCourse(courseData);
        await fetchCompletedWeeks();
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load dashboard.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Helper functions
  const getModuleProgress = useCallback(
    (module) => {
      const completed = module.weeks.filter((w) =>
        completedWeeks.has(w.id)
      ).length;
      return module.weeks.length ? (completed / module.weeks.length) * 100 : 0;
    },
    [completedWeeks]
  );

  const isWeekUnlocked = useCallback(
    (module, week) => {
      if (!studentCourse) return false;
      if (module.id === studentCourse.modules[0]?.id && week.weekNumber === 1)
        return true;

      const prevWeek = module.weeks.find(
        (w) => w.weekNumber === week.weekNumber - 1
      );
      if (prevWeek && completedWeeks.has(prevWeek.id)) return true;

      if (week.weekNumber === 1) {
        const modIdx = studentCourse.modules.findIndex(
          (m) => m.id === module.id
        );
        if (modIdx > 0) {
          const prevMod = studentCourse.modules[modIdx - 1];
          const lastWeek = prevMod.weeks[prevMod.weeks.length - 1];
          return completedWeeks.has(lastWeek.id);
        }
      }
      return false;
    },
    [studentCourse, completedWeeks]
  );

  // --- FIXED: ADDED MISSING HANDLER ---
  const handleModuleSelect = useCallback((module) => {
    setSelectedModule(module);
  }, []);
  // ------------------------------------

  const handleWeekSelect = useCallback(
    (week) => {
      if (completedWeeks.has(week.id)) return; // Prevent re-attempts
      setSelectedWeek(week);
      setAnswers({});
      setSubmitted(false);
      setScore(null);
      setQuizTimer(1800);
      setShowTimer(true);
    },
    [completedWeeks]
  );

  const handleAnswerChange = useCallback((taskId, index) => {
    setAnswers((prev) => ({ ...prev, [taskId]: index }));
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
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // RENDER
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-16 h-16 text-indigo-600 animate-spin" />
        <p className="ml-4 text-xl">Loading...</p>
      </div>
    );

  if (error && !student)
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Error</h2>
        <p>{error}</p>
        <button
          onClick={fetchProfile}
          className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl"
        >
          <RefreshCw className="inline w-5 h-5 mr-2" /> Retry
        </button>
      </div>
    );

  if (student?.dashboard_locked)
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow text-center">
        <Lock className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Dashboard Locked</h2>
        <p>Payment overdue. Clear balance to continue.</p>
        <p className="mt-4 font-bold text-xl text-red-600">
          ₦{Number(student.amount_owed || 0).toLocaleString()}
        </p>
      </div>
    );

  if (!studentCourse)
    return (
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
          <h1 className="text-3xl font-bold text-gray-900">Course Tasks</h1>
          <p className="text-xl text-gray-600 mt-4">
            Welcome back, {student?.name}!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 text-center border">
          <h2 className="text-2xl font-bold text-indigo-700">
            {studentCourse.course_name}
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            {completedWeeks.size} /{" "}
            {studentCourse.modules.reduce((a, m) => a + m.weeks.length, 0)}{" "}
            weeks completed
          </p>
        </div>

        {!selectedModule && (
          <div>
            <h2 className="text-xl font-bold text-center mb-10">
              Select a Module
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {studentCourse.modules.map((mod) => {
                const progress = getModuleProgress(mod);
                const done = mod.weeks.filter((w) =>
                  completedWeeks.has(w.id)
                ).length;
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
                        <span className="font-bold">
                          {done}/{mod.weeks.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
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
                    disabled={!unlocked || done}
                    className={`
                      relative overflow-hidden rounded-3xl shadow-lg transition-all duration-300 
                      focus:outline-none focus:ring-4 focus:ring-indigo-300
                      ${
                        unlocked && !done
                          ? "hover:scale-105 hover:shadow-2xl cursor-pointer"
                          : "cursor-not-allowed opacity-70"
                      }
                      ${done ? "ring-4 ring-emerald-400" : ""}
                    `}
                  >
                    {/* Card Background */}
                    <div
                      className={`
                        h-full p-8 border-4 rounded-3xl transition-all
                        ${
                          unlocked
                            ? done
                              ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-500"
                              : "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-400"
                            : "bg-gray-100 border-gray-300"
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
                        <h3 className="text-3xl font-bold text-gray-800 mb-3">
                          Week {week.weekNumber}
                        </h3>
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
                        <div className="absolute inset-0 bg-black/10 rounded-3xl flex items-center justify-center"></div>
                      )}
                    </div>

                    {done && (
                      <div className="absolute bottom-6 left-6 px-4 py-2 text-white text-sm font-bold bg-emerald-100/70 rounded-full shadow-lg">
                        Completed - {weekScore || 0}%
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SAFE QUIZ RENDERING */}
        {selectedWeek &&
        !submitted &&
        selectedWeek.tasks &&
        selectedWeek.tasks.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={() => setSelectedWeek(null)}
                className="text-indigo-600 font-bold"
              >
                ← Back
              </button>
              {showTimer && quizTimer > 0 && (
                <div
                  className={`px-8 py-4 rounded-full text-xl font-bold shadow-lg ${
                    quizTimer < 300
                      ? "bg-red-100 text-red-700"
                      : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  <Clock className="inline w-6 h-6 mr-3" />
                  {formatTime(quizTimer)}
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-10">
              <h2 className="text-4xl font-bold mb-4">
                Week {selectedWeek.weekNumber}
              </h2>
              <p className="text-2xl text-gray-600 mb-12">
                {selectedWeek.title}
              </p>

              <div className="space-y-12">
                {selectedWeek.tasks.map((task, i) => (
                  <div key={task.id}>
                    <p className="text-xl font-bold mb-6">Question {i + 1}</p>
                    <p className="text-2xl mb-8">{task.question}</p>
                    <div className="space-y-4">
                      {task.options.map((opt, idx) => (
                        <label
                          key={idx}
                          className={`block p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            answers[task.id] === idx
                              ? "border-indigo-600 bg-indigo-50"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
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
                disabled={
                  Object.keys(answers).length !== selectedWeek.tasks.length ||
                  submitting
                }
                className="w-full mt-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-2xl font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-800 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
              </button>
            </div>
          </div>
        ) : selectedWeek ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">
              No questions available for this week yet.
            </p>
            <button
              onClick={() => setSelectedWeek(null)}
              className="mt-8 px-8 py-4 bg-indigo-600 text-white rounded-xl text-xl"
            >
              ← Back to Weeks
            </button>
          </div>
        ) : null}

        {/* Results */}
        {submitted && score && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <Award className="w-32 h-32 text-yellow-500 mx-auto mb-8" />
            <h2 className="text-6xl font-bold mb-8">Quiz Complete!</h2>
            <div className="text-9xl font-bold text-indigo-600 mb-8">
              {score.percentage}%
            </div>
            <p className="text-3xl text-gray-700 mb-12">
              {score.correct} / {score.total} correct
            </p>

            <div className="bg-white rounded-3xl shadow-2xl p-10 space-y-8">
              {selectedWeek.tasks.map((task) => {
                const correct = answers[task.id] === task.correctAnswer;
                return (
                  <div
                    key={task.id}
                    className={`p-8 rounded-2xl ${
                      correct ? "bg-emerald-100" : "bg-red-100"
                    }`}
                  >
                    <p className="text-xl font-bold mb-4">{task.question}</p>
                    <p>
                      Your answer:{" "}
                      <strong>
                        {task.options[answers[task.id]] || "Skipped"}
                      </strong>
                    </p>
                    {!correct && (
                      <p className="text-emerald-700 mt-3">
                        Correct:{" "}
                        <strong>{task.options[task.correctAnswer]}</strong>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-8 mt-12 max-w-lg mx-auto">
              <button
                onClick={() => navigate("/student/skills-progress")}
                className="flex-1 py-5 bg-gray-700 hover:bg-gray-800 text-white text-2xl font-bold rounded-2xl"
              >
                Back to Progress
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
