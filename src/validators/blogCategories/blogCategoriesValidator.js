const { check } = require('express-validator');
const BlogCategory = require('../../models/BlogCategory');

const createBlogCategoryValdiate = () => {
    return [
        check('name')
            .trim()
            .notEmpty().withMessage('The name is required')
            .custom(async (value, { req }) => {
                const category = await BlogCategory.findOne({
                    title: value
                });

                if (category) {
                    throw new Error('This blog category name is already exist.');
                }
                return true;
            })
    ];
}

module.exports = { createBlogCategoryValdiate };