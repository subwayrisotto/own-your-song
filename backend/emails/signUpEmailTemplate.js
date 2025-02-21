const fs = require("fs");
const path = require("path");
const juice = require("juice");

// Load email styles
const styles = fs.readFileSync(path.join(__dirname, "../styles/emails.scss"), "utf8");

function userSignUpEmailTemplate({ fullName }) {
    const html = `
        <html>
        <head><style>${styles}</style></head>
        <body>
            <h2>Welcome to Own Your Song, ${fullName}!</h2>
            <p>Thank you for signing up. We’re excited to have you on board!</p>
            <p>Start exploring now by logging into your account.</p>
            <p>If you didn’t sign up, please ignore this email.</p>
            <footer>
                <p>Best Regards,</p>
                <p>OYS</p>
            </footer>
        </body>
        </html>
    `;

    return juice(html); // Inline styles
}

module.exports = userSignUpEmailTemplate;