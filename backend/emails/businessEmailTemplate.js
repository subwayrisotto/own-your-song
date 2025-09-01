const fs = require("fs");
const path = require("path");
const juice = require("juice");

const styles = fs.readFileSync(path.join(__dirname, "../styles/businessEmailTemplate.scss"), "utf8");
const URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

function businessEmailTemplate({ email, businessData }) {
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
                                <td class="header">Customer:</td>
                                <td class="data">
                                    <a href="mailto:${email}">(${email})</a>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <p class="subHeader">Order details</p>

                    <div class="block3">
                        <table>
                            <tr>
                                <td class="header">Company name:</td>
                                <td class="data">
                                   ${businessData.companyName}
                                </td>
                            </tr>
                            <tr>
                                <td class="header">Job title:</td>
                                <td class="data">
                                   ${businessData.jobTitle}
                                </td>
                            </tr>
                            <tr>
                                <td class="header">Contact person:</td>
                                <td class="data">${businessData.contactPerson}</td>
                            </tr>
                            <tr>
                                <td class="header">Phone number:</td>
                                <td class="data">${businessData.phone}</td>
                            </tr>
                            <tr>
                                <td class="header">Type of business:</td>
                                <td class="data">${businessData.businessType}</td>
                            </tr>
                            <tr>
                                <td class="header">Goals of cooperation:</td>
                                <td class="data">${businessData.cooperationGoals}</td>
                            </tr>
                            <tr>
                                <td class="header">Solutions of interest:</td>
                                <td class="data">${businessData.interestSolutions}</td>
                            </tr>
                            <tr>
                                <td class="header">Comment:</td>
                                <td class="data">${businessData.comment}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </body>
        </html>
    `;

    return juice(html);
}

module.exports = businessEmailTemplate;
