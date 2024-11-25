const Sequelize = require("sequelize")
const connection = require("../database/connection")

const Book = connection.define("Book", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT('tiny'),
        allowNull: true
    },
    patrimonyNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        defaultValue: "John Doe"
    }
})

module.exports = Book