import { useState } from "react";
import axios from "axios";

export default function FoodPartnerLogin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/foodpartner/login", form);
      alert("Food Partner logged in successfully!");
    } catch (error) {
      alert(error.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-600 to-rose-700">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Food Partner Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-200 mt-5">
          Don’t have a partner account?{" "}
          <a href="/foodpartner/register" className="text-pink-300 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
