const express = require("express");
const Order = require("../models/Order"); // Import the Sample model

let ordersRoutes = express.Router();

// Middleware to handle errors centrally
const handleErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Retrieve all Orders
ordersRoutes.route("/orders").get(
    handleErrors(async (req, res) => {
        const orders = await Order.find();
        if (orders.length > 0) {
            res.json(orders);
        } else {
            res.status(404).json({ message: "No orders found." });
        }
    })
);

// Retrieve a single Order by ID
ordersRoutes.route("/orders/:id").get(
    handleErrors(async (req, res) => {
        const order = await Order.findById(req.params.id); 
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found." });
        }
    })
);


// // Create a new sample
// ordersRoutes.route("/orders").post(
//     handleErrors(async (req, res) => {
//         const { name, title, source, cover } = req.body;

//         // Validate input
//         if (!name || !title || !source || !cover) {
//             return res.status(400).json({ message: "Missing required fields." });
//         }

//         const newSample = new Sample({ name, title, source, cover });
//         const savedSample = await newSample.save(); // Mongoose method to save the new sample

//         res.status(201).json(savedSample);
//     })
// );

// // Update a sample by ID
// ordersRoutes.route("/samples/:id").put(
//     handleErrors(async (req, res) => {
//         const { name, title, source, cover } = req.body;

//         // Validate input
//         if (!name || !title || !source || !cover) {
//             return res.status(400).json({ message: "Missing required fields." });
//         }

//         const updatedSample = await Sample.findByIdAndUpdate(
//             req.params.id,
//             { name, title, source, cover },  // Fields to update
//             { new: true } // Return the updated document
//         );

//         if (!updatedSample) {
//             return res.status(404).json({ message: "Sample not found." });
//         }

//         res.json(updatedSample);
//     })
// );

// Delete a Order by ID
ordersRoutes.route("/orders/:id").delete(
    handleErrors(async (req, res) => {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedSample) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.json({ message: "Order deleted successfully." });
    })
);

module.exports = ordersRoutes;