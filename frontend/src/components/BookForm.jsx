import React, { useEffect, useState } from 'react';
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
    } catch(error) {
      toast.error(error.response?.data?.message || 'Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  if (loading && id)
    return (
      <Box className="flex justify-center py-20 bg-gray-900 min-h-screen">
        <CircularProgress color="inherit" size={48} thickness={5} />
      </Box>
    );

  const inputSx = {
    backgroundColor: '#1f2937', // bg-gray-800
    borderRadius: 2,
    input: {
      color: '#f9fafb', // gray-50
      '&::placeholder': { color: '#9ca3af' }, // gray-400
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
    <Box
      component="form"
      p={2}
      onSubmit={handleSubmit}
      maxWidth={600}
      mx="auto"
      sx={{ backgroundColor: '#111827', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.7)' }}
    >
      <Typography variant="h5" mb={2} sx={{ color: '#a5b4fc', fontWeight: 'bold' /* indigo-300 */ }}>
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
        sx={inputSx}
      />
      <TextField
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        sx={inputSx}
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
        sx={inputSx}
      />
      <TextField
        label="Genre"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={inputSx}
        InputLabelProps={{
          style: { color: '#fff' }, // gray-400
        }}
      />

      <Box mt={3} display="flex" gap={2}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            bgcolor: '#4f46e5',
            '&:hover': { bgcolor: '#4338ca' },
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          {loading ? 'Saving…' : id ? 'Update Book' : 'Create Book'}
        </Button>
        <Button
          variant="outlined"
          sx={{
            ml: 2,
            borderColor: '#4f46e5',
            color: '#4f46e5',
            '&:hover': {
              bgcolor: 'rgba(79, 70, 229, 0.1)',
              borderColor: '#4338ca',
            },
            fontWeight: 'bold',
            textTransform: 'none',
          }}
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
