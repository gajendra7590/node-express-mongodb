const mongoose = require('mongoose');
const User = require('./User');
const BlogCategory = require('./BlogCategory');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'BlogCategory'
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);