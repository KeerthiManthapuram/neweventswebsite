// Import Axios library for making HTTP requests
import axios from 'axios';

// Dynamic base URL that works for both development and production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? ''  // Vercel will handle routing
  : 'http://localhost:5500';  // Note: changed port to 5500 to match your backend

// Create a custom Axios instance with a dynamic base URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: enables cookies for authentication
});

// Add a request interceptor to attach the token to every request
axiosInstance.interceptors.request.use((config) => {
  // Retrieve JWT token from localStorage
  const token = localStorage.getItem('token');
  
  // If token exists, add it to the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Always return the modified config so the request proceeds
  return config;
});

// Export the custom Axios instance so it can be reused across the app
export default axiosInstance;