import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../config/apiClient';

export const AppContext = createContext();

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
      const url = params ? `/books?${params}` : `/books`;
      const res = await apiClient.get(url);
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
