const express = require("express");
const Order = require("../models/Order");
const { authenticateToken } = require("../middleware/authenticateToken");
const { sendEmail } = require("../utils/emailSender");
const orderCompletedEmailTemplate = require("../emails/orderCompletedEmailTemplate");

let ordersRoutes = express.Router();

// Middleware to handle errors centrally
const handleErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware to check if the user is an admin
const verifyAdmin = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Authorization error." });
    }
};

// Retrieve all Orders (Admin only)
ordersRoutes.route("/orders").get(authenticateToken, verifyAdmin, handleErrors(async (req, res) => {
    const orders = await Order.find();
    if (orders.length > 0) {
        res.json(orders);
    } else {
        res.status(404).json({ message: "No orders found." });
    }
}));

// Retrieve a single Order by ID (Admin only)
ordersRoutes.route("/orders/:id").get(authenticateToken, verifyAdmin, handleErrors(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: "Order not found." });
    }
}));


ordersRoutes.route("/orders/:id").put(authenticateToken, verifyAdmin, handleErrors(async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.isCompleted) {
      return res.status(400).json({ message: "Order is already completed" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { isCompleted: true },
      { new: true }
    );

    const { customerEmail, customerName } = order;

    if (customerEmail) {
      await sendEmail(
        customerEmail,
        `OYS | Order Status | ${order.orderId} | ${customerName}`,
        orderCompletedEmailTemplate({
          customerName: customerName || "Customer",
        })
      );
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order or sending email:", error);
    res.status(500).json({ message: "Error updating order", error });
  }
}));

// // Delete an Order by ID (Admin only)
ordersRoutes.route("/orders/:id").delete(authenticateToken, verifyAdmin, handleErrors(async (req, res) => {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found." });
    }
    res.json({ message: "Order deleted successfully." });
}));

module.exports = ordersRoutes;