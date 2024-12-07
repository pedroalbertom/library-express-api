const Sequelize = require("sequelize")
const connection = require("../database/connection")

const Comment = connection.define("Comment", {
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false
    },

    isAuthorized: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false
    }
})

module.exports = Comment