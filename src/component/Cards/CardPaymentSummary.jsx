import React from "react";
import { motion } from "framer-motion";

export default function CardPaymentSummary({ student, transactions }) {
  const totalPaid = transactions
    .filter((tx) => tx.status === "success")
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 backdrop-blur-xl border border-white/20 shadow-lg p-6 rounded-2xl mb-6"
    >
      <h2 className="text-xl font-bold text-indigo-900 mb-3">
        Payment Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700">
        <div className="p-4 bg-white/50 rounded-xl shadow">
          <p className="text-sm">Student</p>
          <p className="text-lg font-semibold">{student?.name}</p>
        </div>

        <div className="p-4 bg-white/50 rounded-xl shadow">
          <p className="text-sm">Course</p>
          <p className="text-lg font-semibold">
            {student?.course?.course_name || "N/A"}
          </p>
        </div>

        <div className="p-4 bg-white/50 rounded-xl shadow">
          <p className="text-sm">Total Paid</p>
          <p className="text-xl font-bold text-green-600">
            ₦{totalPaid.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
