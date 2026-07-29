import React, { useState, useMemo, useEffect, useCallback } from "react";
import api from "../api";
import { FaPaperPlane, FaPhone, FaExclamationCircle, FaCoins, FaSync } from "react-icons/fa";

const parseNumbers = (raw) => raw.split(",").map((n) => n.trim()).filter(Boolean);
const isLikelyValid = (num) => {
  const digits = num.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
};

const BroadcastSMS = () => {
  const [numbersRaw, setNumbersRaw] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const [balance, setBalance] = useState(null);
  const [balanceError, setBalanceError] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const numbers = useMemo(() => parseNumbers(numbersRaw), [numbersRaw]);
  const badCount = numbers.filter((n) => !isLikelyValid(n)).length;

  const fetchBalance = useCallback(async () => {
    setBalanceError(false);
    try {
      const res = await api.get("/admin-panel/termii-balance/");
      setBalance(res.data);
    } catch {
      setBalanceError(true);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await api.get("/admin-panel/broadcast-sms/history/?per_page=8");
      setHistory(res.data.results);
    } catch (e) {
      console.error("Failed to load broadcast history:", e);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
    fetchHistory();
  }, [fetchBalance, fetchHistory]);

  const handleSend = async () => {
    setError("");
    setResults(null);

    if (numbers.length === 0) return setError("Enter at least one phone number.");
    if (!message.trim()) return setError("Message body can't be empty.");
    if (badCount > 0 && !window.confirm(`${badCount} number(s) look invalid. Send anyway?`)) return;

    setSending(true);
    try {
      const res = await api.post("/admin-panel/broadcast-sms/", {
        phone_numbers: numbers,
        message,
      });
      setResults(res.data);
      setNumbersRaw("");
      setMessage("");
      fetchBalance();   // balance just changed
      fetchHistory();   // new entry to show
    } catch (e) {
      setError(e.response?.data?.error || "Failed to send broadcast.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={styles.wrap}>
      {/* Balance card */}
      <div style={styles.balanceCard}>
        <div style={styles.balanceLeft}>
          <FaCoins size={22} color="#f59e0b" />
          <div>
            <p style={styles.balanceLabel}>Termii Balance</p>
            {balanceError ? (
              <p style={styles.balanceError}>Couldn't fetch balance</p>
            ) : balance ? (
              <p style={styles.balanceValue}>
                {balance.balance?.toLocaleString()} {balance.currency || ""}
              </p>
            ) : (
              <p style={styles.balanceValue}>Loading…</p>
            )}
          </div>
        </div>
        <button style={styles.refreshBtn} onClick={fetchBalance} title="Refresh balance">
          <FaSync size={12} />
        </button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.title}>Broadcast SMS</h3>
        <p style={styles.hint}>
          Paste any phone numbers, comma-separated. They don't need to belong to registered students.
        </p>

        <label style={styles.label}>Phone Numbers</label>
        <textarea
          rows={3}
          placeholder="08012345678, 07099887766, +2348023456789…"
          value={numbersRaw}
          onChange={(e) => setNumbersRaw(e.target.value)}
          style={styles.textarea}
        />

        {numbers.length > 0 && (
          <div style={styles.pillRow}>
            {numbers.map((n, i) => {
              const valid = isLikelyValid(n);
              return (
                <span key={i} style={{ ...styles.pill, ...(valid ? styles.pillValid : styles.pillInvalid) }}>
                  {valid ? <FaPhone size={10} /> : <FaExclamationCircle size={10} />} {n}
                </span>
              );
            })}
          </div>
        )}

        <label style={styles.label}>Message</label>
        <textarea
          rows={4}
          placeholder="Type your broadcast message…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.sendBtn} onClick={handleSend} disabled={sending}>
          <FaPaperPlane size={12} /> {sending ? "Sending…" : `Send to ${numbers.length || 0} number(s)`}
        </button>

        {results && (
          <div style={styles.results}>
            <p style={styles.resultsSummary}>{results.message}</p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Number</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Note</th>
                </tr>
              </thead>
              <tbody>
                {results.results.map((r, i) => (
                  <tr key={i}>
                    <td style={styles.td}>{r.phone || r.input}</td>
                    <td style={{ ...styles.td, color: r.status === "sent" ? "#2e7d32" : "#c62828" }}>
                      {r.status}
                    </td>
                    <td style={styles.td}>{r.reason || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* History card */}
      <div style={styles.card}>
        <div style={styles.historyHeader}>
          <h3 style={styles.title}>Sent Messages</h3>
          <button style={styles.refreshBtnSmall} onClick={fetchHistory}>
            <FaSync size={11} /> Refresh
          </button>
        </div>

        {historyLoading ? (
          <p style={styles.hint}>Loading history…</p>
        ) : history.length === 0 ? (
          <p style={styles.hint}>No broadcasts sent yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Message</th>
                <th style={styles.th}>Sent By</th>
                <th style={styles.th}>Recipients</th>
                <th style={styles.th}>Success</th>
                <th style={styles.th}>Failed</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id}>
                  <td style={styles.td}>{new Date(h.created_at).toLocaleString()}</td>
                  <td style={{ ...styles.td, maxWidth: 260, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {h.message}
                  </td>
                  <td style={styles.td}>{h.sent_by}</td>
                  <td style={styles.td}>{h.recipient_count}</td>
                  <td style={{ ...styles.td, color: "#2e7d32" }}>{h.success_count}</td>
                  <td style={{ ...styles.td, color: h.failed_count > 0 ? "#c62828" : "#999" }}>{h.failed_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrap: { display: "flex", flexDirection: "column", gap: "20px" },
  balanceCard: {
    backgroundColor: "#fff", padding: "18px 22px", borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex",
    justifyContent: "space-between", alignItems: "center",
  },
  balanceLeft: { display: "flex", alignItems: "center", gap: "14px" },
  balanceLabel: { fontSize: "12px", color: "#888", margin: 0 },
  balanceValue: { fontSize: "20px", fontWeight: "700", color: "#333", margin: 0 },
  balanceError: { fontSize: "13px", color: "#c62828", margin: 0 },
  refreshBtn: { background: "#f5f5f5", border: "none", borderRadius: "8px", padding: "8px 10px", cursor: "pointer" },
  refreshBtnSmall: { background: "#f5f5f5", border: "none", borderRadius: "8px", padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" },
  card: { backgroundColor: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  historyHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
  title: { fontSize: "18px", fontWeight: "600", marginBottom: "6px", color: "#333" },
  hint: { fontSize: "13px", color: "#888", marginBottom: "16px" },
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "6px", marginTop: "12px" },
  textarea: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", resize: "vertical", fontFamily: "inherit" },
  pillRow: { display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" },
  pill: { display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "600" },
  pillValid: { backgroundColor: "#e8f5e9", color: "#2e7d32", border: "1px solid #a5d6a7" },
  pillInvalid: { backgroundColor: "#ffebee", color: "#c62828", border: "1px solid #ef9a9a" },
  error: { color: "#c62828", fontSize: "13px", marginTop: "10px" },
  sendBtn: { marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", backgroundColor: "#2196F3", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600" },
  results: { marginTop: "20px" },
  resultsSummary: { fontSize: "13px", color: "#555", marginBottom: "10px" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "8px", backgroundColor: "#f8f9fa", fontSize: "12px", borderBottom: "2px solid #dee2e6" },
  td: { padding: "8px", fontSize: "13px", borderBottom: "1px solid #eee" },
};

export default BroadcastSMS;