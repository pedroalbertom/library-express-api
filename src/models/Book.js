const Sequelize = require("sequelize")
const connection = require("../database/connection")

const book = connection.define("book", {
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

book.sync({ force: false }).then(() => { console.log("Tabela book criada!") })

module.exports = book