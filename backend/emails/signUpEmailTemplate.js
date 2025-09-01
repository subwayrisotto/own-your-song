const fs = require("fs");
const path = require("path");
const juice = require("juice");
const renderSocialMediaBlock = require("./components/socialMedia");
const renderBestWishesBlock = require("./components/bestWishes");
const renderHeaderBlock = require("./components/header");
const renderButton = require("./components/oys-button");

const URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
const styles = fs.readFileSync(path.join(__dirname, "../styles/signUpEmails.scss"), "utf8");


 
function userSignUpEmailTemplate({ fullName }) {
    const html = `
        <html>
        <head><style>${styles}</style></head>
        <body>
            <div class="ctn">
                ${renderHeaderBlock(URL)}

                <div class="block3">
                    <p class="text">Welcome to Own Your Song 👋 ${fullName} <br/> Thank you for signing up. We’re excited to have you on board!</p>
                </div>

                <div class="block4">
                    <p class="text">Your possibilities with OYS STUDIO</p>
                </div>

                <div class="block5">
                    <p class="textHeaderPossibilities">🎵 24 hours for your song</p>
                    <p class="textPossibilities">Tell us your story in 10 minutes — get your unique song within 24 hours, fully personalized.</p>
                </div>

                <div class="block6">
                    <p class="textHeaderPossibilities">💳 3 different ways</p>
                    <p class="textPossibilities"> Choose your plan according to your wishes. Silver. Gold. Platinum.</p>
                </div>

                <div class="block7">
                    <p class="textHeaderPossibilities">🎤 Up to 50 languages of your choice</p>
                    <p class="textPossibilities">Describe your emotions in any language — we’ll turn them into a song in the language you choose.</p>
                </div>

                <div class="block8">
                    <p class="textHeaderPossibilities">✨ And so much more...</p>
                    <p class="textPossibilities">We’ve got tons of other features — check them out on our website or socials.</p>
                </div>

                <div class="block9">
                    ${renderButton(`${URL}/form?plan=silver`, 'Own Your Song')}
                </div>

                ${renderBestWishesBlock(URL)}

                ${renderSocialMediaBlock(URL)}

                <div class="block12">
                    <p class="text">This email was sent to you by Own Your Song Studio (currently operating in beta by Ivan Mykhailenko). By using our services, you agree to our [Privacy Policy] and [Terms of Use]. © Own Your Song Studio / Ivan Mykhailenko 2025. All rights reserved.</p>

                    <a href="mailto:ownyoursongstudio@gmail.com">Contact: ownyoursongstudio@gmail.com</a>
                </div>
            </div>
        </body>
        </html>
    `;

    return juice(html);
}

module.exports = userSignUpEmailTemplate;