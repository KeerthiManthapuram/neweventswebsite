// Initialize database connection
require('./config/db');

// Import Express framework to build the application
const express = require('express');
const app = express();

const cors = require('cors');


app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL || true  // Will be set in Vercel
        : 'http://localhost:3000',
    credentials: true
}));


// Import route handlers
const authRouter = require('./routes/authRouter');

// Import centralized error handler middleware
const errorHandler = require('./middlewares/errorHandler');

// Built-in middleware to parse incoming JSON payloads (req.body)
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());


/**
 * Auth Routes (Signup, Login, Logout)
 * Example: POST /users/auth/signup
 */
app.use('/users/auth', authRouter);

/**
 * Global Error Handler
 * Catches and formats any unhandled errors in the app
 */
app.use(errorHandler);

// Export the app instance to be used by the server file
module.exports = app;