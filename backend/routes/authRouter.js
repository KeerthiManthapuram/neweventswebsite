// Import Express to create routes
const express = require('express'); 

// Create a new Express router instance
const router = express.Router();

// Import the authentication controller (contains signup, login, logout logic)
const authController = require('../controller/authController');  

// Import middleware to validate request body fields
const { validateRequestBody } = require('../middlewares/validateRequest');

// Destructure specific controller functions for easy use
const { signupController, loginController, logoutController } = authController;

const  protectRouteMiddleware  = require('../middlewares/protectRouteMiddleware');

router.get('/verify', protectRouteMiddleware, (req, res) => {
  return res.status(200).json({ message: 'Token verified', user: req.user });
});



/**
 * Route: POST /signup
 * Description: Registers a new user
 * Middleware:
 *   - validateRequestBody: Ensures 'name', 'email', and 'password' are provided
 * Controller:
 *   - signupController: Handles user creation logic
 */
router.post('/signup', validateRequestBody(['name', 'email', 'password']), signupController);


/**
 * Route: POST /login
 * Description: Authenticates a user and sets a JWT cookie
 * Middleware:
 *   - validateRequestBody: Ensures required fields are present
 * Controller:
 *   - loginController: Verifies credentials and generates JWT
 */
router.post('/login', validateRequestBody(['email', 'password']), loginController);


/**
 * Route: POST /logout
 * Description: Logs out a user by clearing the JWT cookie
 * Controller:
 *   - logoutController: Handles cookie removal
 */
router.post('/logout', logoutController);


// Export the router to be used in app.js
module.exports = router;