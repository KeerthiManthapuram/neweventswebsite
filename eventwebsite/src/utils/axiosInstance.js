// Import Axios library for making HTTP requests
import axios from 'axios';

// Create a custom Axios instance with a default base URL
// This avoids repeating the base URL in every request
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5500', // Change this to your API's base URL in production
});

// Add a request interceptor to attach the token to every request
axiosInstance.interceptors.request.use((config) => {
  // Retrieve JWT token from localStorage (or cookies if you prefer)
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
