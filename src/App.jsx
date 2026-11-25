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
import ProjectsPage from './pages/ProjectsPage'
import ProjectBoardPage from './pages/ProjectBoardPage'
import TaskDetailsPage from './pages/TaskDetailsPage'
import MyTasksPage from './pages/MyTasksPage'
import TeamPage from './pages/TeamPage'

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
          <Route path='/projects' element={<ProjectsPage/>}/>
          <Route path="/projects/:projectId" element={<ProjectBoardPage />}/>
            <Route path="/tasks" element={<MyTasksPage />} />
            <Route path='tasks/:taskId' element={<TaskDetailsPage/>}/>
           {/* Admin Only */}
           <Route element={<RoleRoute allowedRoles={["Admin"]}/>}>
              <Route path='/team' element={<TeamPage />}/>

              <Route path="/analytics" element={<Placeholder title="Analytics" />}/>

              <Route path='/settings' element={<Placeholder title="Settings" />}  />
           </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App


