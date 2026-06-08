const jwt = require('jsonwebtoken',);

const generateToken = (tokenPayload, expiresIn = '7d') => {
    return jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn
    });
}

module.exports = { generateToken };