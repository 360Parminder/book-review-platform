import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ user, onLogout }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col text-gray-200 items-center">
      <Header user={user} onLogout={onLogout} />
      <main className="flex-1 w-full  max-w-7xl mx-auto px-4 md:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
