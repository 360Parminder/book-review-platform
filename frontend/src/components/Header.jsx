import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ user, onLogout }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
        setScrolled(window.scrollY > 50);
    }


    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
       ${scrolled ? "bg-white" : "bg-transparent"}
       ${scrolled?" sticky top-4 z-30":"sticky top-0 z-30"}
        rounded-xl
        bg-white/60
        backdrop-blur-md
        border border-slate-200
        shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]
        transition-all duration-300
        w-[90vw] md:w-[80vw] lg:w-[70vw]
        ${scrolled ? "scale-105 shadow-2xl border-blue-300" : "scale-100 shadow-md"}
      `}
      style={{
        WebkitBackdropFilter: "blur(16px)",
        // to give separation from edges when popped
        marginLeft: scrolled ? "1rem" : "0",
        marginRight: scrolled ? "1rem" : "0",
        marginTop: scrolled ? "0.75rem" : "0",
        marginBottom: scrolled ? "0.75rem" : "0"
      }}
    >
      <nav className="flex items-center justify-between h-16 px-4 md:px-8">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-2 md:gap-6">
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter text-indigo-700 hover:text-indigo-800 transition-colors drop-shadow-sm"
            style={{ letterSpacing: "0.04em" }}
          >
            Book<span className="text-blue-500">Review</span>
          </Link>
          <div className="hidden md:flex gap-2 md:gap-4 ml-4">
            <Link
              to="/"
              className={`text-base font-medium py-1 px-2 rounded transition-colors duration-150 ${
                location.pathname === "/"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/books/new"
              className={`text-base font-medium py-1 px-2 rounded transition-colors duration-150 ${
                location.pathname === "/books/new"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              Add Book
            </Link>
          </div>
        </div>

        {/* Right: Auth/User */}
        <div className="flex items-center gap-2 md:gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className={`px-4 py-1 rounded font-semibold border border-transparent transition-all duration-150 ${
                  location.pathname === "/login"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 rounded font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="mr-1 font-medium text-gray-700 hidden md:inline">{user.username}</span>
              <button
                onClick={onLogout}
                className="px-4 py-1 rounded border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
