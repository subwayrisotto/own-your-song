const mongoose = require("mongoose");

const FormDataSchema = new mongoose.Schema({
    funnyStory: String,
    characterTraits: String,
    hobbies: String,
    email: String,
    name: String,
    recipient: String,
    recipientRole: String,
    songMood: String,
    songStyle: String,
    songTempo: String,
    songLanguage: String,
    instruments: String,
    story: String,
    dateDelivery: String,
    rushDeliveryFee: Number,
}, { timestamps: true });

const FormData = mongoose.model("FormData", FormDataSchema, 'FormData');
module.exports = FormData;