const fs = require("fs");
const path = require("path");
const userSignUpEmailTemplate = require("./adminEmailTemplate"); // Adjust the path

const formData = {
    funnyStory: "dfsdf",
    characterTraits: "dsfsdfdsfds",
    hobbies: "fdsfdsfdsf",
    name: "Artem Zubchenko",
    recipient: "Nekits Burtsev",
    recipientRole: "tetetet",
    songMood: "Sad / Lyrical",
    songStyle: "Cheerful and energetic",
    songTempo: "Medium (pop, light music)",
    instruments: "Guitar (acoustic/electric)",
    story: "dsfsdfdsfdsfdsf dsfdsfdsfsdfs ddsfsdfdsfdsfdsfdsfdsf dsfsdfsd",
    dateDelivery: "Apr 23",
    rushDeliveryFee: 50,
    email: "azubchenko625@gmail.com",
    confirmEmail: "azubchenko625@gmail.com",
    songLanguage: "Polish"
  }

const testUser = { orderId: "ORD-20250407-88C3E7", customerName: "Artem Zubchenko", customerEmail: "azubczhenko625@gmail.com", amount: "500", formData };
const emailHtml = userSignUpEmailTemplate(testUser);

// Save output to a file to view in a browser
fs.writeFileSync(path.join(__dirname, "test-email.html"), emailHtml);

console.log("Email template generated! Open test-email.html in your browser.");