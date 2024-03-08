const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense'); //change

const router = express.Router();

// /users => GET
router.get('/get-expenses', expenseController.getExpenses);

router.post('/add-expense', expenseController.postAddExpense);

router.delete('/delete-expense/:id', expenseController.postDeleteExpense);

router.post('/edit-expense', expenseController.postEditExpense);



module.exports = router;
