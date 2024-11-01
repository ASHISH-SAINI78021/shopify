import React from "react";
import styles from './User.module.css'
import UserDashboardLayout from "./UserDashboardLayout";
import Layout from "../Layout";

const Order = () => {
  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>User Dashboard</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <UserDashboardLayout/>
        </div>
        <div className={styles.right}>
          <div>Your Orders</div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
