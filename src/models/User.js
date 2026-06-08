const mongoose = require('mongoose');

const UseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name field is required."],
        trim: true
    },
    email: {
        type: String,
        required: [true, "The email field is required."],
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'The email field requried a valid email address']
    },
    password: {
        type: String,
        required: [true, "The password field is required"],
        trim: true
    },
    userConfirmed: {
        type: Boolean,
        required: false,
        trim: true
    },
    userConfirmedAt: {
        type: Date,
        required: false,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UseSchema);