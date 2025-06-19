import React, { useState } from "react";
import menuData from "../data/menuData";
import MenuItemCard from "./MenuItemCard";
import CategoryTabs from "./CategoryTabs";

function MenuList() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [...new Set(menuData.map((item) => item.category))];
  const filteredItems =
    activeCategory === "All"
      ? menuData
      : menuData.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MenuList;
