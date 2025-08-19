import './index.css' // Component-specific styles
import React, { useState } from 'react'; // React hook for state management
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons for UI elements

/**
 * Converts a Google Drive file link into a thumbnail URL.
 * Supports both `/file/d/FILE_ID` and `id=FILE_ID` link formats.
 * Returns the original URL if it's not a Google Drive link.
 */
const getDriveImageUrl = (url) => {
  const fileIdMatch = url.match(/\/file\/d\/([^/]+)/) || url.match(/id=([^/&]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w1000`;
  }
  return url;
};

/**
 * Formats an ISO date string into "Month Day, Year" format.
 * Example: "2025-08-14" → "August 14, 2025"
 */
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * UpcomingEventCard Component
 * Renders a single event card with:
 *  - Background image (with multiple fallback options)
 *  - Event date
 *  - Event name, city, weather, and distance
 */
const UpcomingEventCard = ({ event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Multiple fallback images - you can customize these URLs
  const fallbackImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop', // Mountain landscape
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop', // Forest landscape
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&auto=format', // Alternative mountain
    'https://via.placeholder.com/300x200/4CAF50/white?text=Event+Image', // Green placeholder
    'https://via.placeholder.com/300x200/2196F3/white?text=Upcoming+Event', // Blue placeholder
  ];

  // Create array of all possible image sources
  const allImageSources = [
    getDriveImageUrl(event.imgUrl), // Primary Google Drive image
    ...fallbackImages // Fallback options
  ];

  const currentImageUrl = allImageSources[currentImageIndex];

  // Handle image load error by trying next fallback
  const handleImageError = () => {
    if (currentImageIndex < allImageSources.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      setImageError(true); // All images failed
    }
  };

  // Reset to primary image when event changes
  const resetImageState = () => {
    setCurrentImageIndex(0);
    setImageError(false);
  };

  // Reset when event.imgUrl changes
  React.useEffect(() => {
    resetImageState();
  }, [event.imgUrl]);

  return (
    <div className="event-card">
      {/* Event image container with background styling */}
      <div
        className='event-image-holder'
        style={{
          backgroundImage: `url(${currentImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // Add a subtle overlay if all images failed
          ...(imageError && {
            backgroundColor: '#f5f5f5',
            backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          })
        }}
      >
        {/* Hidden <img> to detect load errors and trigger fallbacks */}
        {!imageError && (
          <img 
            src={currentImageUrl}
            alt=""
            style={{ display: 'none' }}
            onError={handleImageError}
            onLoad={() => {/* Image loaded successfully */}}
          />
        )}

        {/* Show error message if all images failed */}
        {imageError && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#666',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            <i className="bi bi-image" style={{ fontSize: '24px', marginBottom: '8px' }}></i>
            <br />
            Image unavailable
          </div>
        )}

        {/* Event date badge */}
        <div className='date-holder'>
          <p className='date'>{formatDate(event.date)}</p>
        </div>
      </div>

      {/* Event details section */}
      <div className='event-details-holder'>
        <h2 className='upcoming-event-name'>{event.eventName}</h2>
        
        {/* Location, weather, and distance */}
        <div className='event-details'>
          <h5 className='event-data'>
            <i className="bi bi-geo-alt-fill upcomming-iconz"></i>
            {event.cityName}
          </h5>
          <p className='event-data'>
            {event.weather} | {parseFloat(event.distanceKm).toFixed(1)} km
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpcomingEventCard;