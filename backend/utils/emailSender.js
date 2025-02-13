const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config.env" });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // Use secure for port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Function to send an email
async function sendEmail(to, subject, html) {
    try {
        await transporter.sendMail({
            from: `"Own Your Song" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });
        console.log(`📩 Email sent to ${to}`);
    } catch (error) {
        console.error(`❌ Error sending email to ${to}:`, error);
    }
}

module.exports = { sendEmail };
