const mongoose = require("mongoose");
require("dotenv").config();

const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
    throw new Error("MONGODB_URI is not defined in .env");
}

module.exports = {
    connectToServer: async () => {
        try {
            await mongoose.connect(dbURI);
            console.log("✅ Successfully connected to MongoDB | connect.js");
        } catch (err) {
            console.error("❌ Error connecting to MongoDB:", err);
            throw err; 
        }
    },
    getDB: () => mongoose.connection,
};