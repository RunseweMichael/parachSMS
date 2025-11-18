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

  // Fetch user and balance from backend
  const fetchUserData = async () => {
    if (!token) return;
    try {
      const resUser = await axios.get(`${API_BASE}/students/me/`, { headers });
      const resBalance = await axios.get(`${API_BASE}/payments/get_balance/`, { headers });

      setUser(resUser.data);
      setBalance({
        course_price: resBalance.data.course_price,
        discounted_price: resBalance.data.discounted_price,
        discount_applied: resBalance.data.discount_applied,
        amount_paid: resBalance.data.amount_paid,
        amount_owed: resBalance.data.amount_owed,
        min_payment_required: resBalance.data.min_payment_required,
      });

    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load user information.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token, API_BASE]);

  // Handle Paystack redirect verification
  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference || sessionStorage.getItem(`verified_${reference}`)) return;

    setVerifying(true);

    const verifyPayment = async (attempt = 1) => {
      try {
        const res = await axios.get(`${API_BASE}/payments/verify/${reference}/`, { headers });

        if (res.data.success) {
          sessionStorage.setItem(`verified_${reference}`, "true");

          alert(`✅ Payment of ₦${res.data.amount_paid.toLocaleString()} verified!`);

          // Fetch the latest user/balance from backend
          await fetchUserData();

          navigate("/dashboard");
        } else if (attempt < 3) {
          setTimeout(() => verifyPayment(attempt + 1), 2000);
        } else {
          setErrorMsg("❌ Payment verification failed. Please refresh.");
          setVerifying(false);
        }
      } catch (err) {
        console.error("Verification error:", err);
        if (attempt < 3) setTimeout(() => verifyPayment(attempt + 1), 2000);
        else {
          setErrorMsg("❌ Verification failed. Please try again.");
          setVerifying(false);
        }
      }
    };

    verifyPayment();
  }, [searchParams, API_BASE, headers, navigate]);

  const handlePayNow = async () => {
    setErrorMsg("");
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      setErrorMsg("Please enter a valid payment amount greater than 0.");
      return;
    }

    if (balance.amount_paid === 0 && parsedAmount < balance.min_payment_required) {
      setErrorMsg(
        `Your first payment must be at least ₦${balance.min_payment_required.toLocaleString()} (50% of course fee).`
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

      // Redirect to Paystack
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
      <div
        className="card"
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "2rem",
          maxWidth: 440,
          width: "100%",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div
          className="heading"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            color: "#1e3a8a",
            fontWeight: 700,
            fontSize: "1.6rem",
          }}
        >
          <CreditCard size={30} style={{ marginRight: 8 }} />
          Course Payment
        </div>

        {errorMsg && (
          <div
            className="errorBox"
            style={{
              background: "#fee2e2",
              border: "1px solid #f87171",
              color: "#b91c1c",
              padding: 8,
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            ⚠️ {errorMsg}
          </div>
        )}

        {verifying && (
          <div style={{ textAlign: "center", marginBottom: 16, color: "#2563eb" }}>
            <Loader2 className="animate-spin inline" size={18} /> Verifying your payment, please wait...
          </div>
        )}

        {user && balance ? (
          <>
            <div
              className="infoBox"
              style={{ background: "#eff6ff", borderRadius: 10, padding: 16, marginBottom: 16 }}
            >
              <div className="label" style={{ display: "flex", alignItems: "center", color: "#1e3a8a", fontWeight: 600, marginBottom: 4 }}>
                <User size={18} style={{ marginRight: 6, color: "#1d4ed8" }} />
                {user.name}
              </div>
              <div className="label" style={{ display: "flex", alignItems: "center", color: "#1e3a8a", fontWeight: 600, marginBottom: 4 }}>
                <Book size={18} style={{ marginRight: 6, color: "#4f46e5" }} />
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
              <div
                className="alertBox"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 4,
                  background: "#fff7ed",
                  border: "1px solid #fdba74",
                  color: "#92400e",
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                <AlertTriangle size={18} />
                <span>
                  Your first payment must be at least <b>₦{Number(balance.min_payment_required).toLocaleString()}</b>.
                </span>
              </div>
            ) : (
              <div
                className="alertBox"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 4,
                  background: "#ecfdf5",
                  borderColor: "#6ee7b7",
                  color: "#065f46",
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                <AlertTriangle size={18} />
                <span>
                  You can pay <b>any amount</b> towards your remaining balance of <b>₦{Number(balance.amount_owed).toLocaleString()}</b>.
                </span>
              </div>
            )}

            <div style={{ marginBottom: 12 }}>
              <label>Enter Coupon Code (optional):</label>
              <input
                type="text"
                className="amountInput"
                placeholder="e.g. WELCOME50"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 4, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14 }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label>Enter Amount to Pay:</label>
              <input
                type="number"
                className="amountInput"
                placeholder="e.g. 15000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 4, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14 }}
              />
            </div>

            <button
              onClick={handlePayNow}
              disabled={loading || verifying}
              style={{
                width: "100%",
                backgroundColor: "#1d4ed8",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: 12,
                fontWeight: 600,
                cursor: "pointer",
                marginTop: 12,
              }}
            >
              {loading ? <Loader2 className="animate-spin inline" size={16} /> : "💳 Pay Now"}
            </button>

            <p style={{ textAlign: "center", fontSize: 12, color: "#6b7280", marginTop: 12 }}>
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
