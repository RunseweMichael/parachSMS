import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { CreditCard, User, Book, Loader2 } from "lucide-react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

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

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Token ${token}` };

  /** -------------------------------
   * Fetch User + Balance
   --------------------------------*/
  const fetchUserData = useCallback(async () => {
    try {
      const [resUser, resBalance] = await Promise.all([
        axios.get(`${API_BASE}/students/me/`, { headers }),
        axios.get(`${API_BASE}/payments/get_balance/`, { headers }),
      ]);

      setUser(resUser.data);
      setBalance(resBalance.data);
    } catch (err) {
      setErrorMsg("Failed to load user information.");
    }
  }, [API_BASE]);

  /** -------------------------------
   * Fetch Transactions
   --------------------------------*/
  const fetchTransactions = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/payments/student-transactions/`, { headers });
      setTransactions(res.data);
    } catch (e) {
      console.error("Transaction fetch failed", e);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchUserData();
    fetchTransactions();
  }, [fetchUserData, fetchTransactions]);

  /** -------------------------------
   * Verify Paystack Redirect
   --------------------------------*/
  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference) return;

    setVerifying(true);

    axios
      .get(`${API_BASE}/payments/verify/${reference}/`, { headers })
      .then((res) => {
        if (res.data.success) {
          alert(`Payment of ₦${res.data.amount_paid} verified successfully!`);
          fetchUserData();
          fetchTransactions();
          navigate("/dashboard", { replace: true });
        }
      })
      .catch(() => setErrorMsg("Payment verification failed."))
      .finally(() => setVerifying(false));
  }, []);

  /** -------------------------------
   * Initialize Payment
   --------------------------------*/
  const handlePayNow = async () => {
    setErrorMsg("");

    if (!amount || Number(amount) <= 0) {
      return setErrorMsg("Please enter a valid amount.");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE}/payments/initialize/`,
        { amount: Number(amount), coupon_code: couponCode },
        { headers }
      );

      window.location.href = response.data.authorization_url;
    } catch (e) {
      console.error(e);
      setErrorMsg(e.response?.data?.message || "Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  /** -------------------------------
   * Animation
   --------------------------------*/
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-3 mb-6 justify-center flex-wrap">
          {[
            { key: "pay", label: "Make Payment" },
            { key: "history", label: "Recent Transactions" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedMethod(tab.key)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-sm text-sm md:text-base ${
                selectedMethod === tab.key
                  ? "bg-indigo-600 text-white scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* -------------------------------
          MAKE PAYMENT TAB
        --------------------------------*/}
        {selectedMethod === "pay" && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            <h2 className="flex items-center text-xl md:text-2xl font-bold text-indigo-700 mb-4">
              <CreditCard className="mr-2" /> Course Payment
            </h2>

            {errorMsg && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-3 text-sm">
                {errorMsg}
              </div>
            )}

            {verifying && (
              <p className="text-indigo-600 text-sm mb-2 flex items-center gap-2">
                <Loader2 className="animate-spin" size={16} /> Verifying payment...
              </p>
            )}

            {!user || !balance ? (
              <div className="text-center py-6 text-slate-600">
                <Loader2 className="animate-spin mx-auto" />
                <p className="mt-2">Loading...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* User Info Card */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="font-bold text-slate-800 flex items-center">
                    <User className="mr-2" /> {user.name}
                  </p>

                  <p className="font-semibold text-slate-700 flex items-center">
                    <Book className="mr-2" /> {user.course?.course_name}
                  </p>

                  <div className="mt-2 text-sm text-slate-600">
                    <p>Course Price: ₦{balance.course_price.toLocaleString()}</p>
                    <p>Paid: ₦{balance.amount_paid.toLocaleString()}</p>
                    <p>Owed: ₦{balance.amount_owed.toLocaleString()}</p>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full border p-3 rounded-xl text-sm"
                />

                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border p-3 rounded-xl text-sm"
                />

                <button
                  onClick={handlePayNow}
                  disabled={loading}
                  className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 ${
                    loading && "opacity-70 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mx-auto" size={18} />
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* -------------------------------
          TRANSACTIONS TAB
        --------------------------------*/}
        {selectedMethod === "history" && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
              Recent Transactions
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="p-2">Reference</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center p-4 text-slate-500">
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr key={tx.id} className="border-b hover:bg-slate-50">
                        <td className="p-2">{tx.reference}</td>
                        <td className="p-2">₦{tx.amount.toLocaleString()}</td>
                        <td className="p-2">{tx.status}</td>
                        <td className="p-2">
                          {new Date(tx.created_at).toLocaleString()}
                        </td>
                      </tr>
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
