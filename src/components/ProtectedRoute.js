import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const location = useLocation();
    const isAuth = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // If not authenticated, redirect to login
    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    // If admin route is required but user is not admin, redirect to dashboard
    if (requireAdmin && role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute
