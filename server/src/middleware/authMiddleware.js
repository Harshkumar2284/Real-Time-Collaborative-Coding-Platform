import jwt from 'jsonwebtoken';

/**
 * Middleware to verify the JWT sent from the frontend.
 * This allows the controller to access 'req.user.id'.
 */
export const verifyToken = (req, res, next) => {
    // 1. Get the token from the Authorization header
    // The format is "Bearer <token>"
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // 2. If no token is provided, return 401 (Unauthorized)
    if (!token) {
        return res.status(401).json({ 
            message: "No token provided. Authorization denied." 
        });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

        // 4. Attach the decoded payload (e.g., { id: "..." }) to the req object
        req.user = decoded;

        // 5. Move to the next function (the controller)
        next();
    } catch (error) {
        // 6. If verification fails (expired or tampered), return 403 (Forbidden)
        console.error("Token verification error:", error.message);
        res.status(403).json({ 
            message: "Invalid or expired token." 
        });
    }
};