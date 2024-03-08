const User = require('../models/user');
const bcrypt = require('bcrypt');

function generateHash(password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(8));//genSaltSync randomizes the password 8 times 
}

exports.postCreateUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;

    generateHash(req.body.password)
        .then(hashedPassword => {
            return User.create({
                name: name,
                email: email,
                password: hashedPassword,
            });
        })
        .then(result => {
            console.log("Created User");
            res.send("User Created Successfully");
        })
        .catch(err => {
            console.error(err);

            if (err.name === 'SequelizeUniqueConstraintError') {
                // Handle duplicate email error
                res.status(403).send('Request Failed With Status 403');
            } else {
                res.status(500).send('Internal Server Error');
            }
        });
};


function validPassword(password, dbPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, dbPassword, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.postLoginUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {
            email: email,
        }
    })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            validPassword(password, user.password)
                .then((isValid) => {
                    if (isValid) {
                        res.status(200).json({ success: true });
                    } else {
                        res.status(401).json({ success: false, message: 'Invalid password. User not authorized' });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ success: false, message: 'Internal Server Error' });
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
};
