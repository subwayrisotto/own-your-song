const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtKey = process.env.JWT_SECRET_KEY;

const authenticateToken = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        jwt.verify(token, jwtKey, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token." });
            }

            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            req.user = user; // Attach the user to the request object
            next(); // Proceed to the next middleware (or route handler)
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { authenticateToken };