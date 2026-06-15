import React from "react";
import Navbar from "../navbar/Navbar";
import ShowEmp from "../showEmp/ShowEmp";
import Footer from "../footer/Footer";
import "./home.css";

export default function Home() {
  return (
    <div className="home-container">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN SECTION */}
      <main className="main-content container">

        {/* HEADER */}
        <div className="home-header text-center mb-4">
          <h2 className="fw-bold">Employee Dashboard</h2>
          <p className="text-muted">
            Manage your employees in a simple, fast and clean interface
          </p>
        </div>

        {/* EMPLOYEE CARD */}
        <div className="card shadow-lg border-0 p-3 home-card">
          <ShowEmp />
        </div>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}