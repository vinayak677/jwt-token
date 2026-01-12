
import React,{useContext, useEffect} from 'react'

let authContext=React.createContext();
export const AuthUser=()=>useContext(authContext);

const AuthContext = ({ children }) => {
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


  return (
    <authContext.Provider value={{user}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthContext
