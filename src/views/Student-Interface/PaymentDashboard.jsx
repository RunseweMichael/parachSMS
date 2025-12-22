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
  Download,
  AlertTriangle,
} from "lucide-react";
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
  const [statusMsg, setStatusMsg] = useState("");
  const [verifying, setVerifying] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /* ---------------- Fetch User & Balance ---------------- */
  const fetchUserData = useCallback(async () => {
    try {
      const [resUser, resBalance] = await Promise.all([
        api.get("students/me/"),
        api.get("payments/get_balance/"),
      ]);
      setUser(resUser.data);
      setBalance(resBalance.data);
    } catch {
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

  /* ---------------- Payment Verification ---------------- */
  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference || sessionStorage.getItem(`verified_${reference}`)) return;

    setVerifying(true);
    setErrorMsg("");
    setStatusMsg("Verifying your payment...");

    const verifyPayment = async (attempt = 1) => {
      try {
        const res = await api.get(`payments/verify/${reference}/`);

        if (res.data.success) {
          sessionStorage.setItem(`verified_${reference}`, "true");

          await fetchUserData();
          await fetchTransactions();

          setVerifying(false);
          setStatusMsg("");
          navigate("/student/payment", { replace: true });
          return;
        }

        if (attempt < 10) {
          setTimeout(() => verifyPayment(attempt + 1), attempt * 2000);
        } else {
          setStatusMsg("Payment received. Finalizing...");
          setVerifying(false);
        }
      } catch {
        if (attempt < 10) {
          setTimeout(() => verifyPayment(attempt + 1), attempt * 2000);
        } else {
          setStatusMsg("Payment received. Finalizing...");
          setVerifying(false);
        }
      }
    };

    verifyPayment();
  }, [searchParams, fetchUserData, fetchTransactions, navigate]);

  /* ---------------- Initialize Payment ---------------- */
  const handlePayNow = async () => {
    setErrorMsg("");
    setStatusMsg("");

    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      return setErrorMsg("Please enter a valid payment amount.");
    }

    if (
      balance?.amount_paid === 0 &&
      parsedAmount < balance.min_payment_required
    ) {
      return setErrorMsg(
        `Your first payment must be at least ₦${balance.min_payment_required.toLocaleString()}.`
      );
    }

    setLoading(true);
    try {
      const response = await api.post("payments/initialize/", {
        amount: parsedAmount,
        coupon_code: couponCode || undefined,
      });

      if (response.data.discount_applied > 0) {
        setDiscount(response.data.discount_applied);
        alert(
          `✅ Coupon applied! You got ₦${response.data.discount_applied.toLocaleString()} off.`
        );
      }

      window.location.href = response.data.authorization_url;
    } catch (e) {
      setErrorMsg(
        e.response?.data?.message || "Payment failed. Please try again."
      );
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* Status Messages */}
        {verifying && (
          <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-xl flex items-center gap-3 text-blue-700">
            <Loader2 className="animate-spin" /> {statusMsg}
          </div>
        )}

        {!verifying && statusMsg && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-xl text-yellow-800">
            {statusMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700">
            {errorMsg}
          </div>
        )}

        {/* Header Tabs */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center mb-10"
        >
          <div className="relative bg-white border border-blue-200 rounded-2xl p-2 shadow-md flex gap-1 w-full max-w-xl">
            <motion.div
              layout
              className="absolute top-2 bottom-2 rounded-xl bg-blue-600"
              animate={{
                x: selectedMethod === "pay" ? 0 : "100%",
                width: "50%",
              }}
            />
            {[
              { key: "pay", label: "Make Payment", icon: Wallet },
              { key: "history", label: "Transaction History", icon: History },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedMethod(tab.key)}
                className="relative z-10 w-1/2 py-3 font-semibold flex justify-center gap-2"
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* PAY TAB */}
        {selectedMethod === "pay" && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* User & Balance */}
            <motion.div variants={item}>
              <div className="bg-white border rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-800">
                  {user?.name || "..."}
                </h3>
                <p className="mt-2">
                  Outstanding: ₦{balance?.amount_owed?.toLocaleString() || 0}
                </p>
                {balance?.amount_owed === 0 && (
                  <div className="mt-4 text-green-700 flex gap-2">
                    <CheckCircle /> Fully Paid
                  </div>
                )}
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div variants={item} className="lg:col-span-2">
              <div className="bg-white border rounded-2xl p-8">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount (₦)"
                  className="w-full mb-4 p-3 border rounded-xl"
                />
                <button
                  onClick={handlePayNow}
                  disabled={loading}
                  className="w-full bg-blue-700 text-white py-4 rounded-xl"
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* HISTORY TAB */}
        {selectedMethod === "history" && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white border rounded-2xl"
          >
            <table className="w-full">
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="p-4">{tx.reference}</td>
                    <td className="p-4">₦{tx.amount.toLocaleString()}</td>
                    <td className="p-4">{tx.status}</td>
                    <td className="p-4">
                      {tx.status === "success" && (
                        <button
                          onClick={() => downloadReceipt(tx)}
                          className="text-blue-600"
                        >
                          Download
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
}
