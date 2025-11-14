import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CreditCard, Book, User, Loader2, AlertTriangle } from "lucide-react";

const PaymentPage = () => {
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
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Token ${token}` };

  // Fetch user info
  useEffect(() => {
    axios
      .get(`${API_BASE}/students/me/`, { headers })
      .then((res) => setUser(res.data))
      .catch(() => setErrorMsg("Failed to load user information."));
  }, [API_BASE]);

  // Fetch balance info
  useEffect(() => {
    axios
      .get(`${API_BASE}/payments/get_balance/`, { headers })
      .then((res) => setBalance(res.data))
      .catch(() => setErrorMsg("Error fetching balance information."));
  }, [API_BASE]);

  const handlePayNow = async () => {
    setErrorMsg("");
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      setErrorMsg("Please enter a valid payment amount greater than 0.");
      return;
    }

    if (balance.amount_paid === 0 && parsedAmount < balance.min_payment_required) {
      setErrorMsg(
        `Your first payment must be at least ₦${balance.min_payment_required.toLocaleString()} (50% of the course fee).`
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE}/payments/initialize/`,
        { amount: parsedAmount, coupon_code: couponCode },
        { headers }
      );

      if (response.data.discount_applied > 0) {
        setDiscount(response.data.discount_applied);
        alert(`✅ Coupon applied! You got ₦${response.data.discount_applied.toLocaleString()} off.`);
      }

      window.location.href = response.data.authorization_url;
    } catch (err) {
      console.error("Payment init error:", err.response);
      const backendError =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Error initializing payment.";
      setErrorMsg(backendError);
    } finally {
      setLoading(false);
    }
  };

  // Handle Paystack redirect verification with retries
  // Handle Paystack redirect verification (safe + one-time)
useEffect(() => {
  const reference = searchParams.get("reference");
  if (!reference) return;

  if (sessionStorage.getItem(`verified_${reference}`)) return; // ✅ stop duplicates
  setVerifying(true);

  const verifyPayment = async (attempt = 1) => {
    try {
      const res = await axios.get(`${API_BASE}/payments/verify/${reference}/`, { headers });

      if (res.data.success) {
        // ✅ Mark as verified so it won't retry on reload
        sessionStorage.setItem(`verified_${reference}`, "true");

        const balanceRes = await axios.get(`${API_BASE}/payments/get_balance/`, { headers });
        setBalance(balanceRes.data);

        alert(`✅ Payment of ₦${res.data.amount_paid.toLocaleString()} verified!`);
        navigate("/dashboard");
      } else if (attempt < 3) {
        // Retry a few times only if status isn't success
        setTimeout(() => verifyPayment(attempt + 1), 2000);
      } else {
        setErrorMsg("❌ Payment verification failed. Please refresh.");
        setVerifying(false);
      }
    } catch (err) {
      console.error("Verification error:", err);
      if (attempt < 3) {
        setTimeout(() => verifyPayment(attempt + 1), 2000);
      } else {
        setErrorMsg("❌ Verification failed. Please try again.");
        setVerifying(false);
      }
    }
  };

  verifyPayment();
}, [searchParams, API_BASE, headers, navigate]);


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #ebf4ff, #e0e7ff)",
        padding: "2rem",
      }}
    >
      <style>
        {`
          .card { background: white; border-radius: 16px; padding: 2rem; max-width: 440px; width: 100%; box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
          .heading { display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: #1e3a8a; font-weight: 700; font-size: 1.6rem; }
          .infoBox { background: #eff6ff; border-radius: 10px; padding: 1rem; margin-bottom: 1rem; }
          .label { display: flex; align-items: center; color: #1e3a8a; font-weight: 600; margin-bottom: 0.4rem; }
          .amountInput { width: 100%; padding: 0.8rem; margin-top: 0.5rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 1rem; }
          .button { width: 100%; background-color: #1d4ed8; color: white; border: none; border-radius: 10px; padding: 0.9rem; font-weight: 600; cursor: pointer; margin-top: 1rem; }
          .button:hover { background-color: #1e40af; }
          .footer { text-align: center; font-size: 0.85rem; color: #6b7280; margin-top: 1rem; }
          .alertBox { display: flex; align-items: flex-start; gap: 0.5rem; background: #fff7ed; border: 1px solid #fdba74; color: #92400e; padding: 0.8rem; border-radius: 8px; margin-bottom: 1rem; }
          .errorBox { background: #fee2e2; border: 1px solid #f87171; color: #b91c1c; padding: 0.8rem; border-radius: 8px; margin-bottom: 1rem; }
        `}
      </style>

      <div className="card">
        <div className="heading">
          <CreditCard size={30} style={{ marginRight: "8px" }} />
          Course Payment
        </div>

        {errorMsg && <div className="errorBox">⚠️ {errorMsg}</div>}

        {verifying && (
          <div style={{ textAlign: "center", marginBottom: "1rem", color: "#2563eb" }}>
            <Loader2 className="animate-spin inline" size={18} /> Verifying your payment, please wait...
          </div>
        )}

        {user && balance ? (
          <>
            <div className="infoBox">
              <div className="label">
                <User size={18} style={{ marginRight: "6px", color: "#1d4ed8" }} />
                {user.name}
              </div>
              <div className="label">
                <Book size={18} style={{ marginRight: "6px", color: "#4f46e5" }} />
                Course: <span style={{ marginLeft: 5 }}>{user.course?.course_name}</span>
              </div>
              <div style={{ marginTop: 10 }}>
                💵 <b>Course Price:</b> ₦{balance.course_price.toLocaleString()} <br />
                ✅ <b>Paid:</b> ₦{balance.amount_paid.toLocaleString()} <br />
                ⚠️ <b>Owed:</b> ₦{balance.amount_owed.toLocaleString()} <br />
                {discount > 0 && <span style={{ color: "#065f46" }}>💸 Discount Applied: ₦{discount.toLocaleString()}</span>}
              </div>
            </div>

            {Number(balance.amount_paid) === 0 ? (
              <div className="alertBox">
                <AlertTriangle size={18} />
                <span>
                  Your first payment must be at least{" "}
                  <b>₦{Number(balance.min_payment_required || 0).toLocaleString()}</b>.
                </span>
              </div>
            ) : (
              <div
                className="alertBox"
                style={{ background: "#ecfdf5", borderColor: "#6ee7b7", color: "#065f46" }}
              >
                <AlertTriangle size={18} />
                <span>
                  You can pay <b>any amount</b> towards your remaining balance of{" "}
                  <b>₦{Number(balance.amount_owed || 0).toLocaleString()}</b>.
                </span>
              </div>
            )}

            <div style={{ marginTop: "1rem" }}>
              <label>Enter Coupon Code (optional):</label>
              <input
                type="text"
                className="amountInput"
                placeholder="e.g. WELCOME50"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>

            <div>
              <label>Enter Amount to Pay:</label>
              <input
                type="number"
                className="amountInput"
                placeholder="e.g. 15000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button onClick={handlePayNow} disabled={loading || verifying} className="button">
              {loading ? <Loader2 className="animate-spin inline" size={16} /> : "💳 Pay Now"}
            </button>

            <p className="footer">
              Secure payments powered by <span style={{ color: "#2563eb" }}>Paystack</span>.
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", color: "#4b5563" }}>
            <Loader2 className="animate-spin" size={22} style={{ color: "#2563eb" }} />
            <p>Loading your information...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
