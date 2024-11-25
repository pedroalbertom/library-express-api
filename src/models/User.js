const Sequelize = require("sequelize")
const connection = require("../database/connection")

const User = connection.define("User", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    registration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

module.exports = User