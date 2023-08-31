import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://getform.io/f/59b30d0c-8ca7-4149-ac47-6f9171a847d9",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(formData),
        }
      );

      console.log(response);

      if (response.ok) {
        console.log("ok");
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred.");
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="h-screen text-white py-20 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
      <div className="w-11/12">
      <form
        className="bg-gray-700 p-4 md:p-8 rounded-lg w-full md:max-w-lg mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-300 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-400 hover:bg-emerald-500 text-gray-900 py-2 px-4 rounded-lg"
        >
          Send Message
        </button>
      </form>
      </div>
      <ToastContainer className="pt-6" />
    </div>
  );
}

export default Contact;
