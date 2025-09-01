const fs = require("fs");
const path = require("path");
const juice = require("juice");
const renderHeaderBlock = require("./components/header");
const renderBestWishesBlock = require("./components/bestWishes");
const renderSocialMediaBlock = require("./components/socialMedia");
const renderButton = require("./components/oys-button");

// Load styles and inline them
const styles = fs.readFileSync(path.join(__dirname, "../styles/customerEmailTemplate.scss"), "utf8");
const URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

function customerEmailTemplate({ customerName }) {
    const html = `
        <html>
            <head><style>${styles}</style></head>
            <body>
                <div class="ctn">
                    ${renderHeaderBlock(URL)}

                    <div class="block3">
                        <p class="text">Dear ${customerName}, <br/>
                        Thank you for your order! Your track is going to be something truly special — we can’t wait to bring it to life. Our team is already on it, and you’ll hear from us very soon with an update.</p>
                    </div>

                    <div class="block9">
                        ${renderButton(`${URL}/dashboard`, 'Check your order')}
                    </div>

                    ${renderBestWishesBlock(URL)}

                    ${renderSocialMediaBlock(URL)}

                    <div class="block12">
                        <p class="text">Instagram™ and Facebook™ are trademarks of Meta Platforms, Inc. YouTube™ is a trademark of Google LLC.</p>
                        <p class="text">This email was sent to you by Own Your Song Studio (currently operating in beta by Ivan Mykhailenko). By using our services, you agree to our [Privacy Policy] and [Terms of Use]. © Own Your Song Studio / Ivan Mykhailenko 2025. All rights reserved.</p>

                        <a href="mailto:ownyoursongstudio@gmail.com">Contact: ownyoursongstudio@gmail.com</a>
                    </div>
                </div>
            </body>
        </html>
    `;

    return juice(html); // Inline styles using `juice`
}

module.exports = customerEmailTemplate;
