const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    country: {
        type: String,
        required: true
    },
    isTermsAgreed: {
        type: Boolean,
        required: true,
        default: false
    },
    role: { type: String, enum: ["client", "admin"], default: "client" } 
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;