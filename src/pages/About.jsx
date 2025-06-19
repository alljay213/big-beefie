import React from "react";

function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        About Jamaican Flavors
      </h1>
      <p className="text-gray-800 leading-relaxed mb-4">
        At Jamaican Flavors, we serve authentic, home-style Jamaican cuisine
        made with passion and love. From spicy jerk chicken to savory patties,
        every dish brings a taste of the island to your plate.
      </p>
      <p className="text-gray-700 mb-2">
        📍 Located in: Kingston, Jamaica
        <br />
        📞 Phone: (876) 555-1234
        <br />
        📧 Email: info@jamaicanflavors.com
      </p>
      <p className="text-gray-600 mt-4 text-sm italic">
        Walk-ins welcome. Orders can be placed online for pickup.
      </p>
    </div>
  );
}

export default About;
