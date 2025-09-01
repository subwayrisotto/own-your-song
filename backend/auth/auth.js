const jwt = require('jsonwebtoken'); 
const jwtKey = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, jwtKey, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token." });
        }

        // Find the user based on the decoded userId
        const user = await User.findById(decoded.userId).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware or route handler
    });
};

export default authenticateToken;