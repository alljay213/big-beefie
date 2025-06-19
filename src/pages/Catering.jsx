import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function Catering() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "bigbeefies_catering", // your Service ID
        "template_catering", // your Template ID
        formData, // the form data object
        "aY8mtJJDateCGbTjq" // your Public Key from EmailJS
      );

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send inquiry. Please try again later.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-700">
        Catering Inquiry
      </h1>
      {submitted ? (
        <p className="text-green-600">
          Your inquiry has been sent! We'll get back to you shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <p>
            Date of Event (required):
            <span className="text-red-500">*</span>
          </p>
          <input
            type="date"
            name="eventDate"
            placeholder="Event Date"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="message"
            placeholder="Tell us about your event..."
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-2 rounded h-28"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
          >
            Submit Inquiry
          </button>
        </form>
      )}
    </div>
  );
}

export default Catering;
