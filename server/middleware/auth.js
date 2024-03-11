const jwt = require('jsonwebtoken')
const User = require('../models/user');

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        // console.log(token)
        const userId = jwt.verify(token, 'c6d0d73ab58eb9d8f25504c91d8ba7149d619db20109a47ea66821740e75b3f4')
        // console.log('userId >>>>>',userId.userId)
        User.findByPk(userId.userId).then((user) => {
            req.user = user;
            next()
        })
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false })
    }
}
module.exports = { authenticate }