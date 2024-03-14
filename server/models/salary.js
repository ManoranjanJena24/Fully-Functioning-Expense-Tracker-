const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Salary = sequelize.define('salary', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    salary: {
        type: Sequelize.INTEGER,
        // allowNull: false,

    },

});

module.exports = Salary;