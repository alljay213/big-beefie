import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function MenuItemCard({ item }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <p className="text-green-700 font-bold mt-2">
          ${item.price.toFixed(2)}
        </p>
        <button
          onClick={() => addToCart(item)}
          className="mt-3 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default MenuItemCard;
