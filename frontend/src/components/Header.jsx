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
        ${scrolled ? "bg-gray-900 bg-opacity-90 border-gray-700 shadow-lg" : "bg-transparent border-transparent shadow-md"}
        ${scrolled ? "sticky top-4 z-30" : "sticky top-0 z-30"}
        rounded-xl
        backdrop-blur-md
        border
        transition-all duration-300
        ${scrolled ? "scale-105" : "scale-100"}
      `}
      style={{
        WebkitBackdropFilter: "blur(16px)",
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
            className="text-2xl font-black tracking-tighter text-indigo-400 hover:text-indigo-500 transition-colors drop-shadow-sm"
            style={{ letterSpacing: "0.04em" }}
          >
            ShelfWise
          </Link>
          <div className="hidden md:flex gap-2 md:gap-4 ml-4">
            <Link
              to="/"
              className={`text-base font-medium py-1 px-2 rounded transition-colors duration-150 ${
                location.pathname === "/"
                  ? "text-blue-400 bg-gray-800"
                  : "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
              }`}
            >
              Home
            </Link>
           
            <Link
              to="/explore"
              className={`text-base font-medium py-1 px-2 rounded transition-colors duration-150 ${
                location.pathname === "/explore"
                  ? "text-blue-400 bg-gray-800"
                  : "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
              }`}
            >
              Explore Books
            </Link>
             <Link
              to="/books/new"
              className={`text-base font-medium py-1 px-2 rounded transition-colors duration-150 ${
                location.pathname === "/books/new"
                  ? "text-blue-400 bg-gray-800"
                  : "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
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
                    ? "text-blue-400 bg-gray-800"
                    : "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 rounded font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="mr-1 font-medium text-gray-300 hidden md:inline">{user.username}</span>
              <button
                onClick={onLogout}
                className="px-4 py-1 rounded border border-blue-600 text-blue-400 font-semibold hover:bg-gray-800 transition-all"
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
