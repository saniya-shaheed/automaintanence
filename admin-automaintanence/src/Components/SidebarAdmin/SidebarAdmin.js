import React from 'react'

function SidebarAdmin() {
  return (
    <div>
      <ul style={{listStyle:"none"}}>
        <li><a href='/adminDAF/dashboard'> Dashboard </a></li>
        <li><a href='/adminDAF/customers/'> Customers </a></li>
        <li> Vehicles </li>
        <li> Expenses </li>
        <li> Income </li>
        <li> Employees </li>
        <li> Log Out </li>
      </ul>
    </div>
  )
}

export default SidebarAdmin
