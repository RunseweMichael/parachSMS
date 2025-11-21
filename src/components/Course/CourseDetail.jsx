import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BookOpen, Layers, PlayCircle, Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import api from "../../api";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`courses/courses/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setCourse(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load course details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const deleteModule = async (moduleId) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`courses/modules/${moduleId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchCourse();
    } catch (err) {
      console.error(err);
      alert("Failed to delete module.");
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`courses/lessons/${lessonId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchCourse();
    } catch (err) {
      console.error(err);
      alert("Failed to delete lesson.");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-slate-600">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
        <p className="mt-3 text-sm">Loading course details...</p>
      </div>
    );

  if (error) return <p className="text-center text-red-500 font-semibold mt-10">{error}</p>;
  if (!course) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-700" /> {course.course_name}
        </h2>
      </div>

      {/* Modules Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-blue-800 flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-700" /> Modules
          </h3>
          <Link
            to={`/admin/modules/add?course=${course.id}`}
            className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700"
          >
            <Plus className="w-4 h-4" /> Add Module
          </Link>
        </div>

        {course.modules?.length ? (
          course.modules.map((module) => (
            <div key={module.id} className="bg-slate-50 p-5 rounded-xl shadow-sm border border-slate-200 mb-5">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xl font-semibold text-slate-900 flex items-center gap-2">📗 {module.title}</h4>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/modules/edit/${module.id}`}
                    className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-700"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </Link>
                  <button
                    onClick={() => deleteModule(module.id)}
                    className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-md text-xs hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>

              {/* Lessons */}
              <ul className="space-y-3">
                {module.lessons?.length ? (
                  module.lessons.map((lesson) => (
                    <li key={lesson.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <PlayCircle className="w-6 h-6 text-blue-600" />
                        <span className="text-lg font-medium text-slate-800">{lesson.title}</span>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/admin/lessons/edit/${lesson.id}`}
                          className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-600"
                        >
                          <Pencil className="w-4 h-4" /> Edit
                        </Link>
                        <button
                          onClick={() => deleteLesson(lesson.id)}
                          className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-md text-xs hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-slate-500 italic">No lessons available.</p>
                )}
              </ul>

              {/* Add Lesson */}
              <div className="mt-4">
                <Link
                  to={`/admin/lessons/add?module=${module.id}`}
                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700"
                >
                  <Plus className="w-4 h-4" /> Add Lesson
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-500 italic">No modules found for this course.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
