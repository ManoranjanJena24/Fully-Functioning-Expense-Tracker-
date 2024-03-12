const Razorpay = require('razorpay')
const Order = require('../models/order')

const purchasePremium = async (req, res, next) => {
    console.log(process.env.RAZORPAY_KEY_ID,' key ')
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500
        rzp.orders.create({
            amount,currency:"INR"
        }, (err,order) => {
            if (err) {
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({
                orderid: order.id,
                status:'PENDING'
            }).then(() => {
                return res.status(201).json({
                    order,
                    key_id:rzp.key_id
              })  
            }).catch((err) => {
                console.log(err)
            })
        })
    }
    catch (err) { 
        console.log(err)
        rest.status(403).json({
            message: "Something Went Wrong",
            error:err
        })
    }
}


const updateTransactionStatus = async (req, res, next) => {
    // try {
    //     const {
    //         payment_id,
    //         order_id
    //     } = req.body
    //     Order.findOne({
    //         where:
    //     })
    // }
}


module.exports = { purchasePremium, updateTransactionStatus }
