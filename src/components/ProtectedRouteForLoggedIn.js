import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteForLoggedIn = ({ component: Component, ...props }) => {
    
    return localStorage.getItem("token") ? <Navigate to="/" /> : <Component {...props} />
}

export default ProtectedRouteForLoggedIn;