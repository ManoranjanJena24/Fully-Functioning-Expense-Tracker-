const User = require('../models/user');


exports.postCreateUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.create({
        name: name,
        email: email,
        password: password,

    }).then((result) => {
        console.log("Created User")
        res.send("User Created SuccessFully")
    }).catch((err) => {
        console.log(err)
        // res.send(err.errors[0].message)

        if (err.name === 'SequelizeUniqueConstraintError') {
            // Handle duplicate email error
            res.status(403).send('Request Failed With Status 403');
        } else {
            res.status(500).send('Internal Server Error');
        }
    })

};


exports.postLoginUser = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({
        where: {
            email: email,


        }
    }).then((user) => {
        if (user.password === password) {
            res.status(200).json({ success: true })
        }
        else {
            res.status(401).json({ success: false, message: 'Invalid password. User not authorized' })
        }

    }).catch((error) => {
        res.status(404).json({ success: false, message: 'User not found' })
    })

}

