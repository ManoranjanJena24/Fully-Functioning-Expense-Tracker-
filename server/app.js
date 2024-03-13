const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const sequelize = require('./utils/database')
var Sib = require('sib-api-v3-sdk');
// const sib = new Sib()

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





// const client = Sib.ApiClient.instance
// const apiKey = client.authentications['api-key']
// apiKey.apiKey = process.env.SMTP_API_KEY
// const tranEmailApi = new Sib.TransactionalEmailsApi()
// const sender = { email: 'a@gmail.com', name: 'ASHU' }
// const receivers = [{
//     email: 'manoranjanjenamitsy17@gmail.com'
// }]
// tranEmailApi.sendTransacEmail({
//     sender, to: receivers, subject: "Reset the password link",
//     textContent: `this is your reset password link`
// }).then(() => {
//     console.log("Mail Send")
// }).catch((err) => {
//     console.log(err)
// })

const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const passwordRoutes = require('./routes/password')

app.use(bodyParser.json({ extended: false }));
app.use(cors())



app.use('/user', userRoutes);
app.use('/expense', expenseRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/password', passwordRoutes)

Expense.belongsTo(User)
User.hasMany(Expense)
Order.belongsTo(User)
User.hasMany(Order)

sequelize.sync({
    // force: true  //these should not be done in production becoz we donot want to overwrite the table everytime we run
    // alter:true
})
app.listen(3000)



