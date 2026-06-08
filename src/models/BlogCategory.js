const mongoose = require('mongoose');
const User = require('./User');

const BlogCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The category name field is required."],
        trim: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: User
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BlogCategory', BlogCategorySchema);