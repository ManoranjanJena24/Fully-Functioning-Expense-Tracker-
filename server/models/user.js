const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ispremiumuser: {
        type: Sequelize.BOOLEAN,

    },
    totalexpense: {
        type: Sequelize.INTEGER,

    },
    totalsalary: {
        type: Sequelize.INTEGER,

    },
    totalsavings: {
        type: Sequelize.INTEGER,

    },


}
    , {
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ]
    }

);


module.exports = User;