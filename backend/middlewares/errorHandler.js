/**
 * Centralized Error Handling Middleware
 * This function catches and handles any errors thrown in route handlers or middleware.
 * It's registered at the end of the middleware stack in `app.js`.
 */
const errorHandler = (err, req, res, next) => {
    // Log the full error stack trace to the console for debugging
    console.error("Error :", err.stack);

    // Respond with the error's status code if available, or default to 500 (Internal Server Error)
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
};

// Export the middleware so it can be used in app.js
module.exports = errorHandler;