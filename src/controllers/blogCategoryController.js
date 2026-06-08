const BlogCategory = require("../models/BlogCategory");
const apiResponse = require('../utils/apiResponse');

const getBlogCategories = async (req, res) => {
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

        const getBlogRes = await BlogCategory.find(query)
            .select('name createdAt')
            .sort({ 'createdAt': orderBy })
            .skip(skip)
            .limit(limit);

        let apiRes = apiResponse.resultCode200("All Blogs Retrieved Successfully", getBlogRes);
        return res.status(apiRes.statusCode).json(apiRes);
    } catch (error) {
        let apiRes = apiResponse.resultCode500(error?._message, error.message);
        return res.status(apiRes.statusCode).json(apiRes);
    }
}

const getBlogCategory = async (req, res) => {
    try {
        const getBlogCategory = await BlogCategory.findById(req.params.id)
            .select('name createdAt')
            .populate('author', 'name');
        if (!getBlogCategory) {
            let apiRes = apiResponse.resultCode404("The blog category detail not found", "Not Found");
            return res.status(apiRes.statusCode).json(apiRes);
        }
        let apiRes = apiResponse.resultCode200("Blog detail category retrieved Successfullty", getBlogCategory);
        return res.status(apiRes.statusCode).json(apiRes);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            let apiRes = apiResponse.resultCode404("The blog category detail not found", "Not Found");
            return res.status(apiRes.statusCode).json(apiRes);
        } else {
            let apiRes = apiResponse.resultCode500(error?._message, error.message);
            return res.status(apiRes.statusCode).json(apiRes);
        }
    }
}

const createBlogCategory = async (req, res) => {
    try {
        let createBlog = { ...req.body, author: req.user._id };
        const createRes = await BlogCategory.create(createBlog);
        let apiRes = apiResponse.resultCode200("Blog Category Created Successfully", createRes);
        return res.status(apiRes.statusCode).json(apiRes);
    } catch (error) {
        let apiRes = apiResponse.resultCode500(error?._message, error.message);
        return res.status(apiRes.statusCode).json(apiRes);
    }
}

const updateBlogCategory = async (req, res) => {
    try {
        const getBlogCategory = await BlogCategory.findById(req.params.id);
        if (!getBlogCategory) {
            let apiRes = apiResponse.resultCode404("The blog category not found", "Not Found");
            return res.status(apiRes.statusCode).json(apiRes);
        }
        const updateBlogCategory = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        let apiRes = apiResponse.resultCode200("Blog Category Updated Successfully", updateBlogCategory);
        return res.status(apiRes.statusCode).json(apiRes);
    } catch (error) {
        let apiRes = apiResponse.resultCode500(error?._message, error.message);
        return res.status(apiRes.statusCode).json(apiRes);
    }
}

const deleteBlogCategory = async (req, res) => {
    try {
        const getBlogCategory = await BlogCategory.findById(req.params.id);
        if (!getBlogCategory) {
            let apiRes = apiResponse.resultCode404("The blog category detail not found", "Not Found");
            return res.status(apiRes.statusCode).json(apiRes);
        }
        await BlogCategory.findByIdAndDelete(req.params.id);
        let apiRes = apiResponse.resultCode200("Blog category deleted successfully");
        return res.status(apiRes.statusCode).json(apiRes);
    } catch (error) {
        let apiRes = apiResponse.resultCode500(error?._message, error.message);
        return res.status(apiRes.statusCode).json(apiRes);
    }
}

module.exports = { getBlogCategories, getBlogCategory, createBlogCategory, updateBlogCategory, deleteBlogCategory };