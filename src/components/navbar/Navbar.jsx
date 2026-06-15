import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const isLogin = localStorage.getItem("isLogin");

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("User logged out successfully");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          EMS
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {isLogin && (
              <li className="nav-item">
                <Link className="nav-link" to="/addEmp">
                  Add Employee
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

          </ul>

          <div className="dropdown">

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJAVgEZdN3i24u5KqiegG9MCyzQPyAgKvmMw&s"
              alt="user"
              className="rounded-circle dropdown-toggle"
              width="42"
              height="42"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer", border: "2px solid #fff" }}
            />

            <ul className="dropdown-menu dropdown-menu-end shadow">

              {isLogin ? (
                <>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/help">
                      Help
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}

            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
}