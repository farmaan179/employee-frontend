import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { addEmployee } from "../../components/services/employeeService";
import "./addEmp.css";

export default function AddEmp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    empType: "",
    dept: "",
    salary: "",
  });

  const [message, setMessage] = useState({ error: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, age, address, dept, empType, salary } =
      formData;

    if (
      !name ||
      !email ||
      !phone ||
      !age ||
      !address ||
      !dept ||
      !empType ||
      !salary
    ) {
      setMessage({
        error: true,
        msg: "All fields are mandatory...",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await addEmployee(formData);
      console.log("Added:", res.data);

      setMessage({
        error: false,
        msg: "Employee added successfully 🎉",
      });

      // reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        address: "",
        empType: "",
        dept: "",
        salary: "",
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage({
        error: true,
        msg: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addEmp-page">
      <Navbar />

      <div className="container addEmp-wrapper">
        <div className="addEmp-card shadow-lg">

          <h2 className="text-center mb-1">➕ Add Employee</h2>
          <p className="text-center text-muted mb-4">
            Fill employee details carefully
          </p>

          {/* MESSAGE */}
          {message.msg && (
            <div
              className={`alert ${
                message.error ? "alert-danger" : "alert-success"
              }`}
            >
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
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  name="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  name="age"
                  className="form-control"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <textarea
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  name="empType"
                  className="form-control"
                  placeholder="Employee Type"
                  value={formData.empType}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  name="dept"
                  className="form-control"
                  placeholder="Department"
                  value={formData.dept}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  name="salary"
                  className="form-control"
                  placeholder="Salary"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Saving..." : "➕ Save Employee"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}