/**
 * Middleware: validateRequestBody
 * A reusable middleware generator that checks for missing required fields in the request body.
 * 
 * @param {Array} requiredFields - An array of required field names (e.g., ['email', 'password'])
 * @returns A middleware function that validates the request body
 */
const validateRequestBody = (requiredFields) => {
    return (req, res, next) => {
        // Filter out the required fields that are missing in the request body
        const missingFields = requiredFields.filter(field => !req.body[field]);

        // If any fields are missing, return a 400 Bad Request with the missing field names
        if (missingFields.length > 0) {
            return res.status(400).json({
                status: "fail",
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // All required fields are present — continue to the next middleware
        next();
    };
};


/**
 * Middleware: checkInput
 * Checks if the request body is completely empty (no keys or data).
 */
const checkInput = function(req, res, next) {
    const elementDetails = req.body;
    const isEmpty = Object.keys(elementDetails).length === 0;

    // If the body is empty, respond with an error
    if (isEmpty) {
        return res.status(400).json({
            status: 'fail',
            message: 'No data provided. Please include user data.',
        });
    }

    // Body is not empty — proceed to next middleware/handler
    next(); 
}


// Export both middlewares to be used in route files
module.exports = { validateRequestBody, checkInput };