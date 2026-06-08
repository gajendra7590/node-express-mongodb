const Blog = require("../models/Blog");
const apiResponse = require('../utils/apiResponse');

const getBlogs = async (req, res) => {
    try {

        let query = {};
        if (req.query.search) {
            query = {
                $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { description: { $regex: req.query.search, $options: 'i' } }
                ]
            };
        }

        const orderBy = (req.query.orderBy === 'asc') ? 1 : -1;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const getBlogRes = await Blog.find(query)
            .select('title description createdAt')
            .sort({ 'createdAt': orderBy })
            // .populate('author', 'name email')
            .skip(skip)
            .limit(limit);

        let apiRes = apiResponse.resultCode200("All Blogs Retrieved Successfully", getBlogRes);
        return res.status(apiRes.statusCode).json(apiRes);
    } catch (error) {
        let apiRes = apiResponse.resultCode500(error?._message, error.message);
        return res.status(apiRes.statusCode).json(apiRes);
    }
}

const getBlog = async (req, res) => {
    try {
        const getBlog = await Blog.findById(req.params.id)
            .select('title description createdAt')
            .populate('author', 'name email')
            .populate('categoryId', 'name');
        if (!getBlog) {
            let apiRes = apiResponse.resultCode404("The blog detail not found", "Not Found");
            return res.status(apiRes.statusCode).json(apiRes);
        }
        let apiRes = apiResponse.resultCode200("Blog detail retrieved Successfullty", getBlog);
        return res.status(apiRes.statusCode).json(apiRes);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            let apiRes = apiResponse.resultCode404("The blog detail not found", "Not Found");
            return res.status(apiRes.statusCode).json(apiRes);
        } else {
            let apiRes = apiResponse.resultCode500(error?._message, error.message);
            return res.status(apiRes.statusCode).json(apiRes);
        }
    }
}

const createBlog = async (req, res) => {
    try {
        let createBlog = { ...req.body, author: req.user._id };
        if (req.file) {
            createBlog = { ...createBlog, image: req.file.filename }
        }
        const createRes = await Blog.create(createBlog);
        let apiRes = apiResponse.resultCode200("Blog Created Successfully", createRes);
        return res.status(apiRes.statusCode).json(apiRes);
    } catch (error) {
        let apiRes = apiResponse.resultCode500(error?._message, error.message);
        return res.status(apiRes.statusCode).json(apiRes);
    }
}

const updateBlog = async (req, res) => {
    try {
        const getBlog = await Blog.findById(req.params.id);
        if (!getBlog) {
            let apiRes = apiResponse.resultCode404("The blog detail not found", "Not Found");
            return res.status(apiRes.statusCode).json(apiRes);
        }
        const updateBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        let apiRes = apiResponse.resultCode200("Blog Updated Successfully", updateBlog);
        return res.status(apiRes.statusCode).json(apiRes);
    } catch (error) {
        let apiRes = apiResponse.resultCode500(error?._message, error.message);
        return res.status(apiRes.statusCode).json(apiRes);
    }
}

const deleteBlog = async (req, res) => {
    try {
        const getBlog = await Blog.findById(req.params.id);
        if (!getBlog) {
            let apiRes = apiResponse.resultCode404("The blog detail not found", "Not Found");
            return res.status(apiRes.statusCode).json(apiRes);
        }
        const updateBlog = await Blog.findByIdAndDelete(req.params.id);
        let apiRes = apiResponse.resultCode200("Blog Deleted Successfully");
        return res.status(apiRes.statusCode).json(apiRes);
    } catch (error) {
        let apiRes = apiResponse.resultCode500(error?._message, error.message);
        return res.status(apiRes.statusCode).json(apiRes);
    }
}

module.exports = { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };