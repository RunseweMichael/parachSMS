// mockCoursesData.js
const mockCoursesData = {
  // 1. WEB DEVELOPMENT (Key: "Web Development")

  "	Front End Web Dev. (Basic)": {
    id: 1,
    course_name: "Web Development",
    modules: [
      // HTML Module (ID: 10)
      {
        id: 10,
        name: "HTML",
        weeks: [
          {
            id: 100,
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
            id: 101,
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
            id: 102,
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

  // 2. BACKEND DEVELOPMENT

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
            id: 402,
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

  // 3. DATA SCIENCE (Key: "Data Science")

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
            id: 500,
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
            id: 501,
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
            id: 502,
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
            id: 503,
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

  // 4. DATA ANALYTICS (Key: "Data Analytics")

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
            id: 600,
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
            id: 701,
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

  // 5. GRAPHIC DESIGN (Key: "Graphic Design")

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
            id: 800,
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
            id: 801,
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

  // 6. ADVANCED CYBER SECURITY (Key: "Advanced Cyber Security")
  "Cybersecurity (Advanced)": {
    "id": 6,
    "course_name": "Advanced Cyber Security",
    "modules": [
      {
        "id": 60,
        "name": "Cybersecurity Basics",
        "weeks": [
          {
            "id": 900,
            "weekNumber": 1,
            "title": "Core Cybersecurity Concepts",
            "tasks": [
              {
                "id": 9001,
                "question": "What does the CIA triad stand for in cybersecurity?",
                "options": [
                  "Confidentiality, Integrity, Availability",
                  "Control, Inspection, Authorization",
                  "Confidentiality, Identity, Access"
                ],
                "correctAnswer": 0
              },
              {
                "id": 9002,
                "question": "Which type of attack involves tricking users into revealing sensitive information?",
                "options": ["Phishing", "DDoS", "Brute Force"],
                "correctAnswer": 0
              },
              {
                "id": 9003,
                "question": "What is the primary purpose of a firewall?",
                "options": [
                  "Encrypt data",
                  "Monitor employee activity",
                  "Filter incoming and outgoing network traffic"
                ],
                "correctAnswer": 2
              },
              {
                "id": 9004,
                "question": "Which malware type replicates itself without user action?",
                "options": ["Trojan", "Worm", "Spyware"],
                "correctAnswer": 1
              },
              {
                "id": 9005,
                "question": "What is multi-factor authentication (MFA)?",
                "options": [
                  "Using multiple passwords",
                  "Using two or more verification methods",
                  "Logging in from multiple devices"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 61,
        "name": "Networking",
        "weeks": [
          {
            "id": 901,
            "weekNumber": 1,
            "title": "Secure Networking Fundamentals",
            "tasks": [
              {
                "id": 9011,
                "question": "Which protocol is used to securely browse the web?",
                "options": ["HTTP", "FTP", "HTTPS"],
                "correctAnswer": 2
              },
              {
                "id": 9012,
                "question": "What does an IP address uniquely identify?",
                "options": [
                  "A user account",
                  "A device on a network",
                  "A network cable"
                ],
                "correctAnswer": 1
              },
              {
                "id": 9013,
                "question": "Which device connects multiple networks together?",
                "options": ["Switch", "Router", "Hub"],
                "correctAnswer": 1
              },
              {
                "id": 9014,
                "question": "What is the main function of DNS?",
                "options": [
                  "Encrypt traffic",
                  "Translate domain names to IP addresses",
                  "Block malicious traffic"
                ],
                "correctAnswer": 1
              },
              {
                "id": 9015,
                "question": "Which port is commonly used for SSH?",
                "options": ["21", "22", "80"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 62,
        "name": "SIEM Tools",
        "weeks": [
          {
            "id": 902,
            "weekNumber": 1,
            "title": "Security Monitoring and Log Analysis",
            "tasks": [
              {
                "id": 9021,
                "question": "What does SIEM stand for?",
                "options": [
                  "Security Incident and Event Management",
                  "System Information and Event Monitoring",
                  "Security Intelligence and Event Management"
                ],
                "correctAnswer": 2
              },
              {
                "id": 9022,
                "question": "What is the primary purpose of a SIEM tool?",
                "options": [
                  "Prevent attacks",
                  "Collect and analyze security logs",
                  "Encrypt network traffic"
                ],
                "correctAnswer": 1
              },
              {
                "id": 9023,
                "question": "Which data source is commonly ingested by SIEM systems?",
                "options": [
                  "Application logs",
                  "Keyboard inputs",
                  "Monitor screenshots"
                ],
                "correctAnswer": 0
              },
              {
                "id": 9024,
                "question": "What does correlation mean in SIEM?",
                "options": [
                  "Blocking malicious IPs",
                  "Linking related security events",
                  "Encrypting log files"
                ],
                "correctAnswer": 1
              },
              {
                "id": 9025,
                "question": "Which is a popular SIEM tool?",
                "options": ["Splunk", "Docker", "Postman"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      }
    ]
  },
  // 7. 3D MODELLING (Key: "3D Modelling")
  "3D Modelling": {
    "id": 7,
    "course_name": "3D Modelling",
    "modules": [
      {
        "id": 70,
        "name": "Revit",
        "weeks": [
          {
            "id": 1000,
            "weekNumber": 1,
            "title": "Revit Fundamentals",
            "tasks": [
              {
                "id": 10001,
                "question": "What type of software is Autodesk Revit?",
                "options": [
                  "2D drafting software",
                  "Building Information Modeling (BIM) software",
                  "Photo editing software"
                ],
                "correctAnswer": 1
              },
              {
                "id": 10002,
                "question": "Which Revit element is used to create vertical partitions?",
                "options": ["Floor", "Wall", "Roof"],
                "correctAnswer": 1
              },
              {
                "id": 10003,
                "question": "What is a Revit 'Family'?",
                "options": [
                  "A group of users",
                  "A reusable building component",
                  "A project template"
                ],
                "correctAnswer": 1
              },
              {
                "id": 10004,
                "question": "Which view allows you to see the building from the side?",
                "options": ["Plan View", "Section View", "Schedule View"],
                "correctAnswer": 1
              },
              {
                "id": 10005,
                "question": "What is the purpose of Levels in Revit?",
                "options": [
                  "To apply textures",
                  "To define building heights",
                  "To render images"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 71,
        "name": "SketchUp Modelling",
        "weeks": [
          {
            "id": 1001,
            "weekNumber": 1,
            "title": "SketchUp 3D Modeling Basics",
            "tasks": [
              {
                "id": 10011,
                "question": "SketchUp is best known for being:",
                "options": [
                  "Complex and technical",
                  "Simple and intuitive for 3D modeling",
                  "Only used for animation"
                ],
                "correctAnswer": 1
              },
              {
                "id": 10012,
                "question": "Which tool is used to push or pull surfaces in SketchUp?",
                "options": ["Move Tool", "Push/Pull Tool", "Rotate Tool"],
                "correctAnswer": 1
              },
              {
                "id": 10013,
                "question": "What are Groups and Components used for?",
                "options": [
                  "Adding colors",
                  "Preventing geometry from sticking together",
                  "Rendering scenes"
                ],
                "correctAnswer": 1
              },
              {
                "id": 10014,
                "question": "Which file format is native to SketchUp?",
                "options": [".skp", ".dwg", ".obj"],
                "correctAnswer": 0
              },
              {
                "id": 10015,
                "question": "What tool is commonly used to create circles?",
                "options": ["Arc Tool", "Circle Tool", "Follow Me Tool"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 72,
        "name": "Lumion",
        "weeks": [
          {
            "id": 1002,
            "weekNumber": 1,
            "title": "Real-Time Rendering with Lumion",
            "tasks": [
              {
                "id": 10021,
                "question": "What is Lumion primarily used for?",
                "options": [
                  "3D modeling",
                  "Real-time rendering and visualization",
                  "Video editing"
                ],
                "correctAnswer": 1
              },
              {
                "id": 10022,
                "question": "Lumion is commonly used with models imported from:",
                "options": [
                  "Excel",
                  "SketchUp or Revit",
                  "Photoshop"
                ],
                "correctAnswer": 1
              },
              {
                "id": 10023,
                "question": "Which feature adds realism by simulating sunlight?",
                "options": ["Weather Tool", "Sun Study", "Light Tool"],
                "correctAnswer": 1
              },
              {
                "id": 10024,
                "question": "What does the 'LiveSync' feature do?",
                "options": [
                  "Automatically saves files",
                  "Syncs models between design software and Lumion",
                  "Exports animations"
                ],
                "correctAnswer": 1
              },
              {
                "id": 10025,
                "question": "What can you create in Lumion?",
                "options": [
                  "Construction drawings",
                  "Photorealistic images and animations",
                  "2D floor plans"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },
  // 8. REVIT ARCHITECTURE (Key: "Revit Architecture")
  "Revit Architecture": {
    "id": 8,
    "course_name": "Revit Architecture",
    "modules": [
      {
        "id": 80,
        "name": "Revit Basics",
        "weeks": [
          {
            "id": 1100,
            "weekNumber": 1,
            "title": "Introduction to Revit",
            "tasks": [
              {
                "id": 11001,
                "question": "What type of software is Autodesk Revit Architecture?",
                "options": [
                  "2D drafting software",
                  "Building Information Modeling (BIM) software",
                  "Photo editing software"
                ],
                "correctAnswer": 1
              },
              {
                "id": 11002,
                "question": "Which Revit tool is used to select and move elements?",
                "options": ["Pick Tool", "Move Tool", "Select Tool"],
                "correctAnswer": 2
              },
              {
                "id": 11003,
                "question": "What is the purpose of Levels in Revit?",
                "options": [
                  "To add materials",
                  "To define building heights and floors",
                  "To create views"
                ],
                "correctAnswer": 1
              },
              {
                "id": 11004,
                "question": "Which view shows the building from the top?",
                "options": ["Section View", "Elevation View", "Floor Plan View"],
                "correctAnswer": 2
              },
              {
                "id": 11005,
                "question": "What is a Revit Template?",
                "options": [
                  "A completed project",
                  "A predefined project setup",
                  "A 3D object library"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 81,
        "name": "Building Modelling",
        "weeks": [
          {
            "id": 1101,
            "weekNumber": 1,
            "title": "Architectural Building Components",
            "tasks": [
              {
                "id": 11011,
                "question": "Which Revit element is used to create exterior and interior walls?",
                "options": ["Floor", "Wall", "Roof"],
                "correctAnswer": 1
              },
              {
                "id": 11012,
                "question": "What tool is used to add doors and windows to walls?",
                "options": [
                  "Component Tool",
                  "Wall Tool",
                  "Insert Tool"
                ],
                "correctAnswer": 0
              },
              {
                "id": 11013,
                "question": "What does a Revit 'Family' represent?",
                "options": [
                  "A project file",
                  "A reusable building component",
                  "A drawing sheet"
                ],
                "correctAnswer": 1
              },
              {
                "id": 11014,
                "question": "Which feature allows you to view the model in 3D?",
                "options": [
                  "Elevation View",
                  "3D View",
                  "Drafting View"
                ],
                "correctAnswer": 1
              },
              {
                "id": 11015,
                "question": "What is the purpose of a Roof in Revit?",
                "options": [
                  "Decoration only",
                  "To cover and protect the building",
                  "To define room areas"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  }

,

  "AutoCAD": {
    "id": 9,
    "course_name": "AutoCAD",
    "modules": [
      {
        "id": 90,
        "name": "AutoCAD 2D",
        "weeks": [
          {
            "id": 1200,
            "weekNumber": 1,
            "title": "2D Drafting Fundamentals",
            "tasks": [
              {
                "id": 12001,
                "question": "What is AutoCAD primarily used for?",
                "options": [
                  "Photo editing",
                  "Computer-aided design and drafting",
                  "Video animation"
                ],
                "correctAnswer": 1
              },
              {
                "id": 12002,
                "question": "Which tool is used to draw straight lines in AutoCAD?",
                "options": ["Line Tool", "Polyline Tool", "Rectangle Tool"],
                "correctAnswer": 0
              },
              {
                "id": 12003,
                "question": "What command is used to create a circle?",
                "options": ["ARC", "CIRCLE", "ELLIPSE"],
                "correctAnswer": 1
              },
              {
                "id": 12004,
                "question": "What is the purpose of Layers in AutoCAD?",
                "options": [
                  "To add colors only",
                  "To organize and control drawing elements",
                  "To increase file size"
                ],
                "correctAnswer": 1
              },
              {
                "id": 12005,
                "question": "Which command removes part of an object?",
                "options": ["TRIM", "EXTEND", "OFFSET"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 91,
        "name": "AutoCAD 3D",
        "weeks": [
          {
            "id": 1201,
            "weekNumber": 1,
            "title": "3D Modeling Fundamentals",
            "tasks": [
              {
                "id": 12011,
                "question": "Which workspace is used for 3D modeling in AutoCAD?",
                "options": [
                  "Drafting & Annotation",
                  "3D Basics / 3D Modeling",
                  "Layout Workspace"
                ],
                "correctAnswer": 1
              },
              {
                "id": 12012,
                "question": "Which command is used to create a 3D solid from a 2D shape?",
                "options": ["EXTRUDE", "PRESSPULL", "SWEEP"],
                "correctAnswer": 0
              },
              {
                "id": 12013,
                "question": "What is the function of the UNION command?",
                "options": [
                  "Separate objects",
                  "Combine multiple solids into one",
                  "Add textures"
                ],
                "correctAnswer": 1
              },
              {
                "id": 12014,
                "question": "Which visual style displays realistic shading?",
                "options": ["2D Wireframe", "Conceptual", "Realistic"],
                "correctAnswer": 2
              },
              {
                "id": 12015,
                "question": "What command is used to subtract one 3D solid from another?",
                "options": ["SUBTRACT", "SLICE", "INTERSECT"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      }
    ]
  }
  ,

  "Data Analysis with Excel": {
    "id": 10,
    "course_name": "Data Analysis with Excel",
    "modules": [
      {
        "id": 100,
        "name": "Introduction to Excel",
        "weeks": [
          {
            "id": 1300,
            "weekNumber": 1,
            "title": "Excel Basics & Interface",
            "tasks": [
              {
                "id": 13001,
                "question": "Which area of the Excel screen displays the address of the active cell?",
                "options": ["Formula Bar", "Name Box", "Status Bar"],
                "correctAnswer": 1
              },
              {
                "id": 13002,
                "question": "What is the keyboard shortcut to 'Undo' the last action?",
                "options": ["Ctrl + Y", "Ctrl + U", "Ctrl + Z"],
                "correctAnswer": 2
              },
              {
                "id": 13003,
                "question": "By default, how is text aligned in an Excel cell?",
                "options": ["Left-aligned", "Right-aligned", "Centered"],
                "correctAnswer": 0
              },
              {
                "id": 13004,
                "question": "Which feature allows you to keep header rows visible while scrolling down?",
                "options": ["Split Screen", "Freeze Panes", "Wrap Text"],
                "correctAnswer": 1
              },
              {
                "id": 13005,
                "question": "How do you add a new worksheet to your current workbook?",
                "options": ["Ctrl + N", "The '+' button next to sheet tabs", "Right-click the Ribbon"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 101,
        "name": "Excel Formulas",
        "weeks": [
          {
            "id": 1301,
            "weekNumber": 1,
            "title": "Calculations & Logical Functions",
            "tasks": [
              {
                "id": 13011,
                "question": "Which function is used to find the highest value in a range?",
                "options": ["=HIGHEST()", "=MAX()", "=LARGE()"],
                "correctAnswer": 1
              },
              {
                "id": 13012,
                "question": "What happens when you copy a formula with a 'Relative Reference' to the cell below?",
                "options": ["The cell reference stays the same", "The cell reference adjusts automatically", "The formula breaks"],
                "correctAnswer": 1
              },
              {
                "id": 13013,
                "question": "Which symbol is used for 'Not Equal To' in an Excel logical test?",
                "options": ["!=", "<>", "/="],
                "correctAnswer": 1
              },
              {
                "id": 13014,
                "question": "Which function would you use to join two strings of text from different cells?",
                "options": ["CONCATENATE", "MERGE", "JOIN"],
                "correctAnswer": 0
              },
              {
                "id": 13015,
                "question": "What does the error #DIV/0! mean?",
                "options": ["Value is missing", "The formula is trying to divide by zero", "The column is too narrow"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 102,
        "name": "Data Visualization in Excel",
        "weeks": [
          {
            "id": 1302,
            "weekNumber": 1,
            "title": "Charts, Pivots & Dashboards",
            "tasks": [
              {
                "id": 13021,
                "question": "Which feature is used to quickly filter data in a PivotTable using a visual interface?",
                "options": ["Slicer", "Timeline", "Data Filter"],
                "correctAnswer": 0
              },
              {
                "id": 13022,
                "question": "What are 'Sparklines' in Excel?",
                "options": ["Animated transitions", "Miniature charts that fit inside a single cell", "Special highlighted rows"],
                "correctAnswer": 1
              },
              {
                "id": 13023,
                "question": "Which chart type is best for showing parts of a whole (percentages)?",
                "options": ["Column Chart", "Pie Chart", "Scatter Plot"],
                "correctAnswer": 1
              },
              {
                "id": 13024,
                "question": "How do you update a PivotTable after the source data has changed?",
                "options": ["Save the file", "Click 'Refresh' in the PivotTable Analyze tab", "Re-create the table"],
                "correctAnswer": 1
              },
              {
                "id": 13025,
                "question": "Which tool allows you to apply a color gradient to cells based on their numerical value?",
                "options": ["Format Painter", "Conditional Formatting", "Cell Styles"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },

  "MySQL": {
    "id": 11,
    "course_name": "MySQL Database Management",
    "modules": [
      {
        "id": 110,
        "name": "Introduction to MySQL",
        "weeks": [
          {
            "id": 1400,
            "weekNumber": 1,
            "title": "Getting Started with RDBMS",
            "tasks": [
              {
                "id": 14001,
                "question": "What does MySQL stand for?",
                "options": ["My Structured Query Language", "Multi-user SQL", "Managed SQL"],
                "correctAnswer": 0
              },
              {
                "id": 14002,
                "question": "Which command is used to see all existing databases in MySQL?",
                "options": ["LOOK DATABASES;", "SHOW DATABASES;", "LIST DATABASES;"],
                "correctAnswer": 1
              },
              {
                "id": 14003,
                "question": "Which data type is most suitable for storing short text like names?",
                "options": ["INT", "VARCHAR", "BOOLEAN"],
                "correctAnswer": 1
              },
              {
                "id": 14004,
                "question": "What is the default port number for MySQL?",
                "options": ["8080", "21", "3306"],
                "correctAnswer": 2
              },
              {
                "id": 14005,
                "question": "Which command is used to select a database to work with?",
                "options": ["OPEN database_name;", "USE database_name;", "SELECT database_name;"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 111,
        "name": "SQL Select, Limit, Where, Operators & More",
        "weeks": [
          {
            "id": 1401,
            "weekNumber": 1,
            "title": "Data Retrieval & Filtering",
            "tasks": [
              {
                "id": 14011,
                "question": "Which keyword is used to retrieve unique values only?",
                "options": ["UNIQUE", "DISTINCT", "DIFFERENT"],
                "correctAnswer": 1
              },
              {
                "id": 14012,
                "question": "How do you select only the first 5 records from a table?",
                "options": ["LIMIT 5", "TOP 5", "FIRST 5"],
                "correctAnswer": 0
              },
              {
                "id": 14013,
                "question": "Which operator is used to search for a specific pattern in a column?",
                "options": ["SEARCH", "MATCH", "LIKE"],
                "correctAnswer": 2
              },
              {
                "id": 14014,
                "question": "In a WHERE clause, how do you represent 'Not Equal' in MySQL?",
                "options": ["!=", "<>", "Both are correct"],
                "correctAnswer": 2
              },
              {
                "id": 14015,
                "question": "What does the '%' wildcard represent when used with the LIKE operator?",
                "options": ["Exactly one character", "Zero or more characters", "Only numbers"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 112,
        "name": "SQL Sum, Avg, Group & More",
        "weeks": [
          {
            "id": 1402,
            "weekNumber": 1,
            "title": "Aggregations & Grouping",
            "tasks": [
              {
                "id": 14021,
                "question": "Which function is used to calculate the total of a numeric column?",
                "options": ["TOTAL()", "SUM()", "COUNT()"],
                "correctAnswer": 1
              },
              {
                "id": 14022,
                "question": "Which clause is used to categorize results into sub-groups?",
                "options": ["ORDER BY", "GROUP BY", "SORT BY"],
                "correctAnswer": 1
              },
              {
                "id": 14023,
                "question": "Which keyword must be used instead of WHERE to filter grouped data?",
                "options": ["FILTER", "HAVING", "WHEN"],
                "correctAnswer": 1
              },
              {
                "id": 14024,
                "question": "What does the COUNT(*) function do?",
                "options": ["Counts only cells with text", "Counts the total number of rows", "Sums all numbers"],
                "correctAnswer": 1
              },
              {
                "id": 14025,
                "question": "Which function returns the average value of a column?",
                "options": ["MEAN()", "AVG()", "MID()"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 113,
        "name": "SQL Sub queries, Views & Projects",
        "weeks": [
          {
            "id": 1403,
            "weekNumber": 1,
            "title": "Advanced Logic & Virtual Tables",
            "tasks": [
              {
                "id": 14031,
                "question": "What is a subquery?",
                "options": ["A query nested inside another query", "A small database", "A secondary table"],
                "correctAnswer": 0
              },
              {
                "id": 14032,
                "question": "What is a View in MySQL?",
                "options": ["A physical copy of a table", "A virtual table based on a result-set", "The graphical interface"],
                "correctAnswer": 1
              },
              {
                "id": 14033,
                "question": "Which command is used to create a virtual table named 'Sales_Report'?",
                "options": ["MAKE VIEW Sales_Report", "CREATE VIEW Sales_Report AS", "SAVE VIEW Sales_Report"],
                "correctAnswer": 1
              },
              {
                "id": 14034,
                "question": "How do you delete a view in MySQL?",
                "options": ["DELETE VIEW", "REMOVE VIEW", "DROP VIEW"],
                "correctAnswer": 2
              },
              {
                "id": 14035,
                "question": "Can a subquery be used inside a WHERE clause?",
                "options": ["Yes", "No", "Only if it returns text"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      }
    ]
  },

  "PowerBI": {
    "id": 12,
    "course_name": "Power BI Data Analytics",
    "modules": [
      {
        "id": 120,
        "name": "Introduction to Power BI",
        "weeks": [
          {
            "id": 1500,
            "weekNumber": 1,
            "title": "Power BI Ecosystem & Getting Started",
            "tasks": [
              {
                "id": 15001,
                "question": "Which component of Power BI is used to create reports on a local computer?",
                "options": ["Power BI Service", "Power BI Desktop", "Power BI Mobile"],
                "correctAnswer": 1
              },
              {
                "id": 15002,
                "question": "What is the standard file extension for a Power BI project?",
                "options": [".xlsx", ".pbix", ".pbit"],
                "correctAnswer": 1
              },
              {
                "id": 15003,
                "question": "Which view in Power BI Desktop is used to manage relationships between tables?",
                "options": ["Report View", "Data View", "Model View"],
                "correctAnswer": 2
              },
              {
                "id": 15004,
                "question": "In Power BI, where is the cloud-based environment for sharing and collaborating on reports?",
                "options": ["Power BI Service", "Power Query", "Data Gateway"],
                "correctAnswer": 0
              },
              {
                "id": 15005,
                "question": "What are the three main steps of the Power BI workflow?",
                "options": [
                  "Input, Output, Save",
                  "Prepare, Model, Visualize",
                  "Type, Format, Print"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 121,
        "name": "Charting and Visualization",
        "weeks": [
          {
            "id": 1501,
            "weekNumber": 1,
            "title": "Designing Impactful Reports",
            "tasks": [
              {
                "id": 15011,
                "question": "What is a 'Slicer' in a Power BI report?",
                "options": [
                  "A tool to cut data out",
                  "An on-canvas visual filter",
                  "A type of pie chart"
                ],
                "correctAnswer": 1
              },
              {
                "id": 15012,
                "question": "Which visual is best for comparing values across different categories?",
                "options": ["Scatter Plot", "Clustered Column Chart", "Waterfall Chart"],
                "correctAnswer": 1
              },
              {
                "id": 15013,
                "question": "What feature allows you to see more detail by moving down a level in a data hierarchy (e.g., Year to Month)?",
                "options": ["Drill Down", "Format Painter", "Cross-Filtering"],
                "correctAnswer": 0
              },
              {
                "id": 15014,
                "question": "How can you change the colors or titles of a visual?",
                "options": ["Fields Pane", "Format Pane", "Analytics Pane"],
                "correctAnswer": 1
              },
              {
                "id": 15015,
                "question": "Which feature shows additional data details when you hover your mouse over a data point?",
                "options": ["Slicer", "Tooltip", "Bookmark"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 122,
        "name": "Data Analysis Expression (DAX)",
        "weeks": [
          {
            "id": 1502,
            "weekNumber": 1,
            "title": "DAX Fundamentals & Logic",
            "tasks": [
              {
                "id": 15021,
                "question": "What does DAX stand for?",
                "options": [
                  "Data Analysis Expressions",
                  "Digital Analytics Exchange",
                  "Database Applied X-functions"
                ],
                "correctAnswer": 0
              },
              {
                "id": 15022,
                "question": "What is the difference between a Calculated Column and a Measure?",
                "options": [
                  "Columns are for math, Measures are for text",
                  "Measures are calculated on the fly during interaction; Columns are stored in the data",
                  "There is no difference"
                ],
                "correctAnswer": 1
              },
              {
                "id": 15023,
                "question": "Which DAX function is used to change the filter context of a calculation?",
                "options": ["SUM", "CALCULATE", "FILTER"],
                "correctAnswer": 1
              },
              {
                "id": 15024,
                "question": "Which function would you use to prevent a 'divide by zero' error?",
                "options": ["DIVIDE", "SPLIT", "ERROR.IGNORE"],
                "correctAnswer": 0
              },
              {
                "id": 15025,
                "question": "What is an example of a DAX Time Intelligence function?",
                "options": ["NOW()", "SAMEPERIODLASTYEAR", "TODAY()"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 123,
        "name": "Power Query and Real World Projects",
        "weeks": [
          {
            "id": 1503,
            "weekNumber": 1,
            "title": "Data Transformation & ETL",
            "tasks": [
              {
                "id": 15031,
                "question": "What is the formula language used 'under the hood' in Power Query?",
                "options": ["Python", "M Language", "SQL"],
                "correctAnswer": 1
              },
              {
                "id": 15032,
                "question": "In Power Query, what does 'Unpivot Columns' do?",
                "options": [
                  "Turns rows into columns",
                  "Turns columns into attribute-value pairs (rows)",
                  "Deletes the selected columns"
                ],
                "correctAnswer": 1
              },
              {
                "id": 15033,
                "question": "Where can you see a history of all the changes you made to your data in Power Query?",
                "options": ["Applied Steps", "Formula Bar", "Query Settings"],
                "correctAnswer": 0
              },
              {
                "id": 15034,
                "question": "Which operation is used to combine two tables by adding rows from one to another?",
                "options": ["Merge", "Append", "Join"],
                "correctAnswer": 1
              },
              {
                "id": 15035,
                "question": "Which button must be clicked to load the cleaned Power Query data into the Power BI model?",
                "options": ["Save & Exit", "Refresh All", "Close & Apply"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      }
    ]
  },


  "WordPress Web Design": {
    "id": 13,
    "course_name": "WordPress Web Design",
    "modules": [
      {
        "id": 130,
        "name": "WordPress Basics",
        "weeks": [
          {
            "id": 1600,
            "weekNumber": 1,
            "title": "Getting Started with CMS",
            "tasks": [
              {
                "id": 16001,
                "question": "What does CMS stand for in the context of WordPress?",
                "options": ["Creative Management System", "Content Management System", "Computer Metadata Software"],
                "correctAnswer": 1
              },
              {
                "id": 16002,
                "question": "What is the main difference between WordPress.com and WordPress.org?",
                "options": [
                  "WordPress.org is self-hosted and offers full control",
                  "WordPress.com is only for developers",
                  "There is no difference"
                ],
                "correctAnswer": 0
              },
              {
                "id": 16003,
                "question": "Which section of the dashboard is used to write chronological articles or news?",
                "options": ["Pages", "Posts", "Media"],
                "correctAnswer": 1
              },
              {
                "id": 16004,
                "question": "What are 'Plugins' in WordPress?",
                "options": [
                  "Themes for the website",
                  "Tools that add specific features or functionality",
                  "The core code of WordPress"
                ],
                "correctAnswer": 1
              },
              {
                "id": 16005,
                "question": "In WordPress, what are 'Permalinks'?",
                "options": [
                  "The permanent URLs to your individual posts and pages",
                  "A type of security plugin",
                  "The password to your admin panel"
                ],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 131,
        "name": "Page Design",
        "weeks": [
          {
            "id": 1601,
            "weekNumber": 1,
            "title": "Layouts and Visual Editors",
            "tasks": [
              {
                "id": 16011,
                "question": "What is the name of the default block-based editor in WordPress?",
                "options": ["Classic Editor", "Gutenberg", "Elementor"],
                "correctAnswer": 1
              },
              {
                "id": 16012,
                "question": "Which of the following is a popular 'Page Builder' plugin?",
                "options": ["WooCommerce", "Yoast SEO", "Elementor"],
                "correctAnswer": 2
              },
              {
                "id": 16013,
                "question": "What is 'Responsive Design'?",
                "options": [
                  "A design that reacts to mouse clicks",
                  "A design that adjusts automatically for mobile, tablet, and desktop",
                  "A website that loads very fast"
                ],
                "correctAnswer": 1
              },
              {
                "id": 16014,
                "question": "In page design, what does the 'Hero Section' usually refer to?",
                "options": [
                  "The footer of the website",
                  "The first large visual section at the top of a webpage",
                  "The login page"
                ],
                "correctAnswer": 1
              },
              {
                "id": 16015,
                "question": "Which block would you use to add a single image to a page?",
                "options": ["Gallery Block", "Image Block", "Cover Block"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 132,
        "name": "Theme Customization",
        "weeks": [
          {
            "id": 1602,
            "weekNumber": 1,
            "title": "Styling and Branding",
            "tasks": [
              {
                "id": 16021,
                "question": "Where can you change global site settings like Site Title and Favicon?",
                "options": ["Appearance > Customize", "Plugins > Add New", "Tools > Export"],
                "correctAnswer": 0
              },
              {
                "id": 16022,
                "question": "What is a 'Child Theme'?",
                "options": [
                  "A theme designed for kids",
                  "A sub-theme that inherits functionality from a parent theme",
                  "A trial version of a premium theme"
                ],
                "correctAnswer": 1
              },
              {
                "id": 16023,
                "question": "Which area of WordPress allows you to manage the navigation links at the top of your site?",
                "options": ["Menus", "Widgets", "Comments"],
                "correctAnswer": 0
              },
              {
                "id": 16024,
                "question": "What are 'Widgets' typically used for?",
                "options": [
                  "Adding content to sidebars and footers",
                  "Editing the core PHP code",
                  "Managing user passwords"
                ],
                "correctAnswer": 0
              },
              {
                "id": 16025,
                "question": "Which programming language is primarily used for styling the appearance of a WordPress theme?",
                "options": ["HTML", "PHP", "CSS"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      }
    ]
  },
  
  "Social Media Management": {
    "id": 14,
    "course_name": "Social Media Management",
    "modules": [
      {
        "id": 140,
        "name": "Facebook & IG Ads",
        "weeks": [
          {
            "id": 1700,
            "weekNumber": 1,
            "title": "Paid Social Strategy",
            "tasks": [
              {
                "id": 17001,
                "question": "Which tool is the primary platform for managing ads across both Facebook and Instagram?",
                "options": ["Meta Business Suite", "Ads Manager", "Event Setup Tool"],
                "correctAnswer": 1
              },
              {
                "id": 17002,
                "question": "What is a 'Lookalike Audience'?",
                "options": [
                  "An audience that looks at your profile but doesn't follow",
                  "A way to reach new people who are similar to your best existing customers",
                  "A group of people who have liked your photos"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17003,
                "question": "What is the primary purpose of installing a Meta Pixel on your website?",
                "options": [
                  "To make the website load faster",
                  "To track visitor actions and measure ad conversions",
                  "To change the website's layout"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17004,
                "question": "Which ad format allows you to showcase 2 or more scrollable images or videos?",
                "options": ["Single Image Ad", "Carousel Ad", "Collection Ad"],
                "correctAnswer": 1
              },
              {
                "id": 17005,
                "question": "What does 'A/B Testing' (Split Testing) allow you to do in Ads Manager?",
                "options": [
                  "Post the same ad twice",
                  "Test different versions of ads to see which performs best",
                  "Block competitors from seeing your ads"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 141,
        "name": "Content Creation",
        "weeks": [
          {
            "id": 1701,
            "weekNumber": 1,
            "title": "Content Strategy & Design",
            "tasks": [
              {
                "id": 17011,
                "question": "What is the main goal of a 'Call to Action' (CTA)?",
                "options": [
                  "To describe the image",
                  "To prompt the user to take a specific action (e.g., 'Shop Now')",
                  "To add hashtags to the post"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17012,
                "question": "Which video format is currently prioritized by Instagram for high organic reach?",
                "options": ["IGTV", "Reels", "Long-form Landscape Video"],
                "correctAnswer": 1
              },
              {
                "id": 17013,
                "question": "What is a 'Content Calendar' used for?",
                "options": [
                  "Tracking company holidays",
                  "Planning and scheduling posts in advance",
                  "Calculating monthly profits"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17014,
                "question": "What is User-Generated Content (UGC)?",
                "options": [
                  "Content created by the brand's marketing team",
                  "Content created by customers or fans of the brand",
                  "Automated posts generated by AI"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17015,
                "question": "Which of these is a popular tool for designing social media graphics without professional design skills?",
                "options": ["Canva", "Excel", "WordPress"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 142,
        "name": "Social Media Analytics",
        "weeks": [
          {
            "id": 1702,
            "weekNumber": 1,
            "title": "Performance Tracking",
            "tasks": [
              {
                "id": 17021,
                "question": "What is the difference between 'Reach' and 'Impressions'?",
                "options": [
                  "Reach is the number of likes; Impressions is the number of shares",
                  "Reach is unique users who saw the post; Impressions is the total number of times it was seen",
                  "There is no difference"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17022,
                "question": "How is 'Engagement Rate' typically calculated?",
                "options": [
                  "Total followers divided by total posts",
                  "Total interactions (likes, comments, shares) divided by total reach or followers",
                  "Number of clicks divided by total cost"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17023,
                "question": "What does 'CTR' stand for in social media analytics?",
                "options": ["Creative Time Ratio", "Click-Through Rate", "Customer Tracking Record"],
                "correctAnswer": 1
              },
              {
                "id": 17024,
                "question": "What is 'Sentiment Analysis'?",
                "options": [
                  "Tracking the time of day people post",
                  "Analyzing the emotional tone (positive, negative, neutral) of comments/mentions",
                  "Counting the number of followers gained"
                ],
                "correctAnswer": 1
              },
              {
                "id": 17025,
                "question": "What does 'ROAS' measure in paid social campaigns?",
                "options": [
                  "Return on Ad Spend",
                  "Reach of All Stories",
                  "Rate of Annual Sales"
                ],
                "correctAnswer": 0
              }
            ]
          }
        ]
      }
    ]
  },

  "Digital Marketing WordPress Graphics": {
    "id": 15,
    "course_name": "Digital Marketing, WordPress & Graphics",
    "modules": [
      {
        "id": 150,
        "name": "SEO & Content",
        "weeks": [
          {
            "id": 1800,
            "weekNumber": 1,
            "title": "Search Engine Optimization & Strategy",
            "tasks": [
              {
                "id": 18001,
                "question": "What does SEO stand for?",
                "options": ["System Engine Operation", "Search Engine Optimization", "Social Engagement Online"],
                "correctAnswer": 1
              },
              {
                "id": 18002,
                "question": "Which of these is an 'On-Page' SEO factor?",
                "options": ["Backlinks", "Guest Blogging", "Optimizing Title Tags"],
                "correctAnswer": 2
              },
              {
                "id": 18003,
                "question": "What is 'Keyword Research' used for?",
                "options": ["To find terms people use in search engines", "To check website speed", "To design logos"],
                "correctAnswer": 0
              },
              {
                "id": 18004,
                "question": "What is the purpose of 'Alt Text' in images?",
                "options": ["To make images load faster", "To describe images to search engines and visually impaired users", "To add a watermark"],
                "correctAnswer": 1
              },
              {
                "id": 18005,
                "question": "Which SEO practice involves getting other reputable websites to link to your site?",
                "options": ["Internal Linking", "Keyword Stuffing", "Link Building"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      },
      {
        "id": 151,
        "name": "Google Ads",
        "weeks": [
          {
            "id": 1801,
            "weekNumber": 1,
            "title": "Search Engine Marketing (SEM)",
            "tasks": [
              {
                "id": 18011,
                "question": "What is the billing model where you pay only when someone clicks your ad?",
                "options": ["CPM (Cost Per Mille)", "PPC (Pay Per Click)", "CPA (Cost Per Action)"],
                "correctAnswer": 1
              },
              {
                "id": 18012,
                "question": "What is 'Quality Score' in Google Ads?",
                "options": ["A rating of the relevance and quality of your ads and keywords", "The total amount of money you spend", "The number of employees in your company"],
                "correctAnswer": 0
              },
              {
                "id": 18013,
                "question": "Which ad extension allows you to show your business location?",
                "options": ["Sitelink Extension", "Call Extension", "Location Extension"],
                "correctAnswer": 2
              },
              {
                "id": 18014,
                "question": "What is 'Remarketing' in Google Ads?",
                "options": ["Showing ads to people who have already visited your website", "Creating a new logo", "Buying more keywords"],
                "correctAnswer": 0
              },
              {
                "id": 18015,
                "question": "Where do 'Search Ads' typically appear?",
                "options": ["On YouTube only", "On the Google Search results page", "In personal emails"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 152,
        "name": "Social Media Marketing",
        "weeks": [
          {
            "id": 1802,
            "weekNumber": 1,
            "title": "Building Online Communities",
            "tasks": [
              {
                "id": 18021,
                "question": "What is 'Organic Reach' on social media?",
                "options": ["The number of people who see your content without paid promotion", "The number of followers you buy", "The speed of your internet"],
                "correctAnswer": 0
              },
              {
                "id": 18022,
                "question": "Which platform is primarily known for professional networking and B2B marketing?",
                "options": ["TikTok", "Instagram", "LinkedIn"],
                "correctAnswer": 2
              },
              {
                "id": 18023,
                "question": "What is a 'Social Media Influencer'?",
                "options": ["A software that automates posts", "A person with a dedicated following who can affect purchase decisions", "A government official"],
                "correctAnswer": 1
              },
              {
                "id": 18024,
                "question": "What is the primary function of a hashtag (#)?",
                "options": ["To make the text bold", "To categorize content and make it discoverable", "To hide the caption"],
                "correctAnswer": 1
              },
              {
                "id": 18025,
                "question": "What is 'Engagement' in social media terms?",
                "options": ["The number of posts you make", "Likes, comments, shares, and clicks on your content", "The date you started your account"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 153,
        "name": "Email Marketing",
        "weeks": [
          {
            "id": 1803,
            "weekNumber": 1,
            "title": "Direct Communication Strategies",
            "tasks": [
              {
                "id": 18031,
                "question": "What is 'Email Segmentation'?",
                "options": ["Sending the same email to everyone", "Dividing your email list into smaller groups based on specific criteria", "Deleting inactive emails"],
                "correctAnswer": 1
              },
              {
                "id": 18032,
                "question": "Which metric tells you the percentage of recipients who opened your email?",
                "options": ["Click-Through Rate", "Open Rate", "Bounce Rate"],
                "correctAnswer": 1
              },
              {
                "id": 18033,
                "question": "What is a 'Hard Bounce' in email marketing?",
                "options": ["A temporary delivery failure", "A permanent delivery failure (e.g., invalid email address)", "When someone unsubscribes"],
                "correctAnswer": 1
              },
              {
                "id": 18034,
                "question": "What is an 'Automation' or 'Drip Campaign'?",
                "options": ["Manually typing every email", "A series of pre-written emails sent automatically over time", "A type of spam"],
                "correctAnswer": 1
              },
              {
                "id": 18035,
                "question": "What does 'CTA' stand for in an email context?",
                "options": ["Contact Technical Assistance", "Call To Action", "Creative Text Attachment"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 154,
        "name": "Marketing Analytics",
        "weeks": [
          {
            "id": 1804,
            "weekNumber": 1,
            "title": "Data-Driven Decision Making",
            "tasks": [
              {
                "id": 18041,
                "question": "What does 'ROI' stand for in marketing?",
                "options": ["Rate of Interest", "Return on Investment", "Real Online Influence"],
                "correctAnswer": 1
              },
              {
                "id": 18042,
                "question": "What is a 'Conversion' in digital marketing?",
                "options": ["When a user completes a desired goal (like a purchase or signup)", "When a user leaves the website immediately", "When a user changes their password"],
                "correctAnswer": 0
              },
              {
                "id": 18043,
                "question": "What is 'Bounce Rate'?",
                "options": ["The speed at which a page loads", "The percentage of visitors who leave a site after viewing only one page", "The number of emails that didn't send"],
                "correctAnswer": 1
              },
              {
                "id": 18044,
                "question": "Which tool is commonly used to track website traffic and user behavior?",
                "options": ["Google Analytics", "Photoshop", "Microsoft Word"],
                "correctAnswer": 0
              },
              {
                "id": 18045,
                "question": "What is 'A/B Testing'?",
                "options": ["Testing two versions of a webpage to see which performs better", "Testing your internet speed", "Buying two different domain names"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 155,
        "name": "WordPress Web Design",
        "weeks": [
          {
            "id": 1805,
            "weekNumber": 1,
            "title": "Building Professional Websites",
            "tasks": [
              {
                "id": 18051,
                "question": "What is the purpose of a WordPress 'Theme'?",
                "options": ["To add security to the site", "To control the visual design and layout of the site", "To store the database"],
                "correctAnswer": 1
              },
              {
                "id": 18052,
                "question": "Which area of WordPress do you use to add new functionality like a contact form?",
                "options": ["Posts", "Plugins", "Comments"],
                "correctAnswer": 1
              },
              {
                "id": 18053,
                "question": "What is the difference between a 'Post' and a 'Page'?",
                "options": ["Posts are for static content; Pages are for blog entries", "Posts are for blog entries; Pages are for static content", "There is no difference"],
                "correctAnswer": 1
              },
              {
                "id": 18054,
                "question": "What is the 'Dashboard' in WordPress?",
                "options": ["The public view of the website", "The back-end administration area", "A type of plugin"],
                "correctAnswer": 1
              },
              {
                "id": 18055,
                "question": "What does 'Web Hosting' provide?",
                "options": ["A domain name", "The server space where your website files are stored", "The design of your logo"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 156,
        "name": "Graphics Design",
        "weeks": [
          {
            "id": 1806,
            "weekNumber": 1,
            "title": "Visual Communication Principles",
            "tasks": [
              {
                "id": 18061,
                "question": "What is the difference between 'Raster' and 'Vector' graphics?",
                "options": ["Raster is made of pixels; Vector is made of mathematical paths", "Raster is for printing; Vector is for web only", "There is no difference"],
                "correctAnswer": 0
              },
              {
                "id": 18062,
                "question": "Which color mode should be used for designs intended for print?",
                "options": ["RGB", "CMYK", "HEX"],
                "correctAnswer": 1
              },
              {
                "id": 18063,
                "question": "What is 'Typography'?",
                "options": ["The study of colors", "The art and technique of arranging type (fonts)", "The process of taking photos"],
                "correctAnswer": 1
              },
              {
                "id": 18064,
                "question": "What does 'White Space' (Negative Space) refer to?",
                "options": ["An error in the design", "The empty space between design elements", "The background color of a page"],
                "correctAnswer": 1
              },
              {
                "id": 18065,
                "question": "Which design principle helps create a clear order of importance for elements?",
                "options": ["Hierarchy", "Saturation", "Opacity"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      }
    ]
  },
  "Digital Marketing": {
    "id": 16,
    "course_name": "Digital Marketing",
    "modules": [
      {
        "id": 160,
        "name": "SEO & Content",
        "weeks": [
          {
            "id": 1900,
            "weekNumber": 1,
            "title": "Search Engine Optimization & Content Strategy",
            "tasks": [
              {
                "id": 19001,
                "question": "What is 'Search Intent' in SEO?",
                "options": [
                  "The speed at which a user types",
                  "The underlying reason why a user performs a specific search",
                  "The number of keywords on a page"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19002,
                "question": "Which type of SEO focuses on improving elements within your own website?",
                "options": ["Off-Page SEO", "On-Page SEO", "Technical SEO"],
                "correctAnswer": 1
              },
              {
                "id": 19003,
                "question": "What is a 'Backlink'?",
                "options": [
                  "A link from one website to another",
                  "The 'back' button on a browser",
                  "A link to a previous version of a website"
                ],
                "correctAnswer": 0
              },
              {
                "id": 19004,
                "question": "What is the purpose of a 'Meta Description'?",
                "options": [
                  "To host the website's images",
                  "To provide a brief summary of a page in search results",
                  "To encrypt the website's data"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19005,
                "question": "What is 'Keyword Stuffing'?",
                "options": [
                  "Using keywords naturally in a blog",
                  "Overloading a webpage with keywords to manipulate rankings (unethical)",
                  "Finding new keywords for a campaign"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 161,
        "name": "Google Ads",
        "weeks": [
          {
            "id": 1901,
            "weekNumber": 1,
            "title": "Search Engine Marketing (SEM)",
            "tasks": [
              {
                "id": 19011,
                "question": "What does 'PPC' stand for?",
                "options": ["Point Per Customer", "Pay Per Click", "Price Per Conversion"],
                "correctAnswer": 1
              },
              {
                "id": 19012,
                "question": "Which factor determines the 'Ad Rank' in Google Ads?",
                "options": [
                  "Only the bid amount",
                  "Bid amount, Ad quality, and context of the search",
                  "The date the account was created"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19013,
                "question": "What are 'Negative Keywords' used for?",
                "options": [
                  "To target angry customers",
                  "To prevent your ad from showing for specific irrelevant search terms",
                  "To lower the cost of your website"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19014,
                "question": "What is a 'Display Ad'?",
                "options": [
                  "A text-only ad on Google search",
                  "A visual/image-based ad shown on websites in the Google Network",
                  "An ad that only shows on shop windows"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19015,
                "question": "What is 'Remarketing'?",
                "options": [
                  "Showing ads to people who have previously interacted with your site",
                  "Marketing to people in a different country",
                  "Changing the name of your brand"
                ],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 162,
        "name": "Social Media Marketing",
        "weeks": [
          {
            "id": 1902,
            "weekNumber": 1,
            "title": "Social Platforms & Engagement",
            "tasks": [
              {
                "id": 19021,
                "question": "What is the difference between Reach and Impressions?",
                "options": [
                  "Reach is unique people; Impressions is total views",
                  "Reach is total views; Impressions is unique people",
                  "There is no difference"
                ],
                "correctAnswer": 0
              },
              {
                "id": 19022,
                "question": "Which platform is primarily known as a 'Visual Discovery Engine' and useful for infographics?",
                "options": ["Twitter/X", "Pinterest", "LinkedIn"],
                "correctAnswer": 1
              },
              {
                "id": 19023,
                "question": "What is 'Social Listening'?",
                "options": [
                  "Playing music on social media",
                  "Monitoring social media for mentions of your brand or industry",
                  "Counting the number of followers you have"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19024,
                "question": "What is the primary benefit of 'User-Generated Content' (UGC)?",
                "options": [
                  "It is cheaper to produce",
                  "It builds trust and authenticity with the audience",
                  "It always goes viral"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19025,
                "question": "What is an 'Influencer' in Social Media Marketing?",
                "options": [
                  "A software program",
                  "A person with the power to affect purchasing decisions of others",
                  "A type of paid advertisement"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 163,
        "name": "Email Marketing",
        "weeks": [
          {
            "id": 1903,
            "weekNumber": 1,
            "title": "Email Strategy & Automation",
            "tasks": [
              {
                "id": 19031,
                "question": "What is 'Email Segmentation'?",
                "options": [
                  "Sending every email to every subscriber",
                  "Breaking your email list into smaller groups based on specific criteria",
                  "Deleting emails that bounce"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19032,
                "question": "What is a 'Soft Bounce' in email marketing?",
                "options": [
                  "A permanent delivery failure (invalid email)",
                  "A temporary delivery failure (e.g., full inbox)",
                  "When someone unsubscribes immediately"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19033,
                "question": "What is 'Double Opt-In'?",
                "options": [
                  "When a user signs up twice",
                  "When a user signs up and then confirms via a follow-up email",
                  "When a user follows you on two platforms"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19034,
                "question": "What is the 'Open Rate'?",
                "options": [
                  "The percentage of subscribers who clicked a link",
                  "The percentage of sent emails that were opened",
                  "The speed at which the email was opened"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19035,
                "question": "Why is a 'Call to Action' (CTA) important in an email?",
                "options": [
                  "To make the email look colorful",
                  "To tell the reader exactly what action to take next",
                  "To provide the sender's phone number"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 164,
        "name": "Marketing Analytics",
        "weeks": [
          {
            "id": 1904,
            "weekNumber": 1,
            "title": "Data Analysis & Performance",
            "tasks": [
              {
                "id": 19041,
                "question": "What is a 'KPI' in marketing?",
                "options": [
                  "Key Performance Indicator",
                  "Keyword Processing Index",
                  "Knowledgeable Personal Interest"
                ],
                "correctAnswer": 0
              },
              {
                "id": 19042,
                "question": "What does 'Bounce Rate' on a website represent?",
                "options": [
                  "The speed of the website",
                  "The percentage of visitors who leave after viewing only one page",
                  "The number of times a user clicks 'Back'"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19043,
                "question": "What is 'Attribution Modeling'?",
                "options": [
                  "Designing 3D models of products",
                  "Determining which marketing touchpoints get credit for a conversion",
                  "Calculating the total cost of a campaign"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19044,
                "question": "What are 'UTM Parameters' used for?",
                "options": [
                  "To speed up the server",
                  "To track the specific source of traffic in analytics tools",
                  "To change the font on a website"
                ],
                "correctAnswer": 1
              },
              {
                "id": 19045,
                "question": "What is 'ROI' (Return on Investment)?",
                "options": [
                  "The total amount of money spent",
                  "A measure of the profit gained relative to the cost of the marketing",
                  "The number of new followers gained"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },
  "Cybersecurity (Basic)": {
    "id": 17,
    "course_name": "Cybersecurity (Basic)",
    "modules": [
      {
        "id": 170,
        "name": "Introduction to Cybersecurity",
        "weeks": [
          {
            "id": 2000,
            "weekNumber": 1,
            "title": "Security Fundamentals",
            "tasks": [
              {
                "id": 20001,
                "question": "What does the 'CIA Triad' stand for in cybersecurity?",
                "options": [
                  "Central Intelligence Agency",
                  "Confidentiality, Integrity, Availability",
                  "Control, Identification, Authentication"
                ],
                "correctAnswer": 1
              },
              {
                "id": 20002,
                "question": "Which term describes a fraudulent attempt to obtain sensitive information by posing as a trustworthy entity in an email?",
                "options": ["Phishing", "DDoS", "SQL Injection"],
                "correctAnswer": 0
              },
              {
                "id": 20003,
                "question": "What is 'Social Engineering'?",
                "options": [
                  "Programming social media bots",
                  "Manipulating individuals into divulging confidential information",
                  "Building a network of servers"
                ],
                "correctAnswer": 1
              },
              {
                "id": 20004,
                "question": "What is the primary difference between a virus and a worm?",
                "options": [
                  "A virus requires human action to spread; a worm can spread automatically",
                  "A worm is harmless; a virus is deadly",
                  "A virus only affects hardware"
                ],
                "correctAnswer": 0
              },
              {
                "id": 20005,
                "question": "What is a 'Brute Force' attack?",
                "options": [
                  "Physically breaking a server",
                  "Trial-and-error method used to guess passwords or encryption keys",
                  "Sending too many emails at once"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 171,
        "name": "Networking",
        "weeks": [
          {
            "id": 2001,
            "weekNumber": 1,
            "title": "Network Security & Infrastructure",
            "tasks": [
              {
                "id": 20011,
                "question": "What is the primary function of a Firewall?",
                "options": [
                  "To increase internet speed",
                  "To monitor and control incoming/outgoing network traffic based on security rules",
                  "To store website passwords"
                ],
                "correctAnswer": 1
              },
              {
                "id": 20012,
                "question": "What does DNS stand for?",
                "options": [
                  "Digital Network System",
                  "Domain Name System",
                  "Data Node Security"
                ],
                "correctAnswer": 1
              },
              {
                "id": 20013,
                "question": "Which protocol is used to securely browse the web by encrypting data?",
                "options": ["HTTP", "HTTPS", "FTP"],
                "correctAnswer": 1
              },
              {
                "id": 20014,
                "question": "What is a 'VPN' used for?",
                "options": [
                  "To create a secure, encrypted tunnel over a public network",
                  "To delete viruses from a hard drive",
                  "To host a website database"
                ],
                "correctAnswer": 0
              },
              {
                "id": 20015,
                "question": "Which hardware device operates at the Network Layer (Layer 3) of the OSI model to move data between different networks?",
                "options": ["Switch", "Router", "Hub"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 172,
        "name": "SIEM Tools",
        "weeks": [
          {
            "id": 2002,
            "weekNumber": 1,
            "title": "Security Monitoring & Management",
            "tasks": [
              {
                "id": 20021,
                "question": "What does SIEM stand for?",
                "options": [
                  "Security Information and Event Management",
                  "System Integration and Error Monitoring",
                  "Secure Internet Endpoint Manager"
                ],
                "correctAnswer": 0
              },
              {
                "id": 20022,
                "question": "What is the primary purpose of a SIEM tool?",
                "options": [
                  "To write code for applications",
                  "To aggregate and correlate log data from various sources to identify threats",
                  "To act as an antivirus for a single PC"
                ],
                "correctAnswer": 1
              },
              {
                "id": 20023,
                "question": "Which of these is a well-known SIEM platform?",
                "options": ["Splunk", "Adobe Reader", "MySQL"],
                "correctAnswer": 0
              },
              {
                "id": 20024,
                "question": "What is an 'Incident' in the context of SIEM monitoring?",
                "options": [
                  "A routine software update",
                  "A security event that may indicate a system has been compromised",
                  "A user changing their desktop wallpaper"
                ],
                "correctAnswer": 1
              },
              {
                "id": 20025,
                "question": "What is 'Log Retention'?",
                "options": [
                  "Deleting logs immediately to save space",
                  "Storing log data for a specific period for compliance and forensic analysis",
                  "Printing out logs on paper"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },
  "Mobile App Development": {
    "id": 18,
    "course_name": "Mobile App Development",
    "modules": [
      {
        "id": 180,
        "name": "Dart Programming",
        "weeks": [
          {
            "id": 2100,
            "weekNumber": 1,
            "title": "Dart Fundamentals",
            "tasks": [
              {
                "id": 21001,
                "question": "Who developed the Dart programming language?",
                "options": ["Apple", "Microsoft", "Google"],
                "correctAnswer": 2
              },
              {
                "id": 21002,
                "question": "What is the entry point function for every Dart application?",
                "options": ["start()", "main()", "init()"],
                "correctAnswer": 1
              },
              {
                "id": 21003,
                "question": "Which keyword is used to declare a variable that cannot be changed after its initial assignment?",
                "options": ["var", "dynamic", "final"],
                "correctAnswer": 2
              },
              {
                "id": 21004,
                "question": "What feature in Dart helps prevent errors caused by accessing variables with null values?",
                "options": ["Null Safety", "Type Casting", "Async/Await"],
                "correctAnswer": 0
              },
              {
                "id": 21005,
                "question": "Which symbol is used for string interpolation in Dart?",
                "options": ["&", "$", "#"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 181,
        "name": "Flutter App Dev",
        "weeks": [
          {
            "id": 2101,
            "weekNumber": 1,
            "title": "Building UI with Flutter",
            "tasks": [
              {
                "id": 21011,
                "question": "In Flutter, almost everything in the UI is a what?",
                "options": ["Component", "Widget", "Module"],
                "correctAnswer": 1
              },
              {
                "id": 21012,
                "question": "Which widget should you use for a UI element that never changes its internal state?",
                "options": ["StatefulWidget", "StatelessWidget", "DynamicWidget"],
                "correctAnswer": 1
              },
              {
                "id": 21013,
                "question": "Which file is used to manage assets and dependencies in a Flutter project?",
                "options": ["index.html", "main.dart", "pubspec.yaml"],
                "correctAnswer": 2
              },
              {
                "id": 21014,
                "question": "Which command is used to see code changes instantly without restarting the entire app?",
                "options": ["Hot Reload", "Quick Restart", "Instant Sync"],
                "correctAnswer": 0
              },
              {
                "id": 21015,
                "question": "Which layout widget displays its children in a vertical array?",
                "options": ["Row", "Stack", "Column"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      },
      {
        "id": 182,
        "name": "Rest APIs and Backend",
        "weeks": [
          {
            "id": 2102,
            "weekNumber": 1,
            "title": "Data and Networking",
            "tasks": [
              {
                "id": 21021,
                "question": "What does REST stand for?",
                "options": [
                  "Representational State Transfer",
                  "Remote System Terminal",
                  "Responsive State Technology"
                ],
                "correctAnswer": 0
              },
              {
                "id": 21022,
                "question": "Which HTTP method is most commonly used to retrieve data from a server?",
                "options": ["POST", "PUT", "GET"],
                "correctAnswer": 2
              },
              {
                "id": 21023,
                "question": "What is the most common data format used for exchanging data between a mobile app and an API?",
                "options": ["XML", "JSON", "CSV"],
                "correctAnswer": 1
              },
              {
                "id": 21024,
                "question": "In Dart, which object type is used to represent a value that will be available in the future?",
                "options": ["Stream", "Future", "Promise"],
                "correctAnswer": 1
              },
              {
                "id": 21025,
                "question": "Which HTTP status code represents a successful request?",
                "options": ["404", "500", "200"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      }
    ]
  },

  "Data Analysis with Python": {
    "id": 19,
    "course_name": "Data Analysis with Python",
    "modules": [
      {
        "id": 190,
        "name": "Python Fundamentals",
        "weeks": [
          {
            "id": 2200,
            "weekNumber": 1,
            "title": "Programming Basics for Data Science",
            "tasks": [
              {
                "id": 22001,
                "question": "Which data type is used to store a sequence of characters in Python?",
                "options": ["int", "float", "str"],
                "correctAnswer": 2
              },
              {
                "id": 22002,
                "question": "How do you define a function in Python?",
                "options": ["func my_function():", "def my_function():", "function my_function():"],
                "correctAnswer": 1
              },
              {
                "id": 22003,
                "question": "Which collection type is unordered and stores key-value pairs?",
                "options": ["List", "Dictionary", "Tuple"],
                "correctAnswer": 1
              },
              {
                "id": 22004,
                "question": "What is the purpose of indentation in Python?",
                "options": ["To make the code pretty", "To define code blocks (like loops and functions)", "It is optional"],
                "correctAnswer": 1
              },
              {
                "id": 22005,
                "question": "Which operator is used to check if two values are equal?",
                "options": ["=", "==", "==="],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 191,
        "name": "Numpy & Pandas",
        "weeks": [
          {
            "id": 2201,
            "weekNumber": 1,
            "title": "Data Manipulation Libraries",
            "tasks": [
              {
                "id": 22011,
                "question": "What is the primary object in the NumPy library?",
                "options": ["DataFrame", "nd-array", "List"],
                "correctAnswer": 1
              },
              {
                "id": 22012,
                "question": "In Pandas, what is a 2-dimensional labeled data structure called?",
                "options": ["Series", "Array", "DataFrame"],
                "correctAnswer": 2
              },
              {
                "id": 22013,
                "question": "Which Pandas method is used to load data from a CSV file?",
                "options": ["pd.open_csv()", "pd.read_csv()", "pd.get_csv()"],
                "correctAnswer": 1
              },
              {
                "id": 22014,
                "question": "How do you select a specific column named 'Age' from a DataFrame 'df'?",
                "options": ["df['Age']", "df.select('Age')", "df[Age]"],
                "correctAnswer": 0
              },
              {
                "id": 22015,
                "question": "Which method is used to remove rows with missing (NaN) values in Pandas?",
                "options": ["df.remove_null()", "df.dropna()", "df.clean()"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 192,
        "name": "Data Analysis & Visualization",
        "weeks": [
          {
            "id": 2202,
            "weekNumber": 1,
            "title": "Exploring and Visualizing Data",
            "tasks": [
              {
                "id": 22021,
                "question": "Which library is the most basic foundation for plotting in Python?",
                "options": ["Seaborn", "Matplotlib", "Plotly"],
                "correctAnswer": 1
              },
              {
                "id": 22022,
                "question": "Which Pandas function is used to summarize data by categories?",
                "options": ["summarize()", "groupby()", "pivot_table()"],
                "correctAnswer": 1
              },
              {
                "id": 22023,
                "question": "What type of plot is best for showing the distribution of a single numerical variable?",
                "options": ["Scatter Plot", "Histogram", "Pie Chart"],
                "correctAnswer": 1
              },
              {
                "id": 22024,
                "question": "Which visualization library is built on top of Matplotlib and provides a high-level interface for statistical graphics?",
                "options": ["NumPy", "Seaborn", "Pandas"],
                "correctAnswer": 1
              },
              {
                "id": 22025,
                "question": "Which method displays the first 5 rows of a DataFrame?",
                "options": ["df.show()", "df.first()", "df.head()"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      },
      {
        "id": 193,
        "name": "Statistics Basics",
        "weeks": [
          {
            "id": 2203,
            "weekNumber": 1,
            "title": "Statistical Concepts for Analysts",
            "tasks": [
              {
                "id": 22031,
                "question": "What is the 'Mean' of a dataset?",
                "options": ["The middle value", "The average value", "The most frequent value"],
                "correctAnswer": 1
              },
              {
                "id": 22032,
                "question": "Which statistical measure describes the spread of data around the mean?",
                "options": ["Median", "Standard Deviation", "Mode"],
                "correctAnswer": 1
              },
              {
                "id": 22033,
                "question": "What is an 'Outlier'?",
                "options": [
                  "The highest value in a dataset",
                  "A data point that differs significantly from other observations",
                  "A missing value"
                ],
                "correctAnswer": 1
              },
              {
                "id": 22034,
                "question": "What does a correlation coefficient of +1 indicate?",
                "options": [
                  "No relationship",
                  "Perfect negative relationship",
                  "Perfect positive relationship"
                ],
                "correctAnswer": 2
              },
              {
                "id": 22035,
                "question": "In a p-value test, what is the typical threshold (alpha) used to determine statistical significance?",
                "options": ["0.5", "0.05", "0.001"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },

  "Python Fundamentals": {
    "id": 20,
    "course_name": "Python Fundamentals",
    "modules": [
      {
        "id": 200,
        "name": "Python Basics",
        "weeks": [
          {
            "id": 2300,
            "weekNumber": 1,
            "title": "Syntax and Introduction",
            "tasks": [
              {
                "id": 23001,
                "question": "Who created the Python programming language?",
                "options": ["James Gosling", "Guido van Rossum", "Dennis Ritchie"],
                "correctAnswer": 1
              },
              {
                "id": 23002,
                "question": "Which command is used to output text to the screen in Python?",
                "options": ["echo()", "printf()", "print()"],
                "correctAnswer": 2
              },
              {
                "id": 23003,
                "question": "How do you start a single-line comment in Python?",
                "options": ["//", "#", "/*"],
                "correctAnswer": 1
              },
              {
                "id": 23004,
                "question": "Which file extension is used for Python files?",
                "options": [".pt", ".py", ".pyt"],
                "correctAnswer": 1
              },
              {
                "id": 23005,
                "question": "What is the correct way to create a multi-line string in Python?",
                "options": ["Using triple quotes (''' or \"\"\")", "Using slashes (///)", "Using brackets ([[[)"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 201,
        "name": "Variables",
        "weeks": [
          {
            "id": 2301,
            "weekNumber": 1,
            "title": "Data Types and Assignments",
            "tasks": [
              {
                "id": 23011,
                "question": "Which of these is an illegal variable name in Python?",
                "options": ["my_var", "myVar", "2myvar"],
                "correctAnswer": 2
              },
              {
                "id": 23012,
                "question": "Which function is used to check the data type of a variable?",
                "options": ["dataType()", "type()", "kind()"],
                "correctAnswer": 1
              },
              {
                "id": 23013,
                "question": "How do you convert the number 5 into a float in Python?",
                "options": ["float(5)", "to_float(5)", "parse_float(5)"],
                "correctAnswer": 0
              },
              {
                "id": 23014,
                "question": "What is the result of the following expression: 10 // 3?",
                "options": ["3.33", "3", "1"],
                "correctAnswer": 1
              },
              {
                "id": 23015,
                "question": "Which collection type is ordered and unchangeable (immutable)?",
                "options": ["List", "Dictionary", "Tuple"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      },
      {
        "id": 202,
        "name": "Functions",
        "weeks": [
          {
            "id": 2302,
            "weekNumber": 1,
            "title": "Defining and Calling Functions",
            "tasks": [
              {
                "id": 23021,
                "question": "Which keyword is used to create a function in Python?",
                "options": ["function", "def", "define"],
                "correctAnswer": 1
              },
              {
                "id": 23022,
                "question": "Which keyword is used to send a value back from a function?",
                "options": ["send", "break", "return"],
                "correctAnswer": 2
              },
              {
                "id": 23023,
                "question": "What is a parameter in a function?",
                "options": ["The output of the function", "A variable listed inside the parentheses in the function definition", "The name of the function"],
                "correctAnswer": 1
              },
              {
                "id": 23024,
                "question": "What are 'arbitrary arguments' in Python functions?",
                "options": ["Arguments passed by name", "Using *args to pass a varying number of arguments", "Arguments that are ignored"],
                "correctAnswer": 1
              },
              {
                "id": 23025,
                "question": "What is a lambda function in Python?",
                "options": ["A function that never ends", "A small, anonymous function", "A function used only for math"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 203,
        "name": "OOP",
        "weeks": [
          {
            "id": 2303,
            "weekNumber": 1,
            "title": "Object-Oriented Programming",
            "tasks": [
              {
                "id": 23031,
                "question": "Which keyword is used to create a class in Python?",
                "options": ["object", "class", "struct"],
                "correctAnswer": 1
              },
              {
                "id": 23032,
                "question": "What is the purpose of the __init__() function in a class?",
                "options": ["To delete an object", "To initialize the object's attributes", "To print the class name"],
                "correctAnswer": 1
              },
              {
                "id": 23033,
                "question": "In a class method, what does the 'self' parameter represent?",
                "options": ["The parent class", "A reference to the current instance of the class", "A global variable"],
                "correctAnswer": 1
              },
              {
                "id": 23034,
                "question": "What is 'Inheritance' in Python OOP?",
                "options": ["Deleting a child class", "A class deriving properties and behaviors from another class", "Copying a file"],
                "correctAnswer": 1
              },
              {
                "id": 23035,
                "question": "Which function is used to call a method from the parent class?",
                "options": ["super()", "parent()", "base()"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 204,
        "name": "Error Handling",
        "weeks": [
          {
            "id": 2304,
            "weekNumber": 1,
            "title": "Exceptions and Debugging",
            "tasks": [
              {
                "id": 23041,
                "question": "Which block allows you to test a block of code for errors?",
                "options": ["try", "catch", "except"],
                "correctAnswer": 0
              },
              {
                "id": 23042,
                "question": "Which block allows you to handle the error that occurred in the 'try' block?",
                "options": ["error", "except", "finally"],
                "correctAnswer": 1
              },
              {
                "id": 23043,
                "question": "Which block is executed regardless of whether an exception was raised or not?",
                "options": ["else", "stop", "finally"],
                "correctAnswer": 2
              },
              {
                "id": 23044,
                "question": "Which keyword is used to manually trigger or throw an exception?",
                "options": ["raise", "throw", "error"],
                "correctAnswer": 0
              },
              {
                "id": 23045,
                "question": "Which specific exception is raised when you try to divide a number by zero?",
                "options": ["ValueError", "ZeroDivisionError", "TypeError"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },

  "UiUx & Web Design": {
    "id": 21,
    "course_name": "UiUx & Web Design",
    "modules": [
      {
        "id": 210,
        "name": "Introduction to UiUX",
        "weeks": [
          {
            "id": 2400,
            "weekNumber": 1,
            "title": "Foundations of Design",
            "tasks": [
              {
                "id": 24001,
                "question": "What does 'UX' stand for in design?",
                "options": ["User Extension", "User Experience", "Universal X-platform"],
                "correctAnswer": 1
              },
              {
                "id": 24002,
                "question": "Which field focuses primarily on the visual elements like buttons, icons, and spacing?",
                "options": ["UI Design", "UX Research", "Backend Development"],
                "correctAnswer": 0
              },
              {
                "id": 24003,
                "question": "What is the primary goal of User-Centered Design?",
                "options": ["To please the stakeholders", "To create products that solve user needs and pain points", "To follow the latest art trends"],
                "correctAnswer": 1
              },
              {
                "id": 24004,
                "question": "What does 'Accessibility' (a11y) mean in web design?",
                "options": ["Making the site load fast", "Ensuring the site is usable by people with disabilities", "Translating the site into many languages"],
                "correctAnswer": 1
              },
              {
                "id": 24005,
                "question": "What is 'Visual Hierarchy'?",
                "options": ["The arrangement of elements to show their order of importance", "The speed of the scrolling", "The number of images on a page"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 211,
        "name": "Intro to Figma",
        "weeks": [
          {
            "id": 2401,
            "weekNumber": 1,
            "title": "Mastering Design Tools",
            "tasks": [
              {
                "id": 24011,
                "question": "What is Figma primarily used for?",
                "options": ["Video editing", "Collaborative interface design", "3D Printing"],
                "correctAnswer": 1
              },
              {
                "id": 24012,
                "question": "In Figma, what are 'Components'?",
                "options": ["The code exported to HTML", "Reusable design elements that can be updated globally", "The fonts used in the project"],
                "correctAnswer": 1
              },
              {
                "id": 24013,
                "question": "Which Figma feature allows layouts to grow or shrink automatically as you change content?",
                "options": ["Auto Layout", "Smart Animate", "Grid System"],
                "correctAnswer": 0
              },
              {
                "id": 24014,
                "question": "How do you share a Figma file for collaboration?",
                "options": ["Emailing a .jpg file", "Sending a shareable link to the project", "Printing the design"],
                "correctAnswer": 1
              },
              {
                "id": 24015,
                "question": "What are 'Constraints' used for in Figma?",
                "options": ["To limit the number of colors", "To control how layers respond when frames are resized", "To stop users from editing a file"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 212,
        "name": "Wireframing",
        "weeks": [
          {
            "id": 2402,
            "weekNumber": 1,
            "title": "Structure and Layout",
            "tasks": [
              {
                "id": 24021,
                "question": "What is a 'Wireframe'?",
                "options": ["A high-quality 3D model", "A low-fidelity blueprint of a web page layout", "A colorful final design"],
                "correctAnswer": 1
              },
              {
                "id": 24022,
                "question": "Why do designers use gray boxes and 'Lorem Ipsum' text in wireframes?",
                "options": ["They don't know how to write", "To focus on structure and function rather than aesthetics", "To save battery life on the computer"],
                "correctAnswer": 1
              },
              {
                "id": 24023,
                "question": "What is a 'Low-Fidelity' wireframe?",
                "options": ["A hand-drawn sketch or basic digital layout", "A design ready for development", "A complex animation"],
                "correctAnswer": 0
              },
              {
                "id": 24024,
                "question": "Which comes first in the standard design process?",
                "options": ["Prototyping", "Wireframing", "Coding"],
                "correctAnswer": 1
              },
              {
                "id": 24025,
                "question": "What is a 'User Flow'?",
                "options": ["The amount of traffic a site gets", "The path a user takes through an interface to complete a task", "The design of a logo"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 213,
        "name": "Prototyping",
        "weeks": [
          {
            "id": 2403,
            "weekNumber": 1,
            "title": "Interaction Design",
            "tasks": [
              {
                "id": 24031,
                "question": "What is a prototype in UI design?",
                "options": ["The final coded website", "An interactive simulation of the final product", "A research document"],
                "correctAnswer": 1
              },
              {
                "id": 24032,
                "question": "In Figma, what are 'Hotspots'?",
                "options": ["Areas that are too bright", "Interactive areas that trigger an action during a prototype", "A type of internet connection"],
                "correctAnswer": 1
              },
              {
                "id": 24033,
                "question": "What does 'Smart Animate' do in Figma prototyping?",
                "options": ["It writes code for you", "It automatically animates similar layers between screens", "It checks for spelling errors"],
                "correctAnswer": 1
              },
              {
                "id": 24034,
                "question": "Why is prototyping important for stakeholders?",
                "options": ["It helps them visualize the user journey and interactions", "It serves as the hosting server", "It creates the database"],
                "correctAnswer": 0
              },
              {
                "id": 24035,
                "question": "What is a 'Micro-interaction'?",
                "options": ["A large marketing campaign", "Small functional animations (like a button changing color on hover)", "An email signature"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 214,
        "name": "User Research",
        "weeks": [
          {
            "id": 2404,
            "weekNumber": 1,
            "title": "Understanding the User",
            "tasks": [
              {
                "id": 24041,
                "question": "What is a 'User Persona'?",
                "options": ["A real person's private information", "A fictional character representing a target user group", "A designer's personal portfolio"],
                "correctAnswer": 1
              },
              {
                "id": 24042,
                "question": "What is 'Qualitative Research'?",
                "options": ["Research focused on numbers and statistics", "Research focused on understanding thoughts, feelings, and motivations", "Measuring the speed of a server"],
                "correctAnswer": 1
              },
              {
                "id": 24043,
                "question": "What is an 'Empathy Map' used for?",
                "options": ["To design a map of the office", "To visualize what a user says, thinks, does, and feels", "To calculate profits"],
                "correctAnswer": 1
              },
              {
                "id": 24044,
                "question": "What are 'Pain Points' in UX?",
                "options": ["Broken pixels on a screen", "Specific problems or frustrations users face", "Physical pain from using a mouse"],
                "correctAnswer": 1
              },
              {
                "id": 24045,
                "question": "What is the primary purpose of 'Usability Testing'?",
                "options": ["To test the colors", "To observe real users attempting tasks to find issues", "To test the internet speed"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 215,
        "name": "Web Development (HTML & CSS)",
        "weeks": [
          {
            "id": 2405,
            "weekNumber": 1,
            "title": "Introduction to Web Coding",
            "tasks": [
              {
                "id": 24051,
                "question": "What is HTML used for?",
                "options": ["Styling the website", "Defining the structure of a web page", "Storing database records"],
                "correctAnswer": 1
              },
              {
                "id": 24052,
                "question": "What does CSS stand for?",
                "options": ["Cascading Style Sheets", "Creative System Software", "Computer Styling Script"],
                "correctAnswer": 0
              },
              {
                "id": 24053,
                "question": "Which HTML tag is used to create a hyperlink?",
                "options": ["<link>", "<a>", "<href>"],
                "correctAnswer": 1
              },
              {
                "id": 24054,
                "question": "In the CSS 'Box Model', what is the space between the content and the border called?",
                "options": ["Margin", "Padding", "Gap"],
                "correctAnswer": 1
              },
              {
                "id": 24055,
                "question": "What is a 'Media Query' used for in CSS?",
                "options": ["To play music", "To apply styles based on device characteristics like screen width", "To ask the user for their name"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },

  
  "UiUx & Design": {
    "id": 22,
    "course_name": "UiUx Design",
    "modules": [
      {
        "id": 220,
        "name": "Introduction to UiUX",
        "weeks": [
          {
            "id": 2500,
            "weekNumber": 1,
            "title": "Foundations of Experience Design",
            "tasks": [
              {
                "id": 25001,
                "question": "Which field focuses on how a user feels and how easy it is to use a product?",
                "options": ["User Interface (UI)", "User Experience (UX)", "Graphic Design"],
                "correctAnswer": 1
              },
              {
                "id": 25002,
                "question": "What is the primary purpose of 'Visual Hierarchy' in design?",
                "options": [
                  "To use as many colors as possible",
                  "To guide the user's eye to the most important elements first",
                  "To make all text the same size"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25003,
                "question": "What does 'Accessibility' mean in the context of UX?",
                "options": [
                  "The cost of the software",
                  "Designing products so they are usable by everyone, including people with disabilities",
                  "Ensuring the website loads in under 1 second"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25004,
                "question": "Which of these is a stage in the Design Thinking process?",
                "options": ["Debugging", "Empathize", "Compiling"],
                "correctAnswer": 1
              },
              {
                "id": 25005,
                "question": "What is 'White Space' (Negative Space)?",
                "options": [
                  "The empty space between design elements",
                  "An area where data has been deleted",
                  "A design error that needs to be filled"
                ],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 221,
        "name": "Intro to Figma",
        "weeks": [
          {
            "id": 2501,
            "weekNumber": 1,
            "title": "Mastering Figma Tools",
            "tasks": [
              {
                "id": 25011,
                "question": "What is Figma primarily used for?",
                "options": ["Photo editing", "Collaborative interface design", "Video montage"],
                "correctAnswer": 1
              },
              {
                "id": 25012,
                "question": "In Figma, what are 'Components'?",
                "options": [
                  "Plugins for the browser",
                  "Reusable elements that help maintain consistency across a design",
                  "A type of image format"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25013,
                "question": "Which feature allows you to create layouts that grow or shrink as you edit text or swap components?",
                "options": ["Auto Layout", "Smart Animate", "Grid System"],
                "correctAnswer": 0
              },
              {
                "id": 25014,
                "question": "What do 'Constraints' do in Figma?",
                "options": [
                  "Restrict the user from editing a file",
                  "Determine how layers respond when their containing frame is resized",
                  "Limit the number of colors in a palette"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25015,
                "question": "What is the benefit of Figma being a cloud-based tool?",
                "options": [
                  "It can only be used when offline",
                  "Real-time collaboration and automatic saving",
                  "It makes your computer run faster"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 222,
        "name": "Wireframing",
        "weeks": [
          {
            "id": 2502,
            "weekNumber": 1,
            "title": "Information Architecture & Layout",
            "tasks": [
              {
                "id": 25021,
                "question": "What is a 'Wireframe'?",
                "options": [
                  "A high-fidelity colorful design",
                  "A low-fidelity structural blueprint of a web page or app",
                  "The final code of a website"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25022,
                "question": "Why do wireframes usually avoid using specific colors and high-quality images?",
                "options": [
                  "To keep the file size small",
                  "To focus on layout and functionality rather than visual aesthetics",
                  "Because Figma doesn't support colors in wireframes"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25023,
                "question": "What is the main difference between 'Low-Fi' and 'High-Fi' wireframes?",
                "options": [
                  "Low-Fi is hand-drawn; High-Fi uses code",
                  "Low-Fi focuses on basic structure; High-Fi adds more detail and precision",
                  "There is no difference"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25024,
                "question": "What is a 'User Flow'?",
                "options": [
                  "The path a user takes through an app to complete a specific task",
                  "The amount of data a user downloads",
                  "The scroll speed of a website"
                ],
                "correctAnswer": 0
              },
              {
                "id": 25025,
                "question": "What does 'Lorem Ipsum' represent in wireframing?",
                "options": ["A secret code", "Placeholder text used to visualize layout", "A design principle"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 223,
        "name": "Prototyping",
        "weeks": [
          {
            "id": 2503,
            "weekNumber": 1,
            "title": "Interactive Design & Motion",
            "tasks": [
              {
                "id": 25031,
                "question": "What is the goal of creating a Prototype?",
                "options": [
                  "To host the website on a server",
                  "To test the interactions and user flow before development",
                  "To write the backend database"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25032,
                "question": "What are 'Triggers' in prototyping?",
                "options": [
                  "Errors in the code",
                  "Actions that initiate a transition (e.g., On Click, While Hovering)",
                  "The colors used in the design"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25033,
                "question": "What is 'Smart Animate' in Figma?",
                "options": [
                  "A feature that writes the CSS for you",
                  "An advanced transition that automatically animates similar layers",
                  "A tool to generate icons"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25034,
                "question": "What is an 'Overlay' used for in an app prototype?",
                "options": [
                  "To hide the entire screen",
                  "To show temporary content like menus, alerts, or popups",
                  "To change the background color"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25035,
                "question": "What is a 'Hotspot'?",
                "options": [
                  "The part of the prototype that is interactive",
                  "A broken link in the design",
                  "The center of the screen"
                ],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 224,
        "name": "User Research",
        "weeks": [
          {
            "id": 2504,
            "weekNumber": 1,
            "title": "Research Methods & Insights",
            "tasks": [
              {
                "id": 25041,
                "question": "What is a 'User Persona'?",
                "options": [
                  "A real person's private ID",
                  "A fictional character that represents a typical user of your product",
                  "A list of all registered users"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25042,
                "question": "What is the difference between Qualitative and Quantitative research?",
                "options": [
                  "Qualitative is about numbers; Quantitative is about feelings",
                  "Qualitative is about 'Why' (feelings); Quantitative is about 'How many' (numbers)",
                  "They are the same thing"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25043,
                "question": "What is a 'Pain Point'?",
                "options": [
                  "A specific problem or frustration a user faces",
                  "A physical injury from using a computer",
                  "A color that is too bright"
                ],
                "correctAnswer": 0
              },
              {
                "id": 25044,
                "question": "What is 'Usability Testing'?",
                "options": [
                  "Testing if the code compiles",
                  "Observing real users as they interact with your product to find issues",
                  "Testing the server speed"
                ],
                "correctAnswer": 1
              },
              {
                "id": 25045,
                "question": "What is the purpose of an 'Empathy Map'?",
                "options": [
                  "To design the site navigation",
                  "To visualize what users say, think, do, and feel",
                  "To calculate the project's budget"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },

  "Fullstack Web Dev (Advanced)": {
    "id": 23,
    "course_name": "Fullstack Web Dev (Advanced)",
    "modules": [
      {
        "id": 230,
        "name": "HTML",
        "weeks": [
          {
            "id": 2600,
            "weekNumber": 1,
            "title": "Advanced HTML & Semantic Structure",
            "tasks": [
              {
                "id": 26001,
                "question": "What is the primary benefit of using Semantic HTML elements like <article> and <section>?",
                "options": ["They make the text bold", "They improve SEO and accessibility for screen readers", "They increase website loading speed"],
                "correctAnswer": 1
              },
              {
                "id": 26002,
                "question": "Which attribute is used to provide a unique identifier for an HTML element?",
                "options": ["class", "id", "type"],
                "correctAnswer": 1
              },
              {
                "id": 26003,
                "question": "What is the purpose of the <head> section in an HTML document?",
                "options": ["To display content to the user", "To contain metadata and links to scripts/stylesheets", "To create a footer"],
                "correctAnswer": 1
              },
              {
                "id": 26004,
                "question": "Which HTML5 element is used to specify a navigation block?",
                "options": ["<nav>", "<section>", "<header>"],
                "correctAnswer": 0
              },
              {
                "id": 26005,
                "question": "What does the 'required' attribute do in a form <input>?",
                "options": ["It hides the input", "It prevents form submission if the field is empty", "It encrypts the input data"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 231,
        "name": "CSS",
        "weeks": [
          {
            "id": 2601,
            "weekNumber": 1,
            "title": "Modern Layouts & Responsiveness",
            "tasks": [
              {
                "id": 26011,
                "question": "In Flexbox, which property is used to align items along the main axis?",
                "options": ["align-items", "justify-content", "display"],
                "correctAnswer": 1
              },
              {
                "id": 26012,
                "question": "What does the 'z-index' property control?",
                "options": ["The zoom level of an element", "The vertical stacking order of elements", "The horizontal position"],
                "correctAnswer": 1
              },
              {
                "id": 26013,
                "question": "Which CSS unit is relative to the font-size of the root element (html)?",
                "options": ["em", "rem", "px"],
                "correctAnswer": 1
              },
              {
                "id": 26014,
                "question": "What is the purpose of a CSS Media Query?",
                "options": ["To play videos", "To apply styles based on device characteristics like screen width", "To connect to a database"],
                "correctAnswer": 1
              },
              {
                "id": 26015,
                "question": "In a CSS Grid, what does '1fr' represent?",
                "options": ["1 Fixed Row", "1 Fraction of the available space", "1 Font Ratio"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 232,
        "name": "Javascript",
        "weeks": [
          {
            "id": 2602,
            "weekNumber": 1,
            "title": "ES6+ and Asynchronous JS",
            "tasks": [
              {
                "id": 26021,
                "question": "What is the difference between 'let' and 'var'?",
                "options": ["'let' is block-scoped, while 'var' is function-scoped", "'var' is newer than 'let'", "There is no difference"],
                "correctAnswer": 0
              },
              {
                "id": 26022,
                "question": "Which method is used to create a new array by applying a function to every element of an existing array?",
                "options": ["filter()", "map()", "forEach()"],
                "correctAnswer": 1
              },
              {
                "id": 26023,
                "question": "What does the 'async' keyword do before a function?",
                "options": ["It makes the function run faster", "It ensures the function returns a Promise", "It prevents the function from running"],
                "correctAnswer": 1
              },
              {
                "id": 26024,
                "question": "What is 'The DOM' in JavaScript?",
                "options": ["Data Object Management", "Document Object Model", "Digital Output Method"],
                "correctAnswer": 1
              },
              {
                "id": 26025,
                "question": "Which operator is used to check both value and type equality?",
                "options": ["==", "===", "="],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 233,
        "name": "React",
        "weeks": [
          {
            "id": 2603,
            "weekNumber": 1,
            "title": "Components & Hooks",
            "tasks": [
              {
                "id": 26031,
                "question": "What is JSX?",
                "options": ["A JavaScript backend framework", "A syntax extension for JavaScript that looks like HTML", "A database query language"],
                "correctAnswer": 1
              },
              {
                "id": 26032,
                "question": "Which React Hook is used to manage local state in a functional component?",
                "options": ["useEffect", "useState", "useContext"],
                "correctAnswer": 1
              },
              {
                "id": 26033,
                "question": "What are 'props' in React?",
                "options": ["Internal state of a component", "Inputs to a component passed from a parent", "Global variables"],
                "correctAnswer": 1
              },
              {
                "id": 26034,
                "question": "What is the 'Virtual DOM'?",
                "options": ["A backup of the website", "A lightweight representation of the real DOM used for performance", "A type of server"],
                "correctAnswer": 1
              },
              {
                "id": 26035,
                "question": "In useEffect, what does an empty dependency array [] mean?",
                "options": ["The effect runs on every render", "The effect runs only once after the initial render", "The effect never runs"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 234,
        "name": "Node Js",
        "weeks": [
          {
            "id": 2604,
            "weekNumber": 1,
            "title": "Server-side Runtime",
            "tasks": [
              {
                "id": 26041,
                "question": "What is Node.js?",
                "options": ["A frontend CSS framework", "A JavaScript runtime built on Chrome's V8 engine", "A relational database"],
                "correctAnswer": 1
              },
              {
                "id": 26042,
                "question": "What is 'npm' used for?",
                "options": ["Managing JavaScript packages and dependencies", "Writing HTML code", "Hosting websites"],
                "correctAnswer": 0
              },
              {
                "id": 26043,
                "question": "Which built-in Node.js module is used to handle file operations?",
                "options": ["http", "fs", "path"],
                "correctAnswer": 1
              },
              {
                "id": 26044,
                "question": "What is 'Express' in the context of Node.js?",
                "options": ["A database engine", "A minimal and flexible web application framework", "A type of server hardware"],
                "correctAnswer": 1
              },
              {
                "id": 26045,
                "question": "What does 'Middleware' do in an Express app?",
                "options": ["It connects the mouse to the computer", "Functions that have access to the request and response objects", "It styles the webpage"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 235,
        "name": "Mongo DB",
        "weeks": [
          {
            "id": 2605,
            "weekNumber": 1,
            "title": "NoSQL Databases",
            "tasks": [
              {
                "id": 26051,
                "question": "What type of database is MongoDB?",
                "options": ["Relational (SQL)", "Document-oriented (NoSQL)", "Graph Database"],
                "correctAnswer": 1
              },
              {
                "id": 26052,
                "question": "How does MongoDB store data?",
                "options": ["In tables and rows", "In BSON (Binary JSON) documents", "In text files"],
                "correctAnswer": 1
              },
              {
                "id": 26053,
                "question": "What is a 'Collection' in MongoDB?",
                "options": ["A group of databases", "A group of MongoDB documents", "A backup file"],
                "correctAnswer": 1
              },
              {
                "id": 26054,
                "question": "What is 'Mongoose'?",
                "options": ["A MongoDB driver for Java", "An ODM (Object Data Modeling) library for MongoDB and Node.js", "A type of database index"],
                "correctAnswer": 1
              },
              {
                "id": 26055,
                "question": "Which command is used to retrieve documents from a collection?",
                "options": ["get()", "find()", "select()"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 236,
        "name": "Python Django",
        "weeks": [
          {
            "id": 2606,
            "weekNumber": 1,
            "title": "Python Web Framework",
            "tasks": [
              {
                "id": 26061,
                "question": "What architecture does Django follow?",
                "options": ["MVC", "MVT (Model-View-Template)", "Layered"],
                "correctAnswer": 1
              },
              {
                "id": 26062,
                "question": "What is the purpose of Django 'Migrations'?",
                "options": ["To move the website to a new server", "To propagate changes you make to your models into your database schema", "To update the Python version"],
                "correctAnswer": 1
              },
              {
                "id": 26063,
                "question": "What is the Django 'Admin' interface?",
                "options": ["A coding terminal", "A built-in, automatic interface for managing database content", "A type of firewall"],
                "correctAnswer": 1
              },
              {
                "id": 26064,
                "question": "Which file in a Django project handles URL routing?",
                "options": ["models.py", "views.py", "urls.py"],
                "correctAnswer": 2
              },
              {
                "id": 26065,
                "question": "What is the 'ORM' in Django?",
                "options": ["Object-Relational Mapper", "Online Resource Manager", "Output Request Module"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 237,
        "name": "Docker, Kibana, GitHub",
        "weeks": [
          {
            "id": 2607,
            "weekNumber": 1,
            "title": "DevOps & Tools",
            "tasks": [
              {
                "id": 26071,
                "question": "What is Docker used for?",
                "options": ["Designing logos", "Containerization of applications to ensure consistency across environments", "Editing text files"],
                "correctAnswer": 1
              },
              {
                "id": 26072,
                "question": "In Git, what is a 'Pull Request'?",
                "options": ["A way to delete a repository", "A request to merge code changes into a main branch", "A way to download code"],
                "correctAnswer": 1
              },
              {
                "id": 26073,
                "question": "What is 'Kibana' primarily used for?",
                "options": ["Compiling code", "Visualizing and analyzing log data (often with Elasticsearch)", "Storing passwords"],
                "correctAnswer": 1
              },
              {
                "id": 26074,
                "question": "What is a 'Dockerfile'?",
                "options": ["A script containing instructions to build a Docker image", "A file that lists GitHub users", "A backup of the database"],
                "correctAnswer": 0
              },
              {
                "id": 26075,
                "question": "What does 'git clone' do?",
                "options": ["Deletes a local branch", "Creates a local copy of a remote repository", "Uploads changes to GitHub"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },

  "	Fullstack Web Dev (Interm)": {
    "id": 24,
    "course_name": "Fullstack Web Dev (Intermediate)",
    "modules": [
      {
        "id": 240,
        "name": "HTML",
        "weeks": [
          {
            "id": 2700,
            "weekNumber": 1,
            "title": "Forms and Semantic Elements",
            "tasks": [
              {
                "id": 27001,
                "question": "Which HTML tag is used to create a drop-down list?",
                "options": ["<input type='list'>", "<select>", "<dropdown>"],
                "correctAnswer": 1
              },
              {
                "id": 27002,
                "question": "What is the purpose of the <label> element's 'for' attribute?",
                "options": ["To style the text", "To bind the label to a specific form element's ID", "To set the font size"],
                "correctAnswer": 1
              },
              {
                "id": 27003,
                "question": "Which input type is used specifically for selecting a range of numbers via a slider?",
                "options": ["number", "range", "slider"],
                "correctAnswer": 1
              },
              {
                "id": 27004,
                "question": "Which semantic tag should be used for the main navigation links of a website?",
                "options": ["<navigation>", "<nav>", "<links>"],
                "correctAnswer": 1
              },
              {
                "id": 27005,
                "question": "What does the <alt> attribute in an <img> tag provide?",
                "options": ["A high-quality version of the image", "A text description for screen readers and broken links", "The image's border size"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 241,
        "name": "CSS",
        "weeks": [
          {
            "id": 2701,
            "weekNumber": 1,
            "title": "Layouts and Positioning",
            "tasks": [
              {
                "id": 27011,
                "question": "Which CSS property is used to change the stacking order of overlapping elements?",
                "options": ["order", "z-index", "stack"],
                "correctAnswer": 1
              },
              {
                "id": 27012,
                "question": "In Flexbox, which property defines the direction items are placed in the container?",
                "options": ["flex-direction", "justify-content", "align-items"],
                "correctAnswer": 0
              },
              {
                "id": 27013,
                "question": "What is the default value of the 'position' property in CSS?",
                "options": ["relative", "absolute", "static"],
                "correctAnswer": 2
              },
              {
                "id": 27014,
                "question": "Which pseudo-class is used to style an element when a user moves their mouse over it?",
                "options": [":active", ":focus", ":hover"],
                "correctAnswer": 2
              },
              {
                "id": 27015,
                "question": "What is the purpose of a CSS Media Query?",
                "options": ["To query a database", "To apply styles based on screen size or device type", "To play sound files"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 242,
        "name": "Javascript",
        "weeks": [
          {
            "id": 2702,
            "weekNumber": 1,
            "title": "ES6 Basics and DOM",
            "tasks": [
              {
                "id": 27021,
                "question": "Which keyword is used to declare a variable that cannot be reassigned?",
                "options": ["let", "var", "const"],
                "correctAnswer": 2
              },
              {
                "id": 27022,
                "question": "How do you write an Arrow Function in JavaScript?",
                "options": ["function => {}", "() => {}", "arrow function() {}"],
                "correctAnswer": 1
              },
              {
                "id": 27023,
                "question": "Which method is used to add a new element to the end of an array?",
                "options": ["pop()", "push()", "shift()"],
                "correctAnswer": 1
              },
              {
                "id": 27024,
                "question": "Which DOM method is used to select an element by its ID?",
                "options": ["getElementByClass", "getElementById", "querySelector"],
                "correctAnswer": 1
              },
              {
                "id": 27025,
                "question": "What does JSON.stringify() do?",
                "options": ["Converts a string to an object", "Converts a JavaScript object into a JSON string", "Parses a JSON file"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 243,
        "name": "React",
        "weeks": [
          {
            "id": 2703,
            "weekNumber": 1,
            "title": "Components and State",
            "tasks": [
              {
                "id": 27031,
                "question": "What is the main purpose of React?",
                "options": ["Database management", "Building user interfaces", "Server-side routing"],
                "correctAnswer": 1
              },
              {
                "id": 27032,
                "question": "Which React Hook is used to track data or properties that change over time in a component?",
                "options": ["useEffect", "useState", "useHistory"],
                "correctAnswer": 1
              },
              {
                "id": 27033,
                "question": "In React, how are 'Props' passed to a component?",
                "options": ["Like function arguments", "Via a database", "Using CSS selectors"],
                "correctAnswer": 0
              },
              {
                "id": 27034,
                "question": "What must every React component return?",
                "options": ["A JavaScript variable", "JSX (or null)", "A JSON object"],
                "correctAnswer": 1
              },
              {
                "id": 27035,
                "question": "Which command is used to create a new React app project?",
                "options": ["npm start react", "npx create-react-app app-name", "git init react"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 244,
        "name": "Node Js",
        "weeks": [
          {
            "id": 2704,
            "weekNumber": 1,
            "title": "Backend Fundamentals",
            "tasks": [
              {
                "id": 27041,
                "question": "What is Node.js?",
                "options": ["A library for CSS", "A JavaScript runtime environment", "A type of SQL database"],
                "correctAnswer": 1
              },
              {
                "id": 27042,
                "question": "Which file holds the metadata and dependency list for a Node.js project?",
                "options": ["index.js", "package.json", "node_modules"],
                "correctAnswer": 1
              },
              {
                "id": 27043,
                "question": "Which framework is most commonly used with Node.js to build web APIs?",
                "options": ["Django", "Express", "Laravel"],
                "correctAnswer": 1
              },
              {
                "id": 27044,
                "question": "What does 'NPM' stand for?",
                "options": ["Node Package Manager", "New Project Method", "Network Protocol Module"],
                "correctAnswer": 0
              },
              {
                "id": 27045,
                "question": "How do you import a module in Node.js using CommonJS syntax?",
                "options": ["import module from 'path'", "require('module')", "include('module')"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 245,
        "name": "Mongo DB",
        "weeks": [
          {
            "id": 2705,
            "weekNumber": 1,
            "title": "NoSQL Database Basics",
            "tasks": [
              {
                "id": 27051,
                "question": "What format does MongoDB use to store data?",
                "options": ["Rows and Columns", "BSON (Document-based)", "CSV files"],
                "correctAnswer": 1
              },
              {
                "id": 27052,
                "question": "In MongoDB, what is the equivalent of a 'Table' in SQL?",
                "options": ["Database", "Collection", "Document"],
                "correctAnswer": 1
              },
              {
                "id": 27053,
                "question": "Which unique field is automatically created for every document in MongoDB?",
                "options": ["_id", "serial_no", "uuid"],
                "correctAnswer": 0
              },
              {
                "id": 27054,
                "question": "Which command is used to add a single document to a collection?",
                "options": ["insert()", "insertOne()", "add()"],
                "correctAnswer": 1
              },
              {
                "id": 27055,
                "question": "Is MongoDB considered a Relational or Non-Relational database?",
                "options": ["Relational", "Non-Relational (NoSQL)", "Neither"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 246,
        "name": "Python Django",
        "weeks": [
          {
            "id": 2706,
            "weekNumber": 1,
            "title": "Django Framework Basics",
            "tasks": [
              {
                "id": 27061,
                "question": "What is Django?",
                "options": ["A frontend framework", "A high-level Python web framework", "A database engine"],
                "correctAnswer": 1
              },
              {
                "id": 27062,
                "question": "What does the 'M' in Django's MVT architecture stand for?",
                "options": ["Method", "Model", "Middleware"],
                "correctAnswer": 1
              },
              {
                "id": 27063,
                "question": "Which command is used to start the built-in development server in Django?",
                "options": ["python runserver", "python manage.py runserver", "django start"],
                "correctAnswer": 1
              },
              {
                "id": 27064,
                "question": "What is the purpose of the 'migrations' folder in Django?",
                "options": ["To store static images", "To keep track of changes to the database schema", "To manage user logins"],
                "correctAnswer": 1
              },
              {
                "id": 27065,
                "question": "Which file in a Django app is used to define the user interface or return HTML responses?",
                "options": ["models.py", "views.py", "admin.py"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },


  "Advanced MS Office": {
    "id": 25,
    "course_name": "Advanced MS Office",
    "modules": [
      {
        "id": 250,
        "name": "Microsoft Word",
        "weeks": [
          {
            "id": 2800,
            "weekNumber": 1,
            "title": "Advanced Document Processing",
            "tasks": [
              {
                "id": 28001,
                "question": "Which feature allows you to send a personalized letter or email to a large list of people simultaneously?",
                "options": ["Track Changes", "Mail Merge", "Macro Recording"],
                "correctAnswer": 1
              },
              {
                "id": 28002,
                "question": "What is the purpose of using 'Styles' (e.g., Heading 1, Heading 2) in long documents?",
                "options": [
                  "To make the text colorful only",
                  "To ensure consistent formatting and automatically generate a Table of Contents",
                  "To increase the word count"
                ],
                "correctAnswer": 1
              },
              {
                "id": 28003,
                "question": "Which feature is used to record and automate a repetitive sequence of tasks in Word?",
                "options": ["Styles", "Macros", "Captions"],
                "correctAnswer": 1
              },
              {
                "id": 28004,
                "question": "How can you allow multiple people to collaborate on a document while seeing exactly what changes each person made?",
                "options": ["Password Protect", "Track Changes", "Read-Only Mode"],
                "correctAnswer": 1
              },
              {
                "id": 28005,
                "question": "What is a 'Section Break' used for in Word?",
                "options": [
                  "To start a new paragraph",
                  "To apply different page numbering or orientations within the same document",
                  "To check for spelling errors"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 251,
        "name": "Microsoft Excel",
        "weeks": [
          {
            "id": 2801,
            "weekNumber": 1,
            "title": "Advanced Data Analysis",
            "tasks": [
              {
                "id": 28011,
                "question": "Which modern function is used to look up a value in a range or array regardless of whether the return column is to the left or right?",
                "options": ["VLOOKUP", "XLOOKUP", "HLOOKUP"],
                "correctAnswer": 1
              },
              {
                "id": 28012,
                "question": "What is the primary purpose of a PivotTable?",
                "options": [
                  "To create 3D drawings",
                  "To summarize, analyze, and explore large datasets quickly",
                  "To change the font of the entire sheet"
                ],
                "correctAnswer": 1
              },
              {
                "id": 28013,
                "question": "Which feature allows you to restrict the type of data or values that users enter into a cell?",
                "options": ["Data Validation", "Conditional Formatting", "Freeze Panes"],
                "correctAnswer": 0
              },
              {
                "id": 28014,
                "question": "What does a 'Goal Seek' analysis do in Excel?",
                "options": [
                  "Calculates the sum of a range",
                  "Finds the input value needed to achieve a specific result in a formula",
                  "Deletes duplicate rows"
                ],
                "correctAnswer": 1
              },
              {
                "id": 28015,
                "question": "In Excel, what is a 'Macro' primarily written in?",
                "options": ["Javascript", "VBA (Visual Basic for Applications)", "Python"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 252,
        "name": "Microsoft PowerPoint",
        "weeks": [
          {
            "id": 2802,
            "weekNumber": 1,
            "title": "Advanced Presentations & Design",
            "tasks": [
              {
                "id": 28021,
                "question": "What is the 'Slide Master' used for?",
                "options": [
                  "To view the presentation in full screen",
                  "To make global changes to the layout and design of all slides at once",
                  "To record a voiceover"
                ],
                "correctAnswer": 1
              },
              {
                "id": 28022,
                "question": "Which transition effect creates a seamless, cinematic movement from one slide to the next by tracking object movement?",
                "options": ["Fade", "Morph", "Wipe"],
                "correctAnswer": 1
              },
              {
                "id": 28023,
                "question": "How do you create a non-linear presentation where clicking a button takes you to a specific slide or website?",
                "options": ["Animations", "Hyperlinks / Action Buttons", "Slide Transitions"],
                "correctAnswer": 1
              },
              {
                "id": 28024,
                "question": "What is 'Presenter View' used for during a slideshow?",
                "options": [
                  "To let the audience see your notes",
                  "To see your speaker notes and upcoming slides on one screen while the audience only sees the current slide",
                  "To edit the slides while presenting"
                ],
                "correctAnswer": 1
              },
              {
                "id": 28025,
                "question": "Which tool allows you to convert a simple list into a professional-looking graphic or diagram?",
                "options": ["WordArt", "SmartArt", "ClipArt"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },

  "Digital Literacy": {
    "id": 26,
    "course_name": "Digital Literacy",
    "modules": [
      {
        "id": 260,
        "name": "Microsoft Word",
        "weeks": [
          {
            "id": 2900,
            "weekNumber": 1,
            "title": "Word Processing Basics",
            "tasks": [
              {
                "id": 29001,
                "question": "Which keyboard shortcut is used to 'Copy' selected text?",
                "options": ["Ctrl + V", "Ctrl + C", "Ctrl + X"],
                "correctAnswer": 1
              },
              {
                "id": 29002,
                "question": "How is text aligned by default in a new Microsoft Word document?",
                "options": ["Centered", "Right-aligned", "Left-aligned"],
                "correctAnswer": 2
              },
              {
                "id": 29003,
                "question": "Which feature is used to change the page from 'Portrait' to 'Landscape'?",
                "options": ["Margins", "Orientation", "Size"],
                "correctAnswer": 1
              },
              {
                "id": 29004,
                "question": "What is the purpose of the 'Spell Check' tool?",
                "options": ["To change font colors", "To identify and correct spelling errors", "To count the number of pages"],
                "correctAnswer": 1
              },
              {
                "id": 29005,
                "question": "Which tab would you use to insert a Table or an Image?",
                "options": ["Home", "Design", "Insert"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      },
      {
        "id": 261,
        "name": "Microsoft Excel",
        "weeks": [
          {
            "id": 2901,
            "weekNumber": 1,
            "title": "Spreadsheet Fundamentals",
            "tasks": [
              {
                "id": 29011,
                "question": "In Excel, what are columns identified by?",
                "options": ["Numbers", "Letters", "Colors"],
                "correctAnswer": 1
              },
              {
                "id": 29012,
                "question": "What is the intersection of a row and a column called?",
                "options": ["Block", "Cell", "Grid"],
                "correctAnswer": 1
              },
              {
                "id": 29013,
                "question": "What symbol must every Excel formula start with?",
                "options": ["+", "=", "$"],
                "correctAnswer": 1
              },
              {
                "id": 29014,
                "question": "Which function is used to add together a range of numbers?",
                "options": ["=SUM()", "=ADD()", "=TOTAL()"],
                "correctAnswer": 0
              },
              {
                "id": 29015,
                "question": "What is the name of the file you create in Microsoft Excel?",
                "options": ["Document", "Workbook", "Presentation"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 262,
        "name": "PowerPoint",
        "weeks": [
          {
            "id": 2902,
            "weekNumber": 1,
            "title": "Presentation Basics",
            "tasks": [
              {
                "id": 29021,
                "question": "What is the individual page in a PowerPoint presentation called?",
                "options": ["Sheet", "Slide", "Frame"],
                "correctAnswer": 1
              },
              {
                "id": 29022,
                "question": "Which view allows you to see all your slides at once in a grid?",
                "options": ["Slide Sorter View", "Normal View", "Reading View"],
                "correctAnswer": 0
              },
              {
                "id": 29023,
                "question": "What do you call the visual effect that happens when moving from one slide to the next?",
                "options": ["Animation", "Transition", "Motion Path"],
                "correctAnswer": 1
              },
              {
                "id": 29024,
                "question": "Which shortcut key starts a slideshow from the first slide?",
                "options": ["F1", "F5", "Esc"],
                "correctAnswer": 1
              },
              {
                "id": 29025,
                "question": "What is the purpose of 'Speaker Notes' in PowerPoint?",
                "options": ["To show the audience more text", "To help the presenter remember what to say", "To record audio"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 263,
        "name": "Google Workspace",
        "weeks": [
          {
            "id": 2903,
            "weekNumber": 1,
            "title": "Cloud Collaboration",
            "tasks": [
              {
                "id": 29031,
                "question": "What is the name of Google's cloud-based storage service?",
                "options": ["Google Sheets", "Google Drive", "Google Docs"],
                "correctAnswer": 1
              },
              {
                "id": 29032,
                "question": "Which Google Workspace app is used for creating word documents?",
                "options": ["Google Slides", "Google Docs", "Google Forms"],
                "correctAnswer": 1
              },
              {
                "id": 29033,
                "question": "What is a major advantage of using Google Workspace apps over offline software?",
                "options": ["They don't require an account", "Real-time collaboration with others", "They are only available on paper"],
                "correctAnswer": 1
              },
              {
                "id": 29034,
                "question": "How do you share a Google Doc with someone else?",
                "options": ["By clicking the 'Share' button and entering their email", "By printing it and mailing it", "By saving it to a USB drive"],
                "correctAnswer": 0
              },
              {
                "id": 29035,
                "question": "Which Google app is the equivalent of Microsoft Excel?",
                "options": ["Google Keep", "Google Sheets", "Google Meet"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },

  "Intermediate Microsoft Office": {
    "id": 27,
    "course_name": "Intermediate Microsoft Office",
    "modules": [
      {
        "id": 270,
        "name": "Microsoft Word",
        "weeks": [
          {
            "id": 3000,
            "weekNumber": 1,
            "title": "Document Structuring & Formatting",
            "tasks": [
              {
                "id": 30001,
                "question": "Which feature must be used consistently to allow Word to generate an automatic Table of Contents?",
                "options": ["Bold and Italic text", "Heading Styles (Heading 1, 2, etc.)", "Bullet points"],
                "correctAnswer": 1
              },
              {
                "id": 30002,
                "question": "Where can you find the option to insert complex mathematical equations in Word?",
                "options": ["Layout Tab", "Insert Tab", "Review Tab"],
                "correctAnswer": 1
              },
              {
                "id": 30003,
                "question": "If you want a page number to appear at the bottom of every page, which area should you edit?",
                "options": ["Header", "Footer", "Margin"],
                "correctAnswer": 1
              },
              {
                "id": 30004,
                "question": "How can you combine two or more cells in a Word table into a single cell?",
                "options": ["Split Cells", "Merge Cells", "Align Cells"],
                "correctAnswer": 1
              },
              {
                "id": 30005,
                "question": "Which 'Save As' format is best used to ensure the document looks the same on all devices without allowing easy editing?",
                "options": [".docx", ".txt", ".pdf"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      },
      {
        "id": 271,
        "name": "Microsoft Excel",
        "weeks": [
          {
            "id": 3001,
            "weekNumber": 1,
            "title": "Data Management & Advanced Functions",
            "tasks": [
              {
                "id": 30011,
                "question": "Which tool allows you to automatically change the color of a cell based on its value (e.g., highlighting negative numbers in red)?",
                "options": ["Format as Table", "Conditional Formatting", "Data Validation"],
                "correctAnswer": 1
              },
              {
                "id": 30012,
                "question": "Which of these functions is the most versatile for looking up data, as it works both vertically and horizontally?",
                "options": ["VLOOKUP", "HLOOKUP", "XLOOKUP"],
                "correctAnswer": 2
              },
              {
                "id": 30013,
                "question": "What is the primary purpose of 'Power Query' in Excel?",
                "options": ["To create 3D charts", "To connect, clean, and transform data from different sources", "To check for spelling errors"],
                "correctAnswer": 1
              },
              {
                "id": 30014,
                "question": "In a Pivot Table, which area would you drag a field to if you want to see a sum of sales figures?",
                "options": ["Rows", "Columns", "Values"],
                "correctAnswer": 2
              },
              {
                "id": 30015,
                "question": "Which keyboard shortcut is used to quickly turn a range of data into an official Excel Table?",
                "options": ["Ctrl + T", "Ctrl + E", "Ctrl + Shift + L"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 272,
        "name": "Microsoft PowerPoint",
        "weeks": [
          {
            "id": 3002,
            "weekNumber": 1,
            "title": "Interactive Presentations",
            "tasks": [
              {
                "id": 30021,
                "question": "What is the fastest way to create an exact copy of a selected slide?",
                "options": ["Ctrl + N", "Ctrl + D (Duplicate)", "Ctrl + M"],
                "correctAnswer": 1
              },
              {
                "id": 30022,
                "question": "What is the purpose of an 'Action Button' in a PowerPoint presentation?",
                "options": ["To make the text move", "To create a clickable link that performs a specific task like 'Next Slide' or 'Open File'", "To change the theme color"],
                "correctAnswer": 1
              },
              {
                "id": 30023,
                "question": "Which feature should you use to create a professional organizational chart or process diagram quickly?",
                "options": ["SmartArt", "WordArt", "Shapes"],
                "correctAnswer": 0
              },
              {
                "id": 30024,
                "question": "What is the difference between an 'Animation' and a 'Transition'?",
                "options": ["Animations apply to objects on a slide; Transitions apply to the movement between slides", "They are the same thing", "Transitions are for sounds; Animations are for pictures"],
                "correctAnswer": 0
              },
              {
                "id": 30025,
                "question": "How do you ensure that audio or video plays automatically when you reach a specific slide?",
                "options": ["Right-click the slide", "Set the 'Start' option to 'Automatically' in the Playback tab", "Press F5"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },

  "Basic Microsoft Office": {
    "id": 28,
    "course_name": "Basic Microsoft Office",
    "modules": [
      {
        "id": 280,
        "name": "Microsoft Word",
        "weeks": [
          {
            "id": 3100,
            "weekNumber": 1,
            "title": "Document Basics and Formatting",
            "tasks": [
              {
                "id": 31001,
                "question": "Which tab in Microsoft Word is used to insert a Table?",
                "options": ["Home", "Insert", "Layout"],
                "correctAnswer": 1
              },
              {
                "id": 31002,
                "question": "What is the standard file extension for a modern Microsoft Word document?",
                "options": [".txt", ".xlsx", ".docx"],
                "correctAnswer": 2
              },
              {
                "id": 31003,
                "question": "What is the primary benefit of using 'Heading Styles'?",
                "options": ["To make the file smaller", "To provide consistent formatting and allow for an automatic Table of Contents", "To hide text"],
                "correctAnswer": 1
              },
              {
                "id": 31004,
                "question": "In which part of the page does a 'Header' typically appear?",
                "options": ["The middle of the page", "The bottom of every page", "The top of every page"],
                "correctAnswer": 2
              },
              {
                "id": 31005,
                "question": "Which keyboard shortcut is used to 'Save' a document?",
                "options": ["Ctrl + S", "Ctrl + P", "Ctrl + Z"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 281,
        "name": "Microsoft Excel",
        "weeks": [
          {
            "id": 3101,
            "weekNumber": 1,
            "title": "Spreadsheet Basics and Calculations",
            "tasks": [
              {
                "id": 31011,
                "question": "What is the intersection of a row and a column called?",
                "options": ["Grid", "Cell", "Table"],
                "correctAnswer": 1
              },
              {
                "id": 31012,
                "question": "Which feature is used to automatically change a cell's color if a value meets a certain condition?",
                "options": ["Conditional Formatting", "Format as Table", "Data Validation"],
                "correctAnswer": 0
              },
              {
                "id": 31013,
                "question": "Every formula in Excel must begin with which symbol?",
                "options": ["+", "$", "="],
                "correctAnswer": 2
              },
              {
                "id": 31014,
                "question": "Which basic formula would you use to find the total of a range of numbers?",
                "options": ["=TOTAL()", "=SUM()", "=ADD()"],
                "correctAnswer": 1
              },
              {
                "id": 31015,
                "question": "Which chart type is best for showing percentages of a whole?",
                "options": ["Line Chart", "Bar Chart", "Pie Chart"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      },
      {
        "id": 282,
        "name": "Microsoft PowerPoint",
        "weeks": [
          {
            "id": 3102,
            "weekNumber": 1,
            "title": "Presentation and Slide Design",
            "tasks": [
              {
                "id": 31021,
                "question": "What is the keyboard shortcut to duplicate a selected slide?",
                "options": ["Ctrl + N", "Ctrl + D", "Ctrl + M"],
                "correctAnswer": 1
              },
              {
                "id": 31022,
                "question": "How do you add a picture or video to a PowerPoint slide?",
                "options": ["Using the Insert tab", "Using the View tab", "Using the File tab"],
                "correctAnswer": 0
              },
              {
                "id": 31023,
                "question": "What is the difference between a Transition and an Animation?",
                "options": ["Transitions are for text; Animations are for slides", "Transitions apply to the movement between slides; Animations apply to objects on a slide", "There is no difference"],
                "correctAnswer": 1
              },
              {
                "id": 31024,
                "question": "Which key starts the slideshow from the very first slide?",
                "options": ["Esc", "F5", "Enter"],
                "correctAnswer": 1
              },
              {
                "id": 31025,
                "question": "Where can you change the overall visual theme and color scheme of your presentation?",
                "options": ["Design Tab", "Review Tab", "Help Tab"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      }
    ]
  },

  "Front End Web Development": {
    "id": 29,
    "course_name": "Front End Web Development",
    "modules": [
      {
        "id": 290,
        "name": "HTML",
        "weeks": [
          {
            "id": 3200,
            "weekNumber": 1,
            "title": "Structuring the Web",
            "tasks": [
              {
                "id": 32001,
                "question": "What does HTML stand for?",
                "options": [
                  "High Tech Modern Language",
                  "HyperText Markup Language",
                  "Hyperlink and Text Management"
                ],
                "correctAnswer": 1
              },
              {
                "id": 32002,
                "question": "Which tag is used to create a hyperlink?",
                "options": ["<link>", "<a>", "<href>"],
                "correctAnswer": 1
              },
              {
                "id": 32003,
                "question": "Which HTML element is used for the largest heading?",
                "options": ["<h6>", "<head>", "<h1>"],
                "correctAnswer": 2
              },
              {
                "id": 32004,
                "question": "What is the purpose of the <alt> attribute in an <img> tag?",
                "options": [
                  "To change the image size",
                  "To provide alternative text if the image fails to load",
                  "To add a link to the image"
                ],
                "correctAnswer": 1
              },
              {
                "id": 32005,
                "question": "Which tag is used to create an unordered list?",
                "options": ["<ul>", "<ol>", "<li>"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 291,
        "name": "CSS",
        "weeks": [
          {
            "id": 3201,
            "weekNumber": 1,
            "title": "Styling and Layouts",
            "tasks": [
              {
                "id": 32011,
                "question": "What does CSS stand for?",
                "options": [
                  "Creative Style Sheets",
                  "Computer Style Software",
                  "Cascading Style Sheets"
                ],
                "correctAnswer": 2
              },
              {
                "id": 32012,
                "question": "In the CSS Box Model, what is the space inside the border called?",
                "options": ["Margin", "Padding", "Outline"],
                "correctAnswer": 1
              },
              {
                "id": 32013,
                "question": "Which property is used to change the background color of an element?",
                "options": ["color", "bg-color", "background-color"],
                "correctAnswer": 2
              },
              {
                "id": 32014,
                "question": "How do you make the text bold in CSS?",
                "options": ["font-weight: bold;", "text-style: bold;", "font-bold: true;"],
                "correctAnswer": 0
              },
              {
                "id": 32015,
                "question": "Which CSS property is used to create space between different elements (outside the border)?",
                "options": ["Padding", "Border", "Margin"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      },
      {
        "id": 292,
        "name": "Javascript",
        "weeks": [
          {
            "id": 3202,
            "weekNumber": 1,
            "title": "Programming for the Web",
            "tasks": [
              {
                "id": 32021,
                "question": "Which keyword is used to declare a constant variable?",
                "options": ["let", "var", "const"],
                "correctAnswer": 2
              },
              {
                "id": 32022,
                "question": "How do you write a single-line comment in JavaScript?",
                "options": ["// comment", "<!-- comment -->", "/* comment */"],
                "correctAnswer": 0
              },
              {
                "id": 32023,
                "question": "Which built-in method adds a new element to the end of an array?",
                "options": ["shift()", "push()", "pop()"],
                "correctAnswer": 1
              },
              {
                "id": 32024,
                "question": "What does the 'DOM' stand for?",
                "options": [
                  "Data Object Mode",
                  "Document Object Model",
                  "Digital Output Manager"
                ],
                "correctAnswer": 1
              },
              {
                "id": 32025,
                "question": "Which operator is used for strict equality (checks both value and type)?",
                "options": ["=", "==", "==="],
                "correctAnswer": 2
              }
            ]
          }
        ]
      },
      {
        "id": 293,
        "name": "React",
        "weeks": [
          {
            "id": 3203,
            "weekNumber": 1,
            "title": "Component-Based UI",
            "tasks": [
              {
                "id": 32031,
                "question": "Which Hook is used to manage state in a React functional component?",
                "options": ["useEffect", "useState", "useContext"],
                "correctAnswer": 1
              },
              {
                "id": 32032,
                "question": "What is the name of the syntax used in React that looks like HTML?",
                "options": ["JSON", "JSX", "XML"],
                "correctAnswer": 1
              },
              {
                "id": 32033,
                "question": "What are 'Props' in React?",
                "options": [
                  "External libraries",
                  "Data passed from a parent component to a child",
                  "Internal state of a component"
                ],
                "correctAnswer": 1
              },
              {
                "id": 32034,
                "question": "How many elements can a React component return at its top level?",
                "options": ["Unlimited", "Exactly two", "Only one"],
                "correctAnswer": 2
              },
              {
                "id": 32035,
                "question": "Which command is typically used to create a new React app project?",
                "options": [
                  "npm start react",
                  "npx create-react-app",
                  "install react-project"
                ],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 294,
        "name": "Next Js",
        "weeks": [
          {
            "id": 3204,
            "weekNumber": 1,
            "title": "Fullstack React Framework",
            "tasks": [
              {
                "id": 32041,
                "question": "What is a major benefit of using Next.js over standard React?",
                "options": [
                  "It is easier to learn",
                  "Built-in Server-Side Rendering (SSR) and SEO optimization",
                  "It doesn't use JavaScript"
                ],
                "correctAnswer": 1
              },
              {
                "id": 32042,
                "question": "In the Next.js App Router, which file name is used to define a route?",
                "options": ["route.js", "page.tsx", "index.html"],
                "correctAnswer": 1
              },
              {
                "id": 32043,
                "question": "Which component is used for optimized navigation between pages in Next.js?",
                "options": ["<a>", "<Navigate>", "<Link>"],
                "correctAnswer": 2
              },
              {
                "id": 32044,
                "question": "What does 'Static Site Generation' (SSG) do?",
                "options": [
                  "Generates HTML at build time",
                  "Generates HTML on every request",
                  "Only works for mobile apps"
                ],
                "correctAnswer": 0
              },
              {
                "id": 32045,
                "question": "Where do you define global CSS in a Next.js project?",
                "options": ["globals.css", "styles.js", "index.css"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      },
      {
        "id": 295,
        "name": "Angular",
        "weeks": [
          {
            "id": 3205,
            "weekNumber": 1,
            "title": "Enterprise Web Applications",
            "tasks": [
              {
                "id": 32051,
                "question": "Which programming language is primarily used to build Angular applications?",
                "options": ["Python", "JavaScript", "TypeScript"],
                "correctAnswer": 2
              },
              {
                "id": 32052,
                "question": "In Angular, what is used to define the metadata for a class, such as its selector and template?",
                "options": ["Decorators (e.g., @Component)", "Tags", "Modules"],
                "correctAnswer": 0
              },
              {
                "id": 32053,
                "question": "Which CLI command is used to generate a new component in Angular?",
                "options": ["ng create component", "ng g c name", "npm add component"],
                "correctAnswer": 1
              },
              {
                "id": 32054,
                "question": "What is 'Dependency Injection' in Angular?",
                "options": [
                  "A way to inject CSS into HTML",
                  "A design pattern where a class receives its dependencies from an external source",
                  "A type of security attack"
                ],
                "correctAnswer": 1
              },
              {
                "id": 32055,
                "question": "Which directive is used for two-way data binding in Angular forms?",
                "options": ["ngIf", "ngModel", "ngFor"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },

  "	Front End Web Dev. (Basic)": {
    "id": 30,
    "course_name": "Front End Web Dev.(Interm)",
    "modules": [
      {
        "id": 300,
        "name": "HTML",
        "weeks": [
          {
            "id": 3300,
            "weekNumber": 1,
            "title": "Semantic HTML and Forms",
            "tasks": [
              {
                "id": 33001,
                "question": "Which HTML5 tag is most appropriate for a standalone piece of content like a blog post or news story?",
                "options": ["<section>", "<article>", "<div>"],
                "correctAnswer": 1
              },
              {
                "id": 33002,
                "question": "What is the purpose of the 'placeholder' attribute in an <input> tag?",
                "options": ["To set a default value that is submitted with the form", "To show a short hint that describes the expected value", "To hide the input field"],
                "correctAnswer": 1
              },
              {
                "id": 33003,
                "question": "Which meta tag attribute is used to ensure a website is responsive on mobile devices?",
                "options": ["name='viewport'", "name='description'", "charset='UTF-8'"],
                "correctAnswer": 0
              },
              {
                "id": 33004,
                "question": "In a form, which attribute on an input field ensures the user cannot leave it empty before submitting?",
                "options": ["validate", "required", "checked"],
                "correctAnswer": 1
              },
              {
                "id": 33005,
                "question": "What does the <iframe> tag do?",
                "options": ["It creates a bold border", "It displays a nested webpage within the current page", "It defines an image gallery"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 301,
        "name": "CSS",
        "weeks": [
          {
            "id": 3301,
            "weekNumber": 1,
            "title": "Layouts, Flexbox, and Grid",
            "tasks": [
              {
                "id": 33011,
                "question": "In Flexbox, which property is used to align items vertically when the flex-direction is set to 'row'?",
                "options": ["justify-content", "align-items", "flex-wrap"],
                "correctAnswer": 1
              },
              {
                "id": 33012,
                "question": "What does 'box-sizing: border-box;' do?",
                "options": ["Includes padding and border in the element's total width and height", "Removes all borders from the element", "Makes the border transparent"],
                "correctAnswer": 0
              },
              {
                "id": 33013,
                "question": "Which CSS property is used to create space between columns in a CSS Grid layout?",
                "options": ["grid-margin", "gap", "grid-spacing"],
                "correctAnswer": 1
              },
              {
                "id": 33014,
                "question": "What is the default position of every HTML element in CSS?",
                "options": ["relative", "absolute", "static"],
                "correctAnswer": 2
              },
              {
                "id": 33015,
                "question": "Which CSS unit is relative to the width of the user's browser window?",
                "options": ["px", "rem", "vw"],
                "correctAnswer": 2
              }
            ]
          }
        ]
      },
      {
        "id": 302,
        "name": "Javascript",
        "weeks": [
          {
            "id": 3302,
            "weekNumber": 1,
            "title": "ES6+ and DOM Manipulation",
            "tasks": [
              {
                "id": 33021,
                "question": "Which of these is the correct syntax for an ES6 Arrow Function?",
                "options": ["const myFunc = () => {}", "function myFunc() => {}", "let myFunc = function() {}"],
                "correctAnswer": 0
              },
              {
                "id": 33022,
                "question": "What is the result of '5' + 5 in JavaScript?",
                "options": ["10", "55", "Error"],
                "correctAnswer": 1
              },
              {
                "id": 33023,
                "question": "Which array method creates a new array by filtering out elements that do not meet a certain condition?",
                "options": ["map()", "forEach()", "filter()"],
                "correctAnswer": 2
              },
              {
                "id": 33024,
                "question": "What is the purpose of the 'async' and 'await' keywords?",
                "options": ["To speed up the computer", "To handle asynchronous operations more cleanly than with Promises", "To make the browser wait for the user to click"],
                "correctAnswer": 1
              },
              {
                "id": 33025,
                "question": "Which method is used to convert a JSON string into a JavaScript object?",
                "options": ["JSON.stringify()", "JSON.parse()", "JSON.toObject()"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 303,
        "name": "React",
        "weeks": [
          {
            "id": 3303,
            "weekNumber": 1,
            "title": "Hooks and State Management",
            "tasks": [
              {
                "id": 33031,
                "question": "What is the purpose of the 'useState' hook in React?",
                "options": ["To fetch data from an API", "To add state to a functional component", "To style the component"],
                "correctAnswer": 1
              },
              {
                "id": 33032,
                "question": "In React, what happens when a component's state changes?",
                "options": ["The whole page reloads", "The component re-renders to reflect the change", "The browser closes"],
                "correctAnswer": 1
              },
              {
                "id": 33033,
                "question": "Which hook is used to perform side effects (like fetching data) in a functional component?",
                "options": ["useEffect", "useContext", "useReducer"],
                "correctAnswer": 0
              },
              {
                "id": 33034,
                "question": "How do you pass data from a parent component to a child component?",
                "options": ["Through state", "Through props", "Through local storage"],
                "correctAnswer": 1
              },
              {
                "id": 33035,
                "question": "What is the 'Virtual DOM' in React?",
                "options": ["A separate internet", "A lightweight copy of the real DOM used for performance optimization", "A type of database"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 304,
        "name": "GitHub",
        "weeks": [
          {
            "id": 3304,
            "weekNumber": 1,
            "title": "Version Control and Collaboration",
            "tasks": [
              {
                "id": 33041,
                "question": "Which git command is used to save your changes to the local repository with a message?",
                "options": ["git push", "git save", "git commit -m 'message'"],
                "correctAnswer": 2
              },
              {
                "id": 33042,
                "question": "What is a 'Repository' in GitHub?",
                "options": ["A folder where your project and its version history are stored", "A type of programming language", "A user's profile picture"],
                "correctAnswer": 0
              },
              {
                "id": 33043,
                "question": "What is the purpose of 'git push'?",
                "options": ["To download code from the cloud", "To upload local repository changes to a remote repository", "To delete a file"],
                "correctAnswer": 1
              },
              {
                "id": 33044,
                "question": "What is a 'Branch' in Git?",
                "options": ["A parallel version of the repository used to develop features without affecting the main code", "A link to another website", "The final version of a project"],
                "correctAnswer": 0
              },
              {
                "id": 33045,
                "question": "What does a 'Pull Request' (PR) do?",
                "options": ["Deletes the code on GitHub", "Notifies others that you have completed changes and want them reviewed/merged", "Clones a project to your desktop"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      }
    ]
  },
  
  "Fullstack Data Analytics": {
    "id": 31,
    "course_name": "Fullstack Data Analytics",
    "modules": [
      {
        "id": 310,
        "name": "Advanced Excel",
        "weeks": [
          {
            "id": 3400,
            "weekNumber": 1,
            "title": "Advanced Formulas & Analysis",
            "tasks": [
              {
                "id": 34001,
                "question": "Which Excel function is the modern replacement for VLOOKUP and can look both left and right?",
                "options": ["HLOOKUP", "XLOOKUP", "INDEX"],
                "correctAnswer": 1
              },
              {
                "id": 34002,
                "question": "What is the primary purpose of a PivotTable in Data Analysis?",
                "options": ["To change the font color of cells", "To summarize and analyze large datasets quickly", "To protect the worksheet with a password"],
                "correctAnswer": 1
              },
              {
                "id": 34003,
                "question": "Which tool would you use to find the input value needed to achieve a specific target result in a formula?",
                "options": ["Goal Seek", "Data Validation", "Conditional Formatting"],
                "correctAnswer": 0
              },
              {
                "id": 34004,
                "question": "What does a 'Slicer' do in an Excel dashboard?",
                "options": ["It deletes rows of data", "It provides a visual way to filter data in PivotTables", "It calculates the average of a range"],
                "correctAnswer": 1
              },
              {
                "id": 34005,
                "question": "Which feature allows you to highlight cells that are above a certain value automatically?",
                "options": ["Data Analysis Toolpak", "Conditional Formatting", "Freeze Panes"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 311,
        "name": "Power BI",
        "weeks": [
          {
            "id": 3401,
            "weekNumber": 1,
            "title": "Visualization and DAX",
            "tasks": [
              {
                "id": 34011,
                "question": "Which Power BI component is used to design and create reports on a local machine?",
                "options": ["Power BI Service", "Power BI Desktop", "Power BI Gateway"],
                "correctAnswer": 1
              },
              {
                "id": 34012,
                "question": "What is DAX (Data Analysis Expressions) primarily used for?",
                "options": ["To write HTML for reports", "To create custom calculations and formulas", "To install the software"],
                "correctAnswer": 1
              },
              {
                "id": 34013,
                "question": "In Power BI, what is the main difference between a Measure and a Calculated Column?",
                "options": ["Measures are computed on the fly during interaction; Columns are stored in the data", "Columns are only for text", "There is no difference"],
                "correctAnswer": 0
              },
              {
                "id": 34014,
                "question": "Which visual type is most effective for showing a breakdown of 'parts of a whole'?",
                "options": ["Line Chart", "Donut/Pie Chart", "Scatter Plot"],
                "correctAnswer": 1
              },
              {
                "id": 34015,
                "question": "What is 'Power Query' used for in the Power BI workflow?",
                "options": ["To share reports online", "To clean and transform data before modeling", "To change report background colors"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 312,
        "name": "MySQL",
        "weeks": [
          {
            "id": 3402,
            "weekNumber": 1,
            "title": "SQL Queries and Relationships",
            "tasks": [
              {
                "id": 34021,
                "question": "Which keyword is used to retrieve only unique values from a column?",
                "options": ["UNIQUE", "DISTINCT", "DIFFERENT"],
                "correctAnswer": 1
              },
              {
                "id": 34022,
                "question": "Which type of JOIN returns all records when there is a match in either left or right table?",
                "options": ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN"],
                "correctAnswer": 2
              },
              {
                "id": 34023,
                "question": "How do you filter the results of a GROUP BY query?",
                "options": ["Using WHERE", "Using HAVING", "Using FILTER"],
                "correctAnswer": 1
              },
              {
                "id": 34024,
                "question": "What is a 'Subquery'?",
                "options": ["A small database", "A query nested inside another query", "A column name"],
                "correctAnswer": 1
              },
              {
                "id": 34025,
                "question": "Which command is used to arrange the result-set in descending order?",
                "options": ["SORT BY DESC", "ORDER BY DESC", "GROUP BY DESC"],
                "correctAnswer": 1
              }
            ]
          }
        ]
      },
      {
        "id": 313,
        "name": "Python",
        "weeks": [
          {
            "id": 3403,
            "weekNumber": 1,
            "title": "Python for Data Science",
            "tasks": [
              {
                "id": 34031,
                "question": "Which Python library is the industry standard for data manipulation and analysis?",
                "options": ["NumPy", "Pandas", "Matplotlib"],
                "correctAnswer": 1
              },
              {
                "id": 34032,
                "question": "In Pandas, what is a 2-dimensional labeled data structure called?",
                "options": ["Series", "Array", "DataFrame"],
                "correctAnswer": 2
              },
              {
                "id": 34033,
                "question": "Which library is used to perform high-performance mathematical operations on multi-dimensional arrays?",
                "options": ["Seaborn", "NumPy", "Requests"],
                "correctAnswer": 1
              },
              {
                "id": 34034,
                "question": "Which function in Pandas is used to read data from an Excel file?",
                "options": ["pd.open_excel()", "pd.read_excel()", "pd.get_excel()"],
                "correctAnswer": 1
              },
              {
                "id": 34035,
                "question": "What is the correct way to import the visualization library Matplotlib?",
                "options": ["import matplotlib.pyplot as plt", "import plots", "load matplotlib"],
                "correctAnswer": 0
              }
            ]
          }
        ]
      }
    ]
  }
};

export default mockCoursesData;