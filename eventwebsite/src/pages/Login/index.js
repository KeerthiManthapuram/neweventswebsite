import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // Pre-configured Axios for API requests
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css';

import './index.css'

const Login = () => {
    // State to store form input values (email & password)
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    // React Router hook to programmatically navigate to other routes
    const navigate = useNavigate();

    // Navigate user to Signup page when they click "Sign Up"
    const navigateToSignup = () => {
        navigate('/signup');
    }

    // Update credentials state whenever form input changes
    const handleChange = (event) => {
        setCredentials({
            ...credentials, // Keep other fields unchanged
            [event.target.name]: event.target.value // Update the changed field
        })
    }

    // Handle form submission for login
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form refresh
        try {
            // Send POST request to login endpoint with email & password
            const res = await axiosInstance.post('/users/auth/login', credentials);

            // If login is successful
            if (res.data.status === 'success') {
                localStorage.setItem('token', res.data.token); // Save JWT token to local storage
                toast.success('Login successful'); // Show success notification
                navigate('/'); // Redirect to home page
            }
        } catch (err) {
            // Show error from API if available, otherwise generic message
            alert(err.response?.data?.message || 'Login failed');
        }
    }

    return (
        <div className="bg-container">
            {/* Website header */}
            <div className='header'>
                <h1 className='website-icon'>BookUsNow</h1>
            </div>

            {/* Login form container */}
            <div className='login-bg-container'>
                <form onSubmit={handleSubmit} className='form-container'>
                    
                    {/* Email Input Field */}
                    <div className='form-field'>
                        <label htmlFor='email' className='label-item'>Email</label>
                        <input 
                            type="text" 
                            id='email' 
                            name="email"  
                            value={credentials.email}
                            onChange={handleChange} 
                            className='input-element' 
                            placeholder="Email" 
                            required
                        />
                    </div> 

                    {/* Password Input Field */}
                    <div className='form-field'>
                        <label htmlFor='password' className='label-item'>Password</label>
                        <input 
                            type="password" 
                            id='password' 
                            name="password"  
                            value={credentials.password}
                            onChange={handleChange} 
                            className='input-element' 
                            placeholder="Password" 
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button type='submit' className='submit-btn'>Log In</button>

                    {/* Link to Signup */}
                    <p className='login-text'>
                        Don't have an account? 
                        <span className='login-link' onClick={navigateToSignup}> Sign Up</span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;
