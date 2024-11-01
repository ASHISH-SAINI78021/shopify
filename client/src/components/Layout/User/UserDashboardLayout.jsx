import React from 'react'
import {Link} from 'react-router-dom'

const UserDashboardLayout = () => {
  return (
    <div>
      <>
      <Link to="/dashboard/user/order" className="list-group-item list-group-item-action list-group-item-primary" >
        Orders
      </Link>

      <Link to="/dashboard/user/info" className="list-group-item list-group-item-action list-group-item-secondary">
        Profile
      </Link>
    </>
    </div>
  )
}

export default UserDashboardLayout
