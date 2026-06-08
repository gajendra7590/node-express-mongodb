const { validationResult } = require('express-validator');
const apiResponse = require('../utils/apiResponse');

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = {};

        errors.array().forEach(err => {
            if (!formattedErrors[err.path]) {
                formattedErrors[err.path] = err.msg;
            }
        });

        let apiRes = apiResponse.resultCode400("Failure", "Invalid Request - Validation Failure");
        return res.status(apiRes.statusCode).json({ ...apiRes, validationErrors: formattedErrors });
    }
    next();
};

module.exports = validate;