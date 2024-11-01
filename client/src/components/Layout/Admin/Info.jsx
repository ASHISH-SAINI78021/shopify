import React from 'react'
import Layout from '../Layout'
import { useAuth } from '../../context/auth'
import styles from './Admin.module.css'
import DashboardLayout from './DashboardLayout'

const Info = () => {
    const [auth , setauth] = useAuth();
  return (
    <Layout>
      <h1 style={{textAlign: "center"}}>Admin Dashboard</h1>
    <div className={styles.container}>
        <div className={styles.left}>
          <DashboardLayout/>
        </div>
        <div className={styles.right}>
        <div>
          <p>Name : {auth?.user?.name}</p>
          <p>Contact : {auth?.user?.phone}</p>
          <p>Email : {auth?.user?.email}</p>
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default Info
