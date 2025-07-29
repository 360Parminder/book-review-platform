import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
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

  return (
    <Box className="p-4 max-w-7xl mx-auto">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="text-indigo-700 font-extrabold text-center md:text-left"
      >
        Book List
      </Typography>

      {/* Filters */}
      <Box
        mb={6}
        display="flex"
        flexWrap="wrap"
        gap={3}
        className="justify-center md:justify-start"
      >
        <TextField
          label="Author"
          name="author"
          value={filters.author}
          onChange={handleInputChange}
          size="small"
          className="min-w-[180px]"
          variant="outlined"
        />
        <TextField
          label="Genre"
          name="genre"
          value={filters.genre}
          onChange={handleInputChange}
          size="small"
          className="min-w-[180px]"
          variant="outlined"
        />
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={applyFilter}
            disableElevation
            sx={{ minWidth: 120 }}
          >
            Apply
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={clearFilter}
            disableElevation
            sx={{ minWidth: 120 }}
          >
            Clear
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="ml-auto"
        >
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/books/new"
            disableElevation
          >
            Add New Book
          </Button>
        </motion.div>
      </Box>

      {/* Content */}
      {loadingBooks ? (
        <Box className="flex justify-center py-20">
          <CircularProgress color="primary" size={48} thickness={5} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" className="text-lg">
          {error}
        </Typography>
      ) : books.length === 0 ? (
        <Typography align="center" className="text-lg text-gray-600">
          No books found.
        </Typography>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {books.map((book) => (
            <motion.div
              key={book._id || book.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  className="text-indigo-700 font-semibold mb-2 truncate"
                >
                  {book.title}
                </Typography>
                <Typography variant="body2" className="mb-1 text-gray-700">
                  <span className="font-semibold">Author:</span> {book.author}
                </Typography>
                <Typography variant="body2" className="mb-1 text-gray-700">
                  <span className="font-semibold">Published Year:</span>{" "}
                  {book.publishedYear}
                </Typography>
                {book.genre && (
                  <Typography
                    variant="body2"
                    className="mb-1 text-indigo-600 font-medium uppercase"
                  >
                    {book.genre}
                  </Typography>
                )}
              </div>
              <Box mt={3} className="flex gap-3">
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  to={`/books/${book._id || book.id}`}
                  className="flex-1"
                  sx={{
                    color: "rgba(37, 99, 235, 0.8)",
                    borderColor: "rgba(37, 99, 235, 0.5)",
                    "&:hover": {
                      borderColor: "rgba(37, 99, 235, 0.8)",
                      backgroundColor: "rgba(37, 99, 235, 0.1)",
                    },
                  }}
                >
                  View Details
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  to={`/books/edit/${book._id || book.id}`}
                  className="flex-1"
                  sx={{ bgcolor: "#2563eb", "&:hover": { bgcolor: "#1e40af" } }}
                >
                  Edit
                </Button>
              </Box>
            </motion.div>
          ))}
        </motion.div>
      )}
    </Box>
  );
}
