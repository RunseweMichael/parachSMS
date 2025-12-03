// src/pages/student/Dashboard.jsx
import React from "react";
import CardCourseChoice from "../../component/Cards/CardCourseChoice.jsx";
import CardSchedule from "../../component/Cards/CardSchedule.jsx";
import CardProgressChart from "../../component/Cards/CardProgressBar.jsx";
import CardSocialFollow from "../../component/Cards/CardSocialFollow.jsx";
import PaymentWarningBanner from "../../component/PaymentWarningBanner.jsx";
import usePaymentStatus from "../../hooks/usePaymentStatus";

export default function Dashboard() {
  const { isLocked, daysOverdue, amountDue, loading } = usePaymentStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 px-4 md:px-10 mx-auto w-full max-w-7xl py-8">
          
          {/* Payment Warning Banner */}
          {isLocked && (
            <PaymentWarningBanner daysOverdue={daysOverdue} amountDue={amountDue} />
          )}

          {/* Row 1: Course Choice + Schedule */}
          <div className="flex flex-wrap -mx-4">
            <div className="w-full xl:w-8/12 px-4 mb-8">
              <CardCourseChoice />
            </div>
            <div className="w-full xl:w-4/12 px-4 mb-8">
              <CardSchedule />
            </div>
          </div>

          {/* Schedule Section */}
          <div className="w-full xl:w-4/12 px-4 mb-8">
            <CardSchedule />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap -mx-4 mt-4">
          <div className="w-full xl:w-8/12 px-4 mb-8">
            <CardProgressChart />
          </div>
          <div className="w-full xl:w-4/12 px-4 mb-8">
            <CardSocialFollow />
          </div>
        </div>
      </div>
    </>
  );
}
