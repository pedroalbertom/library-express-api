const Sequelize = require("sequelize")
const connection = require("../database/connection")

const Comment = connection.define("Comment", {
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false
    }
})

module.exports = Comment