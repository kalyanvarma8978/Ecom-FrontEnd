import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const {
        isAuthenticated,
        loading
    } = useContext(AuthContext);

    // Wait Until Auth Check Completes
    if (loading) {

        return <h1>Loading...</h1>;

    }

    // Redirect If Not Logged In
    if (!isAuthenticated) {

        return <Navigate to="/signin" />;

    }

    return children;

}

export default ProtectedRoute