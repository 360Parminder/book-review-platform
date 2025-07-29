import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaUserFriends,
  FaStar,
  FaSearch,
  FaBookOpen,
  FaRocket,
  FaGlobe,
  FaLeaf,
  FaHeart
} from "react-icons/fa";

// Hero animation variants
const heroVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden pt-0">
      {/* Hero Section */}
      <motion.section
        variants={heroVariant}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col-reverse md:flex-row items-center justify-center z-10 py-20 md:py-32 px-6 md:px-0"
      >
        <div className="max-w-2xl text-center md:text-left mb-10 md:mb-0">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="text-5xl md:text-6xl font-bold text-indigo-900 mb-6 drop-shadow-md"
          >
            Discover, Review, <span className="text-indigo-600">Connect.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-700 mb-8"
          >
            Join a vibrant community of book lovers.
            Explore trending books & share your thoughts!
          </motion.p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-5 md:items-center w-full md:w-auto">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/explore"
                className="bg-indigo-600 text-white px-7 py-3 font-semibold text-lg rounded-full shadow-lg hover:bg-indigo-700 transition"
              >
                Explore Books
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/signup"
                className="bg-white border border-indigo-600 text-indigo-600 px-7 py-3 font-semibold text-lg rounded-full shadow-md hover:bg-indigo-50 transition"
              >
                Join Now
              </Link>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex-shrink-0 mb-16 md:mb-0 md:ml-8"
        >
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80"
            alt="Reading illustration"
            className="rounded-3xl shadow-2xl w-80 h-96 object-cover border-4 border-white"
          />
        </motion.div>
      </motion.section>

      {/* Decorative Blobs */}
      <motion.div
        className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-indigo-200 rounded-full blur-3xl opacity-30 z-0"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-120px] left-[-110px] w-[300px] h-[300px] bg-sky-200 rounded-full blur-3xl opacity-30 z-0"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 9, delay: 2, ease: "easeInOut" }}
      />

      {/* Main Sections */}
      <div className="container mx-auto px-3 md:px-6 py-16 relative z-10">
        {/* Recent Reviews Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-indigo-900 tracking-tight">
            Recent Reviews
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {recentReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl border-l-4 border-indigo-200 p-7"
              >
                <div className="flex items-center mb-5">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-11 h-11 rounded-full border-2 border-indigo-300"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-indigo-800">{review.userName}</h4>
                    <div className="flex text-yellow-400 text-sm mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-lg text-indigo-700">{review.bookTitle}</h3>
                <p className="text-gray-700 text-balance">{review.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Categories Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-indigo-900 tracking-tight">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.07, boxShadow: "0 6px 30px 0 #a5b4fc33" }}
                className="bg-gradient-to-tr from-indigo-500 to-purple-600 text-white rounded-2xl p-7 text-center shadow-lg cursor-pointer transition min-h-[120px] flex flex-col items-center justify-center"
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
              >
                <category.icon className="w-9 h-9 mx-auto mb-3 drop-shadow" />
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Books Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-indigo-900">
            Featured Books
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {featuredBooks.map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.11 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold mb-2 text-lg text-indigo-800">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{book.author}</p>
                  <div className="flex items-center text-yellow-400 text-base">
                    {[...Array(Math.floor(book.rating))].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className="ml-2 text-indigo-700 font-medium">
                      {book.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

// Modernized & Expanded Data Arrays:

const recentReviews = [
  {
    userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    userName: "John Doe",
    rating: 5,
    bookTitle: "The Great Gatsby",
    content: "A masterpiece that captures the essence of the American Dream. Highly recommended!"
  },
  {
    userAvatar: "https://randomuser.me/api/portraits/women/19.jpg",
    userName: "Emily Clark",
    rating: 4,
    bookTitle: "Atomic Habits",
    content: "Very practical and insightful! Changed the way I approach daily life."
  },
  {
    userAvatar: "https://randomuser.me/api/portraits/men/34.jpg",
    userName: "Mike Ross",
    rating: 5,
    bookTitle: "1984",
    content: "A dystopian classic that feels hauntingly real. Powerful writing."
  },
  {
    userAvatar: "https://randomuser.me/api/portraits/women/27.jpg",
    userName: "Ava Greene",
    rating: 4,
    bookTitle: "Sapiens",
    content: "Fascinating perspective on human history – a must-read for everyone."
  },
  {
    userAvatar: "https://randomuser.me/api/portraits/men/48.jpg",
    userName: "David Lee",
    rating: 5,
    bookTitle: "To Kill a Mockingbird",
    content: "Beautifully written. The characters stayed with me long after finishing!"
  },
  {
    userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    userName: "Sophie Adler",
    rating: 4,
    bookTitle: "Becoming",
    content: "Michelle Obama's journey is so inspiring. Loved every page!"
  }
];

const categories = [
  { name: "Fiction", icon: FaBookOpen },
  { name: "Mystery", icon: FaSearch },
  { name: "Science", icon: FaBook },
  { name: "Biography", icon: FaUserFriends },
  { name: "Fantasy", icon: FaRocket },
  { name: "Travel", icon: FaGlobe },
  { name: "Nature", icon: FaLeaf },
  { name: "Romance", icon: FaHeart }
];

const featuredBooks = [
  {
    cover: "https://covers.openlibrary.org/b/id/1535616-L.jpg",
    title: "1984",
    author: "George Orwell",
    rating: 4.8
  },
  {
    cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    rating: 4.7
  },
  {
    cover: "https://covers.openlibrary.org/b/id/8106326-L.jpg",
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.6
  },
  {
    cover: "https://covers.openlibrary.org/b/id/9802982-L.jpg",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    rating: 4.5
  },
  {
    cover: "https://covers.openlibrary.org/b/id/10270801-L.jpg",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    rating: 4.8
  },
  {
    cover: "https://covers.openlibrary.org/b/id/8670640-L.jpg",
    title: "The Book Thief",
    author: "Markus Zusak",
    rating: 4.5
  },
  {
    cover: "https://covers.openlibrary.org/b/id/10520900-L.jpg",
    title: "Becoming",
    author: "Michelle Obama",
    rating: 4.7
  },
  {
    cover: "https://covers.openlibrary.org/b/id/9870262-L.jpg",
    title: "Harry Potter & The Sorcerer's Stone",
    author: "J.K. Rowling",
    rating: 4.9
  }
];
