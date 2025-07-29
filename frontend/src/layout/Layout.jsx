// src/components/Layout.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children, user, onLogout }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        margin: 0,
        padding: 0,
        alignItems: "center",
      }}
    >
      <Header user={user} onLogout={onLogout} />
      <main style={{ flex: 1, width: "100vw", margin: 0, padding: 0 }}>{children}</main>
      <Footer />
    </div>
  );
}
