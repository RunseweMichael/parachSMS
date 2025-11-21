import React, { useEffect, useState } from "react";
import CardStats from "../Cards/CardStats.jsx";
import api from "../../api"; // <-- axios instance

export default function HeaderStats() {
  const [student, setStudent] = useState(null);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchStudent();
    fetchModules();
  }, []);

  // -----------------------------
  // Fetch logged-in student info
  // -----------------------------
  const fetchStudent = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      const res = await api.get(`/students/users/${userId}/`);
     

      setStudent(res.data);
    } catch (err) {
      console.error("Failed to load student:", err);
    }
  };

  // -----------------------------
  // Fetch course modules
  // -----------------------------
  const fetchModules = async () => {
    try {
      const res = await api.get("/courses/modules/");
      setModules(res.data || []);
    } catch (err) {
      console.error("Failed to load modules:", err);
      setModules([]);
    }
  ;
    
  };

  const paid = parseFloat(student?.amount_paid || 0);
  const owed = parseFloat(student?.amount_owed || 0);

  return (
    <>
      <div className="relative bg-linear-to-b from-blue-600 to-indigo-700 md:pt-32 pb-32 pt-12 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>

        <div className="px-4 md:px-10 mx-auto w-full relative z-10">

          {/* --------------------------------------------------------
              👇 NEW: Welcome User Block
          --------------------------------------------------------- */}
          <div className="mb-10">
            <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-sm">
              Welcome {student ? ` ${student.name}` : ""}! 👋
            </h1>
          
          </div>

          <div className="flex flex-wrap -mx-4">
            
            {/* PAYMENT STATUS */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
              <CardStats
                statSubtitle="PAYMENT STATUS"
                statTitle={`₦${paid.toLocaleString()} / ₦${owed.toLocaleString()}`}
                statPercent={
                  owed > paid
                    ? `${(owed - paid).toLocaleString()} Due`
                    : "Paid in Full"
                }
                statPercentColor="text-emerald-400"
                statIconColor="bg-gradient-to-br from-red-500 to-pink-500"
                hoverEffect
              />
            </div>

            {/* COURSE NAME */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
              <CardStats
                statSubtitle="COURSE"
                statTitle={student?.course?.course_name || "No course"}
                statPercent=""
                statPercentColor="text-red-400"
                statIconColor="bg-gradient-to-br from-orange-400 to-yellow-500"
                hoverEffect
              />
            </div>

            {/* SALES */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
              <CardStats
                statSubtitle=""
                statTitle="-"
                statPercent=""
                statIconName="fas fa-users"
                statIconColor="bg-gradient-to-br from-pink-500 to-rose-500"
                hoverEffect
              />
            </div>

            {/* MODULE COUNT */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
              <CardStats
                statSubtitle="COURSE MODULES"
                statTitle={`${modules.length} Modules`}      
                statIconColor="bg-gradient-to-br from-cyan-500 to-blue-600"
                hoverEffect
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
