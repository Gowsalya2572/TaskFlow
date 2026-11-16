import React from 'react'
import Button from '../components/Button'
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
const logout = useAuthStore((state) => state.logout);

const handleLogout = () => {
  logout();
  navigate("/");
};


  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default DashboardPage
