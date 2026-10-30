import React from 'react'
import Sidebar from '../components/Sidebar'

const DashboardLayout = () => {
  return (
    <>
      <Sidebar />
      <main>
        <Header />
        <Outlet />
      </main>
    </>
  )
}

export default DashboardLayout
