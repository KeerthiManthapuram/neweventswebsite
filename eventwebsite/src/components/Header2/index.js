import './index.css' // Component-specific styles

import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons for UI elements

// Header2 component - displays location and event category options
const Header2 = () => (
    <div className='header-2'>
        
        {/* Location section */}
        <div className='location-holder'>
            {/* Location icon */}
            <i className="bi bi-geo-alt-fill header2-iconz"></i>

            {/* Location text */}
            <p className='location'>Mumbai, India</p>

            {/* Chevron icon to indicate dropdown or navigation */}
            <i className="bi bi-chevron-right header2-iconz"></i>
        </div>

        {/* Events categories section */}
        <div className='events-holder'>
            {/* Each category is clickable (can later be linked to a filter or page) */}
            <h5 className='event'>Live shows</h5>
            <h5 className='event'>Streams</h5>
            <h5 className='event'>Movies</h5>
            <h5 className='event'>Plays</h5>
            <h5 className='event'>Events</h5>
            <h5 className='event'>Sports</h5> 
            <h5 className='event'>Activities</h5>
        </div>
    </div>
)

export default Header2;
