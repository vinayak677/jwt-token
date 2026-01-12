import React from 'react'
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import dashboardStyles from './dashboardStyles';
const Admin = () => {

    const navigate = useNavigate();

    const handleBack = () => {
    navigate('/dashboard');
    }

   return (
    <Card>
      <h1>Admin Dashboard</h1>
      <p>Manage users, settings, reports</p>
      <button style={dashboardStyles.backbutton} onClick={handleBack}>Back</button>
    </Card>
  );

}

export default Admin
