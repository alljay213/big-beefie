import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white text-center py-4 mt-10">
      <p>
        &copy; {new Date().getFullYear()} Jamaican Flavors. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer; // ✅ This is the key
