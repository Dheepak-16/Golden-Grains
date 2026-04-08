import React from "react";
import "./Admin.css";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    window.location.href = "/";
  }

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>

        <ul>
          <li>Dashboard</li>
          <li>Products</li>
          <li>Orders</li>
          <li>Users</li>
        </ul>
      </div>

      {/* CONTENT */}
      <div className="admin-content">

        <h1>Add Product</h1>

        <form className="admin-form">
          <input type="text" placeholder="Product Name" />

          <input type="file" />

          <button type="submit">Upload</button>
        </form>

      </div>

    </div>
  );
};

export default AdminDashboard;