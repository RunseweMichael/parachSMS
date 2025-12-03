import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Wallet,
  History,
  User,
  BookOpen,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import api from "../../api";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PaymentDashboard() {
  const [selectedMethod, setSelectedMethod] = useState("pay");
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verificationAttempts, setVerificationAttempts] = useState(0);

  const maxVerificationAttempts = 3;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Calculate minimum payable amount (40% of outstanding)
  const getMinimumAmount = () => {
    if (!balance?.amount_owed) return 0;
    return Math.ceil(balance.amount_owed * 0.4);
  };

  // Fetch user and balance
  const fetchUserData = useCallback(async () => {
    try {
      const [userRes, balanceRes] = await Promise.all([
        api.get("students/me/"),
        api.get("payments/get_balance/"),
      ]);
      setUser(userRes.data);
      setBalance(balanceRes.data);
    } catch (err) {
      toast.error("Failed to load profile");
      setErrorMsg("Unable to load your information. Please refresh.");
    }
  }, []);

  // Fetch transaction history
  const fetchTransactions = useCallback(async () => {
    try {
      const res = await api.get("payments/student-transactions/");
      setTransactions(res.data || []);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, fetchTransactions]);

  // Auto-verify payment when ?reference= is in URL
  useEffect(() => {
    const reference = searchParams.get("reference");

    if (!reference || verifying || verificationAttempts >= maxVerificationAttempts) {
      return;
    }

    const verifyPayment = async () => {
      setVerifying(true);
      setVerificationAttempts((prev) => prev + 1);

      try {
        const res = await api.get(`/payments/verify/${reference}/`);

        if (res.data.success) {
          toast.success("Payment verified successfully!", {
            description: `₦${res.data.amount_paid.toLocaleString()} received`,
            icon: "✅",
            duration: 6000,
          });

          // Refresh data
          await Promise.all([fetchUserData(), fetchTransactions()]);

          // Clean URL and go to dashboard
          navigate("/student/payment", { replace: true });
        } else {
          toast.error("Payment not confirmed", {
            description: res.data.message || "Please try again or contact support.",
          });
        }
      } catch (error) {
        console.error("Verification error:", error);

        const msg =
          error.code === "ERR_NETWORK"
            ? "No internet connection. Please check and try again."
            : error.response?.data?.message || "Verification failed.";

        toast.error("Verification Failed", {
          description: msg,
          duration: 8000,
        });

        setErrorMsg(msg);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [
    searchParams,
    navigate,
    fetchUserData,
    fetchTransactions,
    verifying,
    verificationAttempts,
  ]);

  // Handle payment initialization
  const handlePayNow = async () => {
    setErrorMsg("");
    const numAmount = Number(amount);
    const minAmount = getMinimumAmount();

    if (!numAmount || numAmount <= 0) {
      return setErrorMsg("Please enter a valid amount.");
    }

    if (numAmount < minAmount && balance?.amount_owed > 0) {
      return setErrorMsg(
        `Minimum payment required: ₦${minAmount.toLocaleString()} (40% of outstanding balance)`
      );
    }

    setLoading(true);
    try {
      const response = await api.post("payments/initialize/", {
        amount: numAmount,
        coupon_code: couponCode.trim() || undefined,
      });

      // Redirect to Paystack or Flutterwave gateway
      window.location.href = response.data.authorization_url;
    } catch (e) {
      const msg =
        e.code === "ERR_NETWORK"
          ? "Cannot reach server. Check your connection."
          : e.response?.data?.message || "Failed to start payment. Try again.";

      setErrorMsg(msg);
      toast.error("Payment Error", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-slate-800 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">

      {/* Header Tabs */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center mb-10"
        >
          <div className="w-full flex justify-center mt-6">
            <div className="relative bg-white border border-blue-200 rounded-2xl p-2 shadow-md flex gap-1">
              
              {/* Sliding highlight indicator */}
              <motion.div
                layout
                className="absolute top-2 bottom-2 rounded-xl bg-blue-600"
                initial={{ x: 0 }}
                animate={{
                  x: selectedMethod === "pay" ? 0 : "100%",
                  width: "48.5%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ zIndex: 0 }}
              />

              {[
                { key: "pay", label: "Make Payment", icon: Wallet },
                { key: "history", label: "Transaction History", icon: History },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedMethod(tab.key)}
                  className="relative z-10 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all w-[50%] justify-center"
                >
                  <motion.div
                    animate={{ 
                      color: selectedMethod === tab.key ? "#fff" : "#1d4ed8", 
                      scale: selectedMethod === tab.key ? 1.05 : 1 
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </motion.div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pay Tab */}
        {selectedMethod === "pay" && (
          <motion.div variants={container} initial="hidden" animate="show" className="grid lg:grid-cols-3 gap-8">
            {/* User & Balance Card */}
            <motion.div variants={item} className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl border border-blue-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-blue-600 text-white rounded-xl">
                    <User size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Welcome back</p>
                    <h3 className="text-2xl font-bold text-blue-900">
                      {user?.name || "Loading..."}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-lg">
                    <BookOpen className="text-blue-600" />
                    <span>{user?.course?.course_name || "..."}</span>
                  </div>

                  <div className="pt-6 border-t-2 border-dashed border-blue-200 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Fee</span>
                      <span className="font-bold text-xl">
                        ₦{balance?.course_price?.toLocaleString() || "0"}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Amount Paid</span>
                      <span className="font-bold text-xl">
                        ₦{balance?.amount_paid?.toLocaleString() || "0"}
                      </span>
                    </div>
                    <div className="flex justify-between text-orange-600">
                      <span>Outstanding</span>
                      <span className="font-bold text-2xl">
                        ₦{balance?.amount_owed?.toLocaleString() || "0"}
                      </span>
                    </div>
                  </div>

                  {balance?.amount_owed === 0 && (
                    <div className="mt-6 p-5 bg-green-50 border-2 border-green-300 rounded-2xl text-center">
                      <CheckCircle className="mx-auto mb-3 text-green-600" size={40} />
                      <p className="text-xl font-bold text-green-700">Fully Paid!</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div variants={item} className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-xl border border-blue-100">

                <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 text-blue-800">
                  <CreditCard size={36} />
                  Make a Payment
                </h2>

                {/* Verification in progress */}
                {verifying && (
                  <div className="mb-6 p-5 bg-blue-50 border border-blue-300 rounded-xl flex items-center gap-4 text-blue-800">
                    <Loader2 className="animate-spin" size={28} />
                    <div>
                      <p className="font-semibold">Verifying your payment...</p>
                      <p className="text-sm">Please wait while we confirm with the bank.</p>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {errorMsg && (
                  <div className="mb-6 p-5 bg-red-50 border border-red-300 rounded-xl flex items-start gap-4 text-red-700">
                    <AlertCircle size={28} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold">Error</p>
                      <p>{errorMsg}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-6 max-w-lg">

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Coupon Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. WELCOME50"
                      className="w-full px-5 py-4 border border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Amount to Pay (₦)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="50000"
                      className="w-full px-5 py-4 text-lg font-medium border border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
                    />
                    <p className="mt-2 text-sm text-slate-500">
                      {balance?.amount_owed > 0 &&
                        `Minimum: ₦${getMinimumAmount().toLocaleString()}`}
                    </p>
                  </div>

                  <button
                    onClick={handlePayNow}
                    disabled={loading || verifying || !amount}
                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xl rounded-xl shadow-lg transform transition hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={28} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={28} />
                        Pay Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Transaction History Tab */}
        {selectedMethod === "history" && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-blue-100 overflow-hidden"
          >
            <div className="p-8 border-b-2 border-blue-200">
              <h2 className="text-3xl font-bold text-blue-900">Transaction History</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50 text-blue-800">
                  <tr>
                    <th className="px-8 py-5 text-left font-semibold">Reference</th>
                    <th className="px-8 py-5 text-left font-semibold">Amount</th>
                    <th className="px-8 py-5 text-left font-semibold">Status</th>
                    <th className="px-8 py-5 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-16 text-slate-500 text-lg">
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <motion.tr
                        key={tx.id}
                        variants={item}
                        className="border-b border-slate-200 hover:bg-blue-50 transition"
                      >
                        <td className="px-8 py-5 font-mono text-sm text-slate-600">
                          {tx.reference}
                        </td>
                        <td className="px-8 py-5 font-bold text-blue-900">
                          ₦{tx.amount.toLocaleString()}
                        </td>
                        <td className="px-8 py-5">
                          <span
                            className={`px-full px-4 py-2 rounded-full text-xs font-bold ${
                              tx.status === "success"
                                ? "bg-green-100 text-green-800"
                                : tx.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-slate-600">
                          {new Date(tx.created_at).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}