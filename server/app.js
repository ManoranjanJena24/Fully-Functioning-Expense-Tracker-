const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const sequelize = require('./utils/database')
var Sib = require('sib-api-v3-sdk');
// const sib = new Sib()

const path = require('path');


const User = require('./models/user')
const Expense = require('./models/expense')
const Order = require('./models/order')
const ForgotPassword = require('./models/forgotPassword')


const app = express();
const cors = require('cors')

const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const passwordRoutes = require('./routes/password')

app.use(bodyParser.json({ extended: false }));
app.use(cors())

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));


app.use('/user', userRoutes);
app.use('/expense', expenseRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/password', passwordRoutes)

Expense.belongsTo(User)
User.hasMany(Expense)
Order.belongsTo(User)
User.hasMany(Order)
ForgotPassword.belongsTo(User)
User.hasMany(ForgotPassword)

sequelize.sync({
    // force: true  //these should not be done in production becoz we donot want to overwrite the table everytime we run
    // alter:true
})
app.listen(3000)



