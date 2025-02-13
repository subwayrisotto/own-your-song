const express = require("express");
const Stripe = require("stripe");
const { v4: uuidv4 } = require('uuid');
const { ObjectId } = require("mongodb");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { getDB } = require("../connect");
const { sendEmail } = require("../utils/emailSender");
const customerEmailTemplate = require("../emails/customerEmailTemplate");
const adminEmailTemplate = require("../emails/adminEmailTemplate");

const paymentRoutes = express.Router();
const URL = process.env.LOCAL_URL || 'http://localhost:3000';

// Function to save formData in MongoDB
async function saveFormDataToDb(formData) {
    if (typeof formData === "string") {
        try {
            formData = JSON.parse(formData);
        } catch (error) {
            console.error("Error parsing formData:", error);
            throw new Error("Invalid formData format");
        }
    }

    const db = getDB();
    const collection = db.collection("FormData");

    const result = await collection.insertOne(formData);
    return result.insertedId.toString(); // Convert ObjectId to string for Stripe metadata
}

// Endpoint to create a Stripe Checkout Session
paymentRoutes.post("/checkout-session", async (req, res) => {
    const { totalAmount, email, name, orderDetails, formData } = req.body;

    try {
        // Save formData to DB and get its ID
        const formDataId = await saveFormDataToDb(formData);

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Custom Song for ${name}`,
                            description: "Personalized Song Order",
                        },
                        unit_amount: totalAmount, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${URL}/payment-success`,
            cancel_url: `${URL}/payment-cancel`,
            automatic_tax: { enabled: true },
            metadata: {
                customer_name: name,
                customer_email: email,
                formDataId,  // Store only the formData ID (not the full object)
                ...orderDetails
            },
        });

        res.send({ url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).send("Payment failed");
    }
});

// Webhook endpoint for Stripe (to save payment and order details)
paymentRoutes.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    let formData = null;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        const session = event.data.object;
        const formDataId = session.metadata?.formDataId;

        if (formDataId) {
            const db = getDB();
            formData = await db.collection("FormData").findOne({ _id: new ObjectId(formDataId) });
        }

    } catch (err) {
        console.error("Webhook verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const orderId = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${uuidv4().slice(0, 6).toUpperCase()}`;
        const orderData = session.metadata;
        const customerEmail = session.customer_email;
        const customerName = orderData.customer_name || "Customer";

        try {
            const db = getDB();
            const ordersCollection = db.collection("Orders");
            const paymentsCollection = db.collection("Payments");

            const paymentData = {
                stripeSessionId: session.id,
                email: customerEmail,
                name: customerName,
                amount: session.amount_total / 100,
                currency: session.currency,
                status: session.payment_status,
                createdAt: new Date(),
            };

            await paymentsCollection.insertOne(paymentData);

            const orderDataToSave = {
                orderId,
                customerEmail,
                customerName,
                amount: session.amount_total / 100,
                status: session.payment_status,
                formData,
                createdAt: new Date(),
            };

            await ordersCollection.insertOne(orderDataToSave);

            console.log("✅ Payment and Order saved successfully!");

            // 📩 Send customer email
            await sendEmail(
                customerEmail,
                "OYS | Order Confirmation",
                customerEmailTemplate({ customerName, orderId, amount: session.amount_total / 100 })
            );

            // 📩 Send admin notification
            await sendEmail(
                process.env.ADMIN_EMAIL,
                "OYS | New Order Notification",
                adminEmailTemplate({ orderId, customerName, customerEmail, amount: session.amount_total / 100, formData })
            );

        } catch (err) {
            console.error("❌ Error in webhook processing:", err);
            return res.status(500).send("Error saving order and payment data");
        }
    }

    res.status(200).json({ received: true });
});

module.exports = paymentRoutes;
