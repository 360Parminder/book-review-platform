import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const API_BASE =  'http://localhost:8007/api/v1';

export function AppProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all books, optional filters you can pass in future
  const fetchBooks = async (filters = {}) => {
    try {
      setLoadingBooks(true);
      setError(null);
      const params = new URLSearchParams(filters).toString();
      const url = params ? `${API_BASE}/books?${params}` : `${API_BASE}/books`;
      const res = await axios.get(url);
      console.log('Fetched books:', res.data);

      setBooks(res.data.data.books);
    } catch (err) {
      setError('Failed to load books');
    } finally {
      setLoadingBooks(false);
    }
  };

  // Create, update, delete handlers can be added here or inside components

  return (
    <AppContext.Provider
      value={{
        books,
        setBooks,
        fetchBooks,
        loadingBooks,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
