const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const sequelize = require('./utils/database')

const User = require('./models/user')
const Expense = require('./models/expense')
const Order = require('./models/order')


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
const purchaseRoutes = require('./routes/purchase')

app.use(bodyParser.json({ extended: false }));
app.use(cors())



app.use('/user', userRoutes);
app.use('/expense', expenseRoutes)
app.use('/purchase', purchaseRoutes)


Expense.belongsTo(User)
User.hasMany(Expense)
Order.belongsTo(User)
User.hasMany(Order)

sequelize.sync({
    // force: true  //these should not be done in production becoz we donot want to overwrite the table everytime we run
    // alter:true
})
app.listen(3000)



