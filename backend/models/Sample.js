const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    source: { type: String, required: true },
    cover: { type: String, required: true }
}, { timestamps: true });  // Adding timestamps for createdAt and updatedAt fields

// Create the model for "Samples" collection
const Sample = mongoose.model("Sample", sampleSchema, "Samples");

module.exports = Sample;