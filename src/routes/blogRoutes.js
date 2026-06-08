const express = require('express');
const router = express.Router();

const { getBlog, getBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

const { createBlogValidate } = require('../validators/blog/blogValidator');
const validateMiddleware = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', authMiddleware, getBlogs);
router.get('/:id', authMiddleware, getBlog);
router.post('/', upload.single('image'), authMiddleware, createBlogValidate(), validateMiddleware, createBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;