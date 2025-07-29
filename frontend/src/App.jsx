import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Landing from "./pages/Landing";
import Explore from "./pages/Home";
import BookPage from "./pages/BookPage";
import BookForm from "./components/BookForm";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import apiClient from "./config/apiClient";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (userData) => {
    try {
      const response = await apiClient.post('/users/login', {
        email: userData.email,
        password: userData.password,
      });
      console.log("Login response:", response.data.token);
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.data.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  
  const handleLogout = () => setUser(null);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={handleLogout} /> }>
          <Route index element={<Landing />} />
          <Route path="explore" element={<Explore />} />
          <Route path="books">
            <Route path="new" element={<BookForm />} />
            <Route path="edit/:id" element={<BookForm />} />
            <Route path=":id" element={<BookPage />} />
          </Route>
        </Route> 
        
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        
        <Route path="*" element={
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <div className="text-xl">Page Not Found</div>
            <div className="mt-4">
              <a href="/" className="text-blue-500 hover:underline">Go to Home</a>
            </div>
          </div>
        } />
      </Routes>
    </>
  );
}
