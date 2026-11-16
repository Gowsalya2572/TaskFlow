import React from 'react'
import PublicLayout from './layout/PublicLayout'
import { Route, Routes } from 'react-router-dom'
import LandingPge from './pages/LandingPge'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

const App = () => {
  return (
    <Routes>

      <Route element={<PublicLayout />}>
         <Route path='/' element={<LandingPge />} />
         <Route path='/login' element={<LoginPage/>}/>
         <Route path='/register' element={<RegisterPage/>}/>
         <Route path='/dashboard' element={<DashboardPage/>}/>
      </Route>
      

    </Routes>
  )
}

export default App


