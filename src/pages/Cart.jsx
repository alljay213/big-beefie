import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.15; // assuming 15% tax
  const total = subtotal + tax;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/" className="text-green-600 underline">
            Browse menu
          </Link>
        </p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item) => (
              <li
                key={item.id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right space-y-1">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;
