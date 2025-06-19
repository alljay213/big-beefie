import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
if (!stripeKey || stripeKey === "PLACEHOLDER") {
  console.warn("Stripe public key not set. Payments won't work.");
}

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.15;
  const amount = Math.round((subtotal + tax) * 100);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (!name || !phone || !pickupTime) {
  //       setError("Please fill in all required fields.");
  //       return;
  //     }

  //     setError(null);
  //     setLoading(true);

  //     const stripe = await stripePromise;

  //     if (paymentMethod === "card") {
  //       // Create checkout session on serverless function or backend
  //       const res = await fetch("/.netlify/functions/create-checkout-session", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ cart, name, phone, pickupTime, notes, amount }),
  //       });
  //       const { sessionUrl } = await res.json();
  //       window.location = sessionUrl;
  //     } else if (paymentMethod === "cash") {
  //       // Handle cash: save order via API and navigate to success
  //       const res = await fetch("/.netlify/functions/save-order", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           cart,
  //           name,
  //           phone,
  //           pickupTime,
  //           notes,
  //           paymentMethod: "Cash",
  //         }),
  //       });
  //       if (res.ok) {
  //         clearCart();
  //         window.location = "/success";
  //       } else {
  //         setError("Something went wrong saving your order.");
  //       }
  //     }
  //     setLoading(false);
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !pickupTime) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbx5SseF4pDbDfl_7suKP7wqqdmaaQGhyfO5-fehgcmbRxHoNUVwavm5yvmrrpgXKQo2Tg/exec",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            pickupTime,
            notes,
            paymentMethod,
            cart,
            total: amount / 100,
          }),
        }
      );

      setTimeout(() => {
        clearCart();
        window.location = "/success";
      }, 1000);
    } catch (err) {
      console.error("Google Sheets Error:", err);
      setError("Could not save your order. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Full Name*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Phone Number*</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Pickup Time*</label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Order Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full border rounded p-2"
          />
        </div>
        <div>
          <span className="block font-semibold">Payment Method*</span>
          <div className="mt-2 flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="mr-2"
              />
              Credit Card / Apple Pay
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="mr-2"
              />
              Cash on Pickup
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          {paymentMethod === "card" ? "Pay Now" : "Place Order"}
        </button>
      </form>
    </main>
  );
}

export default Checkout;
