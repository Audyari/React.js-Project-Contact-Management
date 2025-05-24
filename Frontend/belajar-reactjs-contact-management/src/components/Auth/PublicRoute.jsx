// src/components/Auth/PublicRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const token = localStorage.getItem('token');
    
    // Jika sudah login, redirect ke dashboard
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;