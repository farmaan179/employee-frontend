import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { updateEmployee } from "../services/employeeService";
import "./updateEmp.css";

export default function UpdateEmp() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // ✅ safety check (important)
  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  const [form, setForm] = useState({
    name: state?.name || "",
    email: state?.email || "",
    phone: state?.phone || "",
    age: state?.age || "",
    address: state?.address || "",
    empType: state?.empType || "",
    dept: state?.dept || "",
    salary: state?.salary || "",
  });

  const [message, setMessage] = useState({ error: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, age, address, dept, empType, salary } = form;

    if (!name || !email || !phone || !age || !address || !dept || !empType || !salary) {
      setMessage({ error: true, msg: "All fields are mandatory..." });
      return;
    }

    try {
      setLoading(true);

      // ✅ MongoDB FIX (_id)
      await updateEmployee(state._id, form);

      setMessage({
        error: false,
        msg: "✅ Employee updated successfully!",
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage({
        error: true,
        msg: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="updateEmp-page">
      <Navbar />

      <div className="container update-wrapper">
        <div className="update-card shadow-lg">

          <h2 className="text-center mb-1">✏️ Update Employee</h2>
          <p className="text-center text-muted mb-4">
            Edit employee details carefully
          </p>

          {message.msg && (
            <div className={`alert ${message.error ? "alert-danger" : "alert-success"}`}>
              {message.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  name="name"
                  className="form-control"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  name="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  name="age"
                  className="form-control"
                  placeholder="Age"
                  value={form.age}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <textarea
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  name="empType"
                  className="form-control"
                  placeholder="Employee Type"
                  value={form.empType}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  name="dept"
                  className="form-control"
                  placeholder="Department"
                  value={form.dept}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  name="salary"
                  className="form-control"
                  placeholder="Salary"
                  value={form.salary}
                  onChange={handleChange}
                />
              </div>

            </div>

            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Updating..." : "Update Employee"}
            </button>

            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              onClick={() => navigate("/")}
            >
              Back To Home
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}