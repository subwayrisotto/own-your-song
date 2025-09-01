const express = require("express");
const Subscription = require("../models/Subscription"); // Import the model

let subRoutes = express.Router();

// Middleware to handle errors centrally
const handleErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Retrieve all subscriptions
subRoutes.route("/subscriptions").get(
    handleErrors(async (req, res) => {
        const subscriptions = await Subscription.find();

        if (subscriptions.length > 0) {
            res.json(subscriptions);
        } else {
            res.status(404).json({ message: "No subscriptions found." });
        }
    })
);

// Retrieve a single subscription by ID
subRoutes.route("/subscriptions/:id").get(
    handleErrors(async (req, res) => {
        const subscription = await Subscription.findById(req.params.id); // Using Mongoose's `findById` method
        if (subscription) {
            res.json(subscription);
        } else {
            res.status(404).json({ message: "Subscription not found." });
        }
    })
);

// Create a new subscription
subRoutes.route("/subscriptions").post(
    handleErrors(async (req, res) => {
        const { plan, price, description, benefits } = req.body;

        // Validate input
        if (!plan || !price || !description || !benefits) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const newSubscription = new Subscription({
            plan,
            price,
            description,
            benefits,
        });

        const savedSubscription = await newSubscription.save(); // Save the new subscription to the database
        res.status(201).json(savedSubscription);
    })
);

// Update a subscription by ID
subRoutes.route("/subscriptions/:id").put(
    handleErrors(async (req, res) => {
        const { plan, price, description, benefits } = req.body;

        // Validate input
        if (!plan || !price || !description || !benefits) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const updatedSubscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            { plan, price, description, benefits },
            { new: true } // Returns the updated document
        );

        if (!updatedSubscription) {
            return res.status(404).json({ message: "Subscription not found." });
        }

        res.json(updatedSubscription);
    })
);

// Delete a subscription by ID
subRoutes.route("/subscriptions/:id").delete(
    handleErrors(async (req, res) => {
        const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);

        if (!deletedSubscription) {
            return res.status(404).json({ message: "Subscription not found." });
        }

        res.json({ message: "Subscription deleted successfully." });
    })
);

module.exports = subRoutes;