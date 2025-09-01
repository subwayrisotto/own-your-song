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
        console.log(`Preparing to send email to ${to}`);  // This will log before the sendMail call
        
        const info = await transporter.sendMail({
            from: `"Own Your Song" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });
        console.log(`📩 Email sent to ${to}`);
    } catch (error) {
        console.error(`❌ Error sending email to ${to}:`, error);
        throw new Error(error); // Re-throw to catch it in the calling function
    }
}
module.exports = { sendEmail };
