import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { CreditCard, Wallet, History, User, BookOpen, Loader2, CheckCircle, Download, AlertTriangle } from "lucide-react";
import api from "../../api";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentDashboard() {
  const [selectedMethod, setSelectedMethod] = useState("pay");
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [verifying, setVerifying] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    try {
      const [resUser, resBalance] = await Promise.all([
        api.get("students/me/"),
        api.get("payments/get_balance/"),
      ]);
      setUser(resUser.data);
      setBalance(resBalance.data);
    } catch (err) {
      setErrorMsg("Failed to load your information.");
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await api.get("payments/student-transactions/");
      setTransactions(res.data);
    } catch (e) {
      console.error("Transaction fetch failed", e);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
    fetchTransactions();
  }, [fetchUserData, fetchTransactions]);

  
  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference || sessionStorage.getItem(`verified_${reference}`)) return;

    setVerifying(true);

    const verifyPayment = async (attempt = 1) => {
      try {
        const res = await api.get(`payments/verify/${reference}/`);
        if (res.data.success) {
          sessionStorage.setItem(`verified_${reference}`, "true");
          alert(`✅ Payment of ₦${res.data.amount_paid.toLocaleString()} verified!`);

          await fetchUserData();
          await fetchTransactions();
          navigate("/student/payment", { replace: true });
        } else if (attempt < 5) {
          setTimeout(() => verifyPayment(attempt + 1), 2000);
        } else {
          // Silently stop and refresh data - payment may have succeeded
          setVerifying(false);
          await fetchUserData();
          await fetchTransactions();
          navigate("/student/payment", { replace: true });
        }
      } catch (err) {
        console.error("Verification error:", err);
        if (attempt < 5) {
          setTimeout(() => verifyPayment(attempt + 1), 2000);
        } else {
          // Silently stop and refresh data - payment may have succeeded
          setVerifying(false);
          await fetchUserData();
          await fetchTransactions();
          navigate("/student/payment", { replace: true });
        }
      }
    };

    verifyPayment();
  }, [searchParams, fetchUserData, fetchTransactions, navigate]);

  const handlePayNow = async () => {
    setErrorMsg("");
    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      return setErrorMsg("Please enter a valid payment amount.");
    }

    if (balance?.amount_paid === 0 && parsedAmount < balance.min_payment_required) {
      return setErrorMsg(`Your first payment must be at least ₦${balance.min_payment_required.toLocaleString()}.`);
    }

    setLoading(true);
    try {
      const response = await api.post("payments/initialize/", { amount: parsedAmount, coupon_code: couponCode || undefined });

      if (response.data.discount_applied > 0) {
        setDiscount(response.data.discount_applied);
        alert(`✅ Coupon applied! You got ₦${response.data.discount_applied.toLocaleString()} off.`);
      }

      window.location.href = response.data.authorization_url;

    } catch (e) {
      setErrorMsg(e.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = (tx) => {
    if (tx.status !== "success") return;
    const url = `${api.defaults.baseURL}payments/download/${tx.reference}/`;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = `receipt_${tx.reference}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="min-h-screen bg-white text-slate-800 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header Tabs */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-center mb-10">
          <div className="w-full flex justify-center mt-6">
            <div className="relative bg-white border border-blue-200 rounded-2xl p-2 shadow-md flex gap-1">
              <motion.div layout className="absolute top-2 bottom-2 rounded-xl bg-blue-600"
                initial={{ x: 0 }}
                animate={{ x: selectedMethod === "pay" ? 0 : "100%", width: "48.5%" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ zIndex: 0 }}
              />
              {[{ key: "pay", label: "Make Payment", icon: Wallet }, { key: "history", label: "Transaction History", icon: History }].map((tab) => (
                <button key={tab.key} onClick={() => setSelectedMethod(tab.key)}
                  className="relative z-10 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all w-[50%] justify-center">
                  <motion.div animate={{ color: selectedMethod === tab.key ? "#fff" : "#1d4ed8", scale: selectedMethod === tab.key ? 1.05 : 1 }}
                    transition={{ duration: 0.2 }} className="flex items-center gap-2">
                    <tab.icon size={18} /> {tab.label}
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
              <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-blue-600 text-white rounded-xl"><User size={26} /></div>
                  <div>
                    <p className="text-sm text-slate-500">Welcome back</p>
                    <h3 className="text-xl font-bold text-blue-800">{user?.name || "..."}</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen size={20} className="text-blue-600" />
                    <span className="text-lg">{user?.course?.course_name || "..."}</span>
                  </div>

                  <div className="pt-6 space-y-3 border-t border-slate-200">
                    <div className="flex justify-between"><span className="text-slate-600">Total Fee</span><span className="font-bold text-lg text-blue-900">₦{balance?.course_price?.toLocaleString() || "0"}</span></div>
                    <div className="flex justify-between text-green-600"><span>Paid</span><span className="font-bold">₦{balance?.amount_paid?.toLocaleString() || "0"}</span></div>
                    <div className="flex justify-between text-orange-600"><span>Outstanding</span><span className="font-bold text-xl">₦{balance?.amount_owed?.toLocaleString() || "0"}</span></div>
                  </div>

                  {balance?.amount_owed === 0 && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-400 rounded-xl text-center">
                      <CheckCircle className="mx-auto mb-2 text-green-600" size={30} />
                      <p className="font-semibold text-green-700">Fully Paid 🎉</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div variants={item} className="lg:col-span-2">
              <div className="bg-white border border-blue-100 rounded-2xl p-8 shadow-sm">

                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-blue-800"><CreditCard size={30} /> Make a Payment</h2>

                {verifying && (
                  <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-xl flex items-center gap-3 text-blue-700">
                    <Loader2 className="animate-spin" /> Verifying your payment...
                  </div>
                )}

                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700">{errorMsg}</div>
                )}

                {balance && (
                  <>
                    {balance.amount_paid === 0 ? (
                      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-400 rounded-xl flex items-start gap-2 text-yellow-700">
                        <AlertTriangle size={18} /> Your first payment must be at least ₦{balance.min_payment_required.toLocaleString()}.
                      </div>
                    ) : balance.amount_owed > 0 ? (
                      <div className="mb-4 p-4 bg-green-50 border border-green-400 rounded-xl flex items-start gap-2 text-green-700">
                        <AlertTriangle size={18} /> You can pay any amount towards your remaining balance of ₦{balance.amount_owed.toLocaleString()}.
                      </div>
                    ) : null}
                  </>
                )}

                <div className="space-y-5">
                  {/* Coupon Input */}
                  <div>
                    <label className="text-sm text-slate-600">Coupon Code (Optional)</label>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={user?.has_used_coupon}
                      className="w-full mt-1 px-4 py-3 border border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    {user?.has_used_coupon && (
                      <p className="text-green-600 text-sm mt-1">
                        ✔ You have already used a coupon for this account.
                      </p>
                    )}
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="text-sm text-slate-600">Amount to Pay (₦)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full mt-1 px-4 py-3 border border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                    {balance?.amount_paid === 0 && (
                      <div className="text-sm text-yellow-700 mt-1">
                        Minimum first payment: ₦{balance.min_payment_required.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={handlePayNow}
                    disabled={loading || !amount}
                    className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-lg rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={24} /> : <><CreditCard size={22} /> Pay Now</>}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* History Tab */}
        {selectedMethod === "history" && (
          <motion.div variants={container} initial="hidden" animate="show" className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200"><h2 className="text-2xl font-bold text-blue-800">Transaction History</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-blue-50 border-b border-blue-100">
                    <th className="px-6 py-4">Reference</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-12 text-slate-500">No transactions yet.</td></tr>
                  ) : (
                    transactions.map((tx) => (
                      <motion.tr key={tx.id} variants={item} className="border-b border-slate-200 hover:bg-blue-50 transition">
                        <td className="px-6 py-4 font-mono text-sm">{tx.reference}</td>
                        <td className="px-6 py-4 font-bold text-blue-900">₦{tx.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${tx.status === "success" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{new Date(tx.created_at).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          {tx.status === "success" ? (
                            <button onClick={() => downloadReceipt(tx)} className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
                              <Download size={14} /> Download
                            </button>
                          ) : <span className="text-gray-400">—</span>}
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