import React, { useEffect, useState } from "react";
import api from "../../api"; // same utility used by SkillsProgress
import { Loader, AlertCircle } from "lucide-react";

const CardProgressBar = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/tasks/skills-progress/");
        const data = response.data || [];

        // Map API → component format
        const formatted = data.map((item, index) => ({
          name: item.module_name,
          value: Number(item.average_score) || 0,
          completedWeeks: item.completed_weeks,
          // Keep gradient color mapping stable based on index
          color: getGradientColor(index),
        }));

        setSkills(formatted);
      } catch (err) {
        console.error("Error fetching skills progress:", err);
        setError("Failed to load skills progress.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Gradient colors for progress bars
  const gradients = [
    "bg-gradient-to-r from-blue-500 to-blue-700",
    "bg-gradient-to-r from-green-500 to-green-700",
    "bg-gradient-to-r from-purple-500 to-purple-700",
    "bg-gradient-to-r from-orange-500 to-orange-700",
    "bg-gradient-to-r from-pink-500 to-pink-700",
  ];

  const getGradientColor = (index) => gradients[index % gradients.length];

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Skills Progress</h2>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <Loader className="animate-spin w-6 h-6 text-blue-600" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center text-red-600 gap-2 py-4">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Skills Progress Bars */}
      {!loading && !error && (
        <div className="space-y-5">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="transition-transform duration-500"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">{skill.name}</span>
                <span className="font-semibold">{skill.value}%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transform transition-all duration-700 ease-out ${skill.color}`}
                  style={{
                    width: `${skill.value}%`,
                    animation: "growBar 0.8s ease-out",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animate bar width on mount */}
      <style>
        {`
        @keyframes growBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        `}
      </style>
    </div>
  );
};

export default CardProgressBar;
