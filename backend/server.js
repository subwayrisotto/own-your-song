const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const hello = require("./api/hello");
const subs = require("./routes/subscriptions");

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware configuration
const allowedOrigins = ['https://own-your-song.vercel.app/'];
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(subs); // Namespace routes

// Root route
app.get("/", hello);

// Centralized error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An internal server error occurred." });
});

// Database connection
(async () => {
    try {
        // Connect to the database before handling requests
        await connect.connectToServer();
        console.log("Successfully connected to the database");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to the database:", err);
    }
})();

// Export the app for Vercel
module.exports = app;
