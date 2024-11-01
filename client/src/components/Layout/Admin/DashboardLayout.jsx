import React from 'react'
import Layout from "../../Layout/Layout";
import { Link } from "react-router-dom";

const DashboardLayout = () => {
    
  return (
    <div>
      <>
      <Link to="/dashboard/admin/user" className="list-group-item list-group-item-action list-group-item-primary" >
        Users
      </Link>

      <Link to="/dashboard/admin/create-category" className="list-group-item list-group-item-action list-group-item-secondary">
        Create Category
      </Link>

      <Link to="/dashboard/admin/add-product" className="list-group-item list-group-item-action list-group-item-success">
        Add Product
      <Link to="/dashboard/admin/allproducts" className="list-group-item list-group-item-action list-group-item-primary">
        All Products
      </Link>
      </Link>
      <Link to="/dashboard/admin/info" className="list-group-item list-group-item-action list-group-item-secondary">
        Information
      </Link>
    </>
    </div>
  )
}

export default DashboardLayout
