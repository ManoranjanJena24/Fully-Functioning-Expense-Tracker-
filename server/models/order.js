const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    paymentid: {
        type: Sequelize.STRING,
        // allowNull: false,

    },
    orderid: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    status: {
        type: Sequelize.STRING,
        // allowNull: false,

    }

});

module.exports = Order;



