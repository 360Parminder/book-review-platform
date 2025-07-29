import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../config/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state (e.g., check localStorage or session)
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // You might want to validate the token with your backend here
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // Replace with your actual login API call
      const response = await apiClient.post('/users/login', { email, password });
      if (response.status !== 200) {
        return { success: false, error: response.message || 'Login failed'};
      }
      const data = response.data;
      setUser(data.data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed'};
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};