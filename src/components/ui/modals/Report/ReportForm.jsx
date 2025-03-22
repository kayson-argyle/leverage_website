import { useState } from "react";

export default function ReportForm() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e) {
    e.preventDefault();  // Prevent the default form submission behavior

    // Collect form data
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      website: e.target.website.value,
    };

    try {
      const response = await fetch("/api/submit-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Set Content-Type to application/json
        },
        body: JSON.stringify(formData),  // Convert the form data to JSON format
      });

      if (response.ok) {
        // Redirect to the "Thank You" page upon success
        window.location.href = "/thank-you";  // Simple client-side redirect
      } else {
        const data = await response.json();
        setResponseMessage(`Error: ${data.message}`);  // Set error message
      }
    } catch (error) {
      setResponseMessage("An unexpected error occurred.");
    }
  }

  return (
    <form onSubmit={submit} id="reportForm" className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium">Website URL</label>
        <input
          type="text"
          id="website"
          name="website"
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
      >
        Get Report
      </button>

      {responseMessage && <p className="mt-4 text-red-600">{responseMessage}</p>}
    </form>
  );
}
