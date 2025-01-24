const express = require("express");
const database = require("../connect");
const { ObjectId } = require("mongodb");

let subRoutes = express.Router();

// Middleware to handle errors centrally
const handleErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Retrieve all subscriptions
subRoutes.route("/subscriptions").get(
    handleErrors(async (req, res) => {
        let db = database.getDB();
        let data = await db.collection("Subscriptions ").find({}).toArray();
        if (data.length > 0) {
            res.json(data);
        } else {
            res.status(404).json({ message: "No subscriptions found." });
        }
    })
);

// Retrieve a single subscription by ID
subRoutes.route("/subscriptions/:id").get(
    handleErrors(async (req, res) => {
        let db = database.getDB();
        let data = await db.collection("Subscriptions ").findOne({ _id: new ObjectId(req.params.id) });
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ message: "Subscription not found." });
        }
    })
);

// Create a new subscription
subRoutes.route("/subscriptions").post(
    handleErrors(async (req, res) => {
        let db = database.getDB();
        const { plan, price, description, benefits } = req.body;

        // Validate input
        if (!plan || !price || !description || !benefits) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        let mongoObject = { plan, price, description, benefits };
        let data = await db.collection("Subscriptions ").insertOne(mongoObject);

        res.status(201).json(data);
    })
);

// Update a subscription by ID
subRoutes.route("/subscriptions/:id").put(
    handleErrors(async (req, res) => {
        let db = database.getDB();
        const { plan, price, description, benefits } = req.body;

        // Validate input
        if (!plan || !price || !description || !benefits) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        let mongoObject = {
            $set: { plan, price, description, benefits },
        };

        let data = await db.collection("Subscriptions ").updateOne(
            { _id: new ObjectId(req.params.id) },
            mongoObject
        );

        if (data.matchedCount === 0) {
            return res.status(404).json({ message: "Subscription not found." });
        }

        res.json(data);
    })
);

// Delete a subscription by ID
subRoutes.route("/subscriptions/:id").delete(
    handleErrors(async (req, res) => {
        let db = database.getDB();
        let data = await db.collection("Subscriptions ").deleteOne({ _id: new ObjectId(req.params.id) });

        if (data.deletedCount === 0) {
            return res.status(404).json({ message: "Subscription not found." });
        }

        res.json({ message: "Subscription deleted successfully." });
    })
);

module.exports = subRoutes;