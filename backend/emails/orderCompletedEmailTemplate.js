const fs = require("fs");
const path = require("path");
const juice = require("juice");
const renderHeaderBlock = require("./components/header");
const renderBestWishesBlock = require("./components/bestWishes");
const renderSocialMediaBlock = require("./components/socialMedia");

const styles = fs.readFileSync(path.join(__dirname, "../styles/orderCompletedEmailTemplate.scss"), "utf8");

const URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

function orderCompletedEmailTemplate({ customerName }) {
    const html = `
        <html>
            <head><style>${styles}</style></head>
            <body>
                <div class="ctn">
                    ${renderHeaderBlock(URL)}

                    <div class="block3">
                        <p class="text">Dear ${customerName}, <br/>
                        It’s here! Your custom song is ready — and it sounds amazing. You’ve turned your story into music, and now it’s time to enjoy it.</p>
                    </div>

                    <div class="block9">
                        <p class="text">The track will be send as soon as we can!</p>
                        <img src="${URL}/emails/img.png" class="img" />
                        <p class="text2">Give it a listen and let your ideas sing. If you love it, don’t keep it to yourself — feel free to share the moment or drop us a note!</p>
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

module.exports = orderCompletedEmailTemplate;
