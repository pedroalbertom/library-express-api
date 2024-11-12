const Sequelize = require("sequelize")
const connection = require("../database/connection")

const ItemType = connection.define("ItemType", {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

ItemType.sync({force: false}).then(() => {console.log("Tabela ItemType criada!")})

module.exports = ItemType