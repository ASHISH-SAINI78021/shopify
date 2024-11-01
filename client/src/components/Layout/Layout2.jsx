import React from 'react'
import Layout from './Layout'
import DashboardLayout from './Admin/DashboardLayout'
import styles from "./Layout2.module.css"

const Layout2 = ({children}) => {
  return (
    <Layout>
      <h1 style={{textAlign:"center"}}>All Products List</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <DashboardLayout />
        </div>
        <div className={styles.right}>
            {children}
        </div>
      </div>
    </Layout>
  )
}

export default Layout2
