const Sequelize = require("sequelize")
const connection = require("../database/connection")

const EventType = connection.define("EventType", {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

EventType.sync({force: false}).then(() => {console.log("Tabela EventType criada!")})

module.exports = EventType