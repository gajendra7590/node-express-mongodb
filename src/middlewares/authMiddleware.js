const jwt = require('jsonwebtoken');
const User = require('../models/User');
const apiResponse = require('../utils/apiResponse');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            let apiRes = apiResponse.resultCode401("You have been logged out or your session expired.", "Unauthorized Access");
            return res.status(apiRes.statusCode).json(apiRes);
        }
        token1 = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token1, process.env.JWT_SECRET);
        const userDetail = await User.findById(decoded.userId).select('-password');
        if (!userDetail) {
            let apiRes = apiResponse.resultCode401("Invalid User Request.", "Unauthorized Access");
            return res.status(apiRes.statusCode).json(apiRes);
        }
        req.user = userDetail;
        next();
    } catch (error) {
        let apiRes = apiResponse.resultCode401("Invalid Token Or Expired", "Unauthorized Access");
        return res.status(apiRes.statusCode).json(apiRes);
    }
};
module.exports = authMiddleware;