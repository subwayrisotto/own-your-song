const fs = require("fs");
const path = require("path");
const juice = require("juice");
const renderBestWishesBlock = require("./components/bestWishes");
const renderSocialMediaBlock = require("./components/socialMedia");
const renderHeaderBlock = require("./components/header");
const renderButton = require("./components/oys-button");

// Load email styles
const styles = fs.readFileSync(path.join(__dirname, "../styles/resetPasswordEmailTemplate.scss"), "utf8");
const URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

function resetLinkTemplate({resetLink}) {
    const html = `
        <html>
            <head><style>${styles}</style></head>
            <body>
                <div class="ctn">
                    ${renderHeaderBlock(URL)}

                    <div class="block3">
                        <p class="text">We received a request to reset your password. Click the link below to set a new one and get back to making music:</p>
                    </div>

                    <div class="block9">
                        ${renderButton(resetLink, 'Reset Password')}
                    </div>

                    <div class="block4">
                        <p class="text">If you didn’t request this, simply ignore this email — your account is safe and nothing will change. Keep creating and let your ideas sing!</p>
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

    return juice(html); 
}

module.exports = resetLinkTemplate;