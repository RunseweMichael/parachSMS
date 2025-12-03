// src/components/PaymentWarningBanner.jsx
import React from 'react';
import { AlertTriangle, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PaymentWarningBanner({ daysOverdue, amountDue }) {
  return (
    <div className="mb-6 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-xl overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Payment Overdue - Account Locked</h3>
            <p className="text-white/90 mb-4">
              Your payment is <strong>{daysOverdue} day{daysOverdue > 1 ? 's' : ''}</strong> overdue. 
              All features have been locked until payment is received.
            </p>
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium mb-1">Amount Due:</p>
              <p className="text-3xl font-bold">₦{amountDue.toLocaleString()}</p>
            </div>
            <Link 
              to="/student/payment"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-all shadow-lg"
            >
              <CreditCard className="w-5 h-5" />
              Make Payment Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}