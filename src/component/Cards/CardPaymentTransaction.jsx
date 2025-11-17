import React from "react";
import { motion } from "framer-motion";
import { Download, CheckCircle, XCircle } from "lucide-react";
import { jsPDF } from "jspdf";

export default function CardPaymentTransactions({ student, transactions }) {
  const downloadReceipt = (tx) => {
    const doc = new jsPDF();
    const y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Payment Receipt", 105, y, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Student Name: ${student?.name}`, 20, y + 20);
    doc.text(`Course: ${student?.course?.course_name}`, 20, y + 30);
    doc.text(`Reference: ${tx.reference}`, 20, y + 40);
    doc.text(`Amount: ₦${tx.amount}`, 20, y + 50);
    doc.text(`Status: ${tx.status}`, 20, y + 60);

    doc.save(`receipt_${tx.reference}.pdf`);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-indigo-900 mb-4">
        Recent Transactions
      </h3>

      <div className="space-y-6">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className="bg-white/40 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-2">
              {tx.status === "success" ? (
                <span className="flex items-center gap-2 text-green-600 font-semibold">
                  <CheckCircle size={18} /> Success
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-600 font-semibold">
                  <XCircle size={18} /> Failed
                </span>
              )}

              <span className="text-xl font-bold text-indigo-900">
                ₦{tx.amount.toLocaleString()}
              </span>
            </div>

            <p className="text-slate-700">
              <span className="font-semibold">Ref:</span> {tx.reference}
            </p>

            <p className="text-slate-700">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(tx.created_at).toLocaleString("en-NG", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>

            <button
              onClick={() => downloadReceipt(tx)}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700"
            >
              <Download size={18} /> Download Receipt
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
