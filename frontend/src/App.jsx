import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Landing from "./pages/Landing";
import Explore from "./pages/Home";
import BookPage from "./pages/BookPage";
import BookForm from "./components/BookForm";
import Login from "./pages/Auth/Login";
// import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [user, setUser] = useState(null);



  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/books/new" element={user ? <BookForm /> : <Login onLogin={handleLogin} />} />
          <Route path="/books/edit/:id" element={user ? <BookForm /> : <Login onLogin={handleLogin} />} />
          <Route path="/books/:id" element={<BookPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* <Route path="/register" element={<Register onLogin={handleLogin} />} /> */}
          {/* Add more routes as needed */}
          <Route path="/explore" element={<Explore />} />


          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}
