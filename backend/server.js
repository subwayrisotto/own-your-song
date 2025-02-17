const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const hello = require("./api/hello");
const subs = require("./routes/subscriptions");
const samples = require("./routes/samples");
const payment = require("./routes/stripe");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());

app.use("/webhook", express.raw({ type: "application/json" }));
app.use(express.json());

// Routes
app.use(subs);
app.use(samples);
app.use(payment);

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
        await connect.connectToServer(); // Mongoose connection
        console.log("✅ Successfully connected to the database");

        // Start the server after successful DB connection
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to connect to the database:", err);
    }
})();

module.exports = app;