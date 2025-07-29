import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaBookOpen } from "react-icons/fa";
import { RiContactsBookLine } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { BsPhone } from "react-icons/bs";


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const socialLinks = [
  { name: "Facebook", Icon: FaFacebookF, url: "https://facebook.com/bookreviewplatform" },
  { name: "Twitter", Icon: FaTwitter, url: "https://twitter.com/bookreviewplat" },
  { name: "Instagram", Icon: FaInstagram, url: "https://instagram.com/bookreviewplat" },
  { name: "Github", Icon: FaGithub, url: "https://github.com/bookreviewplatform" }
];

const quickLinks = [
  { name: "Home", url: "/" },
  { name: "Add Book", url: "/books/new" },
  { name: "Login", url: "/login" },
  { name: "Register", url: "/register" }
];

export default function Footer() {

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.2 }}
      className="dark bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 border-t w-full transition-colors duration-300"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <motion.div 
            custom={0}
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <FaBookOpen className="text-indigo-400 text-2xl" />
              <Typography
                variant="h6"
                className="font-bold text-indigo-400 text-xl"
                component="h3"
              >
                BookVerse
              </Typography>
            </div>
            <Typography variant="body2" className="text-gray-300 leading-relaxed">
              Your portal to literary adventures. Discover, review, and share your favorite books with a global community of readers.
            </Typography>
            <motion.div 
              className="flex space-x-4 pt-2"
              custom={1}
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
            >
              {socialLinks.map(({ name, Icon, url }) => (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-700 text-gray-300 hover:text-indigo-400 p-2 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <Icon className="text-lg" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <RiContactsBookLine className="text-indigo-400 text-xl" />
              <Typography
                variant="h6"
                className="font-semibold text-indigo-400"
                component="h3"
              >
                Quick Links
              </Typography>
            </div>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  custom={index * 0.1 + 0.3}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeIn}
                  viewport={{ once: true }}
                >
                  <MuiLink 
                    href={link.url} 
                    underline="none" 
                    className="group flex items-center text-gray-300 hover:text-indigo-400 transition-colors"
                  >
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </MuiLink>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            custom={0.4}
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <IoMdMail className="text-indigo-400 text-xl" />
              <Typography
                variant="h6"
                className="font-semibold text-indigo-400"
                component="h3"
              >
                Contact Us
              </Typography>
            </div>
            <div className="space-y-3">
              <motion.div
                custom={0.5}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <IoMdMail className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                <a 
                  href="mailto:support@bookverse.com" 
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  support@bookverse.com
                </a>
              </motion.div>
              <motion.div
                custom={0.6}
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <BsPhone className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  +1 (555) 123-4567
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            custom={0.6}
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Typography
              variant="h6"
              className="font-semibold text-indigo-400"
              component="h3"
            >
              Newsletter
            </Typography>
            <Typography variant="body2" className="text-gray-300">
              Subscribe to get updates on new releases and community events.
            </Typography>
            <motion.div 
              className="flex"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-lg border border-r-0 border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                Join
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400 select-none"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} BookVerse. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Cookies</a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
