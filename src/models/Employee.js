const Sequelize = require("sequelize")
const connection = require("../database/connection")

const Employee = connection.define("Employee", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    registration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    }
})

Employee.sync({force: false}).then(() => {console.log("Tabela Employee criada!")})

module.exports = Employee