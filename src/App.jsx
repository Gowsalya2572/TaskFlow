import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layout/PublicLayout'
import DashboardLayout from './layout/DashboardLayout'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout/>}>
         <Route path='/' element={<LandingPage />} />
         <Route path='/login' element={<Login />} />
         <Route path='/register' element={<Register />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
    </Routes>
  )
}

export default App

