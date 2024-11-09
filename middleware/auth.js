const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // Check if user data is present in the token
        console.log('Decoded user:', user); // Log the decoded user data

        // if (!user || !user.role) {
        //     console.error('User data is missing or invalid in the token.');
        //     return res.status(403).json({ message: 'Invalid token structure.' });
        // }

        // Attach user info to request
        req.user = user; // user should now contain { id: user._id, role: user.role }
        console.log('Authenticated user:', req.user); // Log the user object
        next(); // Pass control to the next middleware/route handler
    });
};

// Middleware to authorize admin
const authenticateAdmin = (req, res, next) => {
    console.log('Current user role:', req.user?.role); // Added logging
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            message: "Access denied. Admins only."
        });
    }
};

module.exports = { authenticateToken, authenticateAdmin };
