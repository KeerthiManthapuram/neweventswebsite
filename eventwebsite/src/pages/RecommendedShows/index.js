import { useState, useEffect, useRef } from 'react'; 
// Loader spinner for loading states
import { ClipLoader } from 'react-spinners'; 
// Import the card component for rendering each recommended show 
import RecommendedShowCard from '../../components/RecommendedShowCard'; 
// Import the function to fetch recommended shows from the service 
import { fetchRecommendedShows } from "../../services/eventService"; 
// Import Bootstrap Icons for arrow icon usage 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './index.css';

const RecommendedShows = () => { 
    // State to store the list of recommended events 
    const [events, setEvents] = useState([]);
    // State to track loading status while fetching data 
    const [loading, setLoading] = useState(true);
    //state to track if error occurs
    const [error, setError] = useState(null);

    // Reference to the container for potential DOM manipulation or scrolling 
    const containerRef = useRef(null); 
    // useEffect to fetch recommended shows when the component mounts

    useEffect(() => { 
        const loadShows = async () => { 
            try { 
                // Fetch data from the API 
                const data = await fetchRecommendedShows(); 
                // Map API data and adjust key names if needed 
                const mappedEvents = (data.events || []).map(ev => ({ ...ev, imgUrl: ev.img_url})); 
                // Update state with processed events 
                setEvents(mappedEvents); 
            } catch (error) {
                // Log error if fetching fails 
                console.error('Error fetching recommended shows:', error);
                setError("Failed to load events. Please try again later.");

            } finally { // Hide loading spinner once fetching is complete (success or error) 
                setLoading(false); 
            } 
        }
        

    loadShows(); // Trigger data loading 
    }, []); //Empty dependency array → runs only on mount
    
    

    return ( 
        <div className="recommended-shows-section"> 
            {/* Section title with an arrow icon */}
            <h2 className='recommended-shows-title'> Recommended Shows 
            <i className="bi bi-arrow-right right-arrow-icon"></i> </h2>
            {error && <div className="error-message">{error}</div>}
            {/* Container holding the list of recommended shows */} 
            <div className="recommended-shows-container" 
            ref={containerRef}
            > 
            {/* Render each event using RecommendedShowCard */}
            {events.map((event, index) => ( 
                <RecommendedShowCard 
                key={index}
                event={event} 
                index={index + 1} 
                /> 
            ))}
            {/* Show loading spinner while data is being fetched */} 
            {loading && <ClipLoader size={40} color="#ffffff" />} </div> 
            </div> 
            
        );
     };
export default RecommendedShows;