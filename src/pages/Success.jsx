import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="max-w-xl mx-auto text-center py-16 px-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        🎉 Thank you for your order!
      </h1>
      <p className="text-gray-700 mb-6">
        We’ve received your order and are preparing it now. You’ll be able to
        pick it up at your chosen time.
      </p>
      <Link
        to="/"
        className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
      >
        Back to Menu
      </Link>
    </div>
  );
}

export default Success;
