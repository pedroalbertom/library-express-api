const Sequelize = require("sequelize")
const connection = require("../database/connection")

const Locker = connection.define("Locker", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    patrimonyNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true
    }
})

Locker.sync({force: false}).then(() => {console.log("Tabela Locker criada!")})

module.exports = Locker