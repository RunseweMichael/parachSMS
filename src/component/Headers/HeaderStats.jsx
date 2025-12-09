import React, { useEffect, useState } from "react";
import CardStats from "../Cards/CardStats.jsx";
import api from "../../api"; 

export default function HeaderStats() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
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

  const paid = parseFloat(student?.amount_paid || 0);
  const owed = parseFloat(student?.amount_owed || 0);

  // -----------------------------
  // Format due date logic
  // -----------------------------
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    date.setHours(0, 0, 0, 0);
    
    const timeDiff = date.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    return { formattedDate, daysRemaining };
  };

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
            
            {/* 1. COURSE NAME */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
              <CardStats
                statSubtitle="CURRENT COURSE"
                statTitle={student?.course?.course_name || "No course assigned"}
                statPercent="Enrolled"
                statPercentColor="text-blue-400"
                statIconColor="bg-gradient-to-br from-blue-500 to-indigo-600"
                hoverEffect
              />
            </div>

            {/* 2. AMOUNT PAID */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
              <CardStats
                statSubtitle="AMOUNT PAID"
                statTitle={`₦${paid.toLocaleString()}`}
                statPercent="Confirmed"
                statPercentColor="text-emerald-500"
                statIconColor="bg-gradient-to-br from-emerald-500 to-teal-500"
                hoverEffect
              />
            </div>

            {/* 3. AMOUNT DUE (OWED) */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
              <CardStats
                statSubtitle="BALANCE DUE"
                statTitle={`₦${owed.toLocaleString()}`}
                statPercent={owed > 0 ? "Outstanding" : "Cleared"}
                statPercentColor={owed > 0 ? "text-red-500" : "text-emerald-500"}
                statIconColor="bg-gradient-to-br from-red-500 to-orange-500"
                hoverEffect
              />
            </div>

            {/* 4. NEXT DUE DATE */}
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4 mb-8">
              <CardStats
                statSubtitle="NEXT PAYMENT"
                statTitle={dueDate?.formattedDate || "N/A"}
                statPercent={
                  dueDate?.daysRemaining !== undefined && dueDate?.daysRemaining !== null
                    ? dueDate.daysRemaining > 0 
                      ? `${dueDate.daysRemaining} days left`
                      : dueDate.daysRemaining === 0
                      ? "Due today"
                      : `${Math.abs(dueDate.daysRemaining)} days overdue`
                    : "No date set"
                }
                statPercentColor={
                  dueDate?.daysRemaining !== undefined && dueDate?.daysRemaining !== null
                    ? dueDate.daysRemaining > 7
                      ? "text-emerald-400" // Green if safe
                      : dueDate.daysRemaining > 0
                      ? "text-yellow-400" // Yellow if approaching
                      : "text-red-400"    // Red if today or overdue
                    : "text-gray-400"
                }
                statIconColor="bg-gradient-to-br from-pink-500 to-rose-500"
                hoverEffect
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}