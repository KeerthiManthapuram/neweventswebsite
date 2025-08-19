const jwt = require('jsonwebtoken');

const protectRouteMiddleware = (req, res, next) => {
  try {
    // 1. Get token from cookie
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.JWT;

    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated. Token missing.' });
    }

    // 3. Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info to request for future use
    req.user = decoded;

    // 5. Move to next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token. Please login again.' });
  }
};

module.exports =  protectRouteMiddleware;
