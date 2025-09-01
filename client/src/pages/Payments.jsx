import { useState } from "react";
import API from "../api/axios";
import { Loader2, CheckCircle, AlertCircle, CreditCard } from "lucide-react";

export default function Payments() {
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createCheckout = async () => {
    try {
      setLoading(true);
      setError("");
      setCheckoutUrl("");

      // Call FastAPI /payments/checkout
      const res = await API.post("/payments/checkout", {
        amount: 10,
        description: "Monthly subscription",
        reference: "sub-001",
      });

      if (res.data?.checkout_url) {
        setCheckoutUrl(res.data.checkout_url);
      } else {
        setError("Checkout URL not received from server.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Example transaction history (replace with API call later)
  const transactions = [
    { id: "tx-001", date: "2025-08-01", amount: "$10.00", status: "Paid" },
    { id: "tx-002", date: "2025-07-01", amount: "$10.00", status: "Paid" },
    { id: "tx-003", date: "2025-06-01", amount: "$10.00", status: "Paid" },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      {/* Hero Header */}
      <div className="text-center py-16 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-b-3xl shadow-lg">
        <h3 className="text-5xl font-extrabold drop-shadow-lg">
          Invest in yourself 📚
        </h3>
        <p className="mt-4 text-xl max-w-2xl mx-auto">
          “Education is the best investment you can make. Every lesson you
          unlock brings you one step closer to your dreams.”
        </p>
      </div>

      {/* Subscription Header */}
      <h2 className="text-3xl font-extrabold text-center text-black  mt-12 mb-8 flex items-center justify-center gap-2">
        <CreditCard className="w-8 h-8 text-black" />
        Manage Your Subscription
      </h2>

      {/* Plan Details */}
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 text-center mb-12">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          🌟 SmartTutor Monthly Plan
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Unlock unlimited lessons, personalized study paths, and AI-powered tutoring.
        </p>
        <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-4">
          $10 / month
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Renews automatically
        </p>

        <button
          onClick={createCheckout}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-xl text-white font-semibold transition-all shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 active:scale-95"
          }`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "Subscribe Now"
          )}
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-500 flex items-center justify-center gap-1">
            <AlertCircle size={16} /> {error}
          </p>
        )}

        {checkoutUrl && (
          <p className="mt-4">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium underline"
            >
              Proceed to Checkout →
            </a>
          </p>
        )}
      </div>

      {/* Transaction History */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          📜 Payment History
        </h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 px-3 text-gray-600 dark:text-gray-400">Date</th>
              <th className="py-2 px-3 text-gray-600 dark:text-gray-400">Amount</th>
              <th className="py-2 px-3 text-gray-600 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="border-b border-gray-100 dark:border-gray-700"
              >
                <td className="py-2 px-3 text-gray-700 dark:text-gray-300">
                  {t.date}
                </td>
                <td className="py-2 px-3 text-gray-700 dark:text-gray-300">
                  {t.amount}
                </td>
                <td className="py-2 px-3">
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      t.status === "Paid"
                        ? "text-green-600 dark:text-green-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    <CheckCircle size={14} /> {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
