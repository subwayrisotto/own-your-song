const express = require("express");
const Stripe = require("stripe");
const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { getDB } = require("../connect");
const { sendEmail } = require("../utils/emailSender");
const customerEmailTemplate = require("../emails/customerEmailTemplate");
const adminEmailTemplate = require("../emails/adminEmailTemplate");
const jwt = require("jsonwebtoken");
const Order = require('../models/Order')

const paymentRoutes = express.Router();
const URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

// Service functions to abstract logic
async function saveFormDataToDb(formData) {
    try {
        if (typeof formData === "string") {
            formData = JSON.parse(formData);  // Parse formData if it's a string
        }

        const db = getDB();
        const result = await db.collection("FormData").insertOne(formData);
        return result.insertedId.toString();
    } catch (error) {
        console.error("Error saving formData:", error);
        throw new Error("Error saving form data to the database.");
    }
}

// Function to get the userId from a JWT token
async function getUserIdFromToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  // Use the secret key to verify the token
        return decoded.userId;  // Assuming the token contains the userId
    } catch (error) {
        console.error("Error decoding token:", error);
        throw new Error("Authentication failed");
    }
}

// Create Checkout Session
async function createCheckoutSession({ totalAmount, email, name, orderDetails, formDataId, userId, guestToken }) {
    try {
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
                        unit_amount: totalAmount,  // Amount in cents
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
                formDataId,
                userId: userId || "null",  // Only pass userId if the user is logged in
                guestToken: guestToken || null,  // Set guestToken when no userId
                ...orderDetails,
            },
        });
        return session;
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        throw new Error("Error creating Stripe Checkout session.");
    }
}

// Save Payment & Order Details
// Save Payment & Order Details using Mongoose
async function savePaymentAndOrderDetails(session, formData, userId, guestToken) {
    try {
        const orderId = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${uuidv4().slice(0, 6).toUpperCase()}`;
        const customerEmail = session.customer_email;
        const customerName = session.metadata.customer_name || "Customer";

        const paymentData = {
            stripeSessionId: session.id,
            email: customerEmail,
            name: customerName,
            amount: session.amount_total / 100,
            currency: session.currency,
            status: session.payment_status,
            createdAt: new Date(),
        };

        const paymentsCollection = getDB().collection("Payments");
        await paymentsCollection.insertOne(paymentData);

        const orderData = {
            userId: userId || null, // If guest, userId is null
            guestToken: guestToken || null, // If guest, guestToken is stored
            orderId: orderId,
            customerEmail: customerEmail,
            customerName: customerName,
            amount: session.amount_total / 100,
            status: session.payment_status,
            formData: formData,
            createdAt: new Date(),
        };

        const order = await Order.create(orderData);  // Create the order in the database using the Order model
        console.log("✅ Payment and Order saved successfully!");

        return { customerEmail, customerName, orderId, session, order };
    } catch (error) {
        console.error("Error saving payment/order:", error);
        throw new Error("Error saving payment and order details.");
    }
}

// Send Emails
async function sendConfirmationEmails({ customerEmail, customerName, orderId, session, formData }) {
    try {
        // Send customer confirmation email
        await sendEmail(
            customerEmail,
            "OYS | Order Confirmation",
            customerEmailTemplate({ customerName, orderId, amount: session.amount_total / 100 })
        );

        // Send admin notification email
        await sendEmail(
            process.env.ADMIN_EMAIL,
            "OYS | New Order Notification",
            adminEmailTemplate({
                orderId,
                customerName,
                customerEmail,
                amount: session.amount_total / 100,
                formData
            })
        );

        console.log("✅ Emails sent successfully!");
    } catch (error) {
        console.error("Error sending emails:", error);
        throw new Error("Error sending emails.");
    }
}

// Endpoint to create Stripe Checkout Session
paymentRoutes.post("/checkout-session", async (req, res) => {
    const { totalAmount, email, name, orderDetails, formData, guestToken } = req.body;  // Receive guestToken here
    const token = req.headers["authorization"]?.split(" ")[1];  // Get token from the Authorization header

    let userId = null;
    if (token) {
        // Extract userId from the user token
        userId = await getUserIdFromToken(token);
    }

    if (!token && !guestToken) {
        return res.status(400).json({ message: "Authorization token or guest token is required." });
    }

    try {
        const formDataId = await saveFormDataToDb(formData);  // Save form data to the DB
        const session = await createCheckoutSession({
            totalAmount,
            email,
            name,
            orderDetails,
            formDataId,
            userId,
            guestToken,  // Pass guestToken or userId
        });

        // Send response with checkout URL
        res.send({ url: session.url });
    } catch (error) {
        console.error("Error in /checkout-session:", error);
        res.status(500).send("Payment failed");
    }
});

// Webhook endpoint for Stripe
paymentRoutes.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    let formData = null;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        const session = event.data.object;  // Stripe event session

        const formDataId = session.metadata?.formDataId;
        const userId = session.metadata?.userId !== "null" ? session.metadata?.userId : null;
        const guestToken = session.metadata?.guestToken;

        // // Check if the user is logged in and if there was a guest order
        // if (userId && guestToken) {
        //     // Convert guest order to user order
        //     await convertGuestOrderToUserOrder(userId, guestToken);  // Pass userId and guestToken
        // }

        if (formDataId) {
            const db = getDB();
            formData = await db.collection("FormData").findOne({ _id: new ObjectId(formDataId) });
        }

        if (event.type === "checkout.session.completed") {
            const { customerEmail, customerName, orderId, session: paymentSession } = await savePaymentAndOrderDetails(session, formData, userId, guestToken);
            await sendConfirmationEmails({ customerEmail, customerName, orderId, session: paymentSession, formData });
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Error in webhook:", error);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
});

module.exports = paymentRoutes;