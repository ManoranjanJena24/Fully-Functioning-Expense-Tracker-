const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();



router.post('/signup', userController.postCreateUser);

router.post('/login', userController.postLoginUser)




module.exports = router;
