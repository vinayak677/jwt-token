import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dashboardStyles from "./dashboardStyles";

const Dashboard = () => {
  const navigate = useNavigate();
     const[user,setUser]=React.useState(null);
 
     let payload={
       headers:{
         Authorization:`Bearer ${localStorage.getItem("token")}`
       }
     }
 
  useEffect(() => {
     let token=localStorage.getItem("token");
     if(!token)return;
   const fetchData = async () => {
     try {
       const resp = await fetch(
         "https://api.escuelajs.co/api/v1/auth/profile",
         payload
       );
       const data = await resp.json();
       setUser(data);
       localStorage.setItem("role", data.role);
       console.log(data, "from context");
     } catch (error) {
       console.error(error);
     }
   };
 
     fetchData();
 }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={dashboardStyles.container}>
      <div style={dashboardStyles.card}>
        <h1 style={dashboardStyles.heading}>
          Hello, <strong style={{color:"red"}}>{user?.role?.toUpperCase()}</strong> logged in successfully 🎉 
        </h1>

        {user && (
          <div style={dashboardStyles.userInfo}>
            <p><strong>Name:</strong> {user?.name || "N/A"}</p>
            <p><strong>Email:</strong> {user?.email || "N/A"}</p>
          </div>
        )}

        <button style={dashboardStyles.button} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
