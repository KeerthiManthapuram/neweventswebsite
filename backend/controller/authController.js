// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Import the User model schema
const UserModel = require('../model/UserModel');

const bcrypt = require("bcrypt");

// Import JWT for creating authentication tokens
const jwt = require("jsonwebtoken");

// Convert callback-based jwt.sign into a promise-based version
const promisify = require("util").promisify;
const promisifiedJWTSign = promisify(jwt.sign);

// Load JWT secret key from environment variables
const { JWT_SECRET } = process.env;

//////////////////////////////////////////
//  Signup Controller
//////////////////////////////////////////
const signupController = async function(req, res){
    try {
        // Extract user data from request body
        const userObject = req.body;

        // Create new user in the database
        let newUser = await UserModel.create(userObject);

        // Send success response with created user info
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            user: newUser
        });
    } catch(err) {
        // Handle errors (e.g., validation, DB connection issues)
        res.status(500).json({
            status: "failure",
            message: err.message
        });
    }
}

//////////////////////////////////////////
//  Login Controller
//////////////////////////////////////////
const loginController = async function (req, res) {
    try {
        // Extract and normalize login credentials
        let { email, password } = req.body;
        email = email.toLowerCase(); // Convert email to lowercase for consistency

        // Find user by email in the database
        const user = await UserModel.findOne({ email });

        // If user doesn't exist
        if (!user) {
            return res.status(404).json({
                status: "failure",
                message: "User not found. Please sign up first."
            });
        }

        // Validate password (simple comparison — replace with hashed comparison in production)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                status: "failure",
                message: "Email or password is invalid"
            });
        }

        // Generate JWT token with user ID as payload
        const token = await promisifiedJWTSign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Send token in HTTP-only cookie
        res.cookie("JWT", token, {
            maxAge: 3600000, // 1 hour in milliseconds
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: "/"
        });

        // Send success response with token
        res.status(200).json({
            status: "success",
            token: token,
            message: "User logged in"
        });

    } catch (err) {
        // Handle server or unexpected errors
        res.status(500).json({
            status: "failure",
            message: err.message
        });
    }
};

//////////////////////////////////////////
//  Logout Controller
//////////////////////////////////////////
const logoutController = async function(req, res){
    try {
        // Overwrite JWT cookie with empty value and immediate expiration
        res.cookie('JWT', '', {
            maxAge: 0,
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        // Send logout success response
        res.status(200).json({
            status: 'success',
            message: 'User logged out successfully.'
        });

    } catch (err) {
        // Handle errors during logout
        res.status(500).json({
            status: 'error',
            message: 'Error occurred during logout.'
        });
    }
}

//////////////////////////////////////////
// Export all controller functions
//////////////////////////////////////////
module.exports = {
    signupController,
    loginController,
    logoutController
};