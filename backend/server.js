const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const hello = require("./api/hello");
const subs = require("./routes/subscriptions");
const samples = require("./routes/samples");
const payment = require("./routes/stripe");
const orders = require('./routes/orders');
const createUser = require('./routes/users');
const businessOrders = require('./routes/business');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({ origin: ['https://oys-six.vercel.app', 'http://localhost:3000'] }));

app.use("/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
// Routes
app.use(subs);
app.use(samples);
app.use(payment);
app.use(orders);
app.use(createUser);
app.use(businessOrders);

app.get("/", hello);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An internal server error occurred." });
});

(async () => {
    try {
        await connect.connectToServer();
        console.log("✅ Successfully connected to the database | server.js");

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to connect to the database:", err);
    }
})();

module.exports = app;

