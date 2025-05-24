// src/components/Auth/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // Redirect ke halaman login jika tidak ada token
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;