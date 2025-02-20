import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    setSubmitted(true);
  };

  return (
    <Layout title={"Contact Us"}>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Contact Information */}
        <div className="  p-8 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            📞 Contact Us
          </h2>
          <div className="mt-6 space-y-4 ">
            <p className="flex items-center text-lg text-gray-800 dark:text-gray-300">
              📍 <strong className="ml-2">Location:</strong> 123 Main Street,
              City, Country
            </p>
            <p className="flex items-center text-lg text-gray-800 dark:text-gray-300">
              ✉️ <strong className="ml-2">Email:</strong> contact@company.com
            </p>
            <p className="flex items-center text-lg text-gray-800 dark:text-gray-300">
              ☎️ <strong className="ml-2">Phone:</strong> +1 234 567 890
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contact Us
          </h2>
          {submitted ? (
            <p className="mt-4 text-center text-green-500">
              Thank you for your message! We will get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
