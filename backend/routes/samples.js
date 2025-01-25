const express = require("express");
const database = require("../connect");
const { ObjectId } = require("mongodb");

let samplesRoutes = express.Router();

// Middleware to handle errors centrally
const handleErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Retrieve all subscriptions
samplesRoutes.route("/samples").get(
    handleErrors(async (req, res) => {
        let db = database.getDB();
        let data = await db.collection("Samples").find({}).toArray();
        if (data.length > 0) {
            res.json(data);
        } else {
            res.status(404).json({ message: "No samples found." });
        }
    })
);

// Retrieve a single subscription by ID
samplesRoutes.route("/samples/:id").get(
    handleErrors(async (req, res) => {
        let db = database.getDB();
        let data = await db.collection("Samples").findOne({ _id: new ObjectId(req.params.id) });
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ message: "Samples not found." });
        }
    })
);

// Create a new subscription
samplesRoutes.route("/Samples").post(
    handleErrors(async (req, res) => {
        let db = database.getDB();
        const { name, title, source, cover } = req.body;

        // Validate input
        if (!name || !title || !source || !cover) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        let mongoObject = { name, title, source, cover };
        let data = await db.collection("Samples").insertOne(mongoObject);

        res.status(201).json(data);
    })
);

// Update a subscription by ID
samplesRoutes.route("/samples/:id").put(
    handleErrors(async (req, res) => {
        let db = database.getDB();
        const { name, title, source, cover } = req.body;

        // Validate input
        if (!name || !title || !source || !cover) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        let mongoObject = {
            $set: { name, title, source, cover },
        };

        let data = await db.collection("Samples").updateOne(
            { _id: new ObjectId(req.params.id) },
            mongoObject
        );

        if (data.matchedCount === 0) {
            return res.status(404).json({ message: "Sample not found." });
        }

        res.json(data);
    })
);

// Delete a subscription by ID
samplesRoutes.route("/samples/:id").delete(
    handleErrors(async (req, res) => {
        let db = database.getDB();
        let data = await db.collection("Samples").deleteOne({ _id: new ObjectId(req.params.id) });

        if (data.deletedCount === 0) {
            return res.status(404).json({ message: "Sample not found." });
        }

        res.json({ message: "Sample deleted successfully." });
    })
);

module.exports = samplesRoutes;