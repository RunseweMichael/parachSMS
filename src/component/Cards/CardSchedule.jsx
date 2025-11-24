import React, { useState, useEffect } from "react";

export default function CardSchedule() {
  const defaultDays = [
    { day: "Mon", sessions: 3, color: "bg-blue-500" },
    { day: "Tue", sessions: 3, color: "bg-indigo-500" },
    { day: "Wed", sessions: 3, color: "bg-purple-500" },
    { day: "Thu", sessions: 2, color: "bg-pink-500" },
    { day: "Fri", sessions: 2, color: "bg-rose-500" },
    { day: "Sat", sessions: 0, color: "bg-gray-300" },
    { day: "Sun", sessions: 0, color: "bg-gray-300" },
  ];

  const [days, setDays] = useState(defaultDays);
  const [editingDay, setEditingDay] = useState(null);
  const [newSessions, setNewSessions] = useState(0);

  // Load saved schedules
  useEffect(() => {
    const saved = localStorage.getItem("user_schedule");
    if (saved) {
      setDays(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  const saveSchedule = (updatedDays) => {
    localStorage.setItem("user_schedule", JSON.stringify(updatedDays));
  };

  // Open modal
  const openEdit = (dayObj) => {
    setEditingDay(dayObj);
    setNewSessions(dayObj.sessions);
  };

  // Save changes
  const applyEdit = () => {
    const updated = days.map((d) =>
      d.day === editingDay.day ? { ...d, sessions: newSessions } : d
    );

    setDays(updated);
    saveSchedule(updated);
    setEditingDay(null);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h6 className="text-lg font-bold text-gray-800">Weekly Schedule</h6>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-md">
              <i className="fas fa-calendar-alt text-sm"></i>
            </div>
          </div>
          <p className="text-xs text-gray-600">Tap any day to edit</p>
        </div>

        <div className="px-6 pb-6">
          <div className="space-y-2">
            {days.map((d, i) => (
              <div
                key={i}
                onClick={() => openEdit(d)}
                className="flex items-center justify-between cursor-pointer active:scale-[0.98] transition"
              >
                <span className="text-sm font-medium text-gray-700 w-12">{d.day}</span>

                <div className="flex space-x-1 flex-1 mx-2">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className={`h-8 flex-1 rounded-lg transition-all ${
                        j < d.sessions ? d.color + " shadow-sm" : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>

                <span className="text-xs font-semibold text-gray-600 w-10 text-right">
                  {d.sessions > 0 ? `${d.sessions}h` : "—"}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center space-x-3 text-xs">
            <span className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded mr-1"></div> Live Class</span>
            <span className="flex items-center"><div className="w-3 h-3 bg-gray-200 rounded mr-1"></div> Off</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {editingDay && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-72 shadow-xl animate-[fadeIn_0.2s_ease]">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Edit {editingDay.day}
            </h3>

            <label className="text-sm text-gray-600">Number of Sessions:</label>
            <select
              value={newSessions}
              onChange={(e) => setNewSessions(Number(e.target.value))}
              className="w-full mt-2 p-2 border rounded-lg"
            >
              <option value={0}>0 (Off)</option>
              <option value={1}>1 hour</option>
              <option value={2}>2 hours</option>
              <option value={3}>3 hours</option>
            </select>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEditingDay(null)}
                className="px-4 py-2 text-sm bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={applyEdit}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
