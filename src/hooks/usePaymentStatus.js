// src/hooks/usePaymentStatus.js
import { useState, useEffect } from 'react';
import api from '../api';

export default function usePaymentStatus() {
  const [isLocked, setIsLocked] = useState(false);
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
        const hasOutstandingBalance = owed > paid;

        // 🔹 LOCK if amount_paid === 0 (newly registered student)
        if (paid === 0) {
          setIsLocked(true);
          setDaysOverdue(0);
          setAmountDue(owed);
          return; // skip overdue check
        }

        // 🔹 LOCK if payment is overdue
        if (student?.next_due_date && hasOutstandingBalance) {
          const dueDate = new Date(student.next_due_date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          dueDate.setHours(0, 0, 0, 0);

          const timeDiff = today.getTime() - dueDate.getTime();
          const daysPast = Math.ceil(timeDiff / (1000 * 3600 * 24));

          if (daysPast > 0) {
            setIsLocked(true);
            setDaysOverdue(daysPast);
            setAmountDue(owed - paid);
          }
        }

      } catch (err) {
        console.error("Failed to check payment status:", err);
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, []);

  return { isLocked, daysOverdue, amountDue, loading };
}
