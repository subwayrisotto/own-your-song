const express = require("express");
const Sample = require("../models/Sample"); // Import the Sample model

let samplesRoutes = express.Router();

// Middleware to handle errors centrally
const handleErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Retrieve all samples
samplesRoutes.route("/samples").get(
    handleErrors(async (req, res) => {
        const samples = await Sample.find(); // Mongoose query to find all samples
        if (samples.length > 0) {
            res.json(samples);
        } else {
            res.status(404).json({ message: "No samples found." });
        }
    })
);

// Retrieve a single sample by ID
samplesRoutes.route("/samples/:id").get(
    handleErrors(async (req, res) => {
        const sample = await Sample.findById(req.params.id); // Mongoose query to find by ID
        if (sample) {
            res.json(sample);
        } else {
            res.status(404).json({ message: "Sample not found." });
        }
    })
);

// Create a new sample
samplesRoutes.route("/samples").post(
    handleErrors(async (req, res) => {
        const { name, title, source, cover } = req.body;

        // Validate input
        if (!name || !title || !source || !cover) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const newSample = new Sample({ name, title, source, cover });
        const savedSample = await newSample.save(); // Mongoose method to save the new sample

        res.status(201).json(savedSample);
    })
);

// Update a sample by ID
samplesRoutes.route("/samples/:id").put(
    handleErrors(async (req, res) => {
        const { name, title, source, cover } = req.body;

        // Validate input
        if (!name || !title || !source || !cover) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const updatedSample = await Sample.findByIdAndUpdate(
            req.params.id,
            { name, title, source, cover },  // Fields to update
            { new: true } // Return the updated document
        );

        if (!updatedSample) {
            return res.status(404).json({ message: "Sample not found." });
        }

        res.json(updatedSample);
    })
);

// Delete a sample by ID
samplesRoutes.route("/samples/:id").delete(
    handleErrors(async (req, res) => {
        const deletedSample = await Sample.findByIdAndDelete(req.params.id); // Mongoose delete method

        if (!deletedSample) {
            return res.status(404).json({ message: "Sample not found." });
        }

        res.json({ message: "Sample deleted successfully." });
    })
);

module.exports = samplesRoutes;