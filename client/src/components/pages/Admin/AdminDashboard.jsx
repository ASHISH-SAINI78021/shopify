import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import styles from "./AdminDashboard.module.css";
import DashboardLayout from "../../Layout/Admin/DashboardLayout";

const AdminDashboard = () => {
  return (
    <Layout>
       <h1 style={{textAlign: "center"}}>Admin Dashboard</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <DashboardLayout/>
        </div>
        <div className={styles.right}>
        
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
