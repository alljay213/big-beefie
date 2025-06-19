import React from "react";

function CategoryTabs({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center my-6">
      {["All", ...categories].map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full font-semibold border transition-colors ${
            activeCategory === category
              ? "bg-green-600 text-white border-green-700"
              : "bg-white text-black border-gray-300 hover:bg-yellow-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
