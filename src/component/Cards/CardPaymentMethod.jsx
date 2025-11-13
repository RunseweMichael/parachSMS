import React from "react";

export default function CardPaymentMethods({ selectedMethod, setSelectedMethod }) {
  const methods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: "fas fa-credit-card",
      color: "from-blue-500 to-cyan-500",
      last4: "4242",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "fab fa-paypal",
      color: "from-blue-600 to-indigo-600",
      email: "john@domain.com",
    },
    {
      id: "crypto",
      name: "Crypto Wallet",
      icon: "fab fa-bitcoin",
      color: "from-orange-500 to-yellow-500",
      wallet: "0x71C7...f1d2",
    },
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg font-bold text-gray-800">Payment Methods</h6>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
            <i className="fas fa-shield-alt text-sm"></i>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        {/* Payment Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {methods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                selectedMethod === method.id
                  ? `bg-gradient-to-br ${method.color} text-white border-transparent shadow-lg`
                  : "bg-white/60 border-gray-200 hover:border-blue-400 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      selectedMethod === method.id ? "bg-white/30" : "bg-gray-100"
                    } flex items-center justify-center`}
                  >
                    <i
                      className={`${method.icon} text-lg ${
                        selectedMethod === method.id ? "text-white" : "text-gray-600"
                      }`}
                    ></i>
                  </div>
                  <div>
                    <p
                      className={`font-medium text-sm ${
                        selectedMethod === method.id ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {method.name}
                    </p>
                    <p className="text-xs opacity-80">
                      {method.last4 && `•••• ${method.last4}`}
                      {method.email && method.email}
                      {method.wallet && method.wallet}
                    </p>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <i className="fas fa-check-circle text-white"></i>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Pay Action */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white">
          <div>
            <p className="text-sm font-medium">Next Payment Due</p>
            <p className="text-xl font-bold">$299.00</p>
            <p className="text-xs opacity-90">Full-Stack Web Dev – Nov 15, 2025</p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-xl hover:bg-gray-100 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            Pay Now
          </button>
        </div>

        <p className="mt-4 text-xs text-center text-gray-500">
          Secured by <span className="font-semibold">Stripe</span> • 256-bit SSL
        </p>
      </div>
    </div>
  );
}