import React from "react";
import MenuList from "../components/MenuList";

function Home() {
  return (
    <main className="py-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-4">
        Explore Our Jamaican Flavors
      </h1>
      <MenuList />
    </main>
  );
}

export default Home;
