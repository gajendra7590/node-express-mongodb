const { check } = require('express-validator');

const loginValidate = () => {
    return [
        check('email')
            .trim()
            .notEmpty().withMessage('The email is required')
            .isEmail().withMessage('The email field is required valid email address'),
        check('password')
            .trim()
            .notEmpty().withMessage('The password field is requried')
            .isLength({ min: 6 }).withMessage('The password field must be at least 6 characters long'),
    ];
}


const registerValidate = () => {
    return [
        check('name')
            .trim()
            .notEmpty().withMessage('The name is required'),
        check('email')
            .trim()
            .notEmpty().withMessage('The email is required')
            .isEmail().withMessage('The email field is required valid email address'),
        check('password')
            .trim()
            .notEmpty().withMessage('The password field is requried')
            .isLength({ min: 6 }).withMessage('The password field must be at least 6 characters long'),
    ];
}

module.exports = { loginValidate, registerValidate };