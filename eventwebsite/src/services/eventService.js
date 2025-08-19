// Get API base URL and API key from environment variables
// These are stored in the .env file and accessed at build time
const BASE_URL = process.env.REACT_APP_BASE_URL; 
const API_KEY = process.env.REACT_APP_API_KEY;

// Function to fetch recommended shows from the API
export const fetchRecommendedShows = async () => {
    // Construct the full API URL with the API key and query type
    const url = `${BASE_URL}?code=${API_KEY}&type=reco`;

    // Send GET request to the API
    const response = await fetch(url);

    // If the response is not successful, throw an error
    if (!response.ok){
        throw new Error(`Failed to fetch Recommended shows`);
    }

    // Parse and return JSON data from the response
    return response.json();
}

// Function to fetch upcoming events with pagination support
// `page` parameter defaults to 1 if not provided
export const fetchUpcomingEvents = async (page = 1) => {
    // Construct the full API URL with API key, page number, and query type
    const url = `${BASE_URL}?code=${API_KEY}&page=${page}&type=upcoming`;

    // Send GET request to the API
    const response = await fetch(url);

    // If the response is not successful, throw an error
    if (!response.ok){
        throw new Error(`Failed to fetch Upcoming events`);
    }

    // Parse and return JSON data from the response
    return response.json();
}
