const Sequelize = require("sequelize")
const connection = require("../database/connection")

const Status = connection.define("Status", {
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

Status.sync({force: false}).then(() => {console.log("Tabela Status criada!")})

module.exports = Status