import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    description: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit (Temporary for now)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (Functionality coming soon)");
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>

      <form
    action="https://formspree.io/f/xrbpbedl" method="POST"
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Mobile Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your mobile number"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-bold hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
