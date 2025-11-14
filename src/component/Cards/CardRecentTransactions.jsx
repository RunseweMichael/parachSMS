import React from "react";

export default function CardRecentTransactions() {
  const transactions = [
    {
      id: "TXN-2025-108",
      course: "Full-Stack Web Dev",
      amount: "$299.00",
      date: "Nov 1, 2025",
      status: "completed",
      method: "card",
    },
    {
      id: "TXN-2025-087",
      course: "UI/UX Design Pro",
      amount: "$199.00",
      date: "Oct 15, 2025",
      status: "completed",
      method: "paypal",
    },
    {
      id: "TXN-2025-056",
      course: "Data Science & AI",
      amount: "$399.00",
      date: "Oct 1, 2025",
      status: "refunded",
      method: "crypto",
    },
    {
      id: "TXN-2025-023",
      course: "DevOps & Cloud",
      amount: "$249.00",
      date: "Sep 20, 2025",
      status: "completed",
      method: "card",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "card":
        return "fas fa-credit-card";
      case "paypal":
        return "fab fa-paypal";
      case "crypto":
        return "fab fa-bitcoin";
      default:
        return "fas fa-money-bill";
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg font-bold text-gray-800">Recent Transactions</h6>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-md">
            <i className="fas fa-receipt text-sm"></i>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b border-gray-200">
              <th className="pb-3 font-medium">Transaction ID</th>
              <th className="pb-3 font-medium">Course</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Method</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-white/50 transition">
                <td className="py-4 font-medium text-gray-800">{tx.id}</td>
                <td className="py-4 text-gray-700">{tx.course}</td>
                <td className="py-4 font-semibold text-gray-900">{tx.amount}</td>
                <td className="py-4 text-gray-600">{tx.date}</td>
                <td className="py-4">
                  <i className={`${getMethodIcon(tx.method)} text-gray-600`}></i>
                </td>
                <td className="py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      tx.status
                    )}`}
                  >
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 pb-5">
        <button className="w-full py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
          View All Transactions
        </button>
      </div>
    </div>
  );
}