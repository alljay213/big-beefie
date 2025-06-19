import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "../lib/supabaseClient";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !pickupTime) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Insert order into Supabase
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            name,
            phone,
            pickup_time: pickupTime,
            notes,
            payment_method: "cash",
            total: amount / 100,
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert cart items with reference to the order ID
      const items = cart.map((item) => ({
        order_id: order.id,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items);
      if (itemsError) throw itemsError;

      clearCart();
      window.location = "/success";
    } catch (err) {
      console.error("Supabase Error:", err.message);
      setError("Could not save your order. Please try again.");
    }

    setLoading(false);
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
