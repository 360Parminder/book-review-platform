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
  FaHeart,
  FaArrowRight
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export default function Landing() {
  const {isAuthenticated}= useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-900 rounded-full blur-[100px] opacity-40"
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-900 rounded-full blur-[120px] opacity-30"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col-reverse md:flex-row items-center justify-between gap-12 z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl"
        >
          <motion.div variants={fadeIn} className="mb-4">
            <span className="inline-block bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
              Discover your next favorite book
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Curated Book Reviews
            </span>{" "}
            from Real Readers
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg"
          >
            Join our community of book lovers to discover honest reviews, get personalized recommendations, and share your thoughts on your latest reads.
          </motion.p>
          
          <motion.div 
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/explore"
              className="relative group flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-medium rounded-lg shadow-lg transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Explore Books</span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            {!isAuthenticated && (
              <Link
                to="/register"
                className="flex items-center justify-center bg-gray-700 border-gray-600 hover:bg-gray-600 text-white px-6 py-3 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                Join Community
              </Link>
            )}
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl border-2 border-indigo-900/30 z-0"></div>
          <motion.img
            src="https://res.cloudinary.com/dvo4tvvgb/image/upload/v1753809773/book_itoiqd.png"
            alt="Reading illustration"
            className="relative z-10 w-full max-w-md rounded-2xl shadow-xl"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 z-10">
        {/* Recent Reviews Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.div variants={fadeIn} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Readers Say
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Honest reviews from our community of passionate readers
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentReviews.map((review, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                custom={index * 0.1}
                className="bg-gray-800 border-gray-700 hover:shadow-lg rounded-2xl shadow-md transition-shadow p-6 border"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-5">
                  <motion.img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full border-2 border-indigo-100"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-100">{review.userName}</h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4" />
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="font-bold mb-3 text-lg text-indigo-400">{review.bookTitle}</h3>
                <p className="text-gray-300">{review.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Categories Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.div variants={fadeIn} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Find your next read in your favorite genre
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                custom={index * 0.1}
                whileHover={{ 
                  y: -8,
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.1)"
                }}
                className="bg-gray-800 border-gray-700 hover:border-indigo-900 rounded-xl p-5 text-center cursor-pointer border transition-all"
              >
                <div className="bg-indigo-900/50 text-indigo-300 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-100">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Books Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trending This Month
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Books our community is loving right now
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                custom={index * 0.1}
                className="group"
                whileHover="hover"
              >
                <div className="bg-gray-800 border-gray-700 rounded-xl shadow-md overflow-hidden border group-hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-60 object-cover"
                      variants={{
                        hover: { scale: 1.05 }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5 flex-grow">
                    <h3 className="font-bold text-lg text-gray-100 mb-1">{book.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{book.author}</p>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(Math.floor(book.rating))].map((_, i) => (
                          <FaStar key={i} className="w-4 h-4" />
                        ))}
                      </div>
                      <span className="text-gray-300 font-medium text-sm">
                        {book.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 mb-16 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to join our reading community?</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-6">
            Sign up now to start sharing your reviews, get personalized recommendations, and connect with fellow book lovers.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-gray-100 text-indigo-700 hover:bg-white px-6 py-3 font-medium rounded-lg shadow-md transition-all"
          >
            Get Started
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.section>
      </div>
    </div>
  );
}

// Data Arrays
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
    cover: "https://i0.wp.com/www.printmag.com/wp-content/uploads/2017/01/2a34d8_d1ccb8ff11be423b910af767d26917b8mv2.jpg?resize=459,640&quality=89&ssl=1",
    title: "1984",
    author: "George Orwell",
    rating: 4.8
  },
  {
    cover: "https://i0.wp.com/www.nationalbook.org/wp-content/uploads/2015/08/To-Kill-a-Mockingbird-by-harper-lee-book-cover-e1553130216100.jpg?w=502&ssl=1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    rating: 4.7
  },
  {
    cover: "https://www.jarir.com/cdn-cgi/image/fit=contain,width=380,height=380,quality=100,metadata=none/https://ak-asset.jarir.com/akeneo-prod/asset/m1images/5/1/517619.jpg",
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.6
  },
  {
    cover: "https://www.ynharari.com/wp-content/uploads/2023/01/Sapiens-UK-website-cover.png",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    rating: 4.5
  }
];