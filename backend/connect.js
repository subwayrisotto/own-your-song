const mongoose = require("mongoose");
require("dotenv").config();

const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
    throw new Error("MONGODB_URI is not defined in .env");
}

module.exports = {
    connectToServer: async () => {
        try {
            // Connect to MongoDB with Mongoose
            await mongoose.connect(dbURI);
            console.log("✅ Successfully connected to MongoDB");
        } catch (err) {
            console.error("❌ Error connecting to MongoDB:", err);
            throw err; // Re-throw to handle it in your app logic
        }
    },
    getDB: () => mongoose.connection,
};