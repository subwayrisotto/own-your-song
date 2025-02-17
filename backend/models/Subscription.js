// models/Subscription.js
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    plan: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    benefits: { type: [String], required: true },
}, { timestamps: true });

// Model for 'subscriptions' collection in MongoDB
const Subscription = mongoose.model("Subscription", subscriptionSchema, "Subscriptions ");

module.exports = Subscription;