const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const dbURI = process.env.ATLAS_URI; // Ensure ATLAS_URI is correct in config.env
if (!dbURI) {
    throw new Error("ATLAS_URI is not defined in config.env");
}

const client = new MongoClient(dbURI);
let database;


// async function insertMultipleDocs(data) {
//     try {
//         await client.connect();
//         const db = client.db("OYS_DB");
//         const collection = db.collection("Samples");
//         const result = await collection.insertMany(data);
//         console.log(`${result.insertedCount} documents inserted.`);
//     } finally {
//         await client.close();
//     }
// }

// insertMultipleDocs(samples).catch(console.error);

module.exports = {
    connectToServer: async () => {
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            console.log("Successfully connected to MongoDB");
            database = client.db("OYS_DB");
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

