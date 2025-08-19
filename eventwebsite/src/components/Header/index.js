import axiosInstance from '../../utils/axiosInstance'; // Pre-configured Axios instance for API calls
import { useNavigate } from 'react-router-dom'; // React Router hook for navigation

import './index.css' // Component-specific styles
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons for UI elements

const Header = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate between pages

    // Handle logout process
    const handleLogout = async () => {
        try {
            // Send logout request to backend
            await axiosInstance.post('/users/auth/logout');

            alert('Logged Out'); // Inform the user
            navigate('/login'); // Redirect to login page
        } catch (err) {
            // If API call fails
            alert('Logout failed');
        }
    }

    return (
        <div className='Header-bg-container'>
            
            {/* Large screen header layout */}
            <div className='lg-header-container'>
                
                {/* Left section: Logo */}
                <div className='header-section-1'>
                    <h1 className='event-logo'>BookUsNow</h1>
                </div>

                {/* Middle section: Categories button + Search bar */}
                <div className='header-section-2'>
                    {/* Categories button with hamburger icon */}
                    <button className='categories-btn'>
                        <i className="bi bi-list hamberger-icon"></i>
                        Categories
                    </button>

                    {/* Search bar with icon */}
                    <div className='search-bar-holder'>
                        <input type="text" className='search-item' placeholder="Search..." />
                        <div className='search-icon-holder'>
                            <i className="bi bi-search header-iconz"></i>
                        </div>
                    </div>
                </div>

                {/* Right section: Favorites + Logout */}
                <div className='header-section-3'>
                    <button className='favorites-btn'>
                        <i className="bi bi-heart-fill header-iconz"></i>
                        Favorites
                    </button>
                    <button className='sign-out-btn' onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            </div>

            {/* Small screen (mobile) header layout */}
            <div className='sm-header-container'>
                
                {/* Mobile logo */}
                <div className='header-section-1'>
                    <h1 className='event-logo'>BookUsNow</h1>
                </div>

                {/* Mobile header icons: Search, Favorites, Profile */}
                <div className='sm-header-icons-holder'>
                    <i className="bi bi-search sm-header-iconz"></i>
                    <i className="bi bi-heart-fill sm-header-iconz"></i>
                    <i className="bi bi-person-circle sm-header-iconz"></i>
                </div>
            </div>
        </div>
    )
}

export default Header;
