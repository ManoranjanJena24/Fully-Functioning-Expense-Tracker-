const path = require('path');

const express = require('express');

const passwordController = require('../controllers/password'); //change

// const userAuthentication = require('../middleware/auth')

const router = express.Router();

// /users => GET

router.post('/forgotpassword', passwordController.postForgotEmail);



module.exports = router;
