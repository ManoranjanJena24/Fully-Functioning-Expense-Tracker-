const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense'); //change

const userAuthentication=require('../middleware/auth')

const router = express.Router();

// /users => GET
router.get('/get-expenses',userAuthentication.authenticate, expenseController.getExpenses);

router.post('/add-expense', userAuthentication.authenticate, expenseController.postAddExpense);

router.delete('/delete-expense/:id', expenseController.postDeleteExpense);

router.post('/edit-expense', expenseController.postEditExpense);



module.exports = router;
