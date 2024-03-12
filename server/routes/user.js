const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();



router.post('/signup', userController.postCreateUser);

router.post('/login', userController.postLoginUser)

// router.get('/details', userController)




module.exports = router;
