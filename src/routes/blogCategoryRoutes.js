const express = require('express');
const router = express.Router();

const { getBlogCategories, getBlogCategory, createBlogCategory, updateBlogCategory, deleteBlogCategory } = require('../controllers/blogCategoryController');

const { createBlogCategoryValdiate } = require('../validators/blogCategories/blogCategoriesValidator');

const validateMiddleware = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, getBlogCategories);
router.get('/:id', authMiddleware, getBlogCategory);
router.post('/', authMiddleware, createBlogCategoryValdiate(), validateMiddleware, createBlogCategory);
router.put('/:id', authMiddleware, updateBlogCategory);
router.delete('/:id', authMiddleware, deleteBlogCategory);

module.exports = router;