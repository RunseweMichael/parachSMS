import React, { useEffect, useState } from "react";

export default function CardProgressBar() {
  const skills = [
    { name: "HTML/CSS", value: 90, color: "from-blue-500 to-cyan-500" },
    { name: "JavaScript", value: 85, color: "from-yellow-400 to-amber-500" },
    { name: "React", value: 80, color: "from-cyan-400 to-blue-600" },
    { name: "Node.js", value: 70, color: "from-green-400 to-emerald-600" },
    { name: "Git", value: 95, color: "from-orange-400 to-red-500" },
    { name: "APIs", value: 75, color: "from-purple-400 to-pink-500" },
  ];

  const overall = (skills.reduce((acc, s) => acc + s.value, 0) / skills.length).toFixed(1);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg font-bold text-gray-800">Skill Progress</h6>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white shadow-md">
            <i className="fas fa-chart-bar text-sm"></i>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Overall: <span className="font-bold text-blue-600">{overall}%</span>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {skills.map((skill, index) => (
          <ProgressItem key={index} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}

const ProgressItem = ({ skill, index }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(skill.value);
    }, 100 + index * 150); // Staggered animation
    return () => clearTimeout(timer);
  }, [skill.value, index]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{skill.name}</span>
        <span className="font-semibold text-gray-900">{skill.value}%</span>
      </div>
      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 bg-white/30 animate-pulse" />
      </div>
    </div>
  );
};