import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import apiClient from '../config/apiClient';
import { useNavigate } from 'react-router-dom';

export default function ReviewForm({
  bookId,
  existingReview = null,
  onReviewAdded,
  onReviewUpdated,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (existingReview) {
      setFormData({
        rating: existingReview.rating.toString(),
        comment: existingReview.comment || '',
      });
    }
  }, [existingReview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const ratingNum = Number(formData.rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      toast.error('Rating must be between 1 and 5');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const payload = {
      rating: Number(formData.rating),
      comment: formData.comment.trim() || '',
    };

    try {
      if (existingReview) {
        // Update review
        const res = await apiClient.put(`/reviews/${existingReview._id}`, payload);
        toast.success('Review updated');
        // if (onReviewUpdated) onReviewUpdated(res.data);
        navigate('/'); // Refresh the page to reflect changes
      } else {
        // Add new review
        const res = await apiClient.post(`/reviews/books/${bookId}/reviews`, payload);
        toast.success('Review added');
        if (onReviewAdded) onReviewAdded(res.data);
        setFormData({ rating: '', comment: '' });
        // onReviewAdded(res.data.review);
        navigate('/'); // Refresh the page to reflect changes
      }
      if (onCancel && existingReview) onCancel();
    } catch(error) {
      toast.error(error.response?.data?.message || 'Failed to save review');
    } finally {
      setLoading(false);
    }
  };

  const inputSx = {
    backgroundColor: '#1f2937', // bg-gray-800
    borderRadius: 2,
    input: {
      color: '#f9fafb', // gray-50 (lighter white for readability)
      '&::placeholder': {
        color: '#9ca3af', // gray-400 for placeholder
      },
    },
    textarea: {
      color: '#f9fafb',
      '&::placeholder': {
        color: '#9ca3af',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#374151', // border-gray-700
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4f46e5', // indigo-600
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4f46e5',
      borderWidth: 2,
    },
    '& .MuiInputLabel-root': {
      color: '#fff', // gray-400
    },
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={2}>
      <TextField
        label="Rating (1 to 5)"
        name="rating"
        type="number"
        inputProps={{ min: 1, max: 5 }}
        value={formData.rating}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        sx={inputSx}
      />
      <TextField
        label="Comment"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
        margin="normal"
        sx={inputSx}
      />
      <Box mt={2} display="flex" gap={2}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            bgcolor: '#4f46e5', // indigo-600
            '&:hover': { bgcolor: '#4338ca' },
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          {loading ? 'Saving…' : existingReview ? 'Update Review' : 'Add Review'}
        </Button>
        {existingReview && (
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={loading}
            sx={{
              borderColor: '#4f46e5',
              color: '#4f46e5',
              '&:hover': {
                bgcolor: 'rgba(79, 70, 229, 0.1)',
                borderColor: '#4338ca',
              },
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
}
