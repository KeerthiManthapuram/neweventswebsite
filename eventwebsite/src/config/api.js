const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // Vercel will handle routing
  : 'http://localhost:5500/api';

export default API_BASE_URL;