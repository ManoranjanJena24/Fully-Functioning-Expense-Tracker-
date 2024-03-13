const Expense = require('../models/expense');
const User = require('../models/user')
const sequelize = require('sequelize')

exports.postAddExpense = (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    //  console.log(req.user)
    const userId = req.user.id//changes
    const totalExpense = req.user.totalexpense + req.body.amount;

    console.log('user id inside add expense', req.user)

    console.log("Inside Add User")
    req.user.createExpense({
        amount: amount,
        description: description,
        category: category,
    })
        // .then(result => {
        //     console.log("Created Expense");

        //     res.json(result);
        // })
        .then(result => {
            console.log("Created Expense");
            // Find the user by primary key
            User.findByPk(req.user.id)
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ error: 'User not found' });
                    }
                    // Update totalExpense in the user table
                    user.update({ totalexpense: totalExpense })
                        .then(() => {
                            console.log("Updated totalExpense in user table");
                            res.json(result);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ error: 'Internal Server Error' });
                        });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};


// exports.getAllExpenses = async (req, res, next) => {
//     User.findAll({
//         // Select relevant user columns
//         attributes: ['id', 'name',  /* other user columns */],
//         include: [{
//             // Join expenses with users
//             model: Expense,
//             attributes: [], // Select no attributes from expenses (optional)
//         }],
//         // Group by user ID
//         group: ['id'], 





//     })
//         .then(users => {
//             return Promise.all(users.map(async (user) => {
//                 const totalExpense = await Expense.sum('amount', {
//                     where: { userId: user.id }, // Filter by user ID
//                 });

//                 return {
//                     id: user.id,
//                     name: user.name,

//         /* other user properties */
//                     totalExpense: totalExpense || 0, // Handle cases where there might be no expenses for a user (set to 0)
//                 };
//             }));
//         })
//         .then(responseData => {
//             // Send the response
//             res.json(responseData.sort((a,b)=>b.totalExpense-a.totalExpense));
//         })
//         .catch(error => {
//             console.error('Error fetching users with expenses:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// };


exports.getAllExpenses = async (req, res, next) => {
    User.findAll({
        // Select relevant user columns
        attributes: ['id', 'name',
            // [sequelize.fn('sum', sequelize.col('expenses.amount')), 'totalExpense'], /* other user columns */],
            [sequelize.fn('COALESCE', sequelize.fn('sum', sequelize.col('expenses.amount')), 0), 'totalExpense'], /* other user columns */ ],
        include: [{
            // Join expenses with users
            model: Expense,
            attributes: [], // Select no attributes from expenses (optional)
        }],
        // Group by user ID
        group: ['id'],
        order:[['totalExpense','DESC']]
    })
        .then(users => {
            res.json(users)
        }).catch(error => {
            console.error('Error fetching users with expenses:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};




exports.getExpenses = (req, res, next) => {
    console.log("inside GET users")
    console.log('user id inbside getexpense', req.user.id)
    // req.user.getExpenses()..then((expenses) => { //method 2 to do line 38-43
    //     console.log("fetched Users")

    //     res.json(expenses)

    // })
    Expense.findAll({ where: { userId: req.user.id } }).then((expenses) => {//changes
        console.log("fetched Users")

        res.json(expenses)

    }).catch(err => {
        console.log(err)
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