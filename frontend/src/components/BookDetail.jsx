import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';

import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import { toast } from 'react-toastify';
import apiClient from '../config/apiClient';
export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loadingBook, setLoadingBook] = useState(false);
  const [error, setError] = useState(null);

  const fetchBook = async () => {
    try {
      setLoadingBook(true);
      setError(null);
      const res = await apiClient.get(`/books/${id}`);
      setBook(res.data.data.book);
    } catch {
      toast.error('Failed to load book details');
    } finally {
      setLoadingBook(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    if (!window.confirm('Delete this book? This action cannot be undone.')) return;
    try {
      await apiClient.delete(`/books/${id}`);
      toast.success('Book deleted');
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

  if (loadingBook) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!book) return null;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        {book.title}
      </Typography>
      <Typography>Author: {book.author}</Typography>
      <Typography>Published Year: {book.publishedYear}</Typography>
      {book.genre && <Typography>Genre: {book.genre}</Typography>}

      <Box mt={2} mb={4}>
        <Button variant="contained" color="primary" component={Link} to={`/books/edit/${id}`}>
          Edit Book
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteBook}
          sx={{ ml: 2 }}
        >
          Delete Book
        </Button>
      </Box>

      <Divider />

      <Typography variant="h5" mt={4}>
        Reviews
      </Typography>
      <ReviewList
        reviews={book.reviews || []}
        onReviewDeleted={handleReviewDeleted}
        onReviewUpdated={handleReviewUpdated}
      />

      <Box mt={4}>
        <Typography variant="h6" mb={1}>
          Add a Review
        </Typography>
        <ReviewForm bookId={id} onReviewAdded={handleReviewAdded} />
      </Box>
    </Box>
  );
}
