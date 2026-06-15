import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import { useNavigate } from "react-router-dom";
import "./showEmp.css";

export default function ShowEmp() {
  const navigate = useNavigate();

  const [empList, setEmpList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmpList(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (empId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(empId);

      setEmpList((prev) =>
        prev.filter((emp) => emp._id !== empId)
      );

      alert("Employee deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Error deleting employee");
    }
  };

  if (loading) {
    return <div className="loading">Loading Employees...</div>;
  }

  return (
    <div className="showEmp">
      <h2 className="page-title">
        Employee Management System
      </h2>

      <div className="table-wrapper">
        <table className="emp-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Address</th>
              <th>Type</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {empList.length > 0 ? (
              empList.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.age}</td>
                  <td>{emp.address}</td>
                  <td>{emp.empType}</td>
                  <td>{emp.dept}</td>
                  <td>₹{emp.salary}</td>

                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-edit"
                        onClick={() =>
                          navigate("/updateEmp", {
                            state: emp,
                          })
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-delete"
                        onClick={() =>
                          handleDelete(emp._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-data">
                  No Employee Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}