const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../utils/database');

const ForgotPassword = sequelize.define('forgotpassword', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});

module.exports = ForgotPassword;
