const Sequelize = require('sequelize')
const sequelize = new Sequelize('fully_functional_expense_tracker', process.env.DB_USER, process.env.DB_PASSWORD, { dialect: 'mysql', host: 'localhost' })
module.exports = sequelize


