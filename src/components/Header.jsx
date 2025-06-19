import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Header() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-yellow-500 text-black p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Big Beefie's Jerk Shack
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/about" className="text-sm hover:underline ml-6">
            About
          </Link>
          <Link to="/catering" className="text-sm hover:underline">
            Catering
          </Link>
          <Link to="/cart" className="relative">
            <span className="material-icons">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
