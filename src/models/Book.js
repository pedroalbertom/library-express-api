const Sequelize = require("sequelize")
const connection = require("../database/connection")

const Book = connection.define("Book", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isbn: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        defaultValue: "John Doe"
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    publication: {
        type: Sequelize.STRING,
        allowNull: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
})

module.exports = Book