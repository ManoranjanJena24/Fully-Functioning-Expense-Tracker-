const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database')

const User = require('./models/user')
const Expense = require('./models/expense')

const app = express();
const cors = require('cors')

// const session = require('express-session');

// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false
// }));

const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')

app.use(bodyParser.json({ extended: false }));
app.use(cors())



app.use('/user', userRoutes);
app.use('/expense',expenseRoutes)

Expense.belongsTo(User)
User.hasMany(Expense)

sequelize.sync({
    // force: true  //these should not be done in production becoz we donot want to overwrite the table everytime we run
    // alter:true
})
app.listen(3000)



