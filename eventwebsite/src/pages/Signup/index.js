import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // Custom axios instance for API requests
import { useNavigate } from 'react-router-dom'; // For navigation after signup

import { toast } from 'react-toastify'; // For showing success/error messages
import 'react-toastify/dist/ReactToastify.css';

import './index.css'

const Signup = () => {
    // State to store form input values
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    // React Router hook for page navigation
    const navigate = useNavigate();

    // Navigate user to login page
    const navigateToLogin = () => {
        navigate('/login');
    }

    // Handle input changes and update state
    const handleChange = (event) => {
        setFormData({
            ...formData, // Keep existing values
            [event.target.name]: event.target.value // Update only the changed field
        });
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
    try {
        // Fixed: Added leading slash to the endpoint
        const res = await axiosInstance.post('/users/auth/signup', formData);
        
        if (res.data.status === 'success') {
            toast.success('SignUp successful');
            navigate('/login');
        } 
    } catch (err) {
        console.error('Signup error:', err);
        alert(err.response?.data?.message || 'Signup failed');
    }
    }

    return (
        <div className="signup-bg-container">
            {/* Website header */}
            <div className='header'>
                <h1 className='website-icon-signup'>BookUsNow</h1>
            </div>

            {/* Signup form container */}
            <div className='signup-container'>
                <form onSubmit={handleSubmit} className='signup-form-container'>

                    {/* Name field */}
                    <div className='signup-form-field'>
                        <label htmlFor='name' className='signup-label-item'>Name</label>
                        <input 
                            type="text"
                            id='name'
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='signup-input-element'
                            placeholder="Name"
                            required
                        />
                    </div> 

                    {/* Email field */}
                    <div className='signup-form-field'>
                        <label htmlFor='email' className='signup-label-item'>Email</label>
                        <input 
                            type="text"
                            id='email'
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='signup-input-element'
                            placeholder="Email"
                            required
                        />
                    </div> 

                    {/* Password field */}
                    <div className='signup-form-field'>
                        <label htmlFor='password' className='signup-label-item'>Password</label>
                        <input 
                            type="password"
                            id='password'
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='signup-input-element'
                            placeholder="Password"
                            required
                        />
                    </div>

                    {/* Signup button */}
                    <button type='submit' className='signup-submit-btn'>Sign Up</button>

                    {/* Link to login page */}
                    <p className='signup-login-text'>
                        Already have an account? 
                        <span className='signup-login-link' onClick={navigateToLogin}> Log in</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
