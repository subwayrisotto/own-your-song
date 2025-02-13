const fs = require("fs");
const path = require("path");
const juice = require("juice");

// Load styles and inline them
const styles = fs.readFileSync(path.join(__dirname, "../styles/emails.scss"), "utf8");

function customerEmailTemplate({ customerName, orderId, amount }) {
    const html = `
        <html>
        <head><style>${styles}</style></head>
        <body>
            <h2>Thank you for your order, ${customerName}!</h2>
            <p>Your order ID: <strong>${orderId}</strong></p>
            <div class="order-details">
                <p><strong>Order Amount:</strong> $${amount}</p>
            </div>
            <p>We are processing your request and will notify you once your order is complete.</p>
            <p>If you have any questions, feel free to contact us.</p>
            <p>Best regards,<br>OYS</p>
        </body>
        </html>
    `;

    return juice(html); // Inline styles using `juice`
}

module.exports = customerEmailTemplate;
