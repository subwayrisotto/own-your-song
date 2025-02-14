const { MongoClient } = require("mongodb");
require("dotenv").config();

const dbURI = process.env.MONGODB_URI; // Ensure MONGODB_URI is correct in config.env
if (!dbURI) {
    throw new Error("MONGODB_URI is not defined in .env");
}

const client = new MongoClient(dbURI);
let database;

module.exports = {
    connectToServer: async () => {
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            console.log("Successfully connected to MongoDB");
            database = client.db("OYS_DB"); // You can replace OYS_DB with your actual database name
            return database;
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
            throw err; // Re-throw the error to handle it in your app logic
        }
    },
    getDB: () => {
        if (!database) {
            throw new Error("Database connection is not established. Call connectToServer first.");
        }
        return database;
    },
};
