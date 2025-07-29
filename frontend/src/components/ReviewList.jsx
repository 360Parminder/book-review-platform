import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ReviewForm from './ReviewForm';
import { toast } from 'react-toastify';
import apiClient from '../config/apiClient';
import { useNavigate } from 'react-router-dom';

export default function ReviewList({ reviews, onReviewDeleted, onReviewUpdated }) {
  const [editingReview, setEditingReview] = useState(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (review) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      setLoadingDeleteId(review._id);
      await apiClient.delete(`/reviews/${review._id}`);
      toast.success('Review deleted');
      // onReviewDeleted(review._id);
      navigate('/'); // Refresh the page to reflect changes
      
    } catch(error) {
      toast.error(error.response?.data?.message || 'Failed to delete review');
    } finally {
      setLoadingDeleteId(null);
    }
  };

  return (
    <Box>
      {reviews.length === 0 ? (
        <Typography className="text-gray-400">No reviews yet.</Typography>
      ) : (
        reviews.map((review) => (
          <Paper
            key={review._id}
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: '#1f2937', // bg-gray-800
              color: '#d1d5db', // text-gray-300
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            }}
            elevation={5}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: '#a5b4fc', fontWeight: 'bold' }} // indigo-300
                >
                  {review.reviewerName}
                </Typography>
                <Typography sx={{ color: '#cbd5e1' /* text-gray-400 */ }}>
                  Rating: {review.rating} / 5
                </Typography>
                {review.comment && (
                  <Typography sx={{ color: '#cbd5e1' /* text-gray-400 */, mt: 0.5 }}>
                    {review.comment}
                  </Typography>
                )}
              </Box>
              <Box>
                <IconButton
                  aria-label="edit"
                  onClick={() => setEditingReview(review)}
                  size="large"
                  sx={{
                    color: '#818CF8', // indigo-400
                    '&:hover': { color: '#6366F1' }, // indigo-500
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(review)}
                  disabled={loadingDeleteId === review._id}
                  size="large"
                  sx={{
                    color: '#EF4444', // red-500
                    '&:hover': { color: '#DC2626' }, // red-700
                    '&.Mui-disabled': { color: '#9CA3AF' }, // gray-400
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))
      )}

      <Dialog
        open={!!editingReview}
        onClose={() => setEditingReview(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#111827', // bg-gray-900
            color: '#d1d5db', // text-gray-300
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{ color: '#A5B4FC', fontWeight: 'bold' /* indigo-300 */, pb: 0 }}
        >
          Edit Review
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {editingReview && (
            <ReviewForm
              bookId={editingReview.bookId}
              existingReview={editingReview}
              onReviewUpdated={(updated) => {
                onReviewUpdated(updated);
                setEditingReview(null);
              }}
              onCancel={() => setEditingReview(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
