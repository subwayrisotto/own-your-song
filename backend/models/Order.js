const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Optional initially for guests
    guestToken: { type: String, required: false }, // Store guest token if applicable
    orderId: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerName: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    currentPlan: {type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    formData: {
        funnyStory: String,
        characterTraits: String,
        hobbies: String,
        email: String,
        name: String,
        recipient: String,
        recipientRole: String,
        songMood: String,
        songStyle: String,
        songTempo: String,
        songLanguage: String,
        instruments: String,
        story: String,
        dateDelivery: String,
        rushDeliveryFee: Number,
    },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema, 'Orders');
module.exports = Order;