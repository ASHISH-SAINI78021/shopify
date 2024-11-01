import React from 'react'
import Layout from '../../Layout/Layout'
import styles from './Admin.module.css'
import DashboardLayout from './DashboardLayout'

const User = () => {
  return (
    <Layout title={"Dashboard - All users"}>
      <h1 style={{textAlign: "center"}}>Admin Dashboard</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <DashboardLayout/>
        </div>
        <div className={styles.right}>
        <div>
          All Users
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default User
