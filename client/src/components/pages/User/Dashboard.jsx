import React from 'react'
import Layout from '../../Layout/Layout'
import styles from './Dashboard.module.css'
import UserDashboardLayout from '../../Layout/User/userDashboardLayout'


const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <h1 style={{textAlign: "center"}}>User Dashboard</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <UserDashboardLayout/>
        </div>
        <div className={styles.right}>
            
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
