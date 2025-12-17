// src/hooks/usePaymentStatus.js
import { useState, useEffect } from "react";
import api from "../api";

export default function usePaymentStatus() {
  const [isLocked, setIsLocked] = useState(true);
  const [daysOverdue, setDaysOverdue] = useState(0);
  const [amountDue, setAmountDue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const res = await api.get(`/students/users/${userId}/`);
        const student = res.data;

        const paid = parseFloat(student?.amount_paid || 0);
        const owed = parseFloat(student?.amount_owed || 0);

        // ✅ SAME RULE AS HEADER
        const isCleared = owed <= 0;

        if (isCleared) {
          // 🔓 UNLOCK
          setIsLocked(false);
          setDaysOverdue(0);
          setAmountDue(0);
        } else {
          // 🔒 LOCK
          setIsLocked(true);
          setAmountDue(owed);

          // Calculate overdue days (optional)
          if (student?.next_due_date) {
            const dueDate = new Date(student.next_due_date);
            const today = new Date();

            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);

            const timeDiff = today.getTime() - dueDate.getTime();
            const daysPast = Math.ceil(timeDiff / (1000 * 3600 * 24));

            setDaysOverdue(daysPast > 0 ? daysPast : 0);
          } else {
            setDaysOverdue(0);
          }
        }
      } catch (err) {
        console.error("Failed to check payment status:", err);
        // Fail safe: lock on error
        setIsLocked(true);
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, []);

  return { isLocked, daysOverdue, amountDue, loading };
}
