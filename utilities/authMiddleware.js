/**
 * Authentication Middleware
 * Author: Johnathan Babb
 * Checks if the user is authenticated via OAuth
 */

/**
 * Middleware to check if user is authenticated
 * Use this on routes that require authentication
 */

const ensureAuthenticated = (req, res, next) => {
    // Passport provides req.isAuthenticated() method
    // It returns true if the user is authenticated
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware/route handler
    }

    // User is not authenticated
    res.status(401).json({
        error: 'Unauthorized',
        message: 'Unauthorized: Please log in to access this resource'
    });
};

module.exports = {
    ensureAuthenticated
}