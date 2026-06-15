import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { loginUser } from "../services/authService";
import "./login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMessage("❌ All fields are required");
      return;
    }

    try {
      const res = await loginUser(form);

      console.log("LOGIN RESPONSE:", res.data);

      // ❌ OLD DATA CLEAR (IMPORTANT FIX)
      localStorage.clear();

      // ❌ TOKEN CHECK
      if (!res.data.token) {
        setMessage("❌ Token not received from server");
        return;
      }

      // ✅ SAVE NEW DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isLogin", "true");

      // ✅ IF USER COMES FROM BACKEND
      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      setMessage("✅ Login Successful");

      // ✅ refresh UI properly
      setTimeout(() => {
        navigate("/");
        window.location.reload(); // important fix for stale data
      }, 800);

    } catch (err) {
      console.log("LOGIN ERROR:", err);

      setMessage(
        err.response?.data?.message ||
        "Invalid credentials"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">
        <div className="auth-card">
          <h2>Welcome Back 👋</h2>
          <p>Login to your EMS account</p>

          {message && (
            <div className="alert">{message}</div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <button type="submit">Login</button>
          </form>

          <p className="bottom-text">
            Don't have account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;