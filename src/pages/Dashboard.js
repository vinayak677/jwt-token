import React from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
   const[user,setUser] = React.useState(null);

   let token = localStorage.getItem("token");

   let header={
    headers:{
        Authorization:`Bearer ${token}`
    }
   }

    React.useEffect(()=>{
        const fetchData = async()=>{
            let res = await fetch("https://api.escuelajs.co/api/v1/auth/profile",header);
            let data = await res.json();
            setUser(data);
            console.log(data);
        }
        fetchData();
    },[])
   
    const navigate = useNavigate()
    const logout=()=>{
        localStorage.removeItem("token");
        navigate("/")
    }
  return (
    <div>
      <h1>hello, you logged in successfully</h1>
        {user && (
            <div>
                <p>{user.name || "Name not available"}</p>
                <p>{user.email || "Email not available"}</p>
            </div>
        )}
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
