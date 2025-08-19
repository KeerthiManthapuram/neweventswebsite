// Import JWT for token verification
const jwt = require('jsonwebtoken');

// Convert jwt.verify (callback-based) into a promise-based function for easier async/await usage
const { promisify } = require('util');
const verifyJWT = promisify(jwt.verify);

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Destructure the JWT secret from environment variables
const { JWT_SECRET } = process.env;


/**
 * Middleware: protectRouteMiddleware
 * This middleware protects private routes by:
 * - Checking for a valid JWT in the Authorization header
 * - Verifying the token
 * - Attaching the decoded user ID to the request object
 */
const protectRouteMiddleware = async function(req, res, next) {
    try {
        // Get the Authorization header from the request
        const authHeader = req.headers.authorization;

        // If token is missing or does not start with 'Bearer '
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: "failure",
                message: "Authorization header missing or malformed."
            });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(' ')[1];

        // Verify the token using the secret key
        const decoded = await verifyJWT(token, JWT_SECRET);

        // Attach decoded user ID to request object for further use in route handlers
        req.userId = decoded.id;

        // Proceed to the next middleware or route handler
        next();
        
    } catch (err) {
        // Handle invalid or expired token errors
        console.error("JWT error:", err.message);
        res.status(401).json({
            status: "failure",
            message: "Invalid or expired token."
        });
    }
};

// Export the middleware for use in protected routes
module.exports = { protectRouteMiddleware };