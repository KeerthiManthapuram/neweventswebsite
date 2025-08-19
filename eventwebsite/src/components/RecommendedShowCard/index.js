import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { useState } from 'react';

/**
 * Optimized Google Drive thumbnail URL generator
 * Uses thumbnail API which is more reliable for web apps
 */
const getDriveImageUrl = (url, size = 'w1000') => {
  if (!url) return '';
  
  // Handle various Google Drive URL formats
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/, // Standard /file/d/ID format
    /id=([a-zA-Z0-9_-]+)/, // Query parameter format
    /^([a-zA-Z0-9_-]{20,})$/ // Just the file ID
  ];
  
  let fileId = null;
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      fileId = match[1];
      break;
    }
  }
  
  // If no Google Drive file ID found, return original URL
  if (!fileId) {
    return url;
  }
  
  // Return thumbnail URL - this is the most reliable method
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
};

/**
 * Date formatter
 */
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Enhanced RecommendedShowCard with thumbnail-first approach
 */
const RecommendedShowCard = ({ event, index }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Use a more reliable fallback image
  const fallbackImage = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&crop=entropy&auto=format&q=60';
  
  // Get the optimized image URL
  const imageUrl = imageError 
    ? fallbackImage 
    : getDriveImageUrl(event.imgUrl || fallbackImage, 'w1200'); // Higher resolution for better quality
  
  const handleImageError = () => {
    console.log('Image failed to load:', imageUrl);
    setImageError(true);
  };
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  return (
    <div
      className="show-card"
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '--i': index,
      }}
    >
      {/* Hidden image for error detection */}
      <img
        src={getDriveImageUrl(event.imgUrl || fallbackImage)}
        alt="event-preview"
        style={{ display: 'none' }}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy" // Optimize loading performance
      />
      
      {/* Loading state */}
      {!imageLoaded && !imageError && (
        <div className="image-loading-overlay">
          <div className="loading-spinner">
            <i className="bi bi-image"></i>
          </div>
        </div>
      )}
      
      {/* Content overlay with better contrast */}
      <div className="show-details">
        <div className="section">
          <h3 className="recommended-event-name">{event.eventName}</h3>
          <p className="show-data">
            <i className="bi bi-geo-alt-fill location-iconz"></i>
            {event.cityName}
          </p>
        </div>
        
        <div className="section">
          <p className="show-data">{formatDate(event.date)}</p>
          <p className="show-data">
            {event.weather} | {parseFloat(event.distanceKm).toFixed(0)} km
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedShowCard;