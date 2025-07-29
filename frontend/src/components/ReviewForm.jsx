import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE = 'http://localhost:5000/api';

export default function ReviewForm({
  bookId,
  existingReview = null,
  onReviewAdded,
  onReviewUpdated,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    reviewerName: '',
    rating: '',
    comment: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingReview) {
      setFormData({
        reviewerName: existingReview.reviewerName,
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
    if (!formData.reviewerName.trim()) {
      toast.error('Reviewer Name is required');
      return false;
    }
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
      reviewerName: formData.reviewerName.trim(),
      rating: Number(formData.rating),
      comment: formData.comment.trim() || '',
    };

    try {
      if (existingReview) {
        // Update review
        const res = await axios.put(`${API_BASE}/reviews/${existingReview._id}`, payload);
        toast.success('Review updated');
        if (onReviewUpdated) onReviewUpdated(res.data);
      } else {
        // Add new review
        const res = await axios.post(`${API_BASE}/books/${bookId}/reviews`, payload);
        toast.success('Review added');
        if (onReviewAdded) onReviewAdded(res.data);
        setFormData({ reviewerName: '', rating: '', comment: '' });
      }
      if (onCancel && existingReview) onCancel();
    } catch {
      toast.error('Failed to save review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={2}>
      <TextField
        label="Reviewer Name"
        name="reviewerName"
        value={formData.reviewerName}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
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
      />
      <Box mt={2} display="flex" gap={2}>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Saving…' : existingReview ? 'Update Review' : 'Add Review'}
        </Button>
        {existingReview && (
          <Button variant="outlined" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
}
