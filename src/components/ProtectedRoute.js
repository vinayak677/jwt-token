import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    let isAuth = localStorage.getItem("token")

   return isAuth ? children : <Navigate to="/" />
}
export default ProtectedRoute
