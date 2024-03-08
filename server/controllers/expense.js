const Expense = require('../models/expense');

exports.postAddExpense = (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    console.log("Inside Add User")
    Expense.create({
        amount: amount,
        description: description,
        category: category
    })
        .then(result => {
            console.log("Created Expense");
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};



exports.getExpenses = (req, res, next) => {
    console.log("inside GET users")
    Expense.findAll().then((expenses) => {
        console.log("fetched Users")
        res.json(expenses)
    })
};

exports.postEditExpense = (req, res, next) => {
    const expenseId = req.body.id;
    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    Expense.findByPk(expenseId).then((expense) => {
        expense.amount = amount
        expense.description = description
        expense.category = category
        return expense.save();
    }).then((result) => {
        console.log("Updated")
        res.send('Updated Succesfully');
    }).catch((err) => {
        console.log(err)
    })
}


exports.postDeleteExpense = (req, res, next) => {
    console.log("inside Delete")
    const expenseId = req.params.id
    Expense.findByPk(expenseId).then((expense) => {
        return expense.destroy();
    }).then((result) => {
        console.log("deleted")
        res.send('Deleted')
    }).catch((err) => {
        console.log(err)
    })

};