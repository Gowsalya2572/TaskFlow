import React from 'react'
import PublicLayout from './layout/PublicLayout'
import { Route, Routes } from 'react-router-dom'
import LandingPge from './pages/LandingPge'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardLayout from './layout/DashboardLayout'
import RoleRoute from './routes/RoleRoute'

const Placeholder = ({ title }) => <h1 className="text-2xl font-bold">{title}</h1>;
const App = () => {
  return (
    <Routes>

      <Route element={<PublicLayout />}>
         <Route path='/' element={<LandingPge />} />
         <Route path='/login' element={<LoginPage/>}/>
         <Route path='/register' element={<RegisterPage/>}/>
      </Route>
      
      <Route element={<ProtectedRoute/>}>
        <Route element={<DashboardLayout/>}>
         <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/projects' element={<Placeholder title="Projects"/>}/>
           <Route path='/my-tasks' element={<Placeholder title="My Tasks"/>}/>
           {/* Admin Only */}
           <Route element={<RoleRoute allowedRoles={["Admin"]}/>}>
              <Route path='/team' element={<Placeholder title="Team" />}/>

              <Route path="/analytics" element={<Placeholder title="Analytics" />}/>

              <Route path='/settings' element={<Placeholder title="Settings" />}  />
           </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App


