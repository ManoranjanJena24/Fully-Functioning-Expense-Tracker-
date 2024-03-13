const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
var Sib = require('sib-api-v3-sdk');


exports.postForgotEmail = (req, res, next) => {
    const email = req.body.email;
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.SMTP_API_KEY
    const tranEmailApi = new Sib.TransactionalEmailsApi()
    const sender = { email: 'a@gmail.com', name: 'EXPENSE TRACKER' } //change the name toour appname afterwards
    const receivers = [{
        email: email
    }]
    tranEmailApi.sendTransacEmail({
        sender, to: receivers, subject: "Reset the password link",
        textContent: `this is your reset password link`
    }).then(() => {
        console.log("Mail Send")
    }).catch((err) => {
        console.log(err)
    })
    res.json({ email: email })
};



