const rateLimit = require('express-rate-limit');
const apiResponse = require('../utils/apiResponse');

const errorResponse = apiResponse.resultCode429('Too many requests, please try again later.', 'Too many requests')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes 
    max: 100, // limit each IP 
    message: errorResponse,
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = limiter;