import React from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate()
    const logout=()=>{
        localStorage.removeItem("token");
        navigate("/")
    }
  return (
    <div>
      <h1>hello, you logged in successfully</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
