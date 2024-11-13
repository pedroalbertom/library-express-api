const Sequelize = require("sequelize")
const connection = require("../database/connection")

const Comment = connection.define("Comment", {
    comment: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false
    }
})

Comment.sync({ force: false }).then(() => { console.log("Tabela Comment criada!") })

module.exports = Comment