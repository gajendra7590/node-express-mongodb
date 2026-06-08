const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const { loginValidate, registerValidate } = require('../validators/auth/authValidator');
const validateMiddleware = require('../middlewares/validate');

router.post('/register', registerValidate(), validateMiddleware, register);
router.post('/login', loginValidate(), validateMiddleware, login);

module.exports = router;