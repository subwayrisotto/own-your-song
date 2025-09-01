const fs = require("fs");
const path = require("path");
const juice = require("juice");
const renderButton = require("./components/oys-button");

const styles = fs.readFileSync(path.join(__dirname, "../styles/adminEmailTemplate.scss"), "utf8");
const URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
function formatMultiline(text) {
    if (!text) return '';
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/"/g, "&quot;")
               .replace(/'/g, "&#039;")
               .replace(/\n/g, "<br>");
  }
function adminEmailTemplate({ orderId, customerName, customerEmail, amount, formData }) {
    const html = `
        <html>
        <head><style>${styles}</style></head>
        <body>
            <div class="ctn">
                <div class="wrapper">
                    <div class="block1">
                        <img src="${URL}/emails/note.png" alt="image">
                        <p class="headerText">New Order Received</p>
                    </div>

                    <div class="block2">
                        <table>
                            <tr>
                                <td class="header">Order ID:</td>
                                <td class="data">${orderId}</td>
                            </tr>
                            <tr>
                                <td class="header">Customer:</td>
                                <td class="data">
                                    ${customerName}
                                    <br/>
                                    <a href="mailto:${customerEmail}">(${customerEmail})</a>
                                </td>
                            </tr>
                            <tr>
                                <td class="header">Amount:</td>
                                <td class="data">${amount}$</td>
                            </tr>
                        </table>
                    </div>

                    <p class="subHeader">Order details</p>

                    <div class="block3">
                        <table>
                            <tr>
                                <td class="header">Recipient:</td>
                                <td class="data">
                                   ${formData.recipient}
                                </td>
                            </tr>
                            <tr>
                                <td class="header">Recipient role:</td>
                                <td class="data">
                                   ${formData.recipientRole}
                                </td>
                            </tr>
                            <tr>
                                <td class="header">Instruments:</td>
                                <td class="data">${formData.instruments}</td>
                            </tr>
                            <tr>
                                <td class="header">Song mood:</td>
                                <td class="data">${formData.songMood}</td>
                            </tr>
                            <tr>
                                <td class="header">Song tempo:</td>
                                <td class="data">${formData.songTempo}</td>
                            </tr>
                            <tr>
                                <td class="header">Song language:</td>
                                <td class="data">${formData.songLanguage}</td>
                            </tr>
                            <tr>
                                <td class="header">Hobbies:</td>
                                <td class="data">${formData.hobbies}</td>
                            </tr>
                            <tr>
                                <td class="header">Character traits:</td>
                                <td class="data">${formData.characterTraits}</td>
                            </tr>
                            <tr>
                                <td class="header">Funny story:</td>
                                <td class="data">${formData.funnyStory}</td>
                            </tr>
                            <tr>
                                <td class="header">Story:</td>
                                <td class="data"><p>${formatMultiline(formData.story)}</p></td>
                            </tr>
                            <tr>
                                <td class="header">Delivery date:</td>
                                <td class="data">${formData.dateDelivery}</td>
                            </tr>
                            <tr>
                                <td class="header">Rush Delivery Fee:</td>
                                <td class="data">${formData.rushDeliveryFee}$</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </body>
        </html>
    `;

    return juice(html);
}

module.exports = adminEmailTemplate;
