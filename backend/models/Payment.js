const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    stripeSessionId: String,
    email: String,
    name: String,
    amount: Number,
    currency: String,
    status: String,
    createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
