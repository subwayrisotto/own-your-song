const mongoose = require("mongoose");
require("dotenv").config();

const isProd = process.env.NODE_ENV === "production";
const dbURI = isProd ? process.env.MONGODB_URI : process.env.MONGODB_URI_DEV;

if (!dbURI) {
    throw new Error("MongoDB URI is not defined for the current NODE_ENV");
}

module.exports = {
    connectToServer: async () => {
        try {
            if (mongoose.connection.readyState !== 1) {
                console.log('🔄 Reconnecting to MongoDB...');
                await mongoose.disconnect();
                await mongoose.connect(dbURI);
                console.log(`✅ Connected to MongoDB (${process.env.NODE_ENV})`);
                console.log(`🔗 URI used: ${isProd ? 'MONGODB_URI (prod)' : 'MONGODB_URI_DEV (dev)'}`);
            } else {
                console.log('✅ Already connected to MongoDB');
            }
        } catch (err) {
            console.error("❌ MongoDB Connection Error:", err);
            throw err;
        }
    },
    getDB: () => mongoose.connection,
};