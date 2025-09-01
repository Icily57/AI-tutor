import { useState } from "react";
import API from "../api/axios";

export default function Payments() {
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const createCheckout = async () => {
    const res = await API.post("/payments/checkout", {
      mode: "subscription",
      amount: 10,
      description: "Monthly subscription",
      reference: "sub-001",
    });
    setCheckoutUrl(res.data.checkout_url);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Payments</h2>
      <button
        onClick={createCheckout}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Subscribe
      </button>
      {checkoutUrl && (
        <p className="mt-4">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Proceed to Checkout
          </a>
        </p>
      )}
    </div>
  );
}
