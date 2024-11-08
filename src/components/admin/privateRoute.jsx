import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem('token'); 
    console.log("Autenticado:", isAuthenticated);
    
    // Si no está autenticado, redirige al login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;
