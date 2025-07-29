import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const API_BASE =  'http://localhost:5000/api';

export function AppProvider({ children }) {
  const [books, setBooks] = useState([{
    "_id": "64cfcf7d49f5b3a1f2345671",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedYear": 1925,
    "genre": "Fiction"
  },
  {
    "_id": "64cfcf7d49f5b3a1f2345672",
    "title": "1984",
    "author": "George Orwell",
    "publishedYear": 1949,
    "genre": "Dystopian"
  },
  {
    "_id": "64cfcf7d49f5b3a1f2345673",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "publishedYear": 1960,
    "genre": "Fiction"
  }
]
);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all books, optional filters you can pass in future
  // const fetchBooks = async (filters = {}) => {
  //   try {
  //     setLoadingBooks(true);
  //     setError(null);
  //     // const params = new URLSearchParams(filters).toString();
  //     // const url = params ? `${API_BASE}/books?${params}` : `${API_BASE}/books`;
  //     // const res = await axios.get(url);
  //     // setBooks(res.data);
  //     setBooks([
  //       {
  //         "_id": "64cfcf7d49f5b3a1f2345671",
  //         "title": "The Great Gatsby",
  //         "author": "F. Scott Fitzgerald",
  //         "publishedYear": 1925,
  //         "genre": "Fiction"
  //       },
  //       {
  //         "_id": "64cfcf7d49f5b3a1f2345672",
  //         "title": "1984",
  //         "author": "George Orwell",
  //         "publishedYear": 1949,
  //         "genre": "Dystopian"
  //       },
  //       {
  //         "_id": "64cfcf7d49f5b3a1f2345673",
  //         "title": "To Kill a Mockingbird",
  //         "author": "Harper Lee",
  //         "publishedYear": 1960,
  //         "genre": "Fiction"
  //       }
  //     ]);
  //   } catch (err) {
  //     setError('Failed to load books');
  //   } finally {
  //     setLoadingBooks(false);
  //   }
  // };

  // Create, update, delete handlers can be added here or inside components

  return (
    <AppContext.Provider
      value={{
        books,
        setBooks,
        // fetchBooks,
        loadingBooks,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
