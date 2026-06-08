const { check } = require('express-validator');

const createBlogValidate = () => {
    return [
        check('categoryId')
            .trim()
            .notEmpty().withMessage('The blog category is required'),
        check('title')
            .trim()
            .notEmpty().withMessage('The title is required'),
        check('description')
            .trim()
            .notEmpty().withMessage('The description field is requried'),
    ];
}

module.exports = { createBlogValidate };