// Import the configured Express application
const app = require('./app');

// Load environment variables from .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Extract the PORT variable from environment config
const { PORT } = process.env;

/**
 * Start the server
 * Listens for incoming HTTP requests on the specified port
 */
app.listen(PORT, function(req, res) {
    console.log(`Server is running at port ${PORT}`);
});