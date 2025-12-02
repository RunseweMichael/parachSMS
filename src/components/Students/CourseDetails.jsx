// src/pages/Courses/CourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ⬅ added navigate
import { BookOpen, Layers, PlayCircle, ArrowLeft } from "lucide-react"; // ⬅ added icon
import api from "../../api";

const CourseDetails = ({ id }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ⬅ for back button

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`courses/courses/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setCourse(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-slate-600">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
        <p className="mt-3 text-sm">Loading course details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-red-500">
        <p>{error}</p>
      </div>
    );

  if (!course) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">

      {/* Back Button */}
      <button
        onClick={() => navigate(-0)} 
        className="flex items-center gap-2 text-blue-700 hover:text-blue-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <h2 className="text-3xl font-bold text-blue-900 flex items-center gap-2 mb-4">
        <BookOpen className="w-7 h-7 text-blue-700" /> {course.course_name}
      </h2>

      <p className="text-lg text-slate-700 mb-4 font-medium">
        💰 Price:{" "}
        <span className="text-blue-700 font-semibold">
          ₦{Number(course.price).toLocaleString()}
        </span>
      </p>

      {/* MODULES */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-700" /> Modules
        </h3>

        {course.modules?.length ? (
          course.modules.map((module) => (
            <div
              key={module.id}
              className="bg-slate-50 p-5 rounded-xl mb-5 shadow-sm border border-slate-200"
            >
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                {module.title}
              </h4>

              <ul className="space-y-3">
                {module.lessons?.length ? (
                  module.lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition flex items-start gap-3"
                    >
                      <PlayCircle className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <strong className="text-slate-900 text-lg">
                          {lesson.title}
                        </strong>
                        {lesson.description && (
                          <p className="text-slate-600 text-sm mt-1">
                            {lesson.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-slate-500 italic">
                    No lessons available in this module.
                  </p>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-slate-500 italic">
            No modules found for this course.
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
