import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function BookList() {
  const { books, loadingBooks, error, fetchBooks } = useContext(AppContext);
  const [filters, setFilters] = useState({ author: "", genre: "" });

  const handleInputChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyFilter = () => {
    const filterObj = {};
    if (filters.author.trim()) filterObj.author = filters.author.trim();
    if (filters.genre.trim()) filterObj.genre = filters.genre.trim();
    if (fetchBooks) fetchBooks(filterObj);
  };

  const clearFilter = () => {
    setFilters({ author: "", genre: "" });
    if (fetchBooks) fetchBooks({});
  };

  useEffect(() => {
    if (fetchBooks) fetchBooks();
  }, []);

  return (
    <div className=" bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="w-full mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-8 text-center md:text-left drop-shadow-lg">
          Book List
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={filters.author}
            onChange={handleInputChange}
            className="min-w-[180px] px-4 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={filters.genre}
            onChange={handleInputChange}
            className="min-w-[180px] px-4 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={applyFilter}
            className="min-w-[120px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition"
          >
            Apply
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilter}
            className="min-w-[120px] border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition"
          >
            Clear
          </motion.button>
          <Link
            to="/books/new"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="ml-auto min-w-[140px] bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg px-4 py-2 transition flex items-center justify-center"
          >
            Add New Book
          </Link>
        </div>

        {/* Content */}
        {loadingBooks ? (
          <div className="flex justify-center py-20">
            <svg
              className="animate-spin h-12 w-12 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center text-lg font-semibold">{error}</p>
        ) : books.length === 0 ? (
          <p className="text-gray-400 text-center text-lg font-medium">No books found.</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {books.map((book) => (
              <motion.div
                key={book._id || book.id}
                variants={itemVariants}
                className="bg-gray-800 rounded-3xl shadow-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
              >
                <div>
                  <h2 className="text-indigo-400 font-semibold text-xl mb-3 truncate">
                    {book.title}
                  </h2>
                  <p className="text-gray-300 mb-1">
                    <span className="font-semibold">Author: </span> {book.author}
                  </p>
                  <p className="text-gray-300 mb-1">
                    <span className="font-semibold">Year: </span> {book.publishedYear}
                  </p>
                  {book.genre && (
                    <p className="text-indigo-500 font-medium uppercase tracking-wide">
                      {book.genre}
                    </p>
                  )}
                </div>
                <div className="mt-6 flex gap-4">
                  <Link
                    to={`/books/${book._id || book.id}`}
                    className="flex-1 border border-indigo-500 text-indigo-400 rounded-lg py-2 text-center font-semibold transition hover:bg-indigo-600 hover:text-white"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/books/edit/${book._id || book.id}`}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 text-center font-semibold transition"
                  >
                    Edit
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
