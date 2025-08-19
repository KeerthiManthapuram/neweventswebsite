// src/routes/ProtectedRoute.js
// This component ensures that only authenticated users can access certain routes.
// If the user is not authenticated, they are redirected to the login page.

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; // Preconfigured Axios instance for API calls

const ProtectedRoute = ({ children }) => {
  // State to track authentication status
  // null = still checking, true = authenticated, false = not authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Function to check if the user is authenticated
    const checkAuth = async () => {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      console.log("Token from localStorage:", token);

      // If token is missing, mark as not authenticated
      if (!token) {
        console.warn("No token found, user is not authenticated.");
        setIsAuthenticated(false);
        return;
      }

      try {
        // Verify token by calling the backend API
        const res = await axiosInstance.get('/users/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        });
        console.log("Auth verified successfully:", res.data);

        // If verification succeeds, mark as authenticated
        setIsAuthenticated(true);
      } catch (err) {
        // If verification fails, mark as not authenticated
        console.error("Token verification failed:", err.response?.data || err.message);
        setIsAuthenticated(false);
      }
    };

    // Run authentication check on component mount
    checkAuth();
  }, []);

  // While still checking authentication status, show loading text
  if (isAuthenticated === null) {
    console.log("Checking auth status...");
    return <p>Loading...</p>;
  }

  // If not authenticated, redirect user to login page
  if (!isAuthenticated) {
    console.warn("Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  // If authenticated, allow access to protected content (children components)
  return children;
};

export default ProtectedRoute;
