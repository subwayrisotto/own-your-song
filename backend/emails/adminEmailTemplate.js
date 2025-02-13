const fs = require("fs");
const path = require("path");
const juice = require("juice");

const styles = fs.readFileSync(path.join(__dirname, "../styles/emails.scss"), "utf8");

function adminEmailTemplate({ orderId, customerName, customerEmail, amount, formData }) {
    const html = `
        <html>
        <head><style>${styles}</style></head>
        <body>
            <h2>New Order Received!</h2>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
            <div class="order-details">
                <p><strong>Amount:</strong> $${amount}</p>
            </div>
            <p><strong>Order Details:</strong></p>
            <pre>${JSON.stringify(formData, null, 2)}</pre>
        </body>
        </html>
    `;

    return juice(html);
}

module.exports = adminEmailTemplate;
