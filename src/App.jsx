import React from 'react'
import PublicLayout from './layout/PublicLayout'
import { Route, Routes } from 'react-router-dom'
import LandingPge from './pages/LandingPge'

const App = () => {
  return (
    <Routes>

      <Route element={<PublicLayout />}>
         <Route path='/' element={<LandingPge />} />
      </Route>

    </Routes>
  )
}

export default App


