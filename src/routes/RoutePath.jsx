import React from "react";
import { Routes, Route } from "react-router-dom";

import AboutUs from "../components/about/AboutUs";
import Home from "../components/home/Home";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import AddEmp from "../components/addEmp/AddEmp";
import UpdateEmp from "../components/updateEmp/UpdateEmp";

function RoutePath() {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Employee Routes */}
      <Route path="/addEmp" element={<AddEmp />} />
      <Route path="/updateEmp" element={<UpdateEmp />} />

      {/* 404 Page (optional but recommended) */}
      <Route
        path="*"
        element={
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default RoutePath;