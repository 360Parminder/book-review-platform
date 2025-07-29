import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ReviewForm from './ReviewForm';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE ='http://localhost:5000/api';

export default function ReviewList({ reviews, onReviewDeleted, onReviewUpdated }) {
  const [editingReview, setEditingReview] = useState(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);

  const handleDelete = async (review) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      setLoadingDeleteId(review._id);
      await axios.delete(`${API_BASE}/reviews/${review._id}`);
      toast.success('Review deleted');
      onReviewDeleted(review._id);
    } catch {
      toast.error('Failed to delete review');
    } finally {
      setLoadingDeleteId(null);
    }
  };

  return (
    <Box>
      {reviews.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        reviews.map((review) => (
          <Paper key={review._id} sx={{ p: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle1">{review.reviewerName}</Typography>
                <Typography>Rating: {review.rating} / 5</Typography>
                {review.comment && <Typography>{review.comment}</Typography>}
              </Box>
              <Box>
                <IconButton
                  aria-label="edit"
                  onClick={() => setEditingReview(review)}
                  size="large"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(review)}
                  disabled={loadingDeleteId === review._id}
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))
      )}

      <Dialog open={!!editingReview} onClose={() => setEditingReview(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
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
