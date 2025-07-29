import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.email && form.password) {
      try {
        const isLoggedIn = await onLogin(form.email, form.password);
        console.log("Login status:", isLoggedIn);

        if (isLoggedIn.success === true) {
          setForm({ email: "", password: "" });
          toast.success("Login successful");
          navigate("/");
        }
        else {
          toast.error(isLoggedIn.error || "Login failed");
        }
      } catch (error) {
        toast.error(error.message || 'Login failed');
      }
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Back to Home Button */}
      <div className="p-4">
        <button
          onClick={() => navigate("/")}
          className="text-indigo-400 hover:text-indigo-500 font-semibold transition-colors"
        >
          &larr; Back to Home
        </button>
      </div>
      {/* Main Login Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-tight">
            Login to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
              <span className="text-gray-300 mb-1 block text-sm font-semibold">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoFocus
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-gray-300 mb-1 block text-sm font-semibold">
                Password
              </span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="••••••••"
              />
            </label>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 shadow-lg text-white font-semibold text-lg transition-colors"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-400 hover:text-indigo-500 font-semibold transition-colors"
            >
              Register Now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
