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
  };

  const paid = parseFloat(student?.amount_paid || 0);
  const owed = parseFloat(student?.amount_owed || 0);

  // -----------------------------
  // Format due date
  // -----------------------------
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    date.setHours(0, 0, 0, 0);
    
    // Calculate days remaining
    const timeDiff = date.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    return { formattedDate, daysRemaining };
  };

  // Use next_due_date from the student object
  const dueDate = student?.next_due_date ? formatDueDate(student.next_due_date) : null;

  return (
    <>
      <div className="relative bg-linear-to-b from-blue-600 to-indigo-700 md:pt-32 pb-32 pt-12 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>

        <div className="px-4 md:px-10 mx-auto w-full relative z-10">

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
    statTitle={
      <div className="flex gap-7 mt-1">
        <div className=" text-bold text-white">
          <span className="text-emerald-500 font-bold">Paid:</span> ₦{paid.toLocaleString()}
        </div>
        <div className="text-bold text-white">
          <span className="text-red-500 font-semibold">Owed:</span> ₦{owed.toLocaleString()}
        </div>
      </div>
    }
    statPercent={
      owed > paid
        ? `₦${(owed - paid).toLocaleString()} Due`
        : "Paid in Full"
    }
    statPercentColor={owed > paid ? "text-red-400" : "text-emerald-400"}
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

            {/* NEXT DUE DATE */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
              <CardStats
                statSubtitle="NEXT DUE DATE"
                statTitle={dueDate?.formattedDate || "Not set"}
                statPercent={
                  dueDate?.daysRemaining !== undefined && dueDate?.daysRemaining !== null
                    ? dueDate.daysRemaining > 0 
                      ? `${dueDate.daysRemaining} days left`
                      : dueDate.daysRemaining === 0
                      ? "Due today"
                      : `${Math.abs(dueDate.daysRemaining)} days overdue`
                    : ""
                }
                statPercentColor={
                  dueDate?.daysRemaining !== undefined && dueDate?.daysRemaining !== null
                    ? dueDate.daysRemaining > 7
                      ? "text-emerald-400"
                      : dueDate.daysRemaining > 0
                      ? "text-yellow-400"
                      : "text-red-400"
                    : "text-gray-400"
                }
                statIconColor="bg-gradient-to-br from-pink-500 to-rose-500"
                hoverEffect
              />
            </div>

             {/* MODULE COUNT - CLICKABLE */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
              <CardStats
                statSubtitle="COURSE MODULES"
                statTitle={`Access To Course Modules`}      
                statIconColor="bg-gradient-to-br from-cyan-500 to-blue-600"
                hoverEffect
                link={student?.course?.resource_link}
                clickable={true}
              />
            </div>


          </div>
        </div>
      </div>
    </>
  );
}