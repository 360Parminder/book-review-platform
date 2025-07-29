import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';
import { toast } from 'react-toastify';
import apiClient from '../config/apiClient';

import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

export default function BookDetail() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingBook, setLoadingBook] = useState(false);
  const [error, setError] = useState(null);

  const fetchBook = async () => {
    try {
      setLoadingBook(true);
      setError(null);
      const res = await apiClient.get(`/books/${id}`);
      setBook(res.data.data.book);
      setReviews(res.data.data.reviews);
    } catch {
      toast.error('Failed to load book details');
      setError('Failed to load book details.');
    } finally {
      setLoadingBook(false);
    }
  };

  useEffect(() => {
    fetchBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDeleteBook = async () => {
    if (!window.confirm('Delete this book? This action cannot be undone.')) return;
    try {
      await apiClient.delete(`/books/${id}`);
      toast.success('Book deleted successfully');
      navigate('/');
    } catch {
      toast.error('Failed to delete book');
    }
  };

  const handleReviewAdded = (newReview) => {
    setBook((prev) => ({
      ...prev,
      reviews: [...(prev.reviews || []), newReview],
    }));
  };

  const handleReviewUpdated = (updatedReview) => {
    setBook((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => (r._id === updatedReview._id ? updatedReview : r)),
    }));
  };

  const handleReviewDeleted = (deletedReviewId) => {
    setBook((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((r) => r._id !== deletedReviewId),
    }));
  };

  if (loadingBook)
    return (
      <Box className="flex justify-center py-20 bg-gray-900 min-h-screen">
        <CircularProgress color="inherit" size={48} thickness={5} />
      </Box>
    );
  if (error)
    return (
      <Box className="flex justify-center py-20 bg-gray-900 min-h-screen">
        <Typography color="error" className="text-red-500 text-lg font-semibold">
          {error}
        </Typography>
      </Box>
    );
  if (!book) return null;

  return (
    <Box className="p-6 max-w-4xl mx-auto text-gray-300 bg-gray-900 rounded-3xl shadow-xl min-h-screen">
      <Typography
        variant="h4"
        gutterBottom
        className="text-indigo-400 font-extrabold tracking-tight"
      >
        {book.title}
      </Typography>
      <Typography className="mb-1">
        <span className="font-semibold text-indigo-500">Author:</span> {book.author}
      </Typography>
      <Typography className="mb-1">
        <span className="font-semibold text-indigo-500">Published Year:</span> {book.publishedYear}
      </Typography>
      {book.genre && (
        <Typography className="mb-4">
          <span className="font-semibold text-indigo-500">Genre:</span> {book.genre}
        </Typography>
      )}

      <Box className="flex flex-wrap gap-4 mb-6">
        <Button
          variant="contained"
          component={Link}
          to={`/books/edit/${id}`}
          sx={{
            bgcolor: '#4f46e5',
            ':hover': { bgcolor: '#4338ca' },
            minWidth: 120,
          }}
        >
          Edit Book
        </Button>
        <Button
          variant="outlined"
          onClick={handleDeleteBook}
          sx={{
            borderColor: '#ef4444',
            color: '#ef4444',
            minWidth: 120,
            ':hover': {
              borderColor: '#dc2626',
              bgcolor: 'rgba(220, 38, 38, 0.1)',
            },
          }}
        >
          Delete Book
        </Button>
      </Box>

      <Divider sx={{ borderColor: 'rgba(156, 163, 175, 0.3)', mb: 4 }} />

      <Typography variant="h5" className="mb-4 text-indigo-400 font-semibold">
        Reviews
      </Typography>
      <ReviewList
        reviews={reviews || []}
        onReviewDeleted={handleReviewDeleted}
        onReviewUpdated={handleReviewUpdated}
      />

      <Box mt={6}>
        <Typography variant="h6" className="mb-2 text-indigo-400 font-semibold">
          Add a Review
        </Typography>
        {/* 
          Make sure inputs inside ReviewForm have dark mode styles (bg-gray-700, text-gray-200, etc.)
          Example:
          <TextField sx={{ input: { color: '#d1d5db' }, backgroundColor: '#1f2937', ... }} />
        */}
        <ReviewForm bookId={id} onReviewAdded={handleReviewAdded} onReviewUpdated={handleReviewUpdated} onReviewDeleted={handleReviewDeleted} />
      </Box>
    </Box>
  );
}

