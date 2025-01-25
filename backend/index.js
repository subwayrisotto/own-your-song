const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const subs = require("./routes/subscriptions");

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not defined

app.use(cors(
    {
        origin: 'http://localhost:5050',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
));
app.use(express.json());
app.use(subs); // Namespace routes

// Centralized error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An internal server error occurred." });
});

(async () => {
    try {
        // Connect to the database before starting the server
        await connect.connectToServer();
        console.log("Successfully connected to the database");

        // Start the server after the database connection is established
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to the database:", err);
        process.exit(1); // Exit the process with a failure code
    }
})();