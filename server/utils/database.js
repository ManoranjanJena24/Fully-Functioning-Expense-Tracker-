const Sequelize = require('sequelize')
const sequelize = new Sequelize('fully_functional_expense_tracker', 'root', 'user', { dialect: 'mysql', host: 'localhost' })
module.exports = sequelize


