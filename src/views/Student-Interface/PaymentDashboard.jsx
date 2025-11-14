import React, { useState } from "react";
import CardPaymentMethods from "../../component/Cards/CardPaymentMethod.jsx";
import CardRecentTransactions from "../../component/Cards/CardRecentTransactions.jsx";

export default function PaymentDashboard() {
  const [selectedMethod, setSelectedMethod] = useState("card");

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10 px-4 md:px-10 mx-auto w-full max-w-7xl py-8">
          {/* Payment Methods + Quick Pay */}
          <div className="flex flex-wrap -mx-4 mb-8">
            <div className="w-full px-4">
              <CardPaymentMethods
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <CardRecentTransactions />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}