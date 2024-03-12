const path = require('path');

const express = require('express');


const purchaseController=require('../controllers/purchase')

const userAuthentication = require('../middleware/auth')

const router = express.Router();

// /users => GET


router.get('/premium-membership', userAuthentication.authenticate, purchaseController.purchasePremium);



router.post('/updateTransactionStatus', userAuthentication.authenticate, purchaseController.updateTransactionStatus);



module.exports = router;
