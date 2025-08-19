// Import the configured Express application
const app = require('./app');

// Load environment variables from .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Extract the PORT variable from environment config
const { PORT } = process.env;

// For Vercel serverless functions - export the app
module.exports = app;

// For local development - start the server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT || 5000, function() {
        console.log(`Server is running at port ${PORT || 5000}`);
    });
}