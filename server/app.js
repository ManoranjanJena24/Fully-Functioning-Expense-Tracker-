const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database')

const User = require('./models/user')
const Expense = require('./models/expense')

const app = express();
const cors=require('cors')

const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')

app.use(bodyParser.json({ extended: false }));
app.use(cors())

app.use('/user', userRoutes);
app.use('/expense',expenseRoutes)


sequelize.sync({
    // force: true  //these should not be done in production becoz we donot want to overwrite the table everytime we run
    // alter:true
})
app.listen(3000)



