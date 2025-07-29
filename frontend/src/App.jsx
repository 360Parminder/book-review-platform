import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Landing from "./pages/Landing";
import Explore from "./pages/Home";
import BookForm from "./components/BookForm";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./context/AuthContext";
import BookDetail from "./pages/BookDetail";
import ScrollToTop from "./utils/ScrollToTop";

export default function App() {
  const {isAuthenticated,user,
    loading,
    login,
    logout,} = useAuth();

  return (
    <>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={logout} /> }>
          <Route index element={<Landing />} />
          <Route path="explore" element={<Explore />} />
          <Route path="books">
            <Route path="new" element={<BookForm />} />
            <Route path="edit/:id" element={<BookForm />} />
            <Route path=":id" element={<BookDetail />} />
          </Route>
        </Route> 

        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register onLogin={login} />} />

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
