import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../config/apiClient';

export default function BookForm() {
  const { id } = useParams(); // id=null for new, else edit
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedYear: '',
    genre: '',
  });

  const [loading, setLoading] = useState(false);

  // Load existing book data if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      apiClient.get(`/books/${id}`)
        .then((res) => {
          setFormData({
            title: res.data.data.book.title,
            author: res.data.data.book.author,
            publishedYear: res.data.data.book.publishedYear.toString(),
            genre: res.data.data.book.genre || '',
          });
        })
        .catch(() => {
          toast.error('Failed to load book');
          navigate('/');
        })
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return false;
    }
    if (!formData.author.trim()) {
      toast.error('Author is required');
      return false;
    }
    if (!formData.publishedYear.trim() || isNaN(formData.publishedYear)) {
      toast.error('Valid Published Year is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const payload = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      publishedYear: Number(formData.publishedYear),
      genre: formData.genre.trim() || null,
    };

    try {
      if (id) {
        await apiClient.put(`/books/${id}`, payload);
        toast.success('Book updated');
      } else {
        await apiClient.post(`/books`, payload);
        toast.success('Book created');
      }
      navigate('/');
    } catch {
      toast.error('Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <CircularProgress />;

  return (
    <Box component="form" p={2} onSubmit={handleSubmit} maxWidth={600} mx="auto">
      <Typography variant="h5" mb={2}>
        {id ? 'Edit Book' : 'Add New Book'}
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Published Year"
        name="publishedYear"
        value={formData.publishedYear}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Genre"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Box mt={3}>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Saving…' : id ? 'Update Book' : 'Create Book'}
        </Button>
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
