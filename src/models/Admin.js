const Sequelize = require("sequelize")
const connection = require("../database/connection")

const Admin = connection.define("Admin", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    registration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Admin.sync({force: false}).then(() => {console.log("Tabela Admin criada!")})

module.exports = Admin