import { useState, useEffect, useRef } from 'react';
import { ClipLoader } from 'react-spinners'; // Loader spinner for loading states
import { fetchUpcomingEvents } from '../../services/eventService'; // API call function to fetch events
import UpcomingEventCard from '../../components/UpcomingEventCard'; // Component to display a single event
import './index.css';

// Main UpcomingEvents component
const UpcomingEvents = () => {
  // State to store fetched events
  const [events, setEvents] = useState([]);
  // State to keep track of current page for pagination
  const [page, setPage] = useState(1);
  // State to handle loading spinner display
  const [loading, setLoading] = useState(false);
  // State to track whether initial API load is in progress
  const [initialLoad, setInitialLoad] = useState(true);
  // State to track if more events are available from the API
  const [hasMore, setHasMore] = useState(true);
  //state to track if error occurs
  const [error, setError] = useState(null);

  // Ref to access the scrollable container
  const scrollRef = useRef(null);

  // Function to fetch events based on the current page
  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchUpcomingEvents(page);

      // If no events are returned, set `hasMore` to false to stop further requests
      if (data.events.length === 0) {
        setHasMore(false);
        return;
      }

      // Append new events to the existing list
      setEvents((prev) => [...prev, ...data.events]);
    } catch (err) {
      console.error('Error loading events:', err);
      setError("Failed to load events. Please try again later.");
    } finally {
      // Stop loading indicators
      setLoading(false);
      setInitialLoad(false);
    }
  };

  // Trigger event loading whenever `page` changes
  useEffect(() => {
    loadEvents();
  }, [page]);

  // Infinite scroll logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Check if user has scrolled near the bottom of the container
      const atBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 10;

      // If at bottom, not loading, and more data exists → load next page
      if (atBottom && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    // Attach scroll event listener
    container.addEventListener('scroll', handleScroll);
    // Cleanup listener when component unmounts or dependencies change
    return () => container.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // Loader component for reusability
  const loadingView = () => (
    <div data-testid="loader" className='loader-holder'>
      <ClipLoader color="#00BFFF" size={50} />
    </div>
  );

  // If data is loading for the first time, show loader
  if (initialLoad) {
    return loadingView();
  }

  // Main render
  return (
    <div className='upcoming-events-bg-container'>
      {/* Title section */}
      <div className='upcoming-events-title-holder'>
        <h1 className='upcomming-events-title'>
          Upcomming Events 
        </h1>
        <i className="bi bi-arrow-right right-icon"></i>
      </div>
      {error && <div className="error-message">{error}</div>}
      {/* Scrollable container for infinite scrolling */}
      <div className='upcoming-events-scroll-container' ref={scrollRef}>
        <div className='upcoming-events-list'>
          {/* Render each event card */}
          {!error && events.map((event, idx) => (
            <UpcomingEventCard key={idx} event={event} />
          ))}

          {/* Show loader when fetching next page */}
          {loading && loadingView()}

          {/* End of list message */}
          {!hasMore && (
            <div className='end-message'>No more events to load</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
