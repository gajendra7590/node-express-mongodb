const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const { generateToken } = require('../utils/generateToken');
const apiResponse = require('../utils/apiResponse');
const { sendEmail } = require('../utils/sendEmail');


const login = async (req, res) => {
    try {
        // const test = await sendEmail(); 
        // res.send(test);  
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            let apiRes = apiResponse.resultCode401("Invalid credentials");
            return res.status(apiRes.statusCode).json(apiRes);
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            let apiRes = apiResponse.resultCode401("Invalid credentials");
            return res.status(apiRes.statusCode).json(apiRes);
        }

        const accessToken = generateToken({ userId: user._id, email: user.email });

        let apiRes = apiResponse.resultCode200("Login Success", {
            userData: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }, accessToken: accessToken
        });
        return res.status(apiRes.statusCode).json(apiRes);

    } catch (error) {
        let apiRes = apiResponse.resultCode500(error?._message, error.message);
        return res.status(apiRes.statusCode).json(apiRes);
    }
}


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Check User email is already exist
        const userExist = await User.findOne({ email });
        if (userExist) {
            let apiRes = apiResponse.resultCode400('User already exists');
            return res.status(apiRes.statusCode).json(apiRes);
        }

        //HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password.toString(), 10);

        //CREATE USER IN DB
        const modelResponse = await User.create({ name, email, password: hashedPassword });
        if (modelResponse?._id) {
            let apiRes = apiResponse.resultCode200("User registration is successfully done.");
            return res.status(apiRes.statusCode).json(apiRes);
        } else {
            let apiRes = apiResponse.resultCode400("Facing error while user rehistration.");
            return res.status(apiRes.statusCode).json(apiRes);
        }
    } catch (error) {
        if (error?.name == 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach((field) => {
                errors[field] = error.errors[field].message;
            });
            let apiRes = apiResponse.resultCode400(error?._message, "Validation Failure");
            return res.status(apiRes.statusCode).json({ ...apiRes, validationErrors: errors });
        } else {
            let apiRes = apiResponse.resultCode500(error?._message, error.message);
            return res.status(apiRes.statusCode).json(apiRes);
        }
    }

}

module.exports = { login, register };