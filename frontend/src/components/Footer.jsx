import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const footerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-gradient-to-r from-indigo-50 to-blue-100 border-t border-indigo-200 dark:bg-gray-900 dark:border-gray-700 w-full text-gray-800 dark:text-gray-200 h-[10rem]"
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          py: { xs: 8, md: 12 },
          px: { xs: 4, md: 8 },
          color: "text.primary",
        }}
        className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0"
      >
        {/* About Section */}
        <Box className="max-w-sm">
          <Typography
            variant="h6"
            className="font-extrabold text-indigo-700 mb-4"
            component="h3"
          >
            Book Review Platform
          </Typography>
          <Typography variant="body2" className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Your go-to community for discovering, reviewing, and sharing books. Connect with fellow readers and explore new worlds through words.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box>
          <Typography
            variant="h6"
            className="font-semibold text-indigo-700 mb-4"
            component="h3"
          >
            Quick Links
          </Typography>
          <Box className="flex flex-col space-y-2">
            <MuiLink href="/" underline="hover" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600">
              Home
            </MuiLink>
            <MuiLink href="/books/new" underline="hover" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600">
              Add Book
            </MuiLink>
            <MuiLink href="/login" underline="hover" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600">
              Login
            </MuiLink>
            <MuiLink href="/register" underline="hover" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600">
              Register
            </MuiLink>
          </Box>
        </Box>

        {/* Contact & Social */}
        <Box>
          <Typography
            variant="h6"
            className="font-semibold text-indigo-700 mb-4"
            component="h3"
          >
            Contact Us
          </Typography>
          <Typography variant="body2" className="text-gray-700 dark:text-gray-300 mb-4">
            <a href="mailto:support@bookreviewplatform.com" className="underline hover:text-indigo-600">support@bookreviewplatform.com</a>
            <br />
            +1 (555) 123-4567
          </Typography>
          <Box className="flex space-x-5">
            {[["Facebook", FaFacebookF, "https://facebook.com/bookreviewplatform"],
              ["Twitter", FaTwitter, "https://twitter.com/bookreviewplat"],
              ["Instagram", FaInstagram, "https://instagram.com/bookreviewplat"],
              ["Github", FaGithub, "https://github.com/bookreviewplatform"]].map(([name, Icon, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-gray-500 hover:text-indigo-600 transition-colors text-xl"
              >
                <Icon />
              </a>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Bottom Bar */}
      <Box
        sx={{ borderTop: "1px solid" }}
        className="border-indigo-200 dark:border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500 dark:text-gray-400 select-none"
      >
        &copy; {new Date().getFullYear()} Book Review Platform. All rights reserved.
      </Box>
    </motion.footer>
  );
}
