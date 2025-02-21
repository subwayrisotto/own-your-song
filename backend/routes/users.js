const express = require('express');
const User = require('../models/User'); 
const Order = require('../models/Order'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const { sendEmail } = require("../utils/emailSender");
const mongoose = require("mongoose");
const userSignUpEmailTemplate = require('../emails/signUpEmailTemplate');


let usersRoutes = express.Router();

const jwtKey = process.env.JWT_SECRET_KEY;

const handleErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error("❌ Server Error:", error); // ✅ Logs the full error
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    });
};
const tokenBlacklist = new Set();

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: "Token has been invalidated. Please log in again." });
    }

    jwt.verify(token, jwtKey, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token." });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = user;
        next();
    });
};

usersRoutes.route("/users").get(authenticateToken, handleErrors(async (req, res) => {
    const users = await User.find(); 
    if (!users.length) {
        return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json({ users });
}));

usersRoutes.route("/user").get(authenticateToken, handleErrors(async (req, res) => {
    // Send back the authenticated user's data (excluding password)
    res.status(200).json({ user: req.user });
}));

usersRoutes.route("/sign-up").post(
    handleErrors(async (req, res) => {
        const { email, password, confirmPassword, fullName, dob, gender, country, isTermsAgreed } = req.body;

        // Validate required fields
        if (!email || !password || !confirmPassword || !fullName || !dob || !gender || !country) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            fullName,
            dob,
            gender,
            country,
            isTermsAgreed
        });

        const savedUser = await newUser.save();

        // Generate JWT token (valid for 24 hours)
        const token = jwt.sign({ userId: savedUser._id }, jwtKey, { expiresIn: "24h" });

        // Convert guest order to user order (if any)
        const guestToken = req.header("Authorization")?.replace("Bearer ", "");
        if (guestToken) {
            const guestOrder = await Order.findOne({ guestToken });  // Assuming the order is saved with a guestToken field
            if (guestOrder) {
                await convertGuestOrderToUserOrder(savedUser._id, guestOrder);
            }
        }
        
        try {
            await sendEmail(email, 'Welcome to Own Your Song!', userSignUpEmailTemplate({ fullName }));
            console.log(`Welcome email sent to ${email}`);
        } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
        }

        // Send token in response
        res.status(201).json({
            message: "User created successfully!",
            token
        });
    })
);

usersRoutes.route("/sign-in").post(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User with email ${email} does not exist`); // Debugging log
            return res.status(404).json({ message: "User does not exist. Please sign up." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, jwtKey, { expiresIn: "24h" });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, email: user.email }
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

usersRoutes.route("/logout").post(authenticateToken, (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
        tokenBlacklist.add(token); // Blacklist the token
    }
    res.status(200).json({ message: "Logged out successfully." });
});

usersRoutes.route("/user-orders").get(authenticateToken, handleErrors(async (req, res) => {
    try {
        const userId = req.user._id; // Extract the userId from the authenticated user

        console.log(`✅ Fetching orders for userId: ${userId}`);

        // Ensure userId is valid before querying
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.error("❌ Invalid ObjectId format:", userId);
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Convert userId to ObjectId to ensure consistency
        const objectIdUserId = new mongoose.Types.ObjectId(userId);
        console.log("🔄 Converted userId to ObjectId:", objectIdUserId);

        // Query the orders for this userId
        const orders = await Order.find({ userId: objectIdUserId });

        if (!orders.length) {
            console.log("⚠️ No orders found, returning empty array.");
            return res.status(200).json([]); // ✅ Return empty array instead of error
        }

        // If no orders are found, return a message
        if (!orders.length) {
            console.log("❌ No orders found for this user.");
            return res.status(404).json({ message: "No orders found for this user." });
        }

        // Return the orders
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ Error fetching user orders:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}));

const generateRandomGuestId = () => {
    return 'guest-' + Math.random().toString(36).substring(2, 15);
};

async function convertGuestOrderToUserOrder(userId, guestToken) {
    try {
        const orders = await Order.find({ guestToken });
        
        if (!orders.length) {
            return { message: "No guest orders found." };
        }

        console.log(orders)

        // Update each order to link to the new userId
        await Order.updateMany({ guestToken }, { $set: { userId, guestToken: null } });

        return { message: "Guest orders converted successfully." };
    } catch (error) {
        console.error("Error converting guest orders:", error);
        throw new Error("Error converting guest orders to user orders.");
    }
}
  
usersRoutes.route("/guest-token").post(async (req, res) => {
    try {
        const { email } = req.body;  // Get the email from the request body (optional)
        console.log("Received email:", email);  // Debugging email input

        const guestId = generateRandomGuestId();
        console.log("Generated guestId:", guestId);  // Debugging guestId

        const payload = {
            guestId,
            role: 'guest',
            email: email || null,  // Optionally include email if provided, else null
            createdAt: Date.now()
        };

        console.log("Payload to be signed:", payload);  // Debugging payload

        const expiresIn = '1h';  // Set the expiration time

        const guestToken = jwt.sign(payload, jwtKey, { expiresIn });

        console.log("Generated guestToken:", guestToken);  // Debugging generated token

        res.status(200).json({ guestToken });
    } catch (error) {
        console.error("Error generating guest token:", error);
        res.status(500).json({ message: "Failed to generate guest token", error: error.message });
    }
});

usersRoutes.route("/convert-guest-orders").post(authenticateToken, handleErrors(async (req, res) => {
    const guestToken = req.body.guestToken;
    
    if (!guestToken) {
        return res.status(400).json({ message: "Guest token is required." });
    }

    try {
        // Find the guest orders associated with this guestToken
        const orders = await Order.find({ guestToken });
        
        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for the provided guest token." });
        }

        // Update the guest orders with the new userId
        await Order.updateMany({ guestToken }, { $set: { userId: req.user._id, guestToken: null } });

        res.status(200).json({ message: "Guest orders converted successfully." });
    } catch (error) {
        console.error("Error converting guest orders:", error);
        res.status(500).json({ message: "Error converting guest orders to user orders." });
    }
}));

module.exports = usersRoutes;